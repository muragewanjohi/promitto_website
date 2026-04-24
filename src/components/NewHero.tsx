'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NewHero = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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
    "Promitto Ltd helps you achieve your homeownership goals or your landlord dreams with our affordable construction solutions and 70% financing to cover most of your project costs.",
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

  // Preload next image before it's needed
  useEffect(() => {
    if (!mounted) return;
    const nextIndex = (currentImageIndex + 1) % heroImages.length;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImages[nextIndex];
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [currentImageIndex, mounted, heroImages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/properties');
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <section className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" style={{ zIndex: 1 }} />
        <div className="relative h-full flex items-center" style={{ zIndex: 2 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white space-y-6">
              <div className="space-y-4">
                <div className="h-12 bg-white/20 rounded animate-pulse max-w-2xl mx-auto"></div>
                <div className="h-6 bg-white/20 rounded animate-pulse max-w-xl mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background Images with Fade Transition */}
      {heroImages.map((image, index) => {
        // Only render visible image and next one for smooth transition
        const isVisible = index === currentImageIndex;
        const isNext = index === (currentImageIndex + 1) % heroImages.length;
        const shouldLoad = isVisible || isNext || index === 0;
        
        if (!shouldLoad) return null;
        
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: 1 }}
          >
            <Image
              src={image}
              alt={`Hero image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={index === 0 ? 90 : 75}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
          </div>
        );
      })}

      {/* Content */}
      <div className="relative h-full flex items-center" style={{ zIndex: 2 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left text-white space-y-4 lg:space-y-6">
              {/* Main Content */}
              <div className="space-y-3 lg:space-y-4">
                <h1 className="hero-title text-shadow-lg">
                  {heroTitles[currentImageIndex]}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto lg:mx-0 text-shadow-md">
                  {heroDescriptions[currentImageIndex]}
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-2xl mx-auto lg:mx-0 pt-2">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search by location, project name..."
                    className="w-full pl-10 sm:pl-12 pr-16 sm:pr-24 py-2.5 sm:py-3 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base shadow-lg"
                  />
                  {searchQuery && (
                    <button 
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"
                  >
                    Search
                  </button>
                  <svg
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </form>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/properties"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                >
                  Browse Projects
                </Link>
                <Link
                  href="/how-to-own"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  How to Own
                </Link>
              </div>
            </div>

            {/* YouTube Video - Right Side */}
            <div className="flex-shrink-0 w-full sm:w-[300px] lg:w-[360px] xl:w-[400px] visible">
              <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[220px] xl:h-[240px] rounded-xl overflow-hidden bg-black shadow-2xl" style={{ minHeight: '180px' }}>
                <iframe
                  src="https://www.youtube.com/embed/FMRvwAfwk48"
                  title="Promitto Story Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${
              index === currentImageIndex 
                ? 'bg-secondary scale-125 shadow-secondary/50' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default NewHero;