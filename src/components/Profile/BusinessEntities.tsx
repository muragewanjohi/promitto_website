'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface BusinessEntitiesProps {
  showSaveButton?: boolean;
}

const initialState = {
  registeredEntity: '',
  natureOfBusiness: '',
  dateOfRegistration: '',
  postalAddress: '',
  postalCode: '',
  townCity: '',
  email: '',
  telephone: '',
};

const BusinessEntities: React.FC<BusinessEntitiesProps> = ({ showSaveButton }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({ ...initialState });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const fetchDetails = async () => {
        const { data } = await supabase
          .from('business_entities')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (data) {
          setForm({
            registeredEntity: data.registered_entity || '',
            natureOfBusiness: data.nature_of_business || '',
            dateOfRegistration: data.date_of_registration || '',
            postalAddress: data.postal_address || '',
            postalCode: data.postal_code || '',
            townCity: data.town_city || '',
            email: data.email || '',
            telephone: data.telephone || '',
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
      .from('business_entities')
      .upsert([
        {
          user_id: user.id,
          registered_entity: form.registeredEntity,
          nature_of_business: form.natureOfBusiness,
          date_of_registration: form.dateOfRegistration,
          postal_address: form.postalAddress,
          postal_code: form.postalCode,
          town_city: form.townCity,
          email: form.email,
          telephone: form.telephone,
        },
      ], { onConflict: 'user_id' });
    setSaving(false);
    if (!error) setSuccess(true);
  };

  return (
    <section className="bg-white rounded-lg shadow p-6 border border-gray-200 relative">
      <h2 className="text-2xl font-semibold text-[#1E40AF] mb-4 border-b border-[#1E40AF] pb-2">Business Entities</h2>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#1E40AF]" onSubmit={e => e.preventDefault()}>
        <div className="md:col-span-3">
          <label className="block font-medium">Name of Registered Entity:</label>
          <input name="registeredEntity" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.registeredEntity} onChange={handleChange} />
        </div>
        <div className="md:col-span-3">
          <label className="block font-medium">Nature of Business:</label>
          <input name="natureOfBusiness" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.natureOfBusiness} onChange={handleChange} />
        </div>
        <div className="md:col-span-3">
          <label className="block font-medium">Date of Registration:</label>
          <input name="dateOfRegistration" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.dateOfRegistration} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Postal Address:</label>
          <input name="postalAddress" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.postalAddress} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Postal Code:</label>
          <input name="postalCode" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.postalCode} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Town/City:</label>
          <input name="townCity" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.townCity} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Email:</label>
          <input name="email" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Telephone:</label>
          <input name="telephone" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.telephone} onChange={handleChange} />
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

export default BusinessEntities; 