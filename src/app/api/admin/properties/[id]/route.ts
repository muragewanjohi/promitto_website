import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerSupabaseClient(accessToken);
  const data = await request.json();
  const { features, ...propertyData } = data;

  const { error } = await supabase
    .from("properties")
    .update(propertyData)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Update property-feature mappings
  if (Array.isArray(features)) {
    // Remove old mappings
    const { error: deleteError } = await supabase
      .from("property_feature_map")
      .delete()
      .eq("property_id", id);
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }
    // Insert new mappings
    if (features.length > 0) {
      const featureRows = features.map((featureId: number) => ({
        property_id: id,
        feature_id: featureId,
      }));
      const { error: insertError } = await supabase
        .from("property_feature_map")
        .insert(featureRows);
      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerSupabaseClient(accessToken);

  // Fetch property
  const { data: property, error } = await supabase
    .from("properties")
    .select(`*,
      property_types(name),
      property_statuses(name),
      roof_types(name)
    `)
    .eq("id", id)
    .single();

  if (error || !property) {
    return NextResponse.json({ error: error?.message || "Property not found" }, { status: 404 });
  }

  // Fetch features
  const { data: featureRows, error: featureError } = await supabase
    .from("property_feature_map")
    .select("feature_id")
    .eq("property_id", id);

  if (featureError) {
    return NextResponse.json({ error: featureError.message }, { status: 500 });
  }

  const features = featureRows ? featureRows.map((row: any) => row.feature_id) : [];

  return NextResponse.json({
    ...property,
    type_id: property.type_id,
    type_name: property.property_types?.name || '',
    status_id: property.status_id,
    status_name: property.property_statuses?.name || '',
    roof_type_id: property.roof_type_id,
    roof_type_name: property.roof_types?.name || '',
    features
  });
} 