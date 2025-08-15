import React from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const RequirementsPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
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
        <div className="relative z-10 h-full flex items-end pb-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Registration Requirements
              </h1>
              <p className="text-xl text-white font-medium leading-relaxed">
                Everything you need to get started with your construction project
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <span className="inline-block bg-blue-100 p-3 rounded-full mr-3">
              <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Registration Requirements</h2>
          </div>
          
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To begin your journey with Promitto, please ensure you have all the required documents ready. 
              The registration fee is Ksh. 30,000 for both individual and corporate registrations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
                <span className="mr-3 text-3xl">👤</span>Individual Registration
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Passport Photos</span>
                    <p className="text-gray-600 text-sm mt-1">Recent passport-sized photographs</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">National ID</span>
                    <p className="text-gray-600 text-sm mt-1">Valid Kenyan National Identity Card</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Title Deed</span>
                    <p className="text-gray-600 text-sm mt-1">Original or certified copy of land title deed</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Desired House Plan</span>
                    <p className="text-gray-600 text-sm mt-1">Preferred house design or layout</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Registration Fee</span>
                    <p className="text-gray-600 text-sm mt-1">Ksh. 30,000 registration fee</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">KRA Certificate</span>
                    <p className="text-gray-600 text-sm mt-1">Kenya Revenue Authority PIN certificate</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <span className="mr-3 text-3xl">🏢</span>Corporate Registration
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Directors Passport Photos</span>
                    <p className="text-gray-600 text-sm mt-1">Recent photos of all company directors</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Directors National ID</span>
                    <p className="text-gray-600 text-sm mt-1">Valid IDs of all company directors</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Directors KRA Certificate</span>
                    <p className="text-gray-600 text-sm mt-1">KRA PIN certificates for all directors</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Title Deed Copy</span>
                    <p className="text-gray-600 text-sm mt-1">Copy of land title deed</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Certificate of Incorporation</span>
                    <p className="text-gray-600 text-sm mt-1">Official company registration certificate</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Company PIN Certificate</span>
                    <p className="text-gray-600 text-sm mt-1">Company's KRA PIN certificate</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">CR (Certificate of Registration)</span>
                    <p className="text-gray-600 text-sm mt-1">Company registration certificate</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Contact our team to begin your registration process or if you have any questions about the requirements.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-primary mb-4">📞 Contact Us</h4>
              <p className="text-gray-700 mb-2">Kenya: +254 729 506 506</p>
              <p className="text-gray-700 mb-2">Zambia: +260 775 604 455</p>
              <p className="text-gray-700">Email: info@promittoltd.com</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-secondary mb-4">🏢 Visit Our Offices</h4>
              <p className="text-gray-700 mb-2">Kenya: Pension Towers, Nairobi Loita street, Floor M2</p>
              <p className="text-gray-700">Zambia: Woodlands shopping mall, 1st floor</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RequirementsPage;
