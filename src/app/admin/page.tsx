'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
    return <div>Loading metrics...</div>;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Total Customers */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-5xl font-bold text-[#1E40AF]">{metrics.totalCustomers}</span>
        <span className="mt-2 text-lg text-gray-700">Total Customers</span>
      </div>
      {/* New Customers This Month */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-5xl font-bold text-[#F59E0B]">{metrics.newCustomersThisMonth}</span>
        <span className="mt-2 text-lg text-gray-700">New Customers This Month</span>
      </div>
      {/* Completed Memberships */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-5xl font-bold text-green-600">{metrics.completedMemberships}</span>
        <span className="mt-2 text-lg text-gray-700">Completed Memberships</span>
      </div>
      {/* Uncompleted Memberships */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-5xl font-bold text-red-600">{metrics.uncompletedMemberships}</span>
        <span className="mt-2 text-lg text-gray-700">Uncompleted Memberships</span>
      </div>
      {/* Enquiries This Month */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-5xl font-bold text-purple-600">{metrics.enquiriesThisMonth}</span>
        <span className="mt-2 text-lg text-gray-700">Enquiries This Month</span>
      </div>
      {/* Inquiries per Property Type as Styled Bar Graph */}
      {metrics.inquiriesPerType && (
        <div className="col-span-full bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4 text-[#1E40AF]">Inquiries per Property Type</h3>
          <div className="space-y-4">
            {Object.entries(metrics.inquiriesPerType).map(([type, count], idx) => (
              <div key={type} className="flex items-center justify-between">
                {/* Left: colored dot and type name */}
                <div className="flex items-center gap-2 min-w-[120px]">
                  <span className={`w-3 h-3 rounded-full ${barColors[idx % barColors.length]}`}></span>
                  <span className="font-medium">{type}</span>
                </div>
                {/* Right: value and bar */}
                <div className="flex-1 flex items-center gap-2">
                  <span className="font-semibold text-gray-700 min-w-[60px] text-right">
                    {count}
                  </span>
                  <div className="relative flex-1 h-3 bg-gray-200 rounded">
                    <div
                      className={`${barColors[idx % barColors.length]} h-3 rounded`}
                      style={{
                        width: `${(count / maxCount) * 100}%`,
                        minWidth: count > 0 ? '1.5rem' : 0,
                        transition: 'width 0.5s',
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
        <div className="col-span-full bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-xl font-bold mb-4 text-[#1E40AF]">Inquiries per Month</h3>
          <div className="w-full overflow-x-auto">
            <svg width="100%" height="120" viewBox="0 0 480 120" className="block">
              {/* X axis labels */}
              {Array.from({ length: 12 }).map((_, i) => (
                <text
                  key={i}
                  x={40 * i + 20}
                  y={115}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#64748b"
                >
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                </text>
              ))}
              {/* Line path */}
              <polyline
                fill="none"
                stroke="#1E40AF"
                strokeWidth="3"
                points={
                  metrics.monthlyInquiryCounts
                    .map((count, i) => `${40 * i + 20},${100 - (count / Math.max(...metrics.monthlyInquiryCounts, 1)) * 80}`)
                    .join(' ')
                }
              />
              {/* Dots */}
              {metrics.monthlyInquiryCounts.map((count, i) => (
                <circle
                  key={i}
                  cx={40 * i + 20}
                  cy={100 - (count / Math.max(...metrics.monthlyInquiryCounts, 1)) * 80}
                  r="4"
                  fill="#1E40AF"
                />
              ))}
              {/* Y axis (optional) */}
              <text x="0" y="105" fontSize="12" fill="#64748b">0</text>
              <text x="0" y="25" fontSize="12" fill="#64748b">{Math.max(...metrics.monthlyInquiryCounts, 1)}</text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMetrics; 