import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

function sanitizeText(value: unknown, maxLength = 500): string | unknown {
  if (typeof value !== 'string') {
    return value;
  }

  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, maxLength);
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAdmin(request);
    if ('response' in authResult) {
      return authResult.response;
    }
    const { supabase } = authResult;

    const { data, error } = await supabase
      .from('property_designs')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Property design not found', details: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/admin/property-designs/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAdmin(request);
    if ('response' in authResult) {
      return authResult.response;
    }
    const { supabase } = authResult;

    const body = await request.json();
    const payload = {
      ...(body.name !== undefined ? { name: sanitizeText(body.name, 160) } : {}),
      ...(body.bedrooms !== undefined ? { bedrooms: Number(body.bedrooms) || 0 } : {}),
      ...(body.roof_type !== undefined ? { roof_type: sanitizeText(body.roof_type, 80) } : {}),
      ...(body.house_type !== undefined ? { house_type: sanitizeText(body.house_type, 80) } : {}),
      ...(body.area !== undefined ? { area: sanitizeText(body.area, 80) } : {}),
      ...(body.description !== undefined ? { description: sanitizeText(body.description, 3000) } : {}),
      ...(body.image_path !== undefined ? { image_path: sanitizeText(body.image_path, 2048) } : {}),
      ...(body.images !== undefined ? { images: Array.isArray(body.images) ? body.images.slice(0, 5) : [] } : {}),
      ...(body.features !== undefined ? { features: Array.isArray(body.features) ? body.features.slice(0, 30) : [] } : {}),
      ...(body.display_order !== undefined ? { display_order: Number(body.display_order) || 0 } : {}),
      ...(body.is_featured !== undefined ? { is_featured: Boolean(body.is_featured) } : {}),
    };

    const { data, error } = await supabase
      .from('property_designs')
      .update(payload)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update property design', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PATCH /api/admin/property-designs/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAdmin(request);
    if ('response' in authResult) {
      return authResult.response;
    }
    const { supabase } = authResult;

    const { error } = await supabase
      .from('property_designs')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete property design', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/property-designs/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
