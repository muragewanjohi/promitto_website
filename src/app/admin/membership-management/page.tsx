'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Membership = {
  id: string;
  user_id: string;
  reference: string;
  status: boolean;
  customer_details: {
    first_name: string;
    second_name: string;
    surname: string;
  } | null;
};

const MembershipManagement = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberships = async () => {
      const { data, error } = await supabase
        .from('membership_details')
        .select('id, user_id, reference, status, customer_details(first_name, second_name, surname)')
        .order('id', { ascending: true });

      if (data) {
        setMemberships(data.map((m: any) => ({
          ...m,
          customer_details: Array.isArray(m.customer_details) ? m.customer_details[0] || null : m.customer_details || null,
        })));
      }
      setLoading(false);
    };
    fetchMemberships();
  }, []);

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    const { error } = await supabase
      .from('membership_details')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setMemberships(memberships =>
        memberships.map(m =>
          m.id === id ? { ...m, status: newStatus } : m
        )
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E40AF] mb-6">Membership Management</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2 text-left">User Name</th>
              <th className="p-2 text-left">Reference</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map(m => (
              <tr key={m.id}>
                <td className="p-2">
                  {m.customer_details
                    ? `${m.customer_details.first_name} ${m.customer_details.second_name} ${m.customer_details.surname}`
                    : 'Unknown'}
                </td>
                <td className="p-2">{m.reference}</td>
                <td className="p-2">
                  {m.status ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="p-2">
                  <button
                    className={`px-3 py-1 rounded text-white ${m.status ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
                    onClick={() => handleStatusChange(m.id, !m.status)}
                  >
                     {m.status ? 'Inactive' : 'Click to confirm Payment'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MembershipManagement; 