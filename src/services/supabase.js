
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://lqgnyrjvgdrqpamditgu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ255cmp2Z2RycXBhbWRpdGd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NTEyNzAsImV4cCI6MjA5MDMyNzI3MH0.R01dfixpn7WoFnKglw-IuZyv_6_dwDVzGXv_gzat5lo"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase