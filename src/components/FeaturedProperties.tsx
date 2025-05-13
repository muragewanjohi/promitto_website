import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyCard from './PropertyCard';
import { propertyDetails } from '../data/properties';

const FeaturedProperties = () => {
  // Select three featured properties
  const featuredProperties = [
    propertyDetails['Agnes'],
    propertyDetails['LydiaNgugi'],
    propertyDetails['RoseLandis']
  ].map(property => ({
    ...property,
    mainImage: `/images/${property.id}/main.jpg`,
    status: 'completed' as const,
    type: 'House' as const
  }));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Featured Properties</h2>
          <p className="text-gray-600">Discover our handpicked selection of premium properties</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-block bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 