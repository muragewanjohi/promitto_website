import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

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
      .from('media_items')
      .select('*')
      .eq('id', params.id)
      .single();
    
    if (error) {
      console.error('Error fetching media item:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Media item not found' }, { status: 404 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/admin/media/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    const { title, content, category, image_url, is_featured, author, published_at, excerpt } = body;
    
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) {
      const validCategories = ['news', 'resources', 'events', 'blogs'];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: 'Invalid category. Must be one of: news, resources, events, blogs' },
          { status: 400 }
        );
      }
      updateData.category = category;
    }
    if (image_url !== undefined) updateData.image_url = image_url;
    if (is_featured !== undefined) updateData.is_featured = is_featured;
    if (author !== undefined) updateData.author = author;
    if (published_at !== undefined) updateData.published_at = published_at;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    
    const { data, error } = await supabase
      .from('media_items')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating media item:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PUT /api/admin/media/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
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
      .from('media_items')
      .delete()
      .eq('id', params.id);
    
    if (error) {
      console.error('Error deleting media item:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/media/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

