'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Inquiry = {
  id: string;
  user_id?: string;
  property_id?: string;
  message?: string;
  user_email?: string;
  user_phone?: string;
  created_at?: string;
  properties?: Array<{
    id: string;
    name?: string;
    property_types?: Array<{
      name?: string;
    }>;
  }>;
};

const EnquiriesContent = () => {
  const searchParams = useSearchParams();
  const filter = searchParams?.get('filter') || 'all';
  const [enquiries, setEnquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, [filter]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('inquiries')
        .select(`
          id,
          user_id,
          property_id,
          message,
          user_email,
          user_phone,
          created_at,
          properties (
            id,
            name,
            property_types (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      // Apply filter if needed
      if (filter === 'this-month') {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        query = query.gte('created_at', startOfMonth.toISOString());
      }

      const { data: enquiryData, error: enquiryError } = await query;

      if (enquiryError) {
        console.error('Error fetching enquiries:', enquiryError);
        setError('Failed to load enquiries');
        setLoading(false);
        return;
      }

      setEnquiries(enquiryData || []);
    } catch (err) {
      console.error('Error in fetchEnquiries:', err);
      setError('An error occurred while loading enquiries');
    } finally {
      setLoading(false);
    }
  };

  const getPropertyName = (inquiry: Inquiry): string => {
    if (inquiry.properties && inquiry.properties.length > 0) {
      return inquiry.properties[0].name || 'Unknown Property';
    }
    return 'Unknown Property';
  };

  const getPropertyType = (inquiry: Inquiry): string => {
    if (inquiry.properties && inquiry.properties.length > 0) {
      const property = inquiry.properties[0];
      if (property.property_types && property.property_types.length > 0) {
        return property.property_types[0].name || 'Unknown';
      }
    }
    return 'Unknown';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-gray-600 mt-2">
            {filter === 'this-month' 
              ? 'Enquiries received this month' 
              : 'All property enquiries'}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/enquiries"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Enquiries
          </Link>
          <Link
            href="/admin/enquiries?filter=this-month"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'this-month'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Month
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Enquiries Found</h3>
          <p className="text-gray-600">
            {filter === 'this-month' 
              ? 'No enquiries received this month yet.' 
              : 'There are no enquiries in the system yet.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.map(inquiry => {
                const isExpanded = expandedInquiryId === inquiry.id;
                return (
                  <React.Fragment key={inquiry.id}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setExpandedInquiryId(isExpanded ? null : inquiry.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {getPropertyName(inquiry)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getPropertyType(inquiry)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {inquiry.user_email || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {inquiry.user_phone || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate" title={inquiry.message || ''}>
                          {inquiry.message || 'No message'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-6">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Property Details</h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p><span className="font-medium">Name:</span> {getPropertyName(inquiry)}</p>
                                  <p><span className="font-medium">Type:</span> {getPropertyType(inquiry)}</p>
                                  {inquiry.property_id && (
                                    <p><span className="font-medium">Property ID:</span> {inquiry.property_id}</p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Contact Information</h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p><span className="font-medium">Email:</span> {inquiry.user_email || 'N/A'}</p>
                                  <p><span className="font-medium">Phone:</span> {inquiry.user_phone || 'N/A'}</p>
                                  {inquiry.user_id && (
                                    <p><span className="font-medium">User ID:</span> <span className="font-mono text-xs">{inquiry.user_id}</span></p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Message</h4>
                              <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                  {inquiry.message || 'No message provided'}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Timing</h4>
                              <div className="text-sm text-gray-600">
                                <p><span className="font-medium">Created:</span> {inquiry.created_at ? new Date(inquiry.created_at).toLocaleString() : 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const EnquiriesPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <EnquiriesContent />
    </Suspense>
  );
};

export default EnquiriesPage;

