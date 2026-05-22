import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';

function getFileExtension(fileName: string): string {
  const parts = fileName.split('.');
  if (parts.length < 2) {
    return 'bin';
  }
  return parts.pop()?.toLowerCase() || 'bin';
}

function parseUploadedFiles(formData: FormData): File[] {
  const files: File[] = [];

  for (const item of formData.getAll('files')) {
    if (!(item instanceof Blob) || item.size === 0) {
      continue;
    }

    if (item instanceof File) {
      files.push(item);
      continue;
    }

    files.push(
      new File([item], 'upload.bin', {
        type: item.type || 'application/octet-stream',
      })
    );
  }

  return files;
}

export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin(request);
    if ('response' in authResult) {
      return authResult.response;
    }

    const { supabase } = authResult;

    const formData = await request.formData();
    const files = parseUploadedFiles(formData);

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

      const { error: uploadError } = await supabase.storage
        .from('properties')
        .upload(filePath, file, {
          upsert: false,
          contentType: file.type || 'application/octet-stream',
        });

      if (uploadError) {
        console.error('Property design image upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload image', details: uploadError.message },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabase.storage
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
