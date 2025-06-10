'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface MembershipDetailsProps {
  showSaveButton?: boolean;
}

const initialState = {
  reference: '',
  status: false,
};

const paymentTable = (
  <div className="overflow-x-auto mt-6">
    <table className="min-w-full border border-[#1E40AF]">
      <thead>
        <tr className="bg-blue-50">
          <th className="border border-[#1E40AF] px-2 py-1">BANK</th>
          <th className="border border-[#1E40AF] px-2 py-1">BRANCH</th>
          <th className="border border-[#1E40AF] px-2 py-1">BRANCH CODE</th>
          <th className="border border-[#1E40AF] px-2 py-1">SWIFT CODE</th>
          <th className="border border-[#1E40AF] px-2 py-1">ACCOUNT NUMBER</th>
          <th className="border border-[#1E40AF] px-2 py-1">PAYBILL</th>
          <th className="border border-[#1E40AF] px-2 py-1">ACCOUNT TYPE</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-yellow-200 font-bold">
          <td className="border border-[#1E40AF] px-2 py-1">KCB</td>
          <td className="border border-[#1E40AF] px-2 py-1">BIASHARA STREET</td>
          <td className="border border-[#1E40AF] px-2 py-1">01263</td>
          <td className="border border-[#1E40AF] px-2 py-1">KCBLKENX</td>
          <td className="border border-[#1E40AF] px-2 py-1">1303131978</td>
          <td className="border border-[#1E40AF] px-2 py-1">522522</td>
          <td className="border border-[#1E40AF] px-2 py-1">KES</td>
        </tr>
        <tr>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1">1311843140</td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1">USD</td>
        </tr>
        <tr>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1">1311843205</td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1">GBP</td>
        </tr>
        <tr className="bg-yellow-200 font-bold">
          <td className="border border-[#1E40AF] px-2 py-1">EQUITY</td>
          <td className="border border-[#1E40AF] px-2 py-1">FOURWAYS</td>
          <td className="border border-[#1E40AF] px-2 py-1">68002</td>
          <td className="border border-[#1E40AF] px-2 py-1">EQBLKENA</td>
          <td className="border border-[#1E40AF] px-2 py-1">0010283176854</td>
          <td className="border border-[#1E40AF] px-2 py-1">247247</td>
          <td className="border border-[#1E40AF] px-2 py-1">KES</td>
        </tr>
        <tr>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1">0010284482698</td>
          <td className="border border-[#1E40AF] px-2 py-1"></td>
          <td className="border border-[#1E40AF] px-2 py-1">USD</td>
        </tr>
        <tr className="bg-yellow-200 font-bold">
          <td className="border border-[#1E40AF] px-2 py-1">STANBIC</td>
          <td className="border border-[#1E40AF] px-2 py-1">KENYATTA AVENUE</td>
          <td className="border border-[#1E40AF] px-2 py-1">002</td>
          <td className="border border-[#1E40AF] px-2 py-1">SBICKENX</td>
          <td className="border border-[#1E40AF] px-2 py-1">00100010816909</td>
          <td className="border border-[#1E40AF] px-2 py-1">600100</td>
          <td className="border border-[#1E40AF] px-2 py-1">KES</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const MembershipDetails: React.FC<MembershipDetailsProps> = ({ showSaveButton }) => {
  const { user, userProfile } = useAuth();
  const [form, setForm] = useState({ ...initialState });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const fetchDetails = async () => {
        const { data } = await supabase
          .from('membership_details')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (data) {
          setForm({
            reference: data.reference || '',
            status: !!data.status,
          });
        }
      };
      fetchDetails();
    }
  }, [user]);

  if (!user) {
    return <div className="text-[#1E40AF]">Loading...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, reference: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    const { error } = await supabase
      .from('membership_details')
      .upsert([
        {
          user_id: user.id,
          reference: form.reference,
          status: form.status,
        },
      ], { onConflict: 'user_id' });
    setSaving(false);
    if (!error) setSuccess(true);
  };

  const userName = userProfile ? `${userProfile.email}` : user?.email || '';

  return (
    <section className="bg-white rounded-lg shadow p-6 border border-gray-200 relative">
      <h2 className="text-2xl font-semibold text-[#1E40AF] mb-4 border-b border-[#1E40AF] pb-2">Membership Details</h2>
      <div className="mb-4 text-[#1E40AF]">
        <p className="mb-2">Membership Fee: <span className="font-bold text-[#F59E0B]">Ksh 30,000</span></p>
        <p className="mb-2">Please pay using the details below and enter your payment reference.</p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-[#1E40AF]">
          <span className="text-xl">◆</span>
          <span className="underline">SAFARICOM</span>
        </div>
        <div className="flex flex-col md:flex-row md:gap-12 mt-2 md:mt-0 text-[#1E40AF]">
          <span>PAYBILL NO – <span className="font-bold">6746402</span></span>
          <span>ACCOUNT NUMBER - <span className="font-bold">ID NO or PASSPORT NO</span></span>
        </div>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#1E40AF]" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block font-medium">Reference Details:</label>
          <input name="reference" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.reference} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Membership Status:</label>
          <input className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 text-gray-400 cursor-not-allowed" value={form.status ? 'Active' : 'Inactive'} readOnly tabIndex={-1} />
        </div>
      </form>
      {paymentTable}
      {showSaveButton && (
        <div className="flex justify-end mt-4">
          <button type="button" className="bg-[#1E40AF] text-white px-6 py-2 rounded hover:bg-[#F59E0B] transition-colors" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}
      {success && <div className="text-green-600 mt-2">Saved successfully!</div>}
    </section>
  );
};

export default MembershipDetails; 