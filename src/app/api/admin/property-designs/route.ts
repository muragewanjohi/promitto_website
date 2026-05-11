import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

function sanitizeText(value: unknown, maxLength = 500): string | unknown {
  if (typeof value !== 'string') {
    return value;
  }

  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, maxLength);
}

export async function GET(request: Request) {
  try {
    const authResult = await requireAdmin(request);
    if ('response' in authResult) {
      return authResult.response;
    }
    const { supabase } = authResult;

    const { searchParams } = new URL(request.url);
    const bedrooms = searchParams.get('bedrooms');
    const roofType = searchParams.get('roofType');

    let query = supabase
      .from('property_designs')
      .select('*')
      .order('display_order', { ascending: true })
      .order('updatedat', { ascending: false });

    if (bedrooms && bedrooms !== 'all') {
      query = query.eq('bedrooms', Number.parseInt(bedrooms, 10));
    }
    if (roofType && roofType !== 'all') {
      query = query.eq('roof_type', roofType);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch property designs', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error('Error in GET /api/admin/property-designs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin(request);
    if ('response' in authResult) {
      return authResult.response;
    }
    const { supabase } = authResult;

    const body = await request.json();

    if (!body.name || !body.roof_type || !body.house_type || !body.image_path) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const payload = {
      name: sanitizeText(body.name, 160),
      bedrooms: Number(body.bedrooms) || 0,
      roof_type: sanitizeText(body.roof_type, 80),
      house_type: sanitizeText(body.house_type, 80),
      area: sanitizeText(body.area, 80),
      description: sanitizeText(body.description, 3000),
      image_path: sanitizeText(body.image_path, 2048),
      images: Array.isArray(body.images) ? body.images.slice(0, 5) : [],
      features: Array.isArray(body.features) ? body.features.slice(0, 30) : [],
      display_order: Number(body.display_order) || 0,
      is_featured: Boolean(body.is_featured),
    };

    const { data, error } = await supabase
      .from('property_designs')
      .insert([payload])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create property design', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/property-designs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
