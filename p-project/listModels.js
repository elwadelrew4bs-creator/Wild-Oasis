import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from './secret_geminiAPI_Key.js';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function list() {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
    const data = await response.json();
    
    console.log("--- AVAILABLE MODELS ---");
    data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
            console.log(m.name); // This prints the exact string to use
        }
    });
}

list();