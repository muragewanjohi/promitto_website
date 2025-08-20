import { createClient } from '@supabase/supabase-js';

// Check if we're in a browser environment and environment variables are available
const isClient = typeof window !== 'undefined';
const hasEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only throw error if we're in client-side and env vars are missing
if (isClient && !hasEnvVars) {
  throw new Error('Missing Supabase environment variables');
}

// Client-side Supabase instance
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Server-side Supabase instance
export const createServerSupabaseClient = (accessToken?: string) => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables for server-side operations');
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    accessToken
      ? { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
      : undefined
  );
}; 