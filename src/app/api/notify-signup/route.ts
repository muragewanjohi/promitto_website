import { NextRequest, NextResponse } from 'next/server';
import { sendSignupNotificationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { userEmail, phone } = await req.json();
    
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Send notification to admins
    const result = await sendSignupNotificationEmail({
      to: ['bruno.muriuki@promittoltd.com', 'edna.ongera@promittoltd.com'], // Admin emails
      userEmail,
      phone,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
