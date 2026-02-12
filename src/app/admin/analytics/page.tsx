'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  BarChart3,
  Users,
  Globe,
  FileText,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

type AnalyticsData = {
  configured: boolean;
  message?: string;
  dateRange?: { startDate: string; endDate: string };
  pageViews?: number;
  visitors?: number;
  sessions?: number;
  byCountry?: { country: string; users: number }[];
};

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setError('You must be signed in to view analytics.');
        setData(null);
        return;
      }

      const res = await fetch('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.message || 'Failed to load analytics');
        setData(null);
        return;
      }

      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 animate-spin">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Loading analytics...</h2>
          <p className="text-gray-500 mt-2">Fetching data from Google Analytics</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-red-800">Error</h2>
          <p className="text-red-700 mt-1">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <RefreshCw className="w-4 h-4" /> Try again
          </button>
        </div>
      </div>
    );
  }

  if (data && !data.configured) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <AlertCircle className="w-12 h-12 text-amber-600 mb-3" />
          <h1 className="text-xl font-bold text-gray-900">Analytics not configured</h1>
          <p className="text-gray-700 mt-2">{data.message}</p>
          <p className="text-gray-600 mt-4 text-sm">
            See <code className="bg-amber-100 px-1 rounded">docs/technical/google-analytics-setup.md</code> for
            setting up Google Analytics (GA4) and the service account so this page can show page views, visitors, and
            country breakdown.
          </p>
          <button
            onClick={fetchAnalytics}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <RefreshCw className="w-4 h-4" /> Check again
          </button>
        </div>
      </div>
    );
  }

  const dateRange = data?.dateRange;
  const dateRangeLabel = dateRange
    ? `${dateRange.startDate} to ${dateRange.endDate}`
    : 'Last 30 days';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Website Analytics</h1>
              <p className="text-gray-600 text-sm">{dateRangeLabel}</p>
            </div>
          </div>
          <button
            onClick={fetchAnalytics}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {data?.pageViews?.toLocaleString() ?? 0}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Page views</h3>
            <p className="text-sm text-gray-500">Total screen page views</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {data?.visitors?.toLocaleString() ?? 0}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Visitors</h3>
            <p className="text-sm text-gray-500">Active users</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {data?.sessions?.toLocaleString() ?? 0}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Sessions</h3>
            <p className="text-sm text-gray-500">Total sessions</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Visitors by country</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-sm text-gray-600">
                  <th className="px-6 py-3 font-medium">Country</th>
                  <th className="px-6 py-3 font-medium text-right">Users</th>
                </tr>
              </thead>
              <tbody>
                {(data?.byCountry && data.byCountry.length > 0) ? (
                  data.byCountry.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-gray-100 hover:bg-gray-50/50"
                    >
                      <td className="px-6 py-3 text-gray-900">{row.country}</td>
                      <td className="px-6 py-3 text-right font-medium text-gray-700">
                        {row.users.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                      No country data in this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
