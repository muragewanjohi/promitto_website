"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PropertyDesign {
  id: string;
  name: string;
  bedrooms: number;
  roofType: string;
  imagePath: string;
  area: string;
  description?: string;
  features?: string[];
}

const FeaturedDesigns = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Sample property designs data
  const designs: PropertyDesign[] = [
    {
      id: '2brm-1',
      name: '2 Bedroom Bungalow - Flat Roof',
      bedrooms: 2,
      roofType: 'Flat Roofed',
      imagePath: '/2brm/2bdrm_bungalow_flat_roof.jpeg',
      area: '120 sqm',
      description: 'Modern 2-bedroom bungalow with flat roof design, perfect for small families.',
      features: ['2 Bedrooms', '2 Bathrooms', 'Open Plan Living', 'Kitchen', 'Parking Space']
    },
    {
      id: '3brm-1',
      name: '3 Bedroom Bungalow - Hidden Roof',
      bedrooms: 3,
      roofType: 'Hidden Roof',
      imagePath: '/3brm/3brm_bungalow_hidden_roof.jpeg',
      area: '150 sqm',
      description: 'Contemporary 3-bedroom bungalow featuring a hidden roof design.',
      features: ['3 Bedrooms', '3 Bathrooms', 'Modern Design', 'Kitchen', 'Garden Space']
    },
    {
      id: '4brm-1',
      name: '4 Bedroom Hybrid - Pitched Roof',
      bedrooms: 4,
      roofType: 'Pitched Roof',
      imagePath: '/4brm/4br_HYBRID_4BEDROOM pitched.png',
      area: '200 sqm',
      description: 'Spacious 4-bedroom hybrid design with pitched roof for larger families.',
      features: ['4 Bedrooms', '4 Bathrooms', 'Large Living Area', 'Kitchen', 'Garden']
    },
    {
      id: '5brm-1',
      name: '5 Bedroom Mansion - Pitched Roof',
      bedrooms: 5,
      roofType: 'Pitched Roof',
      imagePath: '/5drm/5_bdrm_mansion_pitched_roof.jpeg',
      area: '280 sqm',
      description: 'Luxury 5-bedroom mansion with pitched roof design for premium living.',
      features: ['5 Bedrooms', '5 Bathrooms', 'Luxury Design', 'Large Kitchen', 'Premium Features']
    },
    {
      id: '2brm-2',
      name: '2 Bedroom Bungalow - Hidden Roof',
      bedrooms: 2,
      roofType: 'Hidden Roof',
      imagePath: '/2brm/2bdrm_bungalow_hidden_roof.jpeg',
      area: '125 sqm',
      description: 'Elegant 2-bedroom bungalow with hidden roof styling.',
      features: ['2 Bedrooms', '2 Bathrooms', 'Elegant Design', 'Kitchen', 'Outdoor Space']
    },
    {
      id: '3brm-2',
      name: '3 Bedroom Bungalow - Flat Roof',
      bedrooms: 3,
      roofType: 'Flat Roofed',
      imagePath: '/3brm/3brm_bungalow_flat_roof.jpeg',
      area: '160 sqm',
      description: 'Modern 3-bedroom bungalow with flat roof design.',
      features: ['3 Bedrooms', '3 Bathrooms', 'Modern Design', 'Kitchen', 'Balcony']
    }
  ];

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(prev => {
      if (prev === 0) {
        return Math.max(0, designs.length - 3);
      }
      return Math.max(0, prev - 3);
    });
  };

  const handleNext = () => {
    setCurrentIndex(prev => {
      if (prev + 3 >= designs.length) {
        return 0;
      }
      return prev + 3;
    });
  };

  const visibleDesigns = designs.slice(currentIndex, currentIndex + 3);

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center flex-1">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mr-4"></div>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center flex-1">
            <h2 className="text-3xl font-bold text-primary mr-4">Featured Designs</h2>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <Link
              href="/property-designs"
              className="text-primary font-semibold uppercase hover:text-secondary transition-colors border-b-2 border-red-500 pb-1"
            >
              VIEW ALL
            </Link>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrevious}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={designs.length <= 3}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={designs.length <= 3}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleDesigns.map((design) => (
            <div key={design.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-64">
                <Image
                  src={design.imagePath}
                  alt={design.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {design.bedrooms} BR
                </div>
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {design.area}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{design.name}</h3>
                <p className="text-gray-600 mb-4">{design.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{design.roofType}</span>
                  <Link
                    href={`/property-designs/${design.id}`}
                    className="text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;
