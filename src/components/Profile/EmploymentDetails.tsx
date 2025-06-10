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
    <section className="bg-white rounded-lg shadow p-6 border border-gray-200 relative">
      <h2 className="text-2xl font-semibold text-[#1E40AF] mb-4 border-b border-[#1E40AF] pb-2">Employment Details</h2>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#1E40AF]" onSubmit={e => e.preventDefault()}>
        <div className="md:col-span-3">
          <label className="block font-medium">Name of Employer:</label>
          <input name="employerName" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.employerName} onChange={handleChange} />
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
          <label className="block font-medium">Location:</label>
          <input name="location" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.location} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Telephone:</label>
          <input name="telephone" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.telephone} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Department:</label>
          <input name="department" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.department} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Job Title:</label>
          <input name="jobTitle" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.jobTitle} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Length of Service:</label>
          <input name="lengthOfService" className="w-full border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.lengthOfService} onChange={handleChange} />
        </div>
        <div className="md:col-span-3 flex flex-wrap items-center gap-4 mt-2">
          <span className="font-medium">Terms of Employment:</span>
          {termsOptions.map((term) => (
            <label key={term} className="flex items-center gap-1">
              <input type="checkbox" checked={form.terms === term} onChange={() => handleTerms(term)} className="border-[#1E40AF] focus:ring-[#F59E0B]" />
              <span>{term}</span>
            </label>
          ))}
          <span className="font-medium ml-4">Contract Period:</span>
          <input name="contractPeriod" className="w-32 border border-[#1E40AF] bg-blue-50 rounded px-2 py-1 focus:border-[#F59E0B] focus:ring-[#F59E0B]" value={form.contractPeriod} onChange={handleChange} />
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

export default EmploymentDetails; 