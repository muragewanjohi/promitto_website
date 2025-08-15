'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface EmploymentDetailsProps {
  showSaveButton?: boolean;
}

const initialState = {
  employerName: '',
  postalAddress: '',
  postalCode: '',
  location: '',
  telephone: '',
  department: '',
  jobTitle: '',
  lengthOfService: '',
  terms: 'Permanent',
  contractPeriod: '',
};

const termsOptions = ['Permanent', 'Probation', 'Contract'];

const EmploymentDetails: React.FC<EmploymentDetailsProps> = ({ showSaveButton }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({ ...initialState });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const fetchDetails = async () => {
        const { data } = await supabase
          .from('employment_details')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (data) {
          setForm({
            employerName: data.employer_name || '',
            postalAddress: data.postal_address || '',
            postalCode: data.postal_code || '',
            location: data.location || '',
            telephone: data.telephone || '',
            department: data.department || '',
            jobTitle: data.job_title || '',
            lengthOfService: data.length_of_service || '',
            terms: data.terms || 'Permanent',
            contractPeriod: data.contract_period || '',
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

  const handleTerms = (term: string) => {
    setForm((prev) => ({ ...prev, terms: term }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    const { error } = await supabase
      .from('employment_details')
      .upsert([
        {
          user_id: user.id,
          employer_name: form.employerName,
          postal_address: form.postalAddress,
          postal_code: form.postalCode,
          location: form.location,
          telephone: form.telephone,
          department: form.department,
          job_title: form.jobTitle,
          length_of_service: form.lengthOfService,
          terms: form.terms,
          contract_period: form.contractPeriod,
        },
      ], { onConflict: 'user_id' });
    setSaving(false);
    if (!error) setSuccess(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employment Details</h2>
          <p className="text-gray-600">Work information and employment history</p>
        </div>
      </div>

      <form onSubmit={e => e.preventDefault()} className="space-y-8">
        {/* Employer Information Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Employer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name of Employer</label>
              <input 
                name="employerName" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" 
                value={form.employerName} 
                onChange={handleChange}
                placeholder="Enter employer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Address</label>
              <input 
                name="postalAddress" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" 
                value={form.postalAddress} 
                onChange={handleChange}
                placeholder="Enter postal address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input 
                name="postalCode" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" 
                value={form.postalCode} 
                onChange={handleChange}
                placeholder="Enter postal code"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input 
                name="location" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" 
                value={form.location} 
                onChange={handleChange}
                placeholder="Enter location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telephone</label>
              <input 
                name="telephone" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" 
                value={form.telephone} 
                onChange={handleChange}
                placeholder="Enter telephone number"
              />
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Job Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input 
                name="department" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" 
                value={form.department} 
                onChange={handleChange}
                placeholder="Enter department"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input 
                name="jobTitle" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" 
                value={form.jobTitle} 
                onChange={handleChange}
                placeholder="Enter job title"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length of Service</label>
              <input 
                name="lengthOfService" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" 
                value={form.lengthOfService} 
                onChange={handleChange}
                placeholder="e.g., 5 years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract Period</label>
              <input 
                name="contractPeriod" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white" 
                value={form.contractPeriod} 
                onChange={handleChange}
                placeholder="e.g., 2 years"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Terms of Employment</label>
            <div className="flex flex-wrap gap-4">
              {termsOptions.map((term) => (
                <label key={term} className="flex items-center">
                  <input 
                    type="radio" 
                    name="terms"
                    checked={form.terms === term} 
                    onChange={() => handleTerms(term)} 
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">{term}</span>
                </label>
              ))}
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
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
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

export default EmploymentDetails; 