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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Next of Kin Details</h2>
          <p className="text-gray-600">Emergency contact and family information</p>
        </div>
      </div>

      <form onSubmit={e => e.preventDefault()} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-pink-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input 
                name="firstName" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
                value={form.firstName} 
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Second Name</label>
              <input 
                name="secondName" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
                value={form.secondName} 
                onChange={handleChange}
                placeholder="Enter second name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Surname</label>
              <input 
                name="surname" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
                value={form.nationalId} 
                onChange={handleChange}
                placeholder="Enter ID number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
              <input 
                name="occupation" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
                value={form.occupation} 
                onChange={handleChange}
                placeholder="Enter occupation"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-pink-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                name="email" 
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
                value={form.email} 
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <input 
                name="mobile" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
                value={form.telephone} 
                onChange={handleChange}
                placeholder="Enter telephone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input 
                name="postalCode" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white" 
              value={form.postalAddress} 
              onChange={handleChange}
              placeholder="Enter complete postal address"
            />
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
            className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-3 rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
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

export default NextOfKinDetails; 