# Google Analytics (GA4) setup for Promitto

This guide covers:

1. **Client-side tracking** – so GA4 records page views and visitors on your site.
2. **Admin analytics page** – page views, number of visitors, and visitors by country using the GA4 Data API.

---

## 1. Create a GA4 property

1. Go to [Google Analytics](https://analytics.google.com/) and sign in.
2. **Admin** (gear) → **Create Property** (or use an existing GA4 property).
3. Choose **Web** as the platform and enter your website URL (e.g. `https://promittoltd.com`).
4. After creation, go to **Admin** → **Data Streams** → your web stream.
5. Note your **Measurement ID** (e.g. `G-XXXXXXXXXX`). You’ll use this for client-side tracking.
6. In **Admin** → **Property Settings**, note the **Property ID** (numeric, e.g. `123456789`). You’ll use this for the Data API.

---

## 2. Client-side tracking (page views)

The site already loads the gtag script when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.

1. In the project root, add to `.env.local`:

   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   Replace `G-XXXXXXXXXX` with your Measurement ID from step 1.

2. Redeploy or restart the dev server. Page views will be sent to GA4 automatically.

---

## 3. Admin analytics page (Data API)

The admin **Analytics** page shows page views, visitors, sessions, and visitors by country. It uses the **Google Analytics Data API** with a **service account**.

### 3.1 Create a Google Cloud project and service account

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project or select an existing one.
3. **APIs & Services** → **Library** → search for **Google Analytics Data API** → **Enable**.
4. **APIs & Services** → **Credentials** → **Create Credentials** → **Service Account**.
5. Give it a name (e.g. `promitto-ga4-reader`) → **Create and Continue** → **Done**.
6. Open the new service account → **Keys** → **Add Key** → **Create new key** → **JSON** → download the JSON file.

### 3.2 Grant the service account access to GA4

1. In **Google Analytics**, go to **Admin** → **Property** → **Property Access Management**.
2. Click **+** (Add users).
3. Enter the **service account email** (e.g. `promitto-ga4-reader@your-project.iam.gserviceaccount.com`).
4. Role: **Viewer** (read-only).
5. Save.

### 3.3 Add environment variables

You need the **Property ID** (numeric) and the **service account key** as a single-line JSON string.

**Option A – Single-line JSON in env**

1. Minify the downloaded JSON key (remove newlines). Example (replace with your values):

   ```json
   {"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
   ```

2. In `.env.local` (or Vercel **Environment Variables**):

   ```bash
   GA_PROPERTY_ID=123456789
   GA_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
   ```

   For Vercel, paste the whole JSON in the value; avoid line breaks.

**Option B – File path (local only)**

If you keep the key file on disk (e.g. `ga-service-account.json` in the project root, and add it to `.gitignore`):

```bash
GA_PROPERTY_ID=123456789
GOOGLE_APPLICATION_CREDENTIALS=./ga-service-account.json
```

The API route would need to use `keyFilename` instead of parsing `GA_SERVICE_ACCOUNT_JSON`. The current implementation uses `GA_SERVICE_ACCOUNT_JSON` so it works on Vercel without uploading key files.

### 3.4 Redeploy

Restart the dev server or redeploy. Open **Admin** → **Analytics**. You should see:

- **Page views** (last 30 days)
- **Visitors** (active users)
- **Sessions**
- **Visitors by country** (table)

If GA is not configured, the page shows a short message and points to this doc.

---

## 4. Summary of environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | For tracking | GA4 Measurement ID (e.g. `G-XXXXXXXXXX`). Enables client-side page views. |
| `GA_PROPERTY_ID` | For admin page | GA4 Property ID (numeric). Used by the Data API. |
| `GA_SERVICE_ACCOUNT_JSON` | For admin page | Full service account key JSON as a single string. Used by the Data API. |

---

## 5. Troubleshooting

- **Admin analytics shows “not configured”**  
  Ensure `GA_PROPERTY_ID` and `GA_SERVICE_ACCOUNT_JSON` are set and the JSON is valid (no missing quotes, one line).

- **Admin analytics returns no data**  
  - Confirm the service account email has **Viewer** access on the GA4 property.  
  - Confirm the **Google Analytics Data API** is enabled in the Google Cloud project.  
  - Wait a few hours after enabling GA4; new properties may have no data at first.

- **Page views not appearing in GA4**  
  - Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` and that the script loads (e.g. Network tab: `googletagmanager.com/gtag/js`).  
  - GA4 reporting can lag; check again after 24–48 hours.
