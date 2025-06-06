import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[url('/hero-house.jpg')] bg-cover bg-center">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/50" />

      {/* Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Beautiful homes made for you
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Discover the perfect home with Promitto's extensive project listings
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/properties"
                className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Completed Projects
              </Link>
              <Link
                href="/how-to-own"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#1E40AF] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Own A Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 