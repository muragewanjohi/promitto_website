'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface PropertyDetailsProps {
  showSaveButton?: boolean;
  userId?: string;
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

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ showSaveButton, userId }) => {
  const { user } = useAuth();
  const activeUserId = userId || user?.id;
  const [form, setForm] = useState({ ...initialState });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (activeUserId) {
      const fetchDetails = async () => {
        const { data } = await supabase
          .from('property_details')
          .select('*')
          .eq('user_id', activeUserId)
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
  }, [activeUserId]);

  if (!activeUserId) {
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
          user_id: activeUserId,
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
          <p className="text-gray-600">Land and property information</p>
        </div>
      </div>

      <form onSubmit={e => e.preventDefault()} className="space-y-8">
        {/* Property Information Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Property Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location of Property</label>
              <input 
                name="location" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white" 
                value={form.location} 
                onChange={handleChange}
                placeholder="Enter property location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title Number</label>
              <input 
                name="titleNumber" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white" 
                value={form.titleNumber} 
                onChange={handleChange}
                placeholder="Enter title number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
              <input 
                name="county" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white" 
                value={form.county} 
                onChange={handleChange}
                placeholder="Enter county"
              />
            </div>
          </div>
        </div>

        {/* Land Details Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
            </svg>
            Land Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Land Reference No.</label>
              <input 
                name="landReferenceNo" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white" 
                value={form.landReferenceNo} 
                onChange={handleChange}
                placeholder="Enter land reference number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
              <input 
                name="ward" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white" 
                value={form.ward} 
                onChange={handleChange}
                placeholder="Enter ward"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size of Project</label>
              <input 
                name="sizeOfProject" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white" 
                value={form.sizeOfProject} 
                onChange={handleChange}
                placeholder="e.g., 1 acre, 500 sq ft"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <div className="flex flex-wrap gap-4 mt-2">
                <label className="flex items-center">
                  <input 
                    name="typeResidential" 
                    type="checkbox" 
                    checked={form.typeResidential} 
                    onChange={handleChange} 
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">Residential</span>
                </label>
                <label className="flex items-center">
                  <input 
                    name="typeCommercial" 
                    type="checkbox" 
                    checked={form.typeCommercial} 
                    onChange={handleChange} 
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">Commercial</span>
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
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
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

export default PropertyDetails; 