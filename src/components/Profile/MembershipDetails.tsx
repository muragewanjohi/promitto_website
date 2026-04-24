'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface MembershipDetailsProps {
  showSaveButton?: boolean;
}

const initialState = {
  reference: '',
  status: false,
};

const paymentTable = (
  <div className="overflow-x-auto mt-6">
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900">Bank Account Details</h4>
        <p className="text-sm text-gray-600 mt-1">Use any of the following accounts for payment</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Swift Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paybill</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="bg-yellow-50 hover:bg-yellow-100 transition-colors">
              <td className="px-4 py-3 text-sm font-semibold text-gray-900">KCB</td>
              <td className="px-4 py-3 text-sm text-gray-900">BIASHARA STREET</td>
              <td className="px-4 py-3 text-sm text-gray-900">01263</td>
              <td className="px-4 py-3 text-sm text-gray-900">KCBLKENX</td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">1303131978</td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">522522</td>
              <td className="px-4 py-3 text-sm text-gray-900">KES</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">1311843140</td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-900">USD</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">1311843205</td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-900">GBP</td>
            </tr>
            <tr className="bg-yellow-50 hover:bg-yellow-100 transition-colors">
              <td className="px-4 py-3 text-sm font-semibold text-gray-900">EQUITY</td>
              <td className="px-4 py-3 text-sm text-gray-900">FOURWAYS</td>
              <td className="px-4 py-3 text-sm text-gray-900">68002</td>
              <td className="px-4 py-3 text-sm text-gray-900">EQBLKENA</td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">0010283176854</td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">247247</td>
              <td className="px-4 py-3 text-sm text-gray-900">KES</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">0010284482698</td>
              <td className="px-4 py-3 text-sm text-gray-500"></td>
              <td className="px-4 py-3 text-sm text-gray-900">USD</td>
            </tr>
            <tr className="bg-yellow-50 hover:bg-yellow-100 transition-colors">
              <td className="px-4 py-3 text-sm font-semibold text-gray-900">STANBIC</td>
              <td className="px-4 py-3 text-sm text-gray-900">KENYATTA AVENUE</td>
              <td className="px-4 py-3 text-sm text-gray-900">002</td>
              <td className="px-4 py-3 text-sm text-gray-900">SBICKENX</td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">00100010816909</td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">600100</td>
              <td className="px-4 py-3 text-sm text-gray-900">KES</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const MembershipDetails: React.FC<MembershipDetailsProps> = ({ showSaveButton }) => {
  const { user, userProfile } = useAuth();
  const [form, setForm] = useState({ ...initialState });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const fetchDetails = async () => {
        const { data } = await supabase
          .from('membership_details')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (data) {
          setForm({
            reference: data.reference || '',
            status: !!data.status,
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
    setForm((prev) => ({ ...prev, reference: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    const { error } = await supabase
      .from('membership_details')
      .upsert([
        {
          user_id: user.id,
          reference: form.reference,
          status: form.status,
        },
      ], { onConflict: 'user_id' });
    setSaving(false);
    if (!error) setSuccess(true);
  };

  const userName = userProfile ? `${userProfile.email}` : user?.email || '';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Membership Details</h2>
          <p className="text-gray-600">Payment information and membership status</p>
        </div>
      </div>

      {/* Membership Information Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          Membership Information
        </h3>
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Membership Fee</p>
              <p className="text-2xl font-bold text-teal-600">Ksh 30,000</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                form.status 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {form.status ? 'Active' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Reference</label>
            <input 
              name="reference" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white" 
              value={form.reference} 
              onChange={handleChange}
              placeholder="Enter payment reference number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Membership Status</label>
            <input 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" 
              value={form.status ? 'Active' : 'Inactive'} 
              readOnly 
              tabIndex={-1}
            />
          </div>
        </div>
      </div>

      {/* Mobile Payment Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Mobile Payment (Safaricom)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Paybill Number</p>
            <p className="text-xl font-bold text-green-600 font-mono">6746402</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Account Number</p>
            <p className="text-lg font-semibold text-gray-900">ID NO or PASSPORT NO</p>
          </div>
        </div>
      </div>

      {/* Bank Payment Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Bank Transfer
        </h3>
        <p className="text-sm text-gray-600 mb-4">Use any of the following bank accounts for payment</p>
        {paymentTable}
      </div>

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
            className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
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

export default MembershipDetails; 