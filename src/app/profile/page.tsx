'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomerDetails from '@/components/Profile/CustomerDetails';
import EmploymentDetails from '@/components/Profile/EmploymentDetails';
import BusinessEntities from '@/components/Profile/BusinessEntities';
import PropertyDetails from '@/components/Profile/PropertyDetails';
import NextOfKinDetails from '@/components/Profile/NextOfKinDetails';
import MembershipDetails from '@/components/Profile/MembershipDetails';

const tabs = [
  { label: 'Customer Details', component: CustomerDetails },
  { label: 'Employment Details', component: EmploymentDetails },
  { label: 'Business Entities', component: BusinessEntities },
  { label: 'Property Details', component: PropertyDetails },
  { label: 'Next of Kin Details', component: NextOfKinDetails },
  { label: 'Membership Details', component: MembershipDetails },
];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mr-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-lg text-gray-600">Manage your account information and preferences</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
          <nav className="flex flex-wrap" aria-label="Profile Tabs">
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                className={`flex-1 px-6 py-4 text-sm font-semibold focus:outline-none transition-all duration-300 relative ${
                  activeTab === idx
                    ? 'text-primary bg-gradient-to-r from-primary/5 to-secondary/5 border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(idx)}
                aria-current={activeTab === idx ? 'page' : undefined}
                type="button"
              >
                <div className="flex items-center justify-center space-x-2">
                  {/* Tab Icons */}
                  {tab.label === 'Customer Details' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {tab.label === 'Employment Details' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  )}
                  {tab.label === 'Business Entities' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {tab.label === 'Property Details' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  )}
                  {tab.label === 'Next of Kin Details' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {tab.label === 'Membership Details' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )}
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <ActiveComponent showSaveButton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage; 