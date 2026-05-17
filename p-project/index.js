import fs from "fs/promises";
import ollama from "ollama";
import pLimit from "p-limit";

const API_BASE_URL = `https://pornhwadb.com/api/v1/characters`; // Add your URL here
const API_KEY = "pwdb_bitCjHaT7JM_NBtEdL5LanU4RtL6sHJEGYuvMx0oryg";
const PAGE_SIZE = 90;
const fetchLimit = pLimit(5); // prefetch 5 images at once

const validColors = [
  "black",
  "dark-brown",
  "brown",
  "blonde",
  "gold",
  "white",
  "silver",
  "gray",
  "red",
  "dark-red",
  "orange",
  "pink",
  "rose-pink",
  "purple",
  "blue",
  "green",
];
function setTimeMintues(mintues) {
  return mintues * 60 * 1000;
}
async function fetchImageBase64(imageUrl) {
  return fetchLimit(async () => {
    try {
      const response = await fetch(imageUrl, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (!response.ok) return null;
      const buffer = await response.arrayBuffer();
      return Buffer.from(buffer).toString("base64");
    } catch {
      return null;
    }
  });
}

async function analyzeCharacterLocal(base64Data) {
  try {
    // Timeout promise — rejects after 10 seconds
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("TIMEOUT")), setTimeMintues(1)),
    );

    const analyze = ollama.generate({
      model: "qwen3-vl:8b",
      prompt: `You are a hair color classifier for anime/manhwa characters.
Look at the character's hair ONLY. Ignore background, clothing, and eyes.
Pick the single best match from this exact list:
black, dark-brown, brown, blonde, gold, white, silver, gray, red, dark-red, orange, pink, rose-pink, purple, blue, green

Respond with ONLY the color name from the list. Nothing else.`,
      images: [base64Data],
      options: {
        num_gpu: -1,
        num_ctx: 2048,
        temperature: 0,
        top_k: 1,
        top_p: 1,
        repeat_penalty: 1,
        use_mlock: false,
        use_mmap: true,
        flash_attn: true,
        kv_cache_type: "q4_0",
        num_keep: 0,
      },
      keep_alive: 120,
    });

    // Whichever resolves/rejects first wins
    const res = await Promise.race([analyze, timeout]);

    const cleaned = res.response
      .trim()
      .toLowerCase()
      .split("\n")[0]
      .split(" ")[0]
      .replace(/[^a-z-]/g, "");

    return validColors.includes(cleaned) ? cleaned : "unknown";
  } catch (e) {
    if (e.message === "TIMEOUT") {
      console.log("⏱️ timeout — skipping");
    } else {
      console.error(`AI Error: ${e.message}`);
    }
    return "unknown";
  }
}

async function getAllCharacters() {
  let allChars = [];
  let page = 1;
  let hasMore = true;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  while (hasMore) {
    console.log(`📄 Fetching Page ${page}...`);
    const response = await fetch(
      `${API_BASE_URL}?page=${page}&limit=${PAGE_SIZE}`,
      {
        headers: { "X-API-Key": API_KEY },
      },
    );
    const json = await response.json();
    const newChars = json.data;

    if (!newChars || newChars.length === 0) {
      hasMore = false;
    } else {
      allChars = [...allChars, ...newChars];
      page++;
      await delay(700);
    }
  }
  return allChars;
}

async function start() {
  const FILE = "./results.json";
  try {
    let characters;
    try {
      characters = JSON.parse(await fs.readFile(FILE, "utf-8"));
      console.log("📂 Local file found. Resuming...");
    } catch {
      characters = await getAllCharacters();
    }

    console.log(`🚀 Processing ${characters.length} characters...`);

    for (let i = 0; i < characters.length; i++) {
      if (characters[i].hair_color && characters[i].hair_color !== "unknown")
        continue;

      const url = characters[i].image;
      if (!url || !url.startsWith("http")) {
        characters[i].hair_color = "no-image";
        continue;
      }

      // Start prefetching next 5 images in background
      const prefetchPromises = [];
      for (let j = i + 1; j < Math.min(i + 6, characters.length); j++) {
        if (characters[j].image) {
          prefetchPromises.push(fetchImageBase64(characters[j].image));
        }
      }

      process.stdout.write(
        `[${i + 1}/${characters.length}] ${characters[i].name}... `,
      );

      // Fetch current image and analyze
      const base64Data = await fetchImageBase64(url);
      if (!base64Data) {
        console.log("-> skipped (bad image)");
        characters[i].hair_color = "unknown";
        continue;
      }

      const color = await analyzeCharacterLocal(base64Data);
      characters[i].hair_color = color;
      console.log(`-> ${color}`);

      // Wait for prefetches to complete (they're already cached by pLimit)
      await Promise.allSettled(prefetchPromises);

      if (i % 10 === 0) {
        await fs.writeFile(FILE, JSON.stringify(characters, null, 2));
      }
    }

    await fs.writeFile(FILE, JSON.stringify(characters, null, 2));
    console.log("✅ Done!");
  } catch (err) {
    console.error("Fatal Error:", err);
  }
}

start();
