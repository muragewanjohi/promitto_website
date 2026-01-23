# Supabase Email Customization Guide

This guide explains how to customize Supabase authentication emails to show "PromitoLtd" branding instead of "Supabase".

## Steps to Customize Email Templates

### 1. Access Email Templates in Supabase Dashboard

1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Email Templates** (or **Settings** → **Auth** → **Email Templates**)

### 2. Customize Email Settings

#### Site URL Configuration
- Go to **Authentication** → **URL Configuration**
- Set **Site URL** to your production domain (e.g., `https://promittoltd.com`)
- This ensures all email links point to your domain

#### Email Templates Customization

You can customize the following email templates:

1. **Confirm signup** - Email verification email
2. **Magic Link** - Passwordless login email
3. **Change Email Address** - Email change confirmation
4. **Reset Password** - Password reset email
5. **Invite user** - User invitation email

### 3. Customize Each Template

For each template, you can customize:

#### Company Name & Branding
- Replace "Supabase" with "PromitoLtd" in all templates
- Update the sender name/company name

#### Logo & Colors
- Add your company logo URL
- Customize colors to match your brand

#### Email Content
- Customize the email subject lines
- Update the email body text
- Modify the button text and styling

### 4. Example Customization

Here's an example for the **Confirm signup** template:

**Original Subject:**
```
Confirm your signup
```

**Customized Subject:**
```
Welcome to PromitoLtd - Verify Your Email
```

**Template Variables Available:**
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's email address
- `{{ .Token }}` - Verification token (usually in link)
- `{{ .TokenHash }}` - Hashed token
- `{{ .RedirectTo }}` - Redirect URL after verification

### 5. Custom Email Template Example

Here's a sample customized email template HTML:

```html
<h2>Welcome to PromitoLtd!</h2>
<p>Thank you for signing up. Please confirm your email address by clicking the link below:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email Address</a></p>
<p>If you didn't create an account, you can safely ignore this email.</p>
<p>Best regards,<br>The PromitoLtd Team</p>
```

### 6. Redirect URLs

Make sure to configure redirect URLs:
- Go to **Authentication** → **URL Configuration**
- Add your redirect URLs:
  - `https://yourdomain.com/verify-email` (for email verification)
  - `https://yourdomain.com/reset-password` (for password reset)
  - `https://yourdomain.com/**` (wildcard for all paths)

### 7. Change "From" Address (Sender Email & Name)

#### Option A: Custom SMTP (Recommended for Custom Domain)

To change the "from address" to use your own domain (e.g., `noreply@promittoltd.com`):

1. Go to **Settings** → **Auth** → **SMTP Settings**
2. Enable **Custom SMTP**
3. Configure your SMTP server:
   - **SMTP Host**: Your email provider's SMTP server (e.g., `smtp.gmail.com`, `smtp.sendgrid.net`, or your custom SMTP)
   - **SMTP Port**: Usually `587` (TLS) or `465` (SSL)
   - **SMTP User**: Your SMTP username/email
   - **SMTP Password**: Your SMTP password or API key
   - **Sender email address**: `noreply@promittoltd.com` (or your preferred email)
   - **Sender name**: `PromitoLtd` (this is what shows as the display name)

#### Option B: Update Sender Name Only (Using Supabase Default SMTP)

If you want to keep using Supabase's email service but change the display name:

1. Go to **Authentication** → **Email Templates**
2. In each template, you can customize the sender name in the template HTML
3. However, the email address will still be from Supabase's domain

**Note**: With Supabase's default SMTP, the email will come from `noreply@mail.app.supabase.io` or similar. To use your own domain (e.g., `noreply@promittoltd.com`), you **must** set up custom SMTP.

#### Recommended SMTP Providers for Pro Plan:

1. **Resend** (You're already using this!)
   - SMTP Host: `smtp.resend.com`
   - Port: `587`
   - Use your Resend API key
   - Sender: `noreply@promittoltd.com` (after domain verification)

2. **SendGrid**
   - SMTP Host: `smtp.sendgrid.net`
   - Port: `587`
   - Use SendGrid API key

3. **AWS SES**
   - SMTP Host: `email-smtp.[region].amazonaws.com`
   - Port: `587`
   - Use AWS credentials

4. **Your Own SMTP Server**
   - Configure your company's SMTP server
   - Use your domain's email server

#### Setting Up Custom SMTP with Resend (Since You Already Use It):

1. **Verify Your Domain in Resend**:
   - Go to Resend Dashboard → Domains
   - Add and verify `promittoltd.com`
   - Add DNS records (SPF, DKIM, DMARC)

2. **Configure in Supabase**:
   - Go to **Settings** → **Auth** → **SMTP Settings**
   - Enable **Custom SMTP**
   - **SMTP Host**: `smtp.resend.com`
   - **SMTP Port**: `587`
   - **SMTP User**: `resend`
   - **SMTP Password**: Your Resend API key (same as `RESEND_API_KEY`)
   - **Sender email**: `noreply@promittoltd.com` (or `auth@promittoltd.com`)
   - **Sender name**: `PromitoLtd`

3. **Test the Configuration**:
   - Supabase will send a test email
   - Verify it shows "PromitoLtd" as sender name
   - Verify the from address is your domain

### 8. Email Rate Limits

With Pro plan, you have:
- Higher email sending limits
- Custom SMTP support
- Full email template customization

## Quick Checklist

- [ ] Update Site URL in Authentication settings
- [ ] Customize all email templates (5 templates)
- [ ] Replace "Supabase" with "PromitoLtd" in all templates
- [ ] Add your company logo (if available)
- [ ] Update email subjects
- [ ] Configure redirect URLs
- [ ] **Set up custom SMTP to change "from address"**
- [ ] Verify domain in Resend (if using Resend SMTP)
- [ ] Configure sender name as "PromitoLtd"
- [ ] Configure sender email as `noreply@promittoltd.com`
- [ ] Test email delivery and verify sender name/address

## Testing

After customization:
1. Test signup flow - verify email shows "PromitoLtd" branding
2. Test password reset - verify email branding
3. Test email verification - verify links work correctly

## Notes

- Changes take effect immediately
- Email templates support HTML
- You can use CSS for styling
- Template variables are case-sensitive
- Always test in a development environment first

## Support

If you need help:
- Supabase Documentation: https://supabase.com/docs/guides/auth/auth-email-templates
- Supabase Support: Available with Pro plan
