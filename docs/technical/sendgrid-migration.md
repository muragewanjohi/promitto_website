# Migrating from Resend to SendGrid

Outline for moving email from Resend to SendGrid for `promittoltd.com`.

---

## Step 1: Use Vercel nameservers (do this first)

Vercel recommends managing DNS on Vercel so you can add SendGrid’s records there.

- **Doc:** [vercel-nameservers.md](vercel-nameservers.md)
- **Action:** At your registrar/DNS provider, set nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
- **Then:** Wait for propagation; confirm the “Update nameservers” warning is gone in Vercel.

---

## Step 2: SendGrid domain & DNS in Vercel

1. In **SendGrid**: add and verify the domain `promittoltd.com` (Dashboard → Settings → Sender Authentication → Domain Authentication).
2. SendGrid will show the **exact** MX, DKIM (CNAME/TXT), and SPF (TXT) values.
3. In **Vercel**: Domains → `promittoltd.com` → DNS Records → add those records (copy values from SendGrid; use subdomain names only in Vercel, e.g. `em1234` or `s1._domainkey` as SendGrid specifies).
4. In SendGrid, run **Verify** again after propagation (often 5–60 minutes).

---

## Step 3: Code and env changes

- Replace Resend in `src/lib/email.ts` with the SendGrid API (e.g. `@sendgrid/mail`).
- Env: remove `RESEND_API_KEY` and `RESEND_FROM_EMAIL`; add `SENDGRID_API_KEY` and sender address (e.g. `noreply@promittoltd.com`).
- Remove the `resend` package; add `@sendgrid/mail`.
- Update README and any docs that mention Resend (e.g. [resend-vercel-dns.md](resend-vercel-dns.md)).

---

## Step 4: Cleanup

- In Vercel DNS: remove Resend-specific records (`resend._domainkey`, `send` TXT/MX) once SendGrid is verified and you’ve switched the app.
- In Resend: you can remove the domain or leave it until you’re confident SendGrid is working.

---

## Summary

| Step | Doc / place | Action |
|------|-------------|--------|
| 1 | [vercel-nameservers.md](vercel-nameservers.md) | Switch nameservers to Vercel. |
| 2 | SendGrid + Vercel | Add domain in SendGrid; add MX/DKIM/SPF in Vercel; verify in SendGrid. |
| 3 | `src/lib/email.ts`, env | Use SendGrid API and new env vars. |
| 4 | Vercel DNS, Resend | Remove Resend DNS records and Resend config when done. |
