'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface PropertyDetailsProps {
  showSaveButton?: boolean;
}

const initialState = {
  location: '',
  titleNumber: '',
  county: '',
  landReferenceNo: '',
  ward: '',
  sizeOfProject: '',
  typeResidential: false,
  typeCommercial: false,
};

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ showSaveButton }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({ ...initialState });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const fetchDetails = async () => {
        const { data } = await supabase
          .from('property_details')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (data) {
          setForm({
            location: data.location || '',
            titleNumber: data.title_number || '',
            county: data.county || '',
            landReferenceNo: data.land_reference_no || '',
            ward: data.ward || '',
            sizeOfProject: data.size_of_project || '',
            typeResidential: !!data.type_residential,
            typeCommercial: !!data.type_commercial,
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
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    const { error } = await supabase
      .from('property_details')
      .upsert([
        {
          user_id: user.id,
          location: form.location,
          title_number: form.titleNumber,
          county: form.county,
          land_reference_no: form.landReferenceNo,
          ward: form.ward,
          size_of_project: form.sizeOfProject,
          type_residential: form.typeResidential,
          type_commercial: form.typeCommercial,
        },
      ], { onConflict: 'user_id' });
    setSaving(false);
    if (!error) setSuccess(true);
  };

  return (
    <section className="bg-white rounded-lg shadow p-6 border border-gray-200 relative">
      <h2 className="text-2xl font-semibold text-[#1E40AF] mb-4 border-b border-[#1E40AF] pb-2">Property Details</h2>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#1E40AF]" onSubmit={e => e.preventDefault()}>
        <div className="md:col-span-3">
          <label className="block font-medium">Location of Property:</label>
          <input name="location" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.location} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Title number :</label>
          <input name="titleNumber" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.titleNumber} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">County:</label>
          <input name="county" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.county} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium">Land Reference No.:</label>
          <input name="landReferenceNo" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.landReferenceNo} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Ward:</label>
          <input name="ward" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.ward} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Size of Project:</label>
          <input name="sizeOfProject" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.sizeOfProject} onChange={handleChange} />
        </div>
        <div className="md:col-span-2 flex items-center gap-4 mt-2">
          <span className="font-medium">Type of Property:</span>
          <span className="italic">Residential</span>
          <input name="typeResidential" type="checkbox" checked={form.typeResidential} onChange={handleChange} className="border-[#1E40AF] focus:ring-[#F59E0B] ml-1" />
          <span className="italic ml-4">Commercial</span>
          <input name="typeCommercial" type="checkbox" checked={form.typeCommercial} onChange={handleChange} className="border-[#1E40AF] focus:ring-[#F59E0B] ml-1" />
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

export default PropertyDetails; 