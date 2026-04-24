export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA_PROPERTY_ID;
const serviceAccountJson = process.env.GA_SERVICE_ACCOUNT_JSON;

function getAnalyticsClient(): BetaAnalyticsDataClient | null {
  if (serviceAccountJson) {
    try {
      const credentials = JSON.parse(serviceAccountJson) as { client_email?: string; private_key?: string };
      if (credentials.client_email && credentials.private_key) {
        return new BetaAnalyticsDataClient({ credentials });
      }
    } catch {
      // ignore
    }
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return new BetaAnalyticsDataClient();
  }
  return null;
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const accessToken = authHeader?.split(' ')[1];

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'No access token provided' },
        { status: 401 }
      );
    }

    const { createServerSupabaseClient } = await import('@/lib/supabase');
    const supabase = createServerSupabaseClient(accessToken);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    if (!propertyId) {
      return NextResponse.json(
        {
          configured: false,
          message: 'Google Analytics is not configured. Set GA_PROPERTY_ID and GA_SERVICE_ACCOUNT_JSON (or GOOGLE_APPLICATION_CREDENTIALS for local key file).',
        },
        { status: 200 }
      );
    }

    const analyticsDataClient = getAnalyticsClient();
    if (!analyticsDataClient) {
      return NextResponse.json(
        {
          configured: false,
          message: 'Set GA_SERVICE_ACCOUNT_JSON (valid JSON string) or GOOGLE_APPLICATION_CREDENTIALS (path to key file).',
        },
        { status: 200 }
      );
    }

    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const startDate = thirtyDaysAgo.toISOString().slice(0, 10);
    const endDate = today.toISOString().slice(0, 10);

    const property = `properties/${propertyId}`;

    const [overviewResponse, countryResponse] = await Promise.all([
      analyticsDataClient.runReport({
        property,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' },
          { name: 'sessions' },
        ],
      }),
      analyticsDataClient.runReport({
        property,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 20,
      }),
    ]);

    const overview = overviewResponse[0];
    const countryReport = countryResponse[0];

    let pageViews = 0;
    let visitors = 0;
    let sessions = 0;
    if (overview?.rows?.[0]) {
      const row = overview.rows[0];
      pageViews = parseInt(row.metricValues?.[0]?.value ?? '0', 10);
      visitors = parseInt(row.metricValues?.[1]?.value ?? '0', 10);
      sessions = parseInt(row.metricValues?.[2]?.value ?? '0', 10);
    }

    const byCountry: { country: string; users: number }[] = [];
    if (countryReport?.rows) {
      for (const row of countryReport.rows) {
        byCountry.push({
          country: row.dimensionValues?.[0]?.value ?? '(not set)',
          users: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
        });
      }
    }

    return NextResponse.json({
      configured: true,
      dateRange: { startDate, endDate },
      pageViews,
      visitors,
      sessions,
      byCountry,
    });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
