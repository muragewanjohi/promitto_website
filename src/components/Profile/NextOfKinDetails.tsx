'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface NextOfKinDetailsProps {
  showSaveButton?: boolean;
}

const initialState = {
  firstName: '',
  secondName: '',
  surname: '',
  nationalId: '',
  occupation: '',
  postalAddress: '',
  postalCode: '',
  email: '',
  telephone: '',
  mobile: '',
};

const NextOfKinDetails: React.FC<NextOfKinDetailsProps> = ({ showSaveButton }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({ ...initialState });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const fetchDetails = async () => {
        const { data } = await supabase
          .from('next_of_kin_details')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (data) {
          setForm({
            firstName: data.first_name || '',
            secondName: data.second_name || '',
            surname: data.surname || '',
            nationalId: data.national_id || '',
            occupation: data.occupation || '',
            postalAddress: data.postal_address || '',
            postalCode: data.postal_code || '',
            email: data.email || '',
            telephone: data.telephone || '',
            mobile: data.mobile || '',
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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    const { error } = await supabase
      .from('next_of_kin_details')
      .upsert([
        {
          user_id: user.id,
          first_name: form.firstName,
          second_name: form.secondName,
          surname: form.surname,
          national_id: form.nationalId,
          occupation: form.occupation,
          postal_address: form.postalAddress,
          postal_code: form.postalCode,
          email: form.email,
          telephone: form.telephone,
          mobile: form.mobile,
        },
      ], { onConflict: 'user_id' });
    setSaving(false);
    if (!error) setSuccess(true);
  };

  return (
    <section className="bg-white rounded-lg shadow p-6 border border-gray-200 relative">
      <h2 className="text-2xl font-semibold text-[#1E40AF] mb-4 border-b border-[#1E40AF] pb-2">Next of Kin Details</h2>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#1E40AF]" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block font-medium">First Name:</label>
          <input name="firstName" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.firstName} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Second Name:</label>
          <input name="secondName" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.secondName} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Surname:</label>
          <input name="surname" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.surname} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium">National ID/Passport Nos.:</label>
          <input name="nationalId" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.nationalId} onChange={handleChange} />
        </div>
        <div className="md:col-span-3">
          <label className="block font-medium">Occupation Details:</label>
          <input name="occupation" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.occupation} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Postal Address:</label>
          <input name="postalAddress" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.postalAddress} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Postal Code:</label>
          <input name="postalCode" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.postalCode} onChange={handleChange} />
        </div>
        <div className="md:col-span-3">
          <label className="block font-medium">Email:</label>
          <input name="email" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Telephone:</label>
          <input name="telephone" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.telephone} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Mobile:</label>
          <input name="mobile" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.mobile} onChange={handleChange} />
        </div>
      </form>
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

export default NextOfKinDetails; 