'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ConstructionProcess from '../../components/ConstructionProcess';
import CustomerJourney from '../../components/CustomerJourney';
import Image from 'next/image';
import { ArrowRight, CheckCircle, TrendingUp, Home, Shield, BedDouble, Bath, Ruler } from 'lucide-react';

const HowToOwn = () => {
  const [showTerms, setShowTerms] = useState(false);
  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-lg mb-12 mt-8 pt-24 min-h-[500px] md:min-h-[800px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            {/* Left Side */}
            <div className="flex-1 min-w-[300px]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Own a <span className="text-primary">Home</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray mb-6">
                At Promitto Ltd, we have streamlined the path to homeownership, making it easier and more accessible than ever before. With our innovative approach, owning a home becomes an achievable reality.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray text-sm md:text-base lg:text-lg">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  Flexible financing options tailored to your needs
                </li>
                <li className="flex items-center text-gray text-sm md:text-base lg:text-lg">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  Dream home fits comfortably within your budget
                </li>
                <li className="flex items-center text-gray text-sm md:text-base lg:text-lg">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  Professional construction and project management
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/customer-journey" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-accent transition-colors text-center text-sm md:text-base">
                  Get Started Now &rarr;
                </a>
                <a href="#learn-more" className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-center text-sm md:text-base">
                  Learn More
                </a>
              </div>
            </div>
            {/* Right Side */}
            <div className="flex-1 flex items-center justify-center relative min-w-[300px]">
              <div className="relative w-full max-w-xl h-80 md:h-[28rem] rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/5_br_pitched_roof_mansion.jpeg"
                  alt="Modern house"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Approval Badge */}
                <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow px-6 py-4 flex flex-col items-center">
                  <span className="text-primary text-xl md:text-2xl font-bold">95%</span>
                  <span className="text-gray text-xs md:text-sm font-medium">Approval Rate</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        

        {/* Jenga Nyumba Loan Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Jenga Nyumba Loan</h2>
          <p className="text-lg md:text-xl text-primary text-center mb-12 font-semibold hover:underline cursor-pointer">Why You Should Get It!</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sustainable Loans Card */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-black">Sustainable Loans</h3>
              <p className="text-gray text-sm md:text-base">
                Housing is a basic need. Promitto provides affordable and sustainable Jenga Nyumba loan products geared towards providing affordable housing to its members.
              </p>
            </div>
            {/* Construction Services Card */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Home className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-black">Construction Services</h3>
              <p className="text-gray text-sm md:text-base">
                Attached to the Jenga Nyumba Loan Product, members are offered full construction services by the society's contractors to guarantee members with quality and timely completion.
              </p>
            </div>
          </div>
        </section>

         {/* Terms & Conditions Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl flex flex-row items-center justify-between px-8 py-4 min-h-[80px]">
            {/* Left: Title and Subtitle */}
            <div className="flex flex-col justify-center">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mb-1">Our Terms & Conditions</h3>
              <p className="text-gray text-xs md:text-sm lg:text-base">Review our comprehensive loan terms and conditions</p>
            </div>
            {/* Right: Icon and Button */}
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <button
                onClick={() => setShowTerms((v) => !v)}
                className="border border-gray-200 bg-white rounded-lg px-4 py-2 font-medium text-black hover:bg-primary hover:text-white transition-colors flex items-center gap-2 shadow-sm text-xs md:text-sm lg:text-base"
              >
                {showTerms ? 'Hide Details' : 'View Details'}
              </button>
            </div>
          </div>
          {showTerms && (
            <div className="mt-4 bg-white rounded-2xl shadow p-6">
              <CollapsibleTerms />
            </div>
          )}
        </section>

        {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
          <CollapsibleTerms />
        </div> */}

        {/* House Designs & Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">House Designs & Features</h2>
          <p className="text-base md:text-lg text-gray text-center mb-10">Choose from our carefully crafted home designs</p>

          {/* Two Bedroom House Card */}
          <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
            {/* Image */}
            <div className="md:w-1/2 w-full h-72 md:h-auto relative">
              <Image
                src="/2brm/2bdrm_bungalow_hidden_roof.jpeg"
                alt="Two Bedroom House"
                fill
                className="object-cover w-full h-full"
                style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
                priority
              />
            </div>
            {/* Info */}
            <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Two Bedroom House</h3>
              <div className="flex items-center gap-6 text-gray mb-3">
                <span className="flex items-center gap-1 text-sm md:text-base"><BedDouble className="w-4 h-4 md:w-5 md:h-5 text-primary" />2 Bedrooms</span>
                <span className="flex items-center gap-1 text-sm md:text-base"><Bath className="w-4 h-4 md:w-5 md:h-5 text-primary" />2 Bathrooms</span>
                <span className="flex items-center gap-1 text-sm md:text-base"><Ruler className="w-4 h-4 md:w-5 md:h-5 text-primary" />120 sqm</span>
              </div>
              <div className="text-primary text-lg md:text-xl font-bold mb-4">From KSh 2.5M</div>
              <div className="mb-4">
                <div className="font-semibold mb-1 text-sm md:text-base">Features</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Master Ensuite Bedroom with walk-in closet, 1 bedroom with a common washroom</li>
                  <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Dining Area, Living Room, Open Plan Kitchen, Built-in Wardrobes for the two bedrooms</li>
                  <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Pantry, 500 litres Internal storage tank & 5,000 litres reserve tank</li>
                  <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Perimeter wall, Septic tank, Pit latrine, Tap stand, Floor and wall tiles</li>
                  <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />A perimeter wall equivalent to 50 by 50m, steel gate, wired with provision of security lights, Internet, CCTV and Cable TV</li>
                </ul>
              </div>
              <a href="/customer-journey" className="inline-block bg-secondary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold transition-colors mt-2 w-fit text-sm md:text-base">Inquire Now</a>
            </div>
          </div>

          {/* Three Bedroom House Card */}
          <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
            
            {/* Info */}
            <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Three Bedroom House</h3>
              <div className="flex items-center gap-6 text-gray mb-3">
                <span className="flex items-center gap-1 text-sm md:text-base"><BedDouble className="w-4 h-4 md:w-5 md:h-5 text-primary" />3 Bedrooms</span>
                <span className="flex items-center gap-1 text-sm md:text-base"><Bath className="w-4 h-4 md:w-5 md:h-5 text-primary" />2 Bathrooms</span>
                <span className="flex items-center gap-1 text-sm md:text-base"><Ruler className="w-4 h-4 md:w-5 md:h-5 text-primary" />160 sqm</span>
              </div>
              <div className="text-primary text-lg md:text-xl font-bold mb-4">From KSh 3.8M</div>
              <div className="font-semibold mb-1 text-sm md:text-base">Features</div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Master Ensuite Bedroom with walk-in closet, 2 bedrooms with a common washroom</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Dining Area, Living Room, Open Plan Kitchen, Built-in Wardrobes for the bedrooms</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Pantry, 500 litres internal storage tank & 5,000 litres reserve tank</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Foyer at the main entrance, Septic tank, Tiled floors, 2 steel doors</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />A perimeter wall equivalent to 50 by 80m, steel gate, wired with provisions of security lights, internet, CCTV and Cable TV</li>
              </ul>
              <a href="/customer-journey" className="inline-block bg-secondary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold transition-colors mt-2 w-fit text-sm md:text-base">Inquire Now</a>
            </div>
            {/* Image */}
            <div className="md:w-1/2 w-full h-72 md:h-auto relative">
              <Image
                src="/3brm/3brm_bungalow_flat_roof_mansionate.jpeg"
                alt="Three Bedroom House"
                fill
                className="object-cover w-full h-full"
                style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
                priority
              />
            </div>

          </div>

          {/* Four Bedroom House Card */}
          <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
            {/* Image */}
            <div className="md:w-1/2 w-full h-72 md:h-auto relative">
              <Image
                src="/4brm/4br_standard_flat_roof_6.png"
                alt="Four Bedroom House"
                fill
                className="object-cover w-full h-full"
                style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
                priority
              />
            </div>
            {/* Info */}
            <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Four Bedroom House</h3>
              <div className="flex items-center gap-6 text-gray mb-3">
                <span className="flex items-center gap-1 text-sm md:text-base"><BedDouble className="w-4 h-4 md:w-5 md:h-5 text-primary" />4 Bedrooms</span>
                <span className="flex items-center gap-1 text-sm md:text-base"><Bath className="w-4 h-4 md:w-5 md:h-5 text-primary" />3 Bathrooms</span>
                <span className="flex items-center gap-1 text-sm md:text-base"><Ruler className="w-4 h-4 md:w-5 md:h-5 text-primary" />220 sqm</span>
              </div>
              <div className="text-primary text-lg md:text-xl font-bold mb-4">From KSh 5.2M</div>
              <div className="font-semibold mb-1 text-sm md:text-base">Features</div>
              <div className="mb-2 mt-2 font-semibold text-primary text-sm md:text-base">Ground Floor</div>
              <ul className="space-y-2 mb-2">
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Dining Area, Living Room, Pantry, One Bedroom ensuite</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Open Plan Kitchen, Cloakroom</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Foyer at the main entrance, 2 steel doors, 5000ltr internal storage tank & 5000l reserve tank</li>
              </ul>
              <div className="mb-2 font-semibold text-primary text-sm md:text-base">1st Floor</div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Master Ensuite Bedroom with walk-in closet and balcony</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />2 bedrooms with built-in wardrobes and a shared washroom</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />One Extra balcony, stairs, and tiled floors</li>
              </ul>
              <a href="/customer-journey" className="inline-block bg-secondary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold transition-colors mt-2 w-fit text-sm md:text-base">Inquire Now</a>
            </div>
          </div>

          {/* Five Bedroom House Card */}
          <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
            {/* Info */}
            <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Five Bedroom House</h3>
              <div className="flex items-center gap-6 text-gray mb-3">
                <span className="flex items-center gap-1 text-sm md:text-base"><BedDouble className="w-4 h-4 md:w-5 md:h-5 text-primary" />5 Bedrooms</span>
                <span className="flex items-center gap-1 text-sm md:text-base"><Bath className="w-4 h-4 md:w-5 md:h-5 text-primary" />4 Bathrooms</span>
                <span className="flex items-center gap-1 text-sm md:text-base"><Ruler className="w-4 h-4 md:w-5 md:h-5 text-primary" />280 sqm</span>
              </div>
              <div className="text-primary text-lg md:text-xl font-bold mb-4">From KSh 7.8M</div>
              <div className="font-semibold mb-1 text-sm md:text-base">Features</div>
              <div className="mb-2 mt-2 font-semibold text-primary text-sm md:text-base">Ground Floor</div>
              <ul className="space-y-2 mb-2">
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Spacious Living Room, Formal Dining Area, Open Plan Kitchen with Island</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Two Bedrooms with ensuite bathrooms, Guest Powder Room</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Home Office/Study, Pantry, Utility Room, 10,000ltr internal storage tank</li>
              </ul>
              <div className="mb-2 font-semibold text-primary text-sm md:text-base">1st Floor</div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Master Suite with walk-in closet, ensuite bathroom and private balcony</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Two additional bedrooms with built-in wardrobes and shared bathroom</li>
                <li className="flex items-start gap-2 text-gray text-xs md:text-sm lg:text-base"><CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-1" />Family Lounge, Multiple balconies, Staircase with elegant railings</li>
              </ul>
              <a href="/customer-journey" className="inline-block bg-secondary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold transition-colors mt-2 w-fit text-sm md:text-base">Inquire Now</a>
            </div>
            {/* Image */}
            <div className="md:w-1/2 w-full h-72 md:h-auto relative">
              <Image
                src="/5drm/5br_pitched_380sqm_1.png"
                alt="Five Bedroom House"
                fill
                className="object-cover w-full h-full"
                style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
                priority
              />
            </div>
          </div>
        </section>

        {/* Construction Process Section */}
        <ConstructionProcess />

        {/* Customer Journey Section */}
        <CustomerJourney />

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">Savings</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Deposit Account</h3>
              <p className="text-gray text-sm md:text-base mb-6">
                Our clients are allowed to save 30% of their Bills of Quantities in instalments via their members deposit account.
              </p>

              <h4 className="text-lg md:text-xl font-semibold mb-4">Requirements for Opening an Account</h4>
              <ul className="list-disc pl-6 text-gray text-sm md:text-base">
                <li>Registration fees</li>
                <li>Property search fees</li>
                <li>Legal fees</li>
                <li>Property charge</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold mb-6">Document Downloads (Brochures)</h3>
              <div className="space-y-4">
                <a href="/documents/PROMITTO_BANK_ACCOUNT_DETAILS.pdf" className="text-primary hover:text-secondary block text-sm md:text-base" target="_blank" rel="noopener noreferrer">
                  Promitto Bank Account Details
                </a>
                <a href="/documents/membership_application_form.pdf" className="text-primary hover:text-secondary block text-sm md:text-base" target="_blank" rel="noopener noreferrer">
                  Membership Application Form
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary p-8 rounded-lg text-white">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Ready to Start Your Homeownership Journey?</h2>
          <p className="mb-6 text-sm md:text-base">
            Our team of experienced professionals is here to help you every step of the way.
          </p>
          <a
            href="/contact"
            className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block text-sm md:text-base"
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
        className="w-full text-left text-2xl md:text-3xl font-bold text-secondary p-8 border-b focus:outline-none flex items-center justify-between bg-white"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="terms-content"
      >
        Our Terms & Conditions
        <span className="ml-4 text-xl md:text-2xl">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div id="terms-content" className="p-8 animate-fade-in">
          <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">01. Loan Security</h3>
          <p className="text-gray text-sm md:text-base mb-4">
            Borrower agrees that on or before the date of this agreement shall deliver the following document to the lender:
          </p>
          <ul className="list-disc pl-6 text-gray text-sm md:text-base mb-8">
            <li>A title deed to a parcel of land upon which the construction project will be executed.</li>
            <li>The borrower must possess a personal title deed written under his or her name.</li>
            <li>In case of the title deed belonging to a second party, the company will require written consent from the second party to use the title deed.</li>
            <li>The title deed must be free from any distress. Title deeds held up with other financing institutions shall not be accepted.</li>
            <li>If there are any family disputes concerning the title deed, Promitto will not be part and parcel of that.</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">02. Loan Terms</h3>
          <h4 className="text-lg md:text-xl font-semibold mb-4">(A) Deposits</h4>
          <ul className="list-disc pl-6 text-gray text-sm md:text-base mb-8">
            <li>The borrower shall be required to make a 30% deposit of the loan amount depending on the selected house design.</li>
            <li>In cases where the borrower is not financially ready with the minimum deposit for the construction to happen, the client will be allowed to make instalments payments but will be made to understand that the construction will only start once the minimum deposit has been attained.</li>
            <li>In a case where the client/borrower is ready with the 30% deposit, they will proceed to sign the construction agreement for the construction to commence.</li>
            <li>The client can also deposit more than the required 30% minimum deposit to kickstart the project if they chose to do so.</li>
            <li>The Company can also enter into a construction agreement with a client not seeking a loan facility for construction on the condition that the client provides the full finances to undertake the project.</li>
          </ul>

          <h4 className="text-lg md:text-xl font-semibold mb-4">(B) Loan Repayment Terms</h4>
          <ul className="list-disc pl-6 text-gray text-sm md:text-base mb-8">
            <li>The Loan shall be payable up to a maximum of seven (7) years. The exact loan term shall be as discussed and signed in the Loan application form.</li>
            <li>The loan interest rate for the construction loan will be at 12% on a reducing balance rate. With a monthly standard payment plan which the borrower is expected to honour without fail.</li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <h4 className="text-lg md:text-xl font-semibold text-secondary mb-4">A customer can default a loan in three ways:</h4>
            <ul className="list-disc pl-6 text-gray text-sm md:text-base">
              <li>If the client fails to completely repay the remaining 70% of the loan</li>
              <li>If the client fails to repay the monthly instalment as agreed.</li>
              <li>If the client fails to repay the monthly instalment on the stipulated timeline.</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg mb-8">
            <h4 className="text-lg md:text-xl font-semibold text-red-600 mb-4">Actionables</h4>
            <p className="text-gray text-sm md:text-base italic mb-4">If the client fails to repay any instalment within 60 days, the directive will be to:</p>
            <ul className="list-disc pl-6 text-gray text-sm md:text-base">
              <li>Repossess or auction the property.</li>
              <li>If the client fails to repay the loan on the agreed instalments or on the agreed timelines there will be added penalties incurred.</li>
            </ul>
          </div>

          <h4 className="text-lg md:text-xl font-semibold mb-4">(C) Expenses</h4>
          <ul className="list-disc pl-6 text-gray text-sm md:text-base">
            <li>In case the client changes any component of the construction along the way, QS will have to re-evaluate the change cost and charge the customer. This will have to be paid for immediately.</li>
            <li>In case a statutory requirement is delayed, Promitto shall not be held liable.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HowToOwn; 