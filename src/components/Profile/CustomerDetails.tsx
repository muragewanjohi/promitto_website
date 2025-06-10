'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface CustomerDetailsProps {
  showSaveButton?: boolean;
}

const initialState = {
  firstName: '',
  secondName: '',
  surname: '',
  nationalId: '',
  kraPin: '',
  maritalStatus: 'Single',
  postalAddress: '',
  postalCode: '',
  telephone: '',
  mobile: '',
  currentAddress: '',
  estate: '',
  houseNo: '',
  rental: false,
  ownerOccupied: false,
  employerHousing: false,
  email: '',
};

const maritalOptions = ['Single', 'Married', 'Widow(er)', 'Divorced', 'Other'];

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ showSaveButton }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({ ...initialState });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Always set the email field from the user object
    setForm((prev) => ({ ...prev, email: user?.email || '' }));

    // Only fetch if user is available
    if (user?.id) {
      const fetchDetails = async () => {
        const { data, error } = await supabase
          .from('customer_details')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setForm({
            firstName: data.first_name || '',
            secondName: data.second_name || '',
            surname: data.surname || '',
            nationalId: data.national_id || '',
            kraPin: data.kra_pin || '',
            maritalStatus: data.marital_status || 'Single',
            postalAddress: data.postal_address || '',
            postalCode: data.postal_code || '',
            telephone: data.telephone || '',
            mobile: data.mobile || '',
            currentAddress: data.current_address || '',
            estate: data.estate || '',
            houseNo: data.house_no || '',
            rental: !!data.rental,
            ownerOccupied: !!data.owner_occupied,
            employerHousing: !!data.employer_housing,
            email: user.email || '',
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

  const handleMaritalStatus = (status: string) => {
    setForm((prev) => ({ ...prev, maritalStatus: status }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    const { error } = await supabase
      .from('customer_details')
      .upsert([
        {
          user_id: user?.id,
          email: user?.email,
          first_name: form.firstName,
          second_name: form.secondName,
          surname: form.surname,
          national_id: form.nationalId,
          kra_pin: form.kraPin,
          marital_status: form.maritalStatus,
          postal_address: form.postalAddress,
          postal_code: form.postalCode,
          telephone: form.telephone,
          mobile: form.mobile,
          current_address: form.currentAddress,
          estate: form.estate,
          house_no: form.houseNo,
          rental: form.rental,
          owner_occupied: form.ownerOccupied,
          employer_housing: form.employerHousing,
        },
      ], { onConflict: 'user_id' });
    setSaving(false);
    if (!error) setSuccess(true);
  };

  return (
    <section className="bg-white rounded-lg shadow p-6 border border-gray-200 relative">
      <h2 className="text-2xl font-semibold text-[#1E40AF] mb-4 border-b border-[#1E40AF] pb-2">Customer Details</h2>
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
        <div>
          <label className="block font-medium">KRA PIN:</label>
          <input name="kraPin" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.kraPin} onChange={handleChange} />
        </div>
        <div className="md:col-span-3 flex flex-wrap items-center gap-4 mt-2">
          <span className="font-medium">Marital Status:</span>
          {maritalOptions.map((status) => (
            <label key={status} className="flex items-center gap-1">
              <input type="checkbox" checked={form.maritalStatus === status} onChange={() => handleMaritalStatus(status)} className="border-[#1E40AF] focus:ring-[#F59E0B]" />
              <span>{status}</span>
            </label>
          ))}
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium">Postal Address:</label>
          <input name="postalAddress" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.postalAddress} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Postal Code:</label>
          <input name="postalCode" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.postalCode} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium">Email:</label>
          <input name="email" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 text-gray-400 cursor-not-allowed" value={form.email} readOnly tabIndex={-1} />
        </div>
        <div>
          <label className="block font-medium">Telephone:</label>
          <input name="telephone" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.telephone} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Mobile:</label>
          <input name="mobile" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.mobile} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium">Current Address:</label>
          <input name="currentAddress" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.currentAddress} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Estate:</label>
          <input name="estate" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.estate} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">House No:</label>
          <input name="houseNo" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.houseNo} onChange={handleChange} />
        </div>
        <div className="md:col-span-3 flex flex-wrap items-center gap-4 mt-2">
          <span className="font-medium">Rental:</span>
          <input name="rental" type="checkbox" checked={form.rental} onChange={handleChange} className="border-[#1E40AF] focus:ring-[#F59E0B]" />
          <span className="font-medium ml-4">Owner Occupied:</span>
          <input name="ownerOccupied" type="checkbox" checked={form.ownerOccupied} onChange={handleChange} className="border-[#1E40AF] focus:ring-[#F59E0B]" />
          <span className="font-medium ml-4">Employer Housing:</span>
          <input name="employerHousing" type="checkbox" checked={form.employerHousing} onChange={handleChange} className="border-[#1E40AF] focus:ring-[#F59E0B]" />
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

export default CustomerDetails; 