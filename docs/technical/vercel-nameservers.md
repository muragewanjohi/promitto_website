# Using Vercel Nameservers for promittoltd.com

Vercel recommends **updating the nameservers** at your domain registrar/DNS provider to Vercel’s nameservers so you can manage all DNS records (including email) from the Vercel dashboard.

---

## 1. Why do this?

- **Single place for DNS:** All records for `promittoltd.com` (site, email, etc.) are managed in **Vercel → Domains → DNS Records**.
- **Email migration:** When you add SendGrid (or any provider), you add its MX/DKIM/SPF records in Vercel instead of logging into a third-party DNS panel.
- **Current state:** If “Nameservers” shows **Third Party**, the domain’s DNS is managed elsewhere; Vercel can’t edit those records. After switching to Vercel’s nameservers, the records you add in Vercel are the ones the internet uses.

**Note:** If you see an “Invalid Configuration” error in Vercel asking for an A record (e.g. `216.150.1.1`), that’s for the alternative approach (keeping third-party DNS). **Ignore it** if you’re switching to Vercel nameservers—the error will disappear once nameservers propagate.

---

## 2. Vercel’s nameservers

Use these two nameservers (copy from Vercel or use below):

| # | Nameserver        |
|---|-------------------|
| 1 | `ns1.vercel-dns.com` |
| 2 | `ns2.vercel-dns.com` |

In **Vercel**: Project → **Domains** → select `promittoltd.com` → scroll to **DNS Records** → the nameservers are listed there with copy buttons.

---

## 3. Where to update nameservers

Update them at the place that **currently** controls the domain (registrar or DNS provider). That’s where “Registrar: Third Party” and “Nameservers: Third Party” are set.

Common places:

- **Registrar:** GoDaddy, Namecheap, Google Domains, Cloudflare (if you use them as registrar), etc.  
  Look for **Domain settings** → **Nameservers** (or **DNS** → **Nameservers**).
- **DNS-only:** If the domain is registered in one place but “Use custom nameservers” points elsewhere, update the nameservers at that **custom** DNS provider.

Steps (generic):

1. Log in to your registrar or DNS provider.
2. Find the domain `promittoltd.com`.
3. Open **Nameservers** (or **DNS** → **Nameservers**).
4. Replace the current nameservers with:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
5. Save. Some providers ask for “Custom” or “I’ll use my own nameservers” and then two fields—put one nameserver per field.

---

## 4. After you save

- **Propagation:** It can take from a few minutes up to 24–48 hours for the change to apply globally. Vercel’s note: *“It might take some time for the nameserver changes to apply.”*
- **Vercel:** Once propagation is done, the orange banner in Vercel (“Update the nameservers…”) should disappear, and **DNS Records** for `promittoltd.com` will be managed entirely in Vercel.
- **Existing records:** If you had DNS records (e.g. for Resend) at the old provider, you’ll need to **re-add them in Vercel** after the switch, because Vercel’s DNS starts from what you add in the dashboard (and any presets you add). So either:
  - Note down current records (MX, TXT, CNAME, A, etc.) before switching, then add them in Vercel, or  
  - Add them when needed (e.g. SendGrid records when you migrate email).

---

## 5. Summary

| Step | Where | Action |
|------|--------|--------|
| 1 | Vercel | Copy `ns1.vercel-dns.com` and `ns2.vercel-dns.com` (Domains → promittoltd.com → DNS Records). |
| 2 | Registrar / DNS provider | Set the domain’s nameservers to those two. Save. |
| 3 | Wait | Propagation can take a few minutes up to 24–48 hours. |
| 4 | Vercel | Confirm the “Update nameservers” warning is gone; manage DNS in Vercel from here on. |

After this, you can add **SendGrid** (or other) DNS records in **Vercel → Domains → promittoltd.com → DNS Records**. See [SendGrid migration](sendgrid-migration.md) for the next steps.
