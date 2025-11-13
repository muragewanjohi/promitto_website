'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Membership = {
  id: string;
  user_id: string;
  reference: string;
  status: boolean;
  created_at?: string;
  user_email?: string;
  user_profile?: {
    first_name?: string;
    second_name?: string;
    surname?: string;
  } | null;
};

const MembershipManagement = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch membership details
        const { data: membershipData, error: membershipError } = await supabase
          .from('membership_details')
          .select('*')
          .order('created_at', { ascending: false });

        if (membershipError) {
          console.error('Error fetching memberships:', membershipError);
          setError('Failed to load memberships');
          setLoading(false);
          return;
        }

        if (!membershipData || membershipData.length === 0) {
          setMemberships([]);
          setLoading(false);
          return;
        }

        // Fetch user emails for each membership
        const membershipsWithUsers = await Promise.all(
          membershipData.map(async (membership: any) => {
            let userEmail = 'Unknown';
            let userProfile = null;

            // Try to get user information from users table
            try {
              const { data: userData } = await supabase
                .from('users')
                .select('email, first_name, second_name, surname')
                .eq('id', membership.user_id)
                .single();

              if (userData) {
                userEmail = userData.email || userEmail;
                userProfile = {
                  first_name: userData.first_name,
                  second_name: userData.second_name,
                  surname: userData.surname,
                };
              }
            } catch (userError) {
              console.error('Error fetching user:', userError);
              // Fallback: try to get email from auth if available
              try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user && user.id === membership.user_id) {
                  userEmail = user.email || userEmail;
                }
              } catch (authError) {
                console.error('Error fetching auth user:', authError);
              }
            }

            return {
              id: membership.id,
              user_id: membership.user_id,
              reference: membership.reference || 'N/A',
              status: membership.status || false,
              created_at: membership.created_at,
              user_email: userEmail,
              user_profile: userProfile,
            };
          })
        );

        setMemberships(membershipsWithUsers);
      } catch (err) {
        console.error('Error in fetchMemberships:', err);
        setError('An error occurred while loading memberships');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('membership_details')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
        alert('Failed to update membership status');
        return;
      }

      setMemberships(memberships =>
        memberships.map(m =>
          m.id === id ? { ...m, status: newStatus } : m
        )
      );
    } catch (err) {
      console.error('Error in handleStatusChange:', err);
      alert('An error occurred while updating status');
    }
  };

  const getUserDisplayName = (membership: Membership): string => {
    if (membership.user_profile) {
      const { first_name, second_name, surname } = membership.user_profile;
      const nameParts = [first_name, second_name, surname].filter(Boolean);
      if (nameParts.length > 0) {
        return nameParts.join(' ');
      }
    }
    return membership.user_email || 'Unknown User';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Membership Management</h1>
          <p className="text-gray-600 mt-2">Manage member registrations and payment confirmations</p>
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
            <p className="mt-4 text-gray-600">Loading memberships...</p>
          </div>
        </div>
      ) : memberships.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Memberships Found</h3>
          <p className="text-gray-600">There are no membership registrations in the system yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memberships.map(m => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {getUserDisplayName(m)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {m.user_email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {m.reference}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {m.status ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                        m.status
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                      onClick={() => handleStatusChange(m.id, !m.status)}
                    >
                      {m.status ? 'Deactivate' : 'Confirm Payment'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MembershipManagement;
