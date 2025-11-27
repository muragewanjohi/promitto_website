'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const AdminMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalCustomers: 0,
    newCustomersThisMonth: 0,
    completedMemberships: 0,
    uncompletedMemberships: 0,
    enquiriesThisMonth: 0,
    inquiriesPerType: {} as Record<string, number>,
    loading: true,
    monthlyInquiryCounts: Array(12).fill(0),
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      // Total customers
      const { data: customerDetails } = await supabase
        .from('customer_details')
        .select('*');
      const totalCustomers = customerDetails?.length || 0;

      // New customers this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: newCustomers } = await supabase
        .from('customer_details')
        .select('*')
        .gte('created_at', startOfMonth.toISOString());
      const newCustomersThisMonth = newCustomers?.length || 0;

      // Completed memberships
      const { data: completedMemberships } = await supabase
        .from('membership_details')
        .select('*')
        .eq('status', true);
      const completedMembershipsCount = completedMemberships?.length || 0;

      // Uncompleted memberships
      const { data: uncompletedMemberships } = await supabase
        .from('membership_details')
        .select('*')
        .eq('status', false);
      const uncompletedMembershipsCount = uncompletedMemberships?.length || 0;

      // Enquiries this month
      const { data: enquiries } = await supabase
        .from('inquiries')
        .select('*')
        .gte('created_at', startOfMonth.toISOString());
      const enquiriesThisMonth = enquiries?.length || 0;

      // All property types
      const { data: propertyTypes } = await supabase
        .from('property_types')
        .select('id, name');

      // Inquiries per property type
      const { data: inquiries } = await supabase
        .from('inquiries')
        .select('id, property_id, properties(id, type_id, property_types(name))');

      // Count inquiries per property type
      const inquiriesPerType: Record<string, number> = {};
      if (propertyTypes) {
        propertyTypes.forEach(pt => {
          inquiriesPerType[pt.name] = 0; // initialize all to 0
        });
      }
      if (inquiries) {
        inquiries.forEach(inquiry => {
          const typeName = inquiry.properties?.[0]?.property_types?.[0]?.name || 'Unknown';
          if (typeName in inquiriesPerType) {
            inquiriesPerType[typeName] += 1;
          } else {
            inquiriesPerType[typeName] = 1;
          }
        });
      }

      // 1. Get all inquiries for the current year
      const currentYear = new Date().getFullYear();
      const { data: yearlyInquiries } = await supabase
        .from('inquiries')
        .select('id, created_at')
        .gte('created_at', `${currentYear}-01-01`)
        .lte('created_at', `${currentYear}-12-31`);

      // 2. Aggregate by month
      const monthlyCounts = Array(12).fill(0); // Jan to Dec
      if (yearlyInquiries) {
        yearlyInquiries.forEach(inquiry => {
          const month = new Date(inquiry.created_at).getMonth(); // 0 = Jan
          monthlyCounts[month]++;
        });
      }

      setMetrics(prev => ({
        ...prev,
        totalCustomers,
        newCustomersThisMonth,
        completedMemberships: completedMembershipsCount,
        uncompletedMemberships: uncompletedMembershipsCount,
        enquiriesThisMonth,
        inquiriesPerType,
        loading: false,
        monthlyInquiryCounts: monthlyCounts,
      }));
    };

    fetchMetrics();
  }, []);

  if (metrics.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 animate-spin">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Dashboard...</h2>
          <p className="text-gray-500 mt-2">Fetching your metrics data</p>
        </div>
      </div>
    );
  }

  // Define a color palette (add more if you have more property types)
  const barColors = [
    'bg-blue-600',      // 0
    'bg-teal-400',      // 1
    'bg-yellow-400',    // 2
    'bg-orange-400',    // 3
    'bg-purple-400',    // 4
    'bg-pink-400',      // 5
    'bg-green-500',     // 6
    'bg-red-400',       // 7
    'bg-indigo-400',    // 8
    'bg-gray-500',      // 9
  ];

  // For bar graph scaling
  const maxCount = Math.max(...Object.values(metrics.inquiriesPerType), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Real-time metrics and insights</p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {/* Total Customers */}
          <Link href="/admin/customers" className="block">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{metrics.totalCustomers}</div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Customers</h3>
              <p className="text-sm text-gray-600 mt-1">Registered users</p>
            </div>
          </Link>

          {/* New Customers This Month */}
          <Link href="/admin/customers?filter=this-month" className="block">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">{metrics.newCustomersThisMonth}</div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">New Customers</h3>
              <p className="text-sm text-gray-600 mt-1">Recent registrations</p>
            </div>
          </Link>

          {/* Completed Memberships */}
          <Link href="/admin/membership-management" className="block">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{metrics.completedMemberships}</div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Memberships</h3>
              <p className="text-sm text-gray-600 mt-1">Active members</p>
            </div>
          </Link>

          {/* Uncompleted Memberships */}
          <Link href="/admin/membership-management" className="block">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{metrics.uncompletedMemberships}</div>
                  <div className="text-sm text-gray-500">Pending</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Memberships</h3>
              <p className="text-sm text-gray-600 mt-1">Incomplete profiles</p>
            </div>
          </Link>

          {/* Enquiries This Month */}
          <Link href="/admin/enquiries?filter=this-month" className="block">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{metrics.enquiriesThisMonth}</div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Enquiries</h3>
              <p className="text-sm text-gray-600 mt-1">Property inquiries</p>
            </div>
          </Link>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inquiries per Property Type as Styled Bar Graph */}
          {metrics.inquiriesPerType && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Inquiries per Property Type</h3>
                  <p className="text-gray-600">Distribution of property inquiries</p>
                </div>
              </div>
              <div className="space-y-4">
                {Object.entries(metrics.inquiriesPerType).map(([type, count], idx) => (
                  <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    {/* Left: colored dot and type name */}
                    <div className="flex items-center gap-3 min-w-[140px]">
                      <span className={`w-4 h-4 rounded-full ${barColors[idx % barColors.length]} shadow-sm`}></span>
                      <span className="font-medium text-gray-900">{type}</span>
                    </div>
                    {/* Right: value and bar */}
                    <div className="flex-1 flex items-center gap-4 ml-4">
                      <span className="font-bold text-gray-900 min-w-[40px] text-right">
                        {count}
                      </span>
                      <div className="relative flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`${barColors[idx % barColors.length]} h-4 rounded-full shadow-sm`}
                          style={{
                            width: `${(count / maxCount) * 100}%`,
                            minWidth: count > 0 ? '8px' : 0,
                            transition: 'width 0.8s ease-out',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yearly Inquiry Trend Line Chart */}
          {metrics.monthlyInquiryCounts && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Monthly Inquiry Trends</h3>
                  <p className="text-gray-600">Inquiry patterns throughout the year</p>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <svg width="100%" height="200" viewBox="0 0 600 200" className="block">
                  {/* Grid lines */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <line
                      key={i}
                      x1="60"
                      y1={40 + i * 30}
                      x2="540"
                      y2={40 + i * 30}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}
                  
                                     {/* X axis labels */}
                   {Array.from({ length: 12 }).map((_, i) => (
                     <text
                       key={i}
                       x={60 + i * 40}
                       y={190}
                       textAnchor="middle"
                       fontSize="12"
                       fill="#6b7280"
                       className="font-medium"
                     >
                       {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                     </text>
                   ))}
                  
                  {/* Line path */}
                  <polyline
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={
                      metrics.monthlyInquiryCounts
                        .map((count, i) => `${60 + i * 40},${160 - (count / Math.max(...metrics.monthlyInquiryCounts, 1)) * 120}`)
                        .join(' ')
                    }
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Dots */}
                  {metrics.monthlyInquiryCounts.map((count, i) => (
                    <circle
                      key={i}
                      cx={60 + i * 40}
                      cy={160 - (count / Math.max(...metrics.monthlyInquiryCounts, 1)) * 120}
                      r="5"
                      fill="white"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      className="hover:r-6 transition-all duration-200"
                    />
                  ))}
                  
                  {/* Y axis labels */}
                  <text x="30" y="170" fontSize="12" fill="#6b7280" className="font-medium">0</text>
                  <text x="30" y="50" fontSize="12" fill="#6b7280" className="font-medium">{Math.max(...metrics.monthlyInquiryCounts, 1)}</text>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMetrics; 