import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { isPropertySafe } from '@/lib/security/propertySafety';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    const withRelations = await supabase
      .from('properties')
      .select(`
        *,
        property_types(name),
        property_statuses(name),
        roof_types(name)
      `)
      .eq('featured', true)
      .order('updatedat', { ascending: false })
      .limit(12);

    let data = withRelations.data;

    if (withRelations.error) {
      const fallback = await supabase
        .from('properties')
        .select('*')
        .eq('featured', true)
        .order('updatedat', { ascending: false })
        .limit(12);

      if (fallback.error) {
        return NextResponse.json(
          { error: 'Failed to fetch featured properties', details: fallback.error.message },
          { status: 500 }
        );
      }

      data = fallback.data;
    }

    let mapped = (data ?? [])
      .filter((property: any) => isPropertySafe(property))
      .map((property: any) => ({
        ...property,
        mainImage: property.featuredImage || property.image_url || '/images/placeholder.png',
        status: property.property_statuses?.name || property.status || 'completed',
        type: property.property_types?.name || property.type || 'House',
      }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error in GET /api/featured-properties:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching featured properties' },
      { status: 500 }
    );
  }
}
