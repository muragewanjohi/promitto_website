import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
    }
    const result = await sendContactEmail({
      to: 'muragedev@gmail.com', //'info@promitto.com',
      name,
      email,
      subject,
      message,
    });
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal server error.' }, { status: 500 });
  }
} 