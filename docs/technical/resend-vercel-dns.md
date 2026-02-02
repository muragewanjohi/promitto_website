# Connecting Resend to Vercel (Domain & DNS)

Resend and Vercel connect **via DNS**: you add Resend’s required DNS records in **Vercel → Domains** so Resend can verify your domain and send from `@promittoltd.com`.

---

## 1. Where things live

- **Resend** (resend.com): where you add the domain `promittoltd.com` and get the **exact** DKIM/SPF/MX values.
- **Vercel** (vercel.com → Project → Domains): where you add those records for `promittoltd.com` (if Vercel is your DNS for that domain).

If your domain uses **Vercel nameservers** (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`), then the DNS Resend checks is the one you edit in Vercel.

---

## 2. Records Resend needs (add in Vercel)

You need **three** records. Copy the **full** values from the Resend dashboard (Domains → `promittoltd.com` → DNS Records). Do not truncate the DKIM value.

| Purpose        | Type | Name (in Vercel)   | Value / Content |
|----------------|------|--------------------|-----------------|
| Domain verification (DKIM) | TXT  | `resend._domainkey` | Full value from Resend (starts with `p=MIGfMA0...`) |
| Enable sending (SPF)       | TXT  | `send`             | From Resend (e.g. `v=spf1 include:amazonses.com ~all`) |
| Enable sending (MX)       | MX   | `send`             | From Resend (e.g. `feedback-smtp.eu-west-1.amazonses.com.`) Priority: `10` |

- **Name:** In Vercel, enter only the subdomain part: `send` or `resend._domainkey` (no `promittoltd.com`).
- **DKIM:** Paste the entire string Resend shows (one long line). Any missing character will cause verification to fail.

---

## 3. Step-by-step

1. **Resend**
   - Go to [Resend Dashboard](https://resend.com/domains) → **Domains** → select `promittoltd.com`.
   - Open **DNS Records**.
   - For **Domain Verification (DKIM)** and **Enable Sending (SPF)**, use the **Copy** button for each value (do not type by hand).

2. **Vercel**
   - Go to your project on [Vercel](https://vercel.com) → **Settings** → **Domains** (or **Domains** in the top nav).
   - Select `promittoltd.com` (or add it).
   - Under **DNS Records** (or “Add DNS Record”):
     - Add the **TXT** record for `resend._domainkey` with the full DKIM value.
     - Add the **TXT** record for `send` with the SPF value from Resend.
     - Add the **MX** record for `send` with the host/value and priority (e.g. `10`) from Resend.

3. **Save** and wait **5–60 minutes** (sometimes up to 48 hours).

4. **Resend**
   - Back in Resend → Domains → `promittoltd.com`, click **Restart** (or “Verify”) to re-check DNS.
   - When both “Domain Verification (DKIM)” and “Enable Sending (SPF)” show as verified, the domain status should change from **Failed** to **Verified**.

---

## 4. If it still shows “Failed”

- **DKIM:** Ensure the TXT value for `resend._domainkey` is **identical** to Resend (full length, no extra spaces or line breaks). Use Resend’s copy button.
- **SPF/MX:** Ensure the `send` TXT and MX values and priority match Resend exactly (including trailing dot on MX if Resend shows it).
- **DNS:** Confirm the domain’s nameservers are Vercel’s so that the records you added in Vercel are the ones Resend sees. Check with [Resend’s docs](https://resend.com/docs/dashboard/domains/introduction) or a DNS lookup for `resend._domainkey.promittoltd.com` and `send.promittoltd.com`.

---

## 5. After the domain is verified

1. In your app, set the sender address to your domain, e.g. `noreply@promittoltd.com` or `hello@promittoltd.com`.
2. In Vercel (or your env), add:
   - `RESEND_FROM_EMAIL=noreply@promittoltd.com` (or the address you prefer).
3. The code in `src/lib/email.ts` uses this env var when set, so emails will send from your verified domain.

---

## Summary

| Step | Where | Action |
|------|--------|--------|
| 1 | Resend | Copy exact DKIM, SPF, and MX values for `promittoltd.com`. |
| 2 | Vercel | Add TXT `resend._domainkey`, TXT `send`, MX `send` with those values. |
| 3 | Wait | 5–60 min (or up to 48 h). |
| 4 | Resend | Click Restart/Verify; confirm status is Verified. |
| 5 | App | Set `RESEND_FROM_EMAIL` and redeploy so emails use `@promittoltd.com`. |
