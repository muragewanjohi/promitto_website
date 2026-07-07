'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface BusinessEntitiesProps {
  showSaveButton?: boolean;
  userId?: string;
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

const BusinessEntities: React.FC<BusinessEntitiesProps> = ({ showSaveButton, userId }) => {
  const { user } = useAuth();
  const activeUserId = userId || user?.id;
  const [form, setForm] = useState({ ...initialState });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (activeUserId) {
      const fetchDetails = async () => {
        const { data } = await supabase
          .from('business_entities')
          .select('*')
          .eq('user_id', activeUserId)
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
  }, [activeUserId]);

  if (!activeUserId) {
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
          user_id: activeUserId,
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Business Entities</h2>
          <p className="text-gray-600">Company and business registration information</p>
        </div>
      </div>

      <form onSubmit={e => e.preventDefault()} className="space-y-8">
        {/* Business Information Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Business Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name of Registered Entity</label>
              <input 
                name="registeredEntity" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white" 
                value={form.registeredEntity} 
                onChange={handleChange}
                placeholder="Enter registered entity name"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nature of Business</label>
              <input 
                name="natureOfBusiness" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white" 
                value={form.natureOfBusiness} 
                onChange={handleChange}
                placeholder="e.g., Manufacturing, Services, Trading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Registration</label>
              <input 
                name="dateOfRegistration" 
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white" 
                value={form.dateOfRegistration} 
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white" 
                value={form.email} 
                onChange={handleChange}
                placeholder="Enter business email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telephone</label>
              <input 
                name="telephone" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white" 
                value={form.telephone} 
                onChange={handleChange}
                placeholder="Enter business telephone"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input 
                name="postalCode" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white" 
                value={form.postalCode} 
                onChange={handleChange}
                placeholder="Enter postal code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Town/City</label>
              <input 
                name="townCity" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white" 
                value={form.townCity} 
                onChange={handleChange}
                placeholder="Enter town or city"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Postal Address</label>
            <input 
              name="postalAddress" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white" 
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
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
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

export default BusinessEntities; 