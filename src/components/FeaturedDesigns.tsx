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
  area?: string;
  description?: string;
  features?: string[];
}

const FeaturedDesigns = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample featured designs from property-designs page
  const featuredDesigns: PropertyDesign[] = [
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
      id: '3brm-2',
      name: '3 Bedroom Bungalow - Flat Roof Mansionate',
      bedrooms: 3,
      roofType: 'Flat Roofed',
      imagePath: '/3brm/3brm_bungalow_flat_roof_mansionate.jpeg',
      area: '200 sqm',
      description: 'Luxurious 3-bedroom mansionate with flat roof and premium features.',
      features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden']
    },
    {
      id: '4brm-1',
      name: '4 Bedroom Bungalow - Flat Roof',
      bedrooms: 4,
      roofType: 'Flat Roofed',
      imagePath: '/4brm/4br_standard_flat_roof.png',
      area: '280 sqm',
      description: 'Luxurious 4-bedroom bungalow with modern flat roof design.',
      features: ['4 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
    },
    {
      id: '5brm-1',
      name: '5 Bedroom Mansion - Flat Roof',
      bedrooms: 5,
      roofType: 'Flat Roofed',
      imagePath: '/5drm/5_bdrm_mansion_flat_roof.jpeg',
      area: '380 sqm',
      description: 'Luxurious 5-bedroom mansion with modern flat roof design.',
      features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Swimming Pool']
    },
    {
      id: '4brm-6',
      name: '4 Bedroom Hybrid',
      bedrooms: 4,
      roofType: 'Hybrid Pitch Roof',
      imagePath: '/4brm/4br_HYBRID_4BEDROOM_pitched.png',
      area: '300 sqm',
      description: 'Elegant Hybrid 4-bedroom pitched design.',
      features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
    },
    {
      id: '5brm-2',
      name: '5 Bedroom Mansion - Pitched Roof',
      bedrooms: 5,
      roofType: 'Pitch Roofed',
      imagePath: '/5drm/5_bdrm_mansion_pitched_roof.jpeg',
      area: '400 sqm',
      description: 'Elegant 5-bedroom mansion with traditional pitched roof.',
      features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex(prev => {
      if (prev === 0) {
        return Math.max(0, featuredDesigns.length - 3);
      }
      return Math.max(0, prev - 3);
    });
  };

  const handleNext = () => {
    setCurrentIndex(prev => {
      if (prev + 3 >= featuredDesigns.length) {
        return 0;
      }
      return prev + 3;
    });
  };

  const visibleDesigns = featuredDesigns.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with "Featured Designs" title, separator, VIEW ALL link, and navigation */}
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
                disabled={featuredDesigns.length <= 3}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={featuredDesigns.length <= 3}
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
                <p className="text-gray-600 text-sm mb-4">{design.description}</p>
                
                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {design.features?.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Roof Type */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    {design.roofType}
                  </span>
                  <Link
                    href={`/property-designs/${design.id}`}
                    className="text-primary hover:text-secondary font-semibold text-sm transition-colors"
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
