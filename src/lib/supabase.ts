import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://zgdtfafhualeheffbzhs.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_bD4HXKpRHDAHiSNw3jrbJQ_bPQXftrf";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("Supabase env vars missing - falling back to provided defaults");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
