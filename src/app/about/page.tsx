import React from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CompetitiveAdvantages from '../../components/CompetitiveAdvantages';
import KeyStatistics from '../../components/KeyStatistics';
import Services from '../../components/Services';
import FundingHighlights from '../../components/FundingHighlights';

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      <div>
        {/* Hero Section */}
        <section className="relative h-[500px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/about_us_hero_image.jpeg"
              alt="About Promitto Limited"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-end pb-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <div className="flex items-center mb-6">
                  {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mr-6 shadow-xl border border-white/30">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                    </svg>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                    About Promitto Limited
                  </h1> */}
                </div>
                
                                 <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-1 h-16 bg-secondary mr-6"></div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                      About Us
                    </h1>
                  </div>
                   <p className="text-xl md:text-2xl text-white font-medium leading-relaxed max-w-2xl">
                     Delivering the promise of homeownership through innovative construction financing and comprehensive project management.
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Story & Context */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5a2 2 0 00-2-2H6a2 2 0 00-2 2v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900">Our Story & The Housing Context</h4>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  Kenya faces a significant housing deficit, with over <span className="font-semibold text-primary">2 million units needed</span> and an annual demand gap of <span className="font-semibold text-secondary">200,000 homes</span>. While initiatives like the Affordable Housing Programme have made strides, challenges related to cost, financing, and regulatory inefficiencies persist. This gap presents a tremendous opportunity for Promitto to expand its reach and help address this crisis.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Promitto was founded to bridge this gap by providing affordable construction financing and end-to-end project management. Our approach empowers individuals and businesses to build homes and commercial properties with minimal upfront investment, making homeownership accessible to more Kenyans.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden flex items-center justify-center bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/FMRvwAfwk48"
                  title="Promitto Story Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <KeyStatistics />

        {/* Global Presence Map */}
        <section className="py-20 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold text-gray-900">Our Global Presence</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h5 className="text-2xl font-bold text-gray-900 mb-6">Serving East and Southern Africa</h5>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                  Promitto has established a strong presence across East and Southern Africa, with offices in Kenya and Zambia. Our regional footprint allows us to serve clients across multiple markets while maintaining our commitment to quality and innovation.
                </p>
                <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-primary hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Kenya - Main Office</h4>
                      <p className="text-gray-600 mb-1"> Nairobi, Loita street, Pension Towers, Floor M2</p>
                      <p className="text-primary font-semibold">+254 729 506 506</p>
                      <p className="text-gray-600 text-sm mt-2">Email: info@promittoltd.com</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-secondary hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Zambia - Branch Office</h4>
                      <p className="text-gray-600 mb-1">Lusaka, Chindo Rd, Woodlands shopping mall, 1st floor</p>
                      <p className="text-secondary font-semibold">+260 775 604 455</p>
                      <p className="text-gray-600 text-sm mt-2">Email: info@promittoltd.com</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
                <Image
                  src="/images/maps.jpeg"
                  alt="Promitto Global Presence Map showing Kenya and Zambia"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>



        {/* Competitive Advantages */}
        <CompetitiveAdvantages />



        {/* Enhanced Services Section */}
        <Services />



        {/* Enhanced Funding Highlights Section */}
        <FundingHighlights />

        {/* Contact Information */}
        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center mb-8">
              <span className="inline-block bg-blue-100 p-3 rounded-full mr-3">
                <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 2a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2h8zm-4 18v-2m0-4v-4m0-4V4" /></svg>
              </span>
              <h4 className="text-3xl font-bold text-gray-900">Contact Information</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-blue-700 mb-2 flex items-center"><span className="mr-2">🇰🇪</span>Main Office (Kenya)</h4>
                <ul className="text-gray-700 space-y-2">
                  <li><span className="mr-2">📞</span><span className="font-semibold">Phone:</span> +254 729 506 506</li>
                  <li><span className="mr-2">✉️</span><span className="font-semibold">Email:</span> info@promittoltd.com</li>
                  <li><span className="mr-2">🏢</span><span className="font-semibold">Office:</span> Pension Towers, Nairobi Loita street, Floor M2</li>
                  <li><span className="mr-2">🌐</span><span className="font-semibold">Website:</span> <a href="http://www.promittoltd.com" className="text-blue-600 underline">www.promittoltd.com</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-blue-700 mb-2 flex items-center"><span className="mr-2">🇿🇲</span>Zambia Branch</h4>
                <ul className="text-gray-700 space-y-2">
                  <li><span className="mr-2">📞</span><span className="font-semibold">Phone:</span> +260 775 604 455</li>
                  <li><span className="mr-2">✉️</span><span className="font-semibold">Email:</span> info@promittoltd.com</li>
                  <li><span className="mr-2">🏢</span><span className="font-semibold">Office:</span> Woodlands shopping mall, 1st floor</li>
                  <li><span className="mr-2">🌐</span><span className="font-semibold">Website:</span> <a href="http://www.promittoltd.com" className="text-blue-600 underline">www.promittoltd.com</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section> */}
      </div>
      <Footer />
    </main>
  );
};

export default AboutUs; 
