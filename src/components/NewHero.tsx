'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, MapPinIcon, HomeIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const NewHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('');
  const router = useRouter();
  
  const heroImages = [
    '/hero-house.jpg',
    '/images/house_designs/4b_hybrid.jpg',
    '/images/house_designs/3b_bungalowjpg2.jpg',
    '/images/house_designs/2b_bungalowjpg2.jpg',
    '/5_br_pitched_roof_mansion.jpeg'
  ];

  const heroTitles = [
    "Find Your Dream Home",
    "Luxury Living Redefined",
    "Quality Homes, Quality Life",
    "Building Dreams Into Reality",
    "Premium Properties, Premium Service"
  ];

  const heroDescriptions = [
    "Discover exceptional properties designed for modern living with Promitto's premium real estate solutions.",
    "Experience luxury and comfort in our carefully crafted residential developments across Kenya and Zambia.",
    "From cozy bungalows to elegant mansions, find your perfect home with our diverse property portfolio.",
    "Transform your homeownership dreams into reality with our innovative financing and construction solutions.",
    "Join thousands of satisfied homeowners who chose Promitto for their perfect home investment."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchQuery.trim()) searchParams.append('search', searchQuery.trim());
    if (propertyType !== 'all') searchParams.append('type', propertyType);
    if (location.trim()) searchParams.append('location', location.trim());
    
    const queryString = searchParams.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images with Fade Transition */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Hero image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        </div>
      ))}

      {/* Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white space-y-12">
            {/* Main Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-shadow-lg">
                  {heroTitles[currentImageIndex]}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-5xl mx-auto text-shadow-md">
                  {heroDescriptions[currentImageIndex]}
                </p>
              </div>
            </div>

            {/* Advanced Search Bar */}
            <div className="w-full max-w-5xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-2">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    {/* Property Type */}
                    <div className="relative">
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-gray-900 focus:outline-none focus:ring-0 text-base font-medium appearance-none"
                      >
                        <option value="all">All Properties</option>
                        <option value="House">Houses</option>
                        <option value="Apartment">Apartments</option>
                        <option value="Villa">Villas</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                      <HomeIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    </div>

                    {/* Location */}
                    <div className="relative">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 text-base font-medium"
                      />
                      <MapPinIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    </div>

                    {/* Search Query */}
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search properties..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 text-base font-medium"
                      />
                      <MagnifyingGlassIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    </div>

                    {/* Search Button */}
                    <button 
                      type="submit"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-xl transition-all duration-300 text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Search Properties
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Quick Stats
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-secondary mb-2">500+</div>
                <div className="text-lg font-semibold text-shadow-sm">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-secondary mb-2">1000+</div>
                <div className="text-lg font-semibold text-shadow-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-secondary mb-2">15+</div>
                <div className="text-lg font-semibold text-shadow-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-secondary mb-2">24/7</div>
                <div className="text-lg font-semibold text-shadow-sm">Support</div>
              </div>
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Link
                href="/properties"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
              >
                Browse Properties
              </Link>
              <Link
                href="/how-to-own"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-primary text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                How to Own
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
              index === currentImageIndex 
                ? 'bg-secondary scale-125 shadow-secondary/50' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/80 rounded-full flex justify-center shadow-lg">
          <div className="w-1 h-4 bg-white rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
