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
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  const heroImages = [
    '/slider/2bdrm.png',
    '/slider/3bdrm.png',
    '/slider/4bdrm.png',
    '/slider/5bdrm.png',
    '/slider/5bdrm_2.png'
  ];

  const heroTitles = [
    "Find Your Dream Home",
    "Luxury Living Redefined",
    "Quality Homes, Quality Life",
    "Building Dreams Into Reality",
    "Premium Projects, Premium Service"
  ];

  const heroDescriptions = [
    "Discover exceptional Projects designed for modern living with Promitto's premium real estate solutions.",
    "Experience luxury and comfort in our carefully crafted residential developments across Kenya and Zambia.",
    "From cozy bungalows to elegant mansions, find your perfect home with our diverse property portfolio.",
    "Transform your homeownership dreams into reality with our innovative financing and construction solutions.",
    "Join thousands of satisfied homeowners who chose Promitto for their perfect home investment."
  ];

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length, mounted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchQuery.trim()) searchParams.append('search', searchQuery.trim());
    if (propertyType !== 'all') searchParams.append('type', propertyType);
    if (location.trim()) searchParams.append('location', location.trim());
    
    const queryString = searchParams.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <section className="relative min-h-screen overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" style={{ zIndex: 1 }} />
        <div className="relative min-h-screen flex items-center" style={{ zIndex: 2 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white space-y-12">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-16 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-8 bg-white/20 rounded animate-pulse max-w-2xl mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background Images with Fade Transition */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: 1 }}
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
      <div className="relative min-h-screen flex items-center" style={{ zIndex: 2 }}>
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
                        <option value="all">All Projects</option>
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
                        placeholder="Search Projects..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 text-base font-medium"
                      />
                      <MagnifyingGlassIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    </div>

                    {/* Search Button */}
                    <button 
                      type="submit"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-xl transition-all duration-300 text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Search Projects
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Link
                href="/properties"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
              >
                Browse Projects
              </Link>
              <Link
                href="/how-to-own"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-primary text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                How to Own
              </Link>
            </div>

            {/* YouTube Video */}
            <div className="w-full max-w-3xl mx-auto pt-12">
              <div className="relative h-[240px] md:h-[320px] rounded-xl overflow-hidden flex items-center justify-center bg-black shadow-2xl">
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