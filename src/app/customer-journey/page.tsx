import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import React from 'react';

export default function CustomerJourney() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your Journey to
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Homeownership</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our proven 7-step process to turn your dream home into reality with Promitto
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Customer Journey Steps
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Account Opening",
                      description: "Create your account and complete initial registration",
                      icon: "👤",
                      color: "from-primary to-primary/80"
                    },
                    {
                      step: 2,
                      title: "Site Visit",
                      description: "Our team visits your property for assessment",
                      icon: "🏠",
                      color: "from-secondary to-secondary/80"
                    },
                    {
                      step: 3,
                      title: "Design Discussion",
                      description: "Collaborate on your perfect home design",
                      icon: "✏️",
                      color: "from-primary to-primary/80"
                    },
                    {
                      step: 4,
                      title: "Bill of Quantities Discussion",
                      description: "Detailed cost breakdown and planning",
                      icon: "📋",
                      color: "from-secondary to-secondary/80"
                    },
                    {
                      step: 5,
                      title: "Project Mobilization",
                      description: "Team assembly and resource preparation",
                      icon: "🚀",
                      color: "from-primary to-primary/80"
                    },
                    {
                      step: 6,
                      title: "Project Implementation",
                      description: "Construction begins with regular updates",
                      icon: "🏗️",
                      color: "from-secondary to-secondary/80"
                    },
                    {
                      step: 7,
                      title: "Project Handover",
                      description: "Final inspection and key handover",
                      icon: "🎉",
                      color: "from-primary to-primary/80"
                    }
                  ].map((item, index) => (
                    <div key={item.step} className="flex items-start gap-6 group">
                      {/* Step Number */}
                      <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        {item.step}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{item.icon}</span>
                          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                      
                      {/* Connector Line */}
                      {index > 0 && index < 6 && (
                        <div className="absolute left-7 top-14 w-0.5 h-16 bg-gradient-to-b from-primary/30 to-secondary/30"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Registration Requirements */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Registration Requirements
                </h2>
                
                <ul className="space-y-4">
                  {[
                    { text: "Passport Photo", icon: "📷" },
                    { text: "Copy of National ID", icon: "🆔" },
                    { text: "Copy of KRA Certificate", icon: "📄" },
                    { text: "Copy of Title Deed", icon: "🏛️" },
                    { text: "Desired House Plans", icon: "📐" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/90">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </li>
                  ))}
                  
                  <li className="pt-4 border-t border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">💰</span>
                      <span className="font-bold">Application/Membership Fee</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                      <span className="text-2xl font-bold">KES 30,000</span>
                      <p className="text-sm text-white/80 mt-1">
                        Covers site visit, property search & Bill of Quantities
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Start?</h3>
              <p className="text-gray-600 mb-6">Begin your journey to homeownership today</p>
              <a 
                href="/signup" 
                className="inline-block bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Proceed to Sign Up
              </a>
            </div>
          </div>
        </div>

        {/* Building Image - only on large screens */}
        <div className="hidden lg:block absolute bottom-8 right-8 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image src="/images/Agnes/7.jpg" alt="Project Building" fill className="object-cover" />
        </div>
      </main>
      <Footer />
    </div>
  );
} 