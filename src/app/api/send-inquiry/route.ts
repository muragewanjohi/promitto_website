import { NextRequest, NextResponse } from 'next/server';
import { sendInquiryEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { to, propertyName, message, phone, userEmail } = await req.json();
    if (!to || !propertyName || !phone || !userEmail) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
    }
    const result = await sendInquiryEmail({ to, propertyName, message, phone, userEmail });
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal server error.' }, { status: 500 });
  }
} 