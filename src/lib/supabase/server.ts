import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://owhyoarhxjjyddacvqab.supabase.co';

const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  '';

/**
 * Supabase Administrative Client (Server-side only)
 * Uses the Supabase Secret Key (Service Role) with elevated privileges to bypass Row Level Security.
 * WARNING: Never import or use this client in client-side / browser components.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

