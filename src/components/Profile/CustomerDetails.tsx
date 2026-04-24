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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
          <p className="text-gray-600">Personal information and contact details</p>
        </div>
      </div>

      <form onSubmit={e => e.preventDefault()} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input 
                name="firstName" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.firstName} 
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Second Name</label>
              <input 
                name="secondName" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.secondName} 
                onChange={handleChange}
                placeholder="Enter second name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Surname</label>
              <input 
                name="surname" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.surname} 
                onChange={handleChange}
                placeholder="Enter surname"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">National ID/Passport No.</label>
              <input 
                name="nationalId" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.nationalId} 
                onChange={handleChange}
                placeholder="Enter ID number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">KRA PIN</label>
              <input 
                name="kraPin" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.kraPin} 
                onChange={handleChange}
                placeholder="Enter KRA PIN"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Marital Status</label>
            <div className="flex flex-wrap gap-4">
              {maritalOptions.map((status) => (
                <label key={status} className="flex items-center">
                  <input 
                    type="radio" 
                    name="maritalStatus"
                    checked={form.maritalStatus === status} 
                    onChange={() => handleMaritalStatus(status)} 
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                name="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" 
                value={form.email} 
                readOnly 
                tabIndex={-1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <input 
                name="mobile" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.mobile} 
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telephone</label>
              <input 
                name="telephone" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.telephone} 
                onChange={handleChange}
                placeholder="Enter telephone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input 
                name="postalCode" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.postalCode} 
                onChange={handleChange}
                placeholder="Enter postal code"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Postal Address</label>
            <input 
              name="postalAddress" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
              value={form.postalAddress} 
              onChange={handleChange}
              placeholder="Enter postal address"
            />
          </div>
        </div>

        {/* Current Address Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Current Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
              <input 
                name="currentAddress" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.currentAddress} 
                onChange={handleChange}
                placeholder="Enter current address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estate</label>
              <input 
                name="estate" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.estate} 
                onChange={handleChange}
                placeholder="Enter estate name"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">House Number</label>
              <input 
                name="houseNo" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" 
                value={form.houseNo} 
                onChange={handleChange}
                placeholder="Enter house number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Housing Type</label>
              <div className="flex flex-wrap gap-4 mt-2">
                <label className="flex items-center">
                  <input 
                    name="rental" 
                    type="checkbox" 
                    checked={form.rental} 
                    onChange={handleChange} 
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">Rental</span>
                </label>
                <label className="flex items-center">
                  <input 
                    name="ownerOccupied" 
                    type="checkbox" 
                    checked={form.ownerOccupied} 
                    onChange={handleChange} 
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">Owner Occupied</span>
                </label>
                <label className="flex items-center">
                  <input 
                    name="employerHousing" 
                    type="checkbox" 
                    checked={form.employerHousing} 
                    onChange={handleChange} 
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">Employer Housing</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Save Button and Success Message */}
      {showSaveButton && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div>
            {success && (
              <div className="flex items-center text-green-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Saved successfully!</span>
              </div>
            )}
          </div>
          <button 
            type="button" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleSave} 
            disabled={saving}
          >
            {saving ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails; 