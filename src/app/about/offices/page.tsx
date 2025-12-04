import React from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MediaSidebar from '../../../components/MediaSidebar';

const OfficesPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      
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
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex items-end pb-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <div className="w-1 h-16 bg-secondary mr-6"></div>
                <h1 className="hero-title text-white">
                  Our Offices
                </h1>
              </div>
              <p className="text-xl text-white font-medium leading-relaxed">
                Serving East and Southern Africa with strategic locations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Map */}
      <section className="py-20 bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-center mb-12">
                <h2 className="site-title text-gray-900">Our Global Presence</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Serving East and Southern Africa</h3>
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
                      <p className="text-secondary font-semibold">+254 729 506 506</p>
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

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <MediaSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            
            <h2 className="site-title text-gray-900">Contact Information</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="mr-2 text-primary">🏢</span>Main Office (Kenya)
              </h4>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center">
                  <span className="mr-3 text-primary">📞</span>
                  <span className="font-semibold">Phone:</span> +254 729 506 506
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-primary">✉️</span>
                  <span className="font-semibold">Email:</span> info@promittoltd.com
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-primary">🏢</span>
                  <span className="font-semibold">Office:</span> Nairobi, Loita street, Pension Towers, Floor M2
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-primary">🌐</span>
                  <span className="font-semibold">Website:</span> 
                  <a href="http://www.promittoltd.com" className="text-primary underline ml-1">www.promittoltd.com</a>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-secondary mb-4 flex items-center">
                <span className="mr-2 text-secondary">🏢</span>Zambia Branch
              </h4>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center">
                  <span className="mr-3 text-secondary">📞</span>
                  <span className="font-semibold">Phone:</span> +260 775 604 455
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-secondary">✉️</span>
                  <span className="font-semibold">Email:</span> info@promittoltd.com
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-secondary">🏢</span>
                  <span className="font-semibold">Office:</span> Lusaka, Chindo Rd, Woodlands shopping mall, 1st floor
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-secondary">🌐</span>
                  <span className="font-semibold">Website:</span> 
                  <a href="http://www.promittoltd.com" className="text-secondary underline ml-1">www.promittoltd.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OfficesPage;
