'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type ProfileProgress = {
  customerDetails: boolean;
  employmentDetails: boolean;
  businessEntities: boolean;
  propertyDetails: boolean;
  nextOfKinDetails: boolean;
  membershipDetails: boolean;
};

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
  profileProgress?: ProfileProgress;
};

type Customer = {
  id: string;
  user_id: string;
  email?: string;
  first_name?: string;
  second_name?: string;
  surname?: string;
  national_id?: string;
  kra_pin?: string;
  marital_status?: string;
  telephone?: string;
  mobile?: string;
  current_address?: string;
  created_at?: string;
  profileProgress?: ProfileProgress;
};

type User = {
  id: string;
  email: string;
  role: string;
  created_at?: string;
  phone?: string;
};

type TabType = 'memberships' | 'customers' | 'users';

const MembershipManagement = () => {
  const [activeTab, setActiveTab] = useState<TabType>('memberships');
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'memberships') {
      fetchMemberships();
    } else if (activeTab === 'customers') {
      fetchCustomers();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  // Check profile completion status for a user
  const checkProfileProgress = async (userId: string): Promise<ProfileProgress> => {
    const progress: ProfileProgress = {
      customerDetails: false,
      employmentDetails: false,
      businessEntities: false,
      propertyDetails: false,
      nextOfKinDetails: false,
      membershipDetails: false,
    };

    try {
      // Check Customer Details - at least first_name and national_id should be filled
      const { data: customerData } = await supabase
        .from('customer_details')
        .select('first_name, national_id')
        .eq('user_id', userId)
        .single();
      
      if (customerData && customerData.first_name && customerData.national_id) {
        progress.customerDetails = true;
      }

      // Check Employment Details - at least employer_name should be filled
      const { data: employmentData } = await supabase
        .from('employment_details')
        .select('employer_name')
        .eq('user_id', userId)
        .single();
      
      if (employmentData && employmentData.employer_name) {
        progress.employmentDetails = true;
      }

      // Check Business Entities - at least registered_entity should be filled
      const { data: businessData } = await supabase
        .from('business_entities')
        .select('registered_entity')
        .eq('user_id', userId)
        .single();
      
      if (businessData && businessData.registered_entity) {
        progress.businessEntities = true;
      }

      // Check Property Details - at least location should be filled
      const { data: propertyData } = await supabase
        .from('property_details')
        .select('location')
        .eq('user_id', userId)
        .single();
      
      if (propertyData && propertyData.location) {
        progress.propertyDetails = true;
      }

      // Check Next of Kin Details - at least first_name should be filled
      const { data: nextOfKinData } = await supabase
        .from('next_of_kin_details')
        .select('first_name')
        .eq('user_id', userId)
        .single();
      
      if (nextOfKinData && nextOfKinData.first_name) {
        progress.nextOfKinDetails = true;
      }

      // Check Membership Details - reference should be filled
      const { data: membershipData } = await supabase
        .from('membership_details')
        .select('reference')
        .eq('user_id', userId)
        .single();
      
      if (membershipData && membershipData.reference) {
        progress.membershipDetails = true;
      }
    } catch (error) {
      console.error('Error checking profile progress:', error);
    }

    return progress;
  };

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      setError(null);

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

      const membershipsWithUsers = await Promise.all(
        membershipData.map(async (membership: any) => {
          let userEmail = 'Unknown';
          let userProfile = null;

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
          }

          // Check profile progress
          const profileProgress = await checkProfileProgress(membership.user_id);

          return {
            id: membership.id,
            user_id: membership.user_id,
            reference: membership.reference || 'N/A',
            status: membership.status || false,
            created_at: membership.created_at,
            user_email: userEmail,
            user_profile: userProfile,
            profileProgress,
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

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: customerData, error: customerError } = await supabase
        .from('customer_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (customerError) {
        console.error('Error fetching customers:', customerError);
        setError('Failed to load customers');
        setLoading(false);
        return;
      }

      // Add profile progress for each customer
      const customersWithProgress = await Promise.all(
        (customerData || []).map(async (customer: any) => {
          const profileProgress = await checkProfileProgress(customer.user_id);
          return {
            ...customer,
            profileProgress,
          };
        })
      );

      setCustomers(customersWithProgress);
    } catch (err) {
      console.error('Error in fetchCustomers:', err);
      setError('An error occurred while loading customers');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (userError) {
        console.error('Error fetching users:', userError);
        setError('Failed to load users');
        setLoading(false);
        return;
      }

      const usersList = userData || [];
      const userIds = usersList.map((user: any) => user.id);

      let phoneByUserId: Record<string, string> = {};
      if (userIds.length > 0) {
        const { data: customerPhones, error: customerPhonesError } = await supabase
          .from('customer_details')
          .select('user_id, mobile, telephone')
          .in('user_id', userIds);

        if (customerPhonesError) {
          console.error('Error fetching customer phone details:', customerPhonesError);
        } else {
          phoneByUserId = (customerPhones || []).reduce((acc: Record<string, string>, row: any) => {
            acc[row.user_id] = row.mobile || row.telephone || '';
            return acc;
          }, {});
        }
      }

      const usersWithPhone: User[] = usersList.map((user: any) => ({
        ...user,
        phone: phoneByUserId[user.id] || '',
      }));

      setUsers(usersWithPhone);
    } catch (err) {
      console.error('Error in fetchUsers:', err);
      setError('An error occurred while loading users');
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    // Confirm deletion
    const confirmed = window.confirm(
      `Are you sure you want to delete user "${userEmail}"?\n\nThis action cannot be undone and will:\n- Remove the user from the users table\n- Remove associated auth account\n- Remove all related data`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingUserId(userId);

      // Call API route to delete user (handles both auth and database deletion)
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      // Remove user from state
      setUsers(users => users.filter(u => u.id !== userId));
      
      alert('User deleted successfully');
    } catch (err: any) {
      console.error('Error in handleDeleteUser:', err);
      alert(err.message || 'An error occurred while deleting user');
    } finally {
      setDeletingUserId(null);
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

  const getCustomerDisplayName = (customer: Customer): string => {
    const nameParts = [customer.first_name, customer.second_name, customer.surname].filter(Boolean);
    if (nameParts.length > 0) {
      return nameParts.join(' ');
    }
    return customer.email || 'Unknown Customer';
  };

  const renderMembershipsTable = () => {
    if (memberships.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Memberships Found</h3>
          <p className="text-gray-600">There are no membership registrations in the system yet.</p>
        </div>
      );
    }

    return (
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
                Profile Progress
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
                <td className="px-6 py-4">
                  {m.profileProgress ? (
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-gray-600 mb-1">
                        {Object.values(m.profileProgress).filter(Boolean).length} / 6 completed
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {[
                          { key: 'customerDetails', label: 'Customer' },
                          { key: 'employmentDetails', label: 'Employment' },
                          { key: 'businessEntities', label: 'Business' },
                          { key: 'propertyDetails', label: 'Property' },
                          { key: 'nextOfKinDetails', label: 'Next of Kin' },
                          { key: 'membershipDetails', label: 'Membership' },
                        ].map(({ key, label }) => {
                          const isCompleted = m.profileProgress?.[key as keyof ProfileProgress];
                          return (
                            <span
                              key={key}
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                isCompleted
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                              title={isCompleted ? `${label} Details: Completed` : `${label} Details: Not completed`}
                            >
                              {isCompleted ? '✓' : '○'} {label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Loading...</span>
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
    );
  };

  const renderCustomersTable = () => {
    if (customers.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Customers Found</h3>
          <p className="text-gray-600">There are no customer records in the system yet.</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                National ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                KRA PIN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map(customer => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getCustomerDisplayName(customer)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {customer.email || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {customer.national_id || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {customer.kra_pin || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {customer.mobile || customer.telephone || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {customer.profileProgress ? (
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-gray-600 mb-1">
                        {Object.values(customer.profileProgress).filter(Boolean).length} / 6 completed
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {[
                          { key: 'customerDetails', label: 'Customer' },
                          { key: 'employmentDetails', label: 'Employment' },
                          { key: 'businessEntities', label: 'Business' },
                          { key: 'propertyDetails', label: 'Property' },
                          { key: 'nextOfKinDetails', label: 'Next of Kin' },
                          { key: 'membershipDetails', label: 'Membership' },
                        ].map(({ key, label }) => {
                          const isCompleted = customer.profileProgress?.[key as keyof ProfileProgress];
                          return (
                            <span
                              key={key}
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                isCompleted
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                              title={isCompleted ? `${label} Details: Completed` : `${label} Details: Not completed`}
                            >
                              {isCompleted ? '✓' : '○'} {label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Loading...</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : 'N/A'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderUsersTable = () => {
    if (users.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Users Found</h3>
          <p className="text-gray-600">There are no users in the system yet.</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono text-gray-900 truncate max-w-xs">
                    {user.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.phone || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role || 'user'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteUser(user.id, user.email)}
                    disabled={deletingUserId === user.id}
                    className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                      deletingUserId === user.id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                    title="Delete user"
                  >
                    {deletingUserId === user.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Membership Management</h1>
          <p className="text-gray-600 mt-2">Manage memberships, customers, and users</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('memberships')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'memberships'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Memberships
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'customers'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Users
          </button>
        </nav>
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
      ) : (
        <>
          {activeTab === 'memberships' && renderMembershipsTable()}
          {activeTab === 'customers' && renderCustomersTable()}
          {activeTab === 'users' && renderUsersTable()}
        </>
      )}
    </div>
  );
};

export default MembershipManagement;

