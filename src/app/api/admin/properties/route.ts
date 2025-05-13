export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { propertyDetails } from '@/data/properties';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const accessToken = authHeader?.split(' ')[1];

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'No access token provided' },
      { status: 401 }
    );
  }

  const supabase = createServerSupabaseClient(accessToken);

  // Fetch all properties
  const { data: properties, error } = await supabase
    .from('properties')
    .select(`*,
      property_types(name),
      property_statuses(name),
      roof_types(name)
    `);

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties', details: error.message },
      { status: 500 }
    );
  }

  // Fetch all property-feature mappings
  const { data: featureMaps, error: featureError } = await supabase
    .from('property_feature_map')
    .select('property_id, feature_id');

  if (featureError) {
    return NextResponse.json(
      { error: 'Failed to fetch property features', details: featureError.message },
      { status: 500 }
    );
  }

  // Map property_id to array of feature_ids
  const featureMapByProperty: Record<string, number[]> = {};
  if (featureMaps) {
    for (const row of featureMaps) {
      if (!featureMapByProperty[row.property_id]) featureMapByProperty[row.property_id] = [];
      featureMapByProperty[row.property_id].push(row.feature_id);
    }
  }

  // Attach features to each property
  const propertiesWithFeatures = (properties || []).map((property: any) => ({
    ...property,
    type_id: property.type_id,
    type_name: property.property_types?.name || '',
    status_id: property.status_id,
    status_name: property.property_statuses?.name || '',
    roof_type_id: property.roof_type_id,
    roof_type_name: property.roof_types?.name || '',
    features: featureMapByProperty[property.id] || [],
  }));

  return NextResponse.json(propertiesWithFeatures);
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const accessToken = authHeader?.split(' ')[1];

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'No access token provided' },
      { status: 401 }
    );
  }

  const supabase = createServerSupabaseClient(accessToken);

  try {
    const data = await request.json();
    const { features, ...propertyData } = data;

    // Insert property into Supabase
    const { data: inserted, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to create property', details: error.message },
        { status: 500 }
      );
    }

    // Insert property-feature mappings
    if (Array.isArray(features) && features.length > 0) {
      const featureRows = features.map((featureId: number) => ({
        property_id: inserted.id,
        feature_id: featureId,
      }));
      const { error: mapError } = await supabase
        .from('property_feature_map')
        .insert(featureRows);
      if (mapError) {
        console.error('Feature map error:', mapError);
        return NextResponse.json(
          { error: 'Failed to map features', details: mapError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(inserted, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
} 