import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import React from 'react';

export default function CustomerJourney() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8">
          {/* Steps */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-[#1E40AF] mb-8 text-left">Customer Journey</h1>
            <ol className="space-y-6">
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1E40AF] text-white font-bold text-xl shadow">1</span>
                <span className="text-lg font-semibold text-gray-800">Account Opening</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F59E0B] text-white font-bold text-xl shadow">2</span>
                <span className="text-lg font-semibold text-gray-800">Site Visit</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1E40AF] text-white font-bold text-xl shadow">3</span>
                <span className="text-lg font-semibold text-gray-800">Design Discussion</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F59E0B] text-white font-bold text-xl shadow">4</span>
                <span className="text-lg font-semibold text-gray-800">Bill of Quantities Discussion</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1E40AF] text-white font-bold text-xl shadow">5</span>
                <span className="text-lg font-semibold text-gray-800">Project Mobilization</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F59E0B] text-white font-bold text-xl shadow">6</span>
                <span className="text-lg font-semibold text-gray-800">Project Implementation</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1E40AF] text-white font-bold text-xl shadow">7</span>
                <span className="text-lg font-semibold text-gray-800">Project Handover</span>
              </li>
            </ol>
            <div className="flex justify-center mt-8">
              <a href="/signup" className="bg-[#1E40AF] hover:bg-[#F59E0B] text-white hover:text-[#1E40AF] font-semibold px-8 py-3 rounded-lg transition-colors text-lg shadow-md">
                Proceed to Sign Up
              </a>
            </div>
          </div>
          {/* Registration Requirements */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="bg-gradient-to-br from-[#4338CA] to-[#1E40AF] rounded-xl p-6 shadow-lg mb-4">
              <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">Registration Requirements</h2>
              <ul className="list-disc pl-6 text-white space-y-2 text-base">
                <li>Passport Photo</li>
                <li>Copy of National ID</li>
                <li>Copy of KRA Certificate</li>
                <li>Copy of Title Deed</li>
                <li>Desired House Plans</li>
                <li>
                  <span className="font-bold">Application/Membership Fee of </span>
                  <span className="inline-block bg-[#F59E0B] text-white font-bold px-4 py-1 rounded-full shadow-sm align-middle">KES 30,000</span>
                  <span className="block text-xs mt-1">(To cater for the site visit, property search and the Bill of Quantities)</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Building Image - only on large screens */}
          <div className="hidden md:block absolute bottom-4 right-4 w-56 h-56 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <Image src="/images/Agnes/7.jpg" alt="Project Building" fill className="object-cover" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 