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
  const [designs, setDesigns] = useState<PropertyDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load all property designs from the same source as property-designs page
  useEffect(() => {
    setMounted(true);
    
    const loadDesigns = () => {
      const allDesigns: PropertyDesign[] = [
        // 2 Bedroom Designs
    {
          id: '2br-flat-bungalow',
          name: '2 Bedroom Flat Roof Bungalow',
      bedrooms: 2,
          roofType: 'Flat Roof',
          imagePath: '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_1 - Photo (2).webp',
          area: '92 sqm',
      description: 'Modern 2-bedroom bungalow with flat roof design, perfect for small families.',
      features: ['2 Bedrooms', '2 Bathrooms', 'Open Plan Living', 'Kitchen', 'Parking Space']
    },
    {
          id: '2br-hidden-bungalow',
          name: '2 Bedroom Hidden Roof Bungalow',
          bedrooms: 2,
          roofType: 'Hidden Roof',
          imagePath: '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_1 - Photo (1).webp',
          area: '80 sqm',
          description: 'Contemporary 2-bedroom bungalow featuring a hidden roof design.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Modern Design', 'Kitchen', 'Garden Space']
        },
        {
          id: '2br-pitched-bungalow',
          name: '2 Bedroom Pitched Roof Bungalow',
          bedrooms: 2,
          roofType: 'Pitched Roof',
          imagePath: '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_1 - Photo.webp',
          area: '80-92 sqm',
          description: 'Classic 2-bedroom bungalow with traditional pitched roof design.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Classic Design', 'Kitchen', 'Veranda']
        },
        // 3 Bedroom Designs
        {
          id: '3br-flat-bungalow',
          name: '3 Bedroom Flat Roof Bungalow',
          bedrooms: 3,
          roofType: 'Flat Roof',
          imagePath: '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_1 - Photo.webp',
          area: '140 sqm',
          description: 'Spacious 3-bedroom bungalow with modern flat roof design.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Large Living Area', 'Kitchen', 'Double Parking']
        },
        {
          id: '3br-flat-mansionette',
          name: '3 Bedroom Flat Roof Mansionette',
          bedrooms: 3,
          roofType: 'Flat Roof',
          imagePath: '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._1 - Photo.webp',
          area: '180 sqm',
          description: 'Luxurious 3-bedroom mansionette with flat roof and premium features.',
          features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden']
        },
        {
          id: '3br-hidden-bungalow',
          name: '3 Bedroom Hidden Roof Bungalow',
      bedrooms: 3,
      roofType: 'Hidden Roof',
          imagePath: '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_1 - Photo.webp',
          area: '110 sqm',
          description: 'Contemporary 3-bedroom bungalow with sleek hidden roof design.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony']
        },
        {
          id: '3br-pitched-bungalow',
          name: '3 Bedroom Pitched Roof Bungalow',
          bedrooms: 3,
          roofType: 'Pitched Roof',
          imagePath: '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_1 - Photo.webp',
          area: '110 sqm',
          description: 'Classic 3-bedroom bungalow with pitched roof and traditional charm.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Traditional Design', 'Kitchen', 'Veranda']
        },
        {
          id: '3br-pitched-mansionette',
          name: '3 Bedroom Pitched Roof Mansionette',
          bedrooms: 3,
          roofType: 'Pitched Roof',
          imagePath: '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._1 - Photo.webp',
          area: '200 sqm',
          description: 'Elegant 3-bedroom mansionette with traditional pitched roof design.',
          features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
    },
        // 4 Bedroom Designs
    {
          id: '4br-flat-mansionette-172',
          name: '4 Bedroom 172 sqm Standard Pitched Mansionette',
      bedrooms: 4,
      roofType: 'Pitched Roof',
          imagePath: '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED_1 - Photo.webp',
          area: '172 sqm',
          description: 'Standard 4-bedroom mansionette with pitched roof design.',
          features: ['4 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden']
        },
        {
          id: '4br-flat-mansionette-224',
          name: '4 Bedroom 224 sqm Flat Roof Mansionette',
          bedrooms: 4,
          roofType: 'Flat Roof',
          imagePath: '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._1 - Photo.webp',
          area: '224 sqm',
          description: 'Luxurious 4-bedroom mansionette with flat roof design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
    },
    {
          id: '4br-pitched-bungalow',
          name: '4 Bedroom Pitched Roof Bungalow',
          bedrooms: 4,
      roofType: 'Pitched Roof',
          imagePath: '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_1 - Photo.webp',
      area: '280 sqm',
          description: 'Elegant 4-bedroom bungalow with traditional pitched roof design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
    },
    {
          id: '4br-pitched-hybrid-mansionette',
          name: '4 Bedroom Pitched Roof Hybrid Mansionette',
          bedrooms: 4,
          roofType: 'Pitched Roof',
          imagePath: '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._1 - Photo.webp',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom mansionette with pitched roof design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
    },
        // 5 Bedroom Designs
    {
          id: '5br-flat-mansionette',
          name: '5 Bedroom Flat Roof Mansionette',
          bedrooms: 5,
          roofType: 'Flat Roof',
          imagePath: '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_1 - Photo.webp',
          area: '380 sqm',
          description: 'Luxurious 5-bedroom mansionette with modern flat roof design.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Swimming Pool']
        },
        {
          id: '5br-pitched-mansionette',
          name: '5 Bedroom Pitched Roof Mansionette',
          bedrooms: 5,
          roofType: 'Pitched Roof',
          imagePath: '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_2 - Photo.webp',
          area: '380 sqm',
          description: 'Elegant 5-bedroom mansionette with traditional pitched roof.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        }
      ];

      setDesigns(allDesigns);
      setLoading(false);
    };

    loadDesigns();
  }, []);

  // Show up to 12 designs (4 rows × 3 columns)
  const visibleDesigns = designs.slice(0, 12);

  // Show loading state until component is mounted or data is loading
  if (!mounted || loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="flex items-center flex-1">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mr-4"></div>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-72 bg-gray-200 animate-pulse"></div>
                <div className="p-7 space-y-4">
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
        <div className="flex items-center mb-12">
          <div className="flex items-center flex-1">
            <h2 className="site-title text-primary mr-4">Featured Designs</h2>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>
        </div>

        {/* Designs Grid */}
        {visibleDesigns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleDesigns.map((design) => (
            <div key={design.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-72">
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
              <div className="p-7">
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
        )}

        {/* View More Button */}
        <div className="flex justify-end mt-8">
          <Link
            href="/property-designs"
            className="text-primary font-semibold uppercase hover:text-secondary transition-colors border-b-2 border-red-500 pb-1"
          >
            VIEW MORE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;