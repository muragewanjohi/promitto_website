import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

type AuthorizedAdminResult = {
  supabase: ReturnType<typeof createServerSupabaseClient>;
  userId: string;
};

type UnauthorizedResult = {
  response: NextResponse;
};

type RequireAdminResult = AuthorizedAdminResult | UnauthorizedResult;

export async function requireAdmin(request: Request): Promise<RequireAdminResult> {
  const authHeader = request.headers.get('authorization');
  const accessToken = authHeader?.split(' ')[1];

  if (!accessToken) {
    return {
      response: NextResponse.json(
        { error: 'Unauthorized', message: 'No access token provided' },
        { status: 401 }
      ),
    };
  }

  const supabase = createServerSupabaseClient(accessToken);
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      response: NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or expired session' },
        { status: 401 }
      ),
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || profile?.role !== 'admin') {
    return {
      response: NextResponse.json(
        { error: 'Forbidden', message: 'Admin access required' },
        { status: 403 }
      ),
    };
  }

  return {
    supabase,
    userId: user.id,
  };
}
