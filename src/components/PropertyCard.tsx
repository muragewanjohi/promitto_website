import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  mainImage?: string;
  description?: string;
  features?: string[];
  roofType?: string;
  status: 'completed' | 'ongoing';
  type: 'House' | 'Apartment' | 'Villa' | 'Commercial';
}

interface PropertyCardProps {
  property: Property | null;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  if (!property) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
        <div className="relative h-64 w-full bg-gray-200"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="flex items-center justify-between mt-4">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const { id, name, mainImage, location, price, bedrooms, bathrooms, status, type } = property;
  const numericPrice = parseFloat(price.replace(/[^0-9]/g, ''));

  return (
    <Link href={`/properties/${id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={mainImage || `/images/${id}/main.jpg`}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {status === 'completed' ? 'Completed' : 'Ongoing'}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {type}
            </span>
          </div>
          {location && (
            <p className="text-gray-600 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          )}
          <div className="flex items-center justify-between mt-4">
            {price && (
              <p className="text-[#1E40AF] font-semibold">KES {numericPrice.toLocaleString()}</p>
            )}
            {(bedrooms || bathrooms) && (
              <div className="flex items-center space-x-4 text-gray-600">
                {bedrooms && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {bedrooms} bed
                  </span>
                )}
                {bathrooms && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {bathrooms} bath
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard; 