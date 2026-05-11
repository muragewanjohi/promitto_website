import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

function getFileExtension(fileName: string): string {
  const parts = fileName.split('.');
  if (parts.length < 2) {
    return 'bin';
  }
  return parts.pop()?.toLowerCase() || 'bin';
}

export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin(request);
    if ('response' in authResult) {
      return authResult.response;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const formData = await request.formData();
    const files = formData.getAll('files').filter((item): item is File => item instanceof File);
    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }
    if (files.length > 5) {
      return NextResponse.json({ error: 'Max 5 images allowed' }, { status: 400 });
    }

    const urls: string[] = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
      }

      const fileExt = getFileExtension(file.name);
      const filePath = `property-designs/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabaseAdmin.storage
        .from('properties')
        .upload(filePath, buffer, {
          upsert: false,
          contentType: file.type || 'application/octet-stream',
        });

      if (uploadError) {
        return NextResponse.json(
          { error: 'Failed to upload image', details: uploadError.message },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('properties')
        .getPublicUrl(filePath);

      urls.push(publicUrlData.publicUrl);
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Error in POST /api/admin/property-designs/upload:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
