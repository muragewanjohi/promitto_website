'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import CustomerDetails from '@/components/Profile/CustomerDetails';
import EmploymentDetails from '@/components/Profile/EmploymentDetails';
import BusinessEntities from '@/components/Profile/BusinessEntities';
import PropertyDetails from '@/components/Profile/PropertyDetails';
import NextOfKinDetails from '@/components/Profile/NextOfKinDetails';
import MembershipDetails from '@/components/Profile/MembershipDetails';

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
const ROWS_PER_PAGE = 10;

const customerProfileTabs = [
  { label: 'Customer Details', component: CustomerDetails },
  { label: 'Employment Details', component: EmploymentDetails },
  { label: 'Business Entities', component: BusinessEntities },
  { label: 'Property Details', component: PropertyDetails },
  { label: 'Next of Kin Details', component: NextOfKinDetails },
  { label: 'Membership Details', component: MembershipDetails },
];

const MembershipManagement = () => {
  const [activeTab, setActiveTab] = useState<TabType>('memberships');
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [searchByTab, setSearchByTab] = useState<Record<TabType, string>>({
    memberships: '',
    customers: '',
    users: '',
  });
  const [pageByTab, setPageByTab] = useState<Record<TabType, number>>({
    memberships: 1,
    customers: 1,
    users: 1,
  });

  const [viewingCustomerUserId, setViewingCustomerUserId] = useState<string | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState(0);

  useEffect(() => {
    if (activeTab === 'memberships') {
      fetchMemberships();
    } else if (activeTab === 'customers') {
      fetchCustomers();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  useEffect(() => {
    setPageByTab((prev) => ({
      ...prev,
      [activeTab]: 1,
    }));
  }, [activeTab, searchByTab]);

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

  const searchTerm = searchByTab[activeTab].trim().toLowerCase();

  const filteredMemberships = useMemo(() => {
    if (!searchTerm) {
      return memberships;
    }

    return memberships.filter((membership) => {
      const status = membership.status ? 'active' : 'inactive';
      return [
        getUserDisplayName(membership),
        membership.user_email || '',
        membership.reference || '',
        status,
      ]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm);
    });
  }, [memberships, searchTerm]);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) {
      return customers;
    }

    return customers.filter((customer) =>
      [
        getCustomerDisplayName(customer),
        customer.email || '',
        customer.national_id || '',
        customer.kra_pin || '',
        customer.mobile || '',
        customer.telephone || '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm)
    );
  }, [customers, searchTerm]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users;
    }

    return users.filter((user) =>
      [user.id, user.email, user.phone || '', user.role || '']
        .join(' ')
        .toLowerCase()
        .includes(searchTerm)
    );
  }, [users, searchTerm]);

  const paginatedMemberships = useMemo(() => {
    const currentPage = pageByTab.memberships;
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredMemberships.slice(start, start + ROWS_PER_PAGE);
  }, [filteredMemberships, pageByTab.memberships]);

  const paginatedCustomers = useMemo(() => {
    const currentPage = pageByTab.customers;
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredCustomers.slice(start, start + ROWS_PER_PAGE);
  }, [filteredCustomers, pageByTab.customers]);

  const paginatedUsers = useMemo(() => {
    const currentPage = pageByTab.users;
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredUsers.slice(start, start + ROWS_PER_PAGE);
  }, [filteredUsers, pageByTab.users]);

  const getFilteredCountForTab = (tab: TabType) => {
    if (tab === 'memberships') return filteredMemberships.length;
    if (tab === 'customers') return filteredCustomers.length;
    return filteredUsers.length;
  };

  const getCurrentPageForTab = (tab: TabType) => pageByTab[tab];

  const getTotalPagesForTab = (tab: TabType) =>
    Math.max(1, Math.ceil(getFilteredCountForTab(tab) / ROWS_PER_PAGE));

  const handlePageChange = (tab: TabType, nextPage: number) => {
    const totalPages = getTotalPagesForTab(tab);
    const clampedPage = Math.min(Math.max(nextPage, 1), totalPages);
    setPageByTab((prev) => ({
      ...prev,
      [tab]: clampedPage,
    }));
  };

  const renderPagination = (tab: TabType) => {
    const totalItems = getFilteredCountForTab(tab);
    const totalPages = getTotalPagesForTab(tab);
    const currentPage = getCurrentPageForTab(tab);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ROWS_PER_PAGE, totalItems);

    return (
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          Showing {startItem}-{endItem} of {totalItems}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(tab, currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => handlePageChange(tab, currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderMembershipsTable = () => {
    if (filteredMemberships.length === 0) {
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
            {paginatedMemberships.map(m => (
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
    if (filteredCustomers.length === 0) {
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
      <div className="bg-white rounded-lg shadow overflow-x-auto">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                View Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCustomers.map(customer => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setViewingCustomerUserId(customer.user_id)}
                    className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-xs font-semibold rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderUsersTable = () => {
    if (filteredUsers.length === 0) {
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
            {paginatedUsers.map(user => (
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

  const renderCustomerProfileView = () => {
    const ActiveComponent = customerProfileTabs[activeProfileTab].component;
    const customer = customers.find(c => c.user_id === viewingCustomerUserId);
    const displayName = customer
      ? `${customer.first_name || ''} ${customer.second_name || ''} ${customer.surname || ''}`.trim()
      : '';

    return (
      <div className="space-y-6">
        {/* Back Button and Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setViewingCustomerUserId(null);
                setActiveProfileTab(0);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Customers
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Customer Profile: {displayName || 'Loading...'}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Viewing details input by the customer
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
          <nav className="flex flex-wrap" aria-label="Profile Tabs">
            {customerProfileTabs.map((tab, idx) => (
              <button
                key={tab.label}
                className={`flex-1 px-4 py-3 text-xs font-semibold focus:outline-none transition-all duration-300 border-b-2 ${
                  activeProfileTab === idx
                    ? 'text-primary border-primary bg-primary/5'
                    : 'text-gray-600 border-transparent hover:text-primary hover:bg-gray-50'
                }`}
                onClick={() => setActiveProfileTab(idx)}
                type="button"
              >
                <span className="truncate block">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6 md:p-8">
          <ActiveComponent showSaveButton={false} userId={viewingCustomerUserId || undefined} />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {viewingCustomerUserId ? (
        renderCustomerProfileView()
      ) : (
        <>
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

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  value={searchByTab[activeTab]}
                  onChange={(event) =>
                    setSearchByTab((prev) => ({
                      ...prev,
                      [activeTab]: event.target.value,
                    }))
                  }
                  placeholder={
                    activeTab === 'memberships'
                      ? 'Search by name, email, reference, or status'
                      : activeTab === 'customers'
                        ? 'Search by name, email, national ID, KRA PIN, or phone'
                        : 'Search by user ID, email, role, or phone'
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {activeTab === 'memberships' && (
                <>
                  {renderMembershipsTable()}
                  {renderPagination('memberships')}
                </>
              )}
              {activeTab === 'customers' && (
                <>
                  {renderCustomersTable()}
                  {renderPagination('customers')}
                </>
              )}
              {activeTab === 'users' && (
                <>
                  {renderUsersTable()}
                  {renderPagination('users')}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MembershipManagement;

