import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export async function GET(request: Request) {
  try {
    const authResult = await requireAdmin(request);
    if ('response' in authResult) {
      return authResult.response;
    }
    const { supabase } = authResult;

    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching FAQs:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/admin/faqs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
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
    const { question, answer, display_order, published } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('faqs')
      .insert([
        {
          question,
          answer,
          display_order: display_order || 0,
          published: published !== undefined ? published : true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating FAQ:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/faqs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

