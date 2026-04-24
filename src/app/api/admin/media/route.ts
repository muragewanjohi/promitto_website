import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    let query = supabase
      .from('media_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching media items:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in GET /api/admin/media:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category, image_url, is_featured, author, published_at, excerpt } = body;
    
    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      );
    }
    
    const validCategories = ['news', 'resources', 'events', 'blogs'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: news, resources, events, blogs' },
        { status: 400 }
      );
    }
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { data, error } = await supabase
      .from('media_items')
      .insert([
        {
          title,
          content,
          category,
          image_url,
          is_featured: is_featured || false,
          author: author || null,
          published_at: published_at || new Date().toISOString(),
          excerpt: excerpt || null,
        },
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating media item:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/media:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

