'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';

const HowToOwn = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="mb-16">
          <h1 className="text-6xl font-bold text-[#F59E0B] mb-6">Own a Home</h1>
          <p className="text-xl text-gray-700 mb-8">
            At Promitto Ltd, we have streamlined the path to homeownership, making it easier and more accessible than ever before. 
            With our innovative approach, owning a home becomes an achievable reality. We offer flexible financing options, 
            tailored to suit your unique circumstances, ensuring that your dream of homeownership fits comfortably within your budget.
          </p>
          <a href="#enroll" className="inline-block bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Enroll Now
          </a>
        </div>

        <h2 className="text-4xl font-bold text-[#1E40AF] mb-4">Jenga Nyumba Loan</h2>
        <p className="text-xl text-gray-700 mb-12">Why You Should Get It!</p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Sustainable Loans</h3>
            <p className="text-gray-700">
              Housing is a basic need. Promitto provides affordable and sustainable Jenga Nyumba loan products 
              geared towards providing affordable housing to its members.
            </p>
          </div>

          <div className="bg-[#F59E0B] p-8 rounded-lg shadow-lg text-white">
            <div className="w-16 h-16 bg-[#1E40AF] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Construction Services</h3>
            <p>
              Attached to the Jenga Nyumba Loan Product, members are offered full construction services 
              by the society's contractors to help members construct with efficiency and timeliness.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
          <CollapsibleTerms />
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#F59E0B] mb-12 text-center">House Designs & Features</h2>
          
          <div className="space-y-16">
            {/* Two Bedroom House */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#1E40AF]">Two Bedroom House</h3>
                <div className="space-y-2 text-gray-700">
                  <h4 className="font-semibold">Features</h4>
                  <ul className="list-disc pl-6">
                    <li>Master Ensuite Bedroom with walk-in closet, 1 bedroom with a common washroom</li>
                    <li>Dining Area, Living Room, Open Plan Kitchen, Built-in Wardrobes for the two bedrooms</li>
                    <li>Pantry, 500 litres internal storage tank & 5,000 litres reserve tank</li>
                    <li>Foyer at the main entrance, Septic tank, Tiled floors, 2 steel doors</li>
                    <li>A perimeter wall equivalent to 50 by 100m, steel gate, wired with provisions of security lights, internet, CCTV and Cable TV</li>
                  </ul>
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image 
                  src="/house-designs/two-bedroom.jpg" 
                  alt="Two Bedroom House Design"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Three Bedroom House */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] rounded-lg overflow-hidden md:order-1">
                <Image 
                  src="/house-designs/three-bedroom.jpg" 
                  alt="Three Bedroom House Design"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 md:order-2">
                <h3 className="text-2xl font-bold text-[#1E40AF]">Three Bedroom House</h3>
                <div className="space-y-2 text-gray-700">
                  <h4 className="font-semibold">Features</h4>
                  <ul className="list-disc pl-6">
                    <li>Master Ensuite Bedroom with walk-in closet, 2 bedrooms with a common washroom</li>
                    <li>Dining Area, Living Room, Open Plan Kitchen, Built-in Wardrobes for the bedrooms</li>
                    <li>Pantry, 500 litres internal storage tank & 5,000 litres reserve tank</li>
                    <li>Foyer at the main entrance, Septic tank, Tiled floors, 2 steel doors</li>
                    <li>A perimeter wall equivalent to 50 by 80m, steel gate, wired with provisions of security lights, internet, CCTV and Cable TV</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Four Bedroom House */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#1E40AF]">Four Bedroom House</h3>
                <div className="space-y-2 text-gray-700">
                  <h4 className="font-semibold">Ground Floor</h4>
                  <ul className="list-disc pl-6">
                    <li>Dining Area, Living Room, Pantry, One Bedroom ensuite</li>
                    <li>Open Plan Kitchen, Cloakroom</li>
                    <li>Foyer at the main entrance, 2 steel doors, 5000ltr internal storage tank & 5000l reserve tank</li>
                  </ul>
                  <h4 className="font-semibold mt-4">1st Floor</h4>
                  <ul className="list-disc pl-6">
                    <li>Master Ensuite Bedroom with walk-in closet and balcony</li>
                    <li>2 bedrooms with built-in wardrobes and a shared washroom</li>
                    <li>One Extra balcony, stairs, and tiled floors</li>
                  </ul>
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image 
                  src="/house-designs/four-bedroom.jpg" 
                  alt="Four Bedroom House Design"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <p className="text-red-600 font-semibold">**Note</p>
            <p className="text-gray-700 italic">
              Excavation shall not be beyond 2 feet of black cotton and the gradient is flat or gently slanting. Anything beyond a standard design, a tailored BQ will be prepared.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#F59E0B] mb-12 text-center">Construction Process</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#1E40AF] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Expression of Interest</h3>
              <p className="text-gray-700 text-center">
                Client expresses interest to construct and commits with a deposit of KES 20,000. Promitto kicks off by performing due diligence including basic title search and KYC verification.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#1E40AF] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Client Authorization Stage</h3>
              <p className="text-gray-700 text-center">
                Promitto shares project details with contractor for preparation of a Bill of Quantities.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#1E40AF] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Project Assignment</h3>
              <p className="text-gray-700 text-center">
                Promitto provides Bill of Quantities within a maximum of 14 working days.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#1E40AF] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Clearance Stage</h3>
              <p className="text-gray-700 text-center">
                Promitto shares the Bill of Quantities with the Client. Client makes deposit of 30% to Promitto.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#1E40AF] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Confirmation Stage</h3>
              <p className="text-gray-700 text-center">
                Promitto shares the Bill of Quantities with the Client. Client makes deposit of 30% to Promitto.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#1E40AF] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Implementation, Monitoring and Evaluation Stage</h3>
              <p className="text-gray-700 text-center">
                Promitto flags off construction and oversees management of project. Construction ends in 6 - 12 months as client continues to make monthly repayments. Client starts making monthly repayments a month after construction begins.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#F59E0B] mb-12 text-center">Savings</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Deposit Account</h3>
              <p className="text-gray-700 mb-6">
                Our clients are allowed to save 30% of their Bills of Quantities in instalments via their members deposit account.
              </p>

              <h4 className="text-xl font-semibold mb-4">Requirements for Opening an Account</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Registration fees</li>
                <li>Property search fees</li>
                <li>Legal fees</li>
                <li>Property charge</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Document Downloads (Brochures)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <a href="/brochures/2-bedroom-bungalow-flatroof.pdf" className="text-[#1E40AF] hover:text-[#F59E0B] block">
                    2 Bedroom bungalow flatroof
                  </a>
                  <a href="/brochures/3-bedroom-bungalow-flatroof.pdf" className="text-[#1E40AF] hover:text-[#F59E0B] block">
                    3 Bedroom bungalow flatroof
                  </a>
                  <a href="/brochures/3-bedroom-bungalow-hidden-roof.pdf" className="text-[#1E40AF] hover:text-[#F59E0B] block">
                    3 Bedroom bungalow hidden roof
                  </a>
                </div>
                <div className="space-y-4">
                  <a href="/brochures/3-bedroom-bungalow-pitchroofed.pdf" className="text-[#1E40AF] hover:text-[#F59E0B] block">
                    3 Bedroom bungalow Pitchroofed
                  </a>
                  <a href="/brochures/3-bedroom-mansion-pitchroof.pdf" className="text-[#1E40AF] hover:text-[#F59E0B] block">
                    3 Bedroom mansion pitchroof
                  </a>
                  <a href="/brochures/3-bedroom-mansion-flatroof.pdf" className="text-[#1E40AF] hover:text-[#F59E0B] block">
                    3 Bedroom mansion flatroof
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F59E0B] p-8 rounded-lg text-white">
          <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Homeownership Journey?</h2>
          <p className="mb-6">
            Our team of experienced professionals is here to help you every step of the way.
          </p>
          <a
            href="/contact"
            className="bg-white text-[#1E40AF] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Contact Us Today
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function CollapsibleTerms() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full text-left text-3xl font-bold text-[#F59E0B] p-8 border-b focus:outline-none flex items-center justify-between bg-white"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="terms-content"
      >
        Our Terms & Conditions
        <span className="ml-4 text-2xl">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div id="terms-content" className="p-8 animate-fade-in">
          <h3 className="text-2xl font-semibold text-[#1E40AF] mb-6">01. Loan Security</h3>
          <p className="text-gray-700 mb-4">
            Borrower agrees that on or before the date of this agreement shall deliver the following document to the lender:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>A title deed to a parcel of land upon which the construction project will be executed.</li>
            <li>The borrower must possess a personal title deed written under his or her name.</li>
            <li>In case of the title deed belonging to a second party, the company will require written consent from the second party to use the title deed.</li>
            <li>The title deed must be free from any distress. Title deeds held up with other financing institutions shall not be accepted.</li>
            <li>If there are any family disputes concerning the title deed, Promitto will not be part and parcel of that.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-[#1E40AF] mb-6">02. Loan Terms</h3>
          <h4 className="text-xl font-semibold mb-4">(A) Deposits</h4>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>The borrower shall be required to make a 30% deposit of the loan amount depending on the selected house design.</li>
            <li>In cases where the borrower is not financially ready with the minimum deposit for the construction to happen, the client will be allowed to make instalments payments but will be made to understand that the construction will only start once the minimum deposit has been attained.</li>
            <li>In a case where the client/borrower is ready with the 30% deposit, they will proceed to sign the construction agreement for the construction to commence.</li>
            <li>The client can also deposit more than the required 30% minimum deposit to kickstart the project if they chose to do so.</li>
            <li>The Company can also enter into a construction agreement with a client not seeking a loan facility for construction on the condition that the client provides the full finances to undertake the project.</li>
          </ul>

          <h4 className="text-xl font-semibold mb-4">(B) Loan Repayment Terms</h4>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>The Loan shall be payable up to a maximum of seven (7) years. The exact loan term shall be as discussed and signed in the Loan application form.</li>
            <li>The loan interest rate for the construction loan will be at 12% on a reducing balance rate. With a monthly standard payment plan which the borrower is expected to honour without fail.</li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <h4 className="text-xl font-semibold text-[#F59E0B] mb-4">A customer can default a loan in three ways:</h4>
            <ul className="list-disc pl-6 text-gray-700">
              <li>If the client fails to completely repay the remaining 70% of the loan</li>
              <li>If the client fails to repay the monthly instalment as agreed.</li>
              <li>If the client fails to repay the monthly instalment on the stipulated timeline.</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg mb-8">
            <h4 className="text-xl font-semibold text-red-600 mb-4">Actionables</h4>
            <p className="text-gray-700 italic mb-4">If the client fails to repay any instalment within 60 days, the directive will be to:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Repossess or auction the property.</li>
              <li>If the client fails to repay the loan on the agreed instalments or on the agreed timelines there will be added penalties incurred.</li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold mb-4">(C) Expenses</h4>
          <ul className="list-disc pl-6 text-gray-700">
            <li>In case the client changes any component of the construction along the way, QS will have to re-evaluate the change cost and charge the customer. This will have to be paid for immediately.</li>
            <li>In case a statutory requirement is delayed, Promitto shall not be held liable.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HowToOwn; 