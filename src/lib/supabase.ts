import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see README.md).'
    );
  }

  return { url, anonKey };
}

// Lazy client singleton so importing this module in client components does not
// break Next.js bundling of @supabase/supabase-js.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!browserClient) {
      const { url, anonKey } = getSupabaseEnv();
      browserClient = createClient(url, anonKey);
    }

    const value = browserClient[prop as keyof SupabaseClient];
    return typeof value === 'function' ? value.bind(browserClient) : value;
  },
});

// Server-side Supabase instance
export const createServerSupabaseClient = (accessToken?: string) => {
  const { url, anonKey } = getSupabaseEnv();

  return createClient(
    url,
    anonKey,
    accessToken
      ? { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
      : undefined
  );
};
