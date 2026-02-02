import React from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MediaSidebar from '../../components/MediaSidebar';
import CompetitiveAdvantages from '../../components/CompetitiveAdvantages';
import KeyStatistics from '../../components/KeyStatistics';
import Services from '../../components/Services';
import FundingHighlights from '../../components/FundingHighlights';
import TrustSection from '../../components/TrustSection';
import Testimonials from '../../components/Testimonials';

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      <div>
        {/* Hero Section */}
        <section className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/about_us_hero_image.jpeg"
              alt="About Promitto Limited"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
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
                    <h1 className="hero-title text-white">
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

        {/* Purpose, Mission, Values & Vision Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Purpose */}
                  <div className="bg-primary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <div className="relative h-48 flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Enriching Lives - Happy Family in New Home"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                        quality={75}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                    </div>
                    <div className="bg-primary p-6 flex-1 flex flex-col justify-start">
                      <h3 className="text-xl font-bold text-secondary mb-3">OUR PURPOSE</h3>
                      <p className="text-white font-semibold text-base">Enriching Lives</p>
                    </div>
                  </div>

                  {/* Mission */}
                  <div className="bg-primary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <div className="relative h-48 flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Construction and Building Homes"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                        quality={75}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
                    </div>
                    <div className="bg-primary p-6 flex-1 flex flex-col justify-start">
                      <h3 className="text-xl font-bold text-secondary mb-3">OUR MISSION</h3>
                      <p className="text-white text-base">To advance housing affordability through innovative funding structures, efficient project delivery frameworks, and robust governance systems that promote sustainable homeownership.</p>
                    </div>
                  </div>

                  {/* Values */}
                  <div className="bg-primary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <div className="relative h-48 flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Construction Teamwork"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                        quality={75}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                    </div>
                    <div className="bg-primary p-6 flex-1 flex flex-col justify-start">
                      <h3 className="text-xl font-bold text-secondary mb-3">CORE VALUES</h3>
                      <ul className="text-white space-y-1 text-base">
                        <li><span className="font-bold text-secondary">I</span>ntegrity</li>
                        <li><span className="font-bold text-secondary">A</span>gility</li>
                        <li><span className="font-bold text-secondary">O</span>perational Excellence</li>
                        <li><span className="font-bold text-secondary">I</span>nnovation</li>
                        <li><span className="font-bold text-secondary">T</span>ransparency</li>
                        <li><span className="font-bold text-secondary">I</span>mpact</li>
                      </ul>
                    </div>
                  </div>

                  {/* Vision */}
                  <div className="bg-primary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <div className="relative h-48 flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Modern Housing Development Vision"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                        quality={75}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
                    </div>
                    <div className="bg-primary p-6 flex-1 flex flex-col justify-start">
                      <h3 className="text-xl font-bold text-secondary mb-3">OUR VISION</h3>
                      <p className="text-white text-base">To empower individuals to become homeowners.</p>
                    </div>
                  </div>

                  {/* Business Model */}
                  <div className="bg-primary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <div className="relative h-48 flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80"
                        alt="Affordable path to homeownership - keys and financing"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        quality={75}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                    </div>
                    <div className="bg-primary p-6 flex-1 flex flex-col justify-start">
                      <h3 className="text-xl font-bold text-secondary mb-3">BUSINESS MODEL</h3>
                      <p className="text-white text-base">Minimum of 30% project cost deposit with balance payable within 7 years.</p>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="bg-primary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <div className="relative h-48 flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Eligibility requirements - documents and criteria"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        quality={75}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
                    </div>
                    <div className="bg-primary p-6 flex-1 flex flex-col justify-start">
                      <h3 className="text-xl font-bold text-secondary mb-3">ELIGIBILITY</h3>
                      <ul className="text-white space-y-2 text-base">
                        <li>Clean title deed.</li>
                        <li>Ability to raise 30% of the total project cost.</li>
                        <li>Ability to repay 70% for a period of up to 7 years.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:sticky lg:top-24 lg:h-fit">
                <MediaSidebar />
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
                  
                  <h2 className="site-title text-gray-900">Our Story & The Housing Context</h2>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  Kenya faces a significant housing deficit, with over <span className="font-semibold text-primary">2 million units needed</span> and an annual demand gap of <span className="font-semibold text-secondary">200,000 homes</span>. While initiatives like the Affordable Housing Programme have made strides, challenges related to cost, financing, and regulatory inefficiencies persist. This gap presents a tremendous opportunity for Promitto to expand its reach and help address this crisis.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Promitto was founded to bridge this gap by providing affordable construction financing and end-to-end project management. Our approach empowers individuals and businesses to build homes and commercial properties with minimal upfront investment, making homeownership accessible to more Kenyans.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden flex items-center justify-center bg-black">
                <video
                  width="100%"
                  height="100%"
                  controls
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/media/about_us_vid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
              
              <h2 className="site-title text-gray-900">Our Global Presence</h2>
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  quality={75}
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

        {/* Trust & Credibility */}
        <TrustSection />

        {/* Testimonials */}
        <Testimonials />

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
