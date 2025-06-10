import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInquiryEmail({
  to,
  propertyName,
  message,
  phone,
  userEmail,
}: {
  to: string;
  propertyName: string;
  message: string;
  phone: string;
  userEmail: string;
}) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: `New Inquiry for ${propertyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1E40AF; margin-bottom: 20px;">New Property Inquiry</h1>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1E40AF; margin-bottom: 15px;">Property Details</h2>
            <p style="margin-bottom: 10px;"><strong>Property:</strong> ${propertyName}</p>
            <p style="margin-bottom: 10px;"><strong>Client's Email:</strong> ${userEmail}</p>
            <p style="margin-bottom: 10px;"><strong>Client's Phone Number:</strong> ${phone}</p>
            <p style="margin-bottom: 10px;"><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px;">${message || 'No message provided'}</p>
          </div>
          <div style="color: #666; font-size: 14px;">
            <p>This inquiry was submitted through the Promitto website.</p>
          </div>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendContactEmail({
  to,
  name,
  email,
  subject,
  message,
}: {
  to: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1E40AF; margin-bottom: 20px;">New Contact Form Submission</h1>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 10px;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin-bottom: 10px;"><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px;">${message || 'No message provided'}</p>
          </div>
          <div style="color: #666; font-size: 14px;">
            <p>This message was submitted through the Promitto website contact form.</p>
          </div>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error };
  }
} 