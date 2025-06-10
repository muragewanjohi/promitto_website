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
    <>
      <Header />
      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-3xl font-bold text-[#1E40AF] mb-8">Profile</h1>
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px" aria-label="Profile Tabs">
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                className={`px-4 py-2 text-sm font-medium border-b-2 focus:outline-none transition-colors duration-200 ${
                  activeTab === idx
                    ? 'border-[#1E40AF] text-[#1E40AF] bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-[#1E40AF] hover:border-[#1E40AF]'
                }`}
                onClick={() => setActiveTab(idx)}
                aria-current={activeTab === idx ? 'page' : undefined}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div>
          <ActiveComponent showSaveButton />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage; 