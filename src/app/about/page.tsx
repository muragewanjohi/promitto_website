import React from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-white to-secondary/10 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full"></div>
            <div className="absolute top-32 right-20 w-24 h-24 bg-secondary rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                About Promitto Limited
              </h1>
            </div>
            <p className="text-2xl text-gray-800 mb-6 font-medium leading-relaxed">
              Delivering the promise of homeownership through innovative construction financing and comprehensive project management.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Promitto is your one-stop shop for turning your dream of homeownership into reality. We provide construction cash flow help for both residential and commercial projects, and our comprehensive services include site visits, cost estimates (BQ preparation), 3D architectural and structural drawings, securing approvals, and doing the construction for you.
            </p>
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
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Key Statistics</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Understanding the scale of Kenya's housing challenge and our impact</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l1.553-1.553A2 2 0 017.172 8h9.656a2 2 0 011.619.447L21 10m-9 4v6m0 0h4m-4 0H7" />
                    </svg>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">200,000+</div>
                </div>
                <div className="text-gray-700 font-medium">Housing Units Needed Annually</div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-secondary/80 rounded-full mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" />
                    </svg>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent mb-2">50+</div>
                </div>
                <div className="text-gray-700 font-medium">Homes Constructed Annually in Kenya</div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2" />
                    </svg>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">2M+</div>
                </div>
                <div className="text-gray-700 font-medium">Total Housing Deficit</div>
              </div>
            </div>
          </div>
        </section>

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
                  <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-primary">
                    <div className="flex items-start space-x-4">
                      <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h6 className="font-bold text-gray-900 text-lg mb-2">Kenya - Main Office</h6>
                        <p className="text-gray-600 mb-1">Pension Towers, Nairobi Loita street, Floor M2</p>
                        <p className="text-primary font-semibold">+254 729 506 506</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-secondary">
                    <div className="flex items-start space-x-4">
                      <div className="w-4 h-4 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h6 className="font-bold text-gray-900 text-lg mb-2">Zambia - Branch Office</h6>
                        <p className="text-gray-600 mb-1">Woodlands shopping mall, 1st floor</p>
                        <p className="text-secondary font-semibold">+260 775 604 455</p>
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

        {/* Technical Expertise */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold text-gray-900">Our Technical Capacity</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h5 className="text-xl font-bold text-primary mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Core Departments
                </h5>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900">Project Management Department:</span>
                      <span className="text-secondary font-bold ml-2">5 team members</span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900">Architectural & Interior Designers:</span>
                      <span className="text-secondary font-bold ml-2">5 engineers</span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900">Quantity Survey Department:</span>
                      <span className="text-secondary font-bold ml-2">4 Quantity Surveyors</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h5 className="text-xl font-bold text-primary mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V7a4 4 0 00-8 0v2m8 4a4 4 0 01-8 0" />
                  </svg>
                  Support Departments
                </h5>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-secondary rounded-full flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900">Account Management Department:</span>
                      <span className="text-primary font-bold ml-2">6 account managers</span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-secondary rounded-full flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900">Engineering Department:</span>
                      <span className="text-primary font-bold ml-2">2 Engineers</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Management Team */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <span className="inline-block bg-purple-100 p-3 rounded-full mr-3">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V7a4 4 0 00-8 0v2m8 4a4 4 0 01-8 0" /></svg>
              </span>
              <h4 className="text-3xl font-bold text-gray-900">Our Management Team</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Jimmy Kagoni', title: 'Chief Executive Officer', img: '/images/board/jimmy-kagoni.png' },
                { name: 'Innocent Ongeri', title: 'Operations Manager' },
                { name: 'Machira Minyati', title: 'Project Manager' },
                { name: 'Steve Kihara', title: 'Chief Finance Officer' },
                { name: 'Anastaciah Wajohi', title: 'Head of Customer Service' },
                { name: 'David Mwangi', title: 'Risk Manager' },
                { name: 'Adreen Gichore', title: 'Chief of Staff & Head of Credit Management' },
              ].map((member, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-6 text-center">
                  {member.img ? (
                    <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200">
                      <Image
                        src={member.img}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-700 font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-[#F59E0B] text-base">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Board Members Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <span className="inline-block bg-orange-100 p-3 rounded-full mr-3">
                <svg className="w-8 h-8 text-[#F59E0B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V7a4 4 0 00-8 0v2m8 4a4 4 0 01-8 0" /></svg>
              </span>
              <h4 className="text-3xl font-bold text-gray-900">Board Members</h4>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {/* Dr. Olufunso Somorin */}
              <div className="text-center bg-gray-50 rounded-xl shadow p-6">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-200">
                  <Image
                    src="/images/board/olufunso-somorin.png"
                    alt="Dr. Olufunso Somorin"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Dr. Olufunso Somorin</h4>
                <p className="text-[#F59E0B]">Overall Chairman</p>
              </div>
              {/* Mark Muema */}
              <div className="text-center bg-gray-50 rounded-xl shadow p-6">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-200">
                  <Image
                    src="/images/board/mark-muema.png"
                    alt="Mark Muema"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Mark Muema</h4>
                <p className="text-[#F59E0B]">Chairman, Finance and HR Subcommittee</p>
              </div>
              {/* Waceke Munene */}
              <div className="text-center bg-gray-50 rounded-xl shadow p-6">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-200">
                  <Image
                    src="/images/board/waceke-munene.png"
                    alt="Waceke Munene"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Waceke Munene</h4>
                <p className="text-[#F59E0B]">IT & Operations Subcommittee</p>
              </div>
              {/* Jimmy Kagoni */}
              <div className="text-center bg-gray-50 rounded-xl shadow p-6">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-200">
                  <Image
                    src="/images/board/jimmy-kagoni.png"
                    alt="Jimmy Kagoni"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Jimmy Kagoni</h4>
                <p className="text-[#F59E0B]">Secretary to the Board</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Breakdown */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center mb-8">
              <span className="inline-block bg-orange-100 p-3 rounded-full mr-3">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
              </span>
              <h4 className="text-3xl font-bold text-gray-900">Our Services</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
                <span className="inline-block bg-blue-100 p-3 rounded-full mb-2">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
                </span>
                <h4 className="text-xl font-bold text-blue-700 mb-2">Construction Project Management</h4>
                <p className="text-gray-700">We oversee everything about our client's project from site visit, construction monitoring, and even getting all construction approvals.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
                <span className="inline-block bg-green-100 p-3 rounded-full mb-2">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                </span>
                <h4 className="text-xl font-bold text-blue-700 mb-2">Design Consultancy</h4>
                <p className="text-gray-700">We offer site analysis, conceptual and schematic design, design development, overseeing of interior design, cost estimation, and creation of a detailed Bill of Quantities to our clients.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
                <span className="inline-block bg-orange-100 p-3 rounded-full mb-2">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <h4 className="text-xl font-bold text-blue-700 mb-2">Jenga Nyumba Loan Product</h4>
                <p className="text-gray-700">We provide affordable and sustainable loan products that fund up to 70% of the total construction cost, geared towards providing affordable housing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Requirements */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center mb-8">
              <span className="inline-block bg-blue-100 p-3 rounded-full mr-3">
                <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              <h4 className="text-3xl font-bold text-gray-900">Registration Requirements</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-blue-700 mb-2 flex items-center"><span className="mr-2">👤</span>Individual</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Passport Photos</li>
                  <li>National ID</li>
                  <li>Title Deed</li>
                  <li>Desired House Plan</li>
                  <li>Registration Fee of Ksh. 30,000</li>
                  <li>KRA Certificate</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-blue-700 mb-2 flex items-center"><span className="mr-2">🏢</span>Corporate</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Directors Passport Photos</li>
                  <li>Directors National ID</li>
                  <li>Directors KRA Certificate</li>
                  <li>Title Deed copy</li>
                  <li>Certificate of Incorporation</li>
                  <li>Company PIN Certificate</li>
                  <li>CR</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Funding Model */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center mb-8">
              <span className="inline-block bg-green-100 p-3 rounded-full mr-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
              </span>
              <h4 className="text-3xl font-bold text-gray-900">Funding Model</h4>
            </div>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><span className="mr-2">💵</span><span className="font-semibold">Deposit Required:</span> At least 30% of the total project cost</li>
              <li><span className="mr-2">💸</span><span className="font-semibold">Loan to be Advanced:</span> Up to 70% of the total project cost</li>
              <li><span className="mr-2">⏳</span><span className="font-semibold">Repayment Period:</span> 1-10 years for commercial units & 1-7 years for residential homes</li>
              <li><span className="mr-2">📉</span><span className="font-semibold">Interest Rate:</span> 12% per annum on reducing balance</li>
              <li><span className="mr-2">🧾</span><span className="font-semibold">Loan Fees/Charges:</span> 5% of loan advanced to cover insurance, appraisal, and legal costs</li>
              <li><span className="mr-2">🕒</span><span className="font-semibold">Repayment Grace Period:</span> 30 days from the date of site mobilization</li>
            </ul>
          </div>
        </section>

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