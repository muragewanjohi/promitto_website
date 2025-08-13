import React, { useState } from 'react';
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
  area?: string;
}

interface PropertyCardProps {
  property: Property | null;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!property) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
        <div className="bg-gray-200 h-4 rounded mb-2"></div>
        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
        <div className="bg-gray-200 h-4 rounded w-1/2 mt-4"></div>
      </div>
    );
  }

  const { id, name, mainImage, location, price, bedrooms, bathrooms, status, type, description, features, area } = property;
  const numericPrice = parseFloat(price.replace(/[^0-9]/g, ''));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'House':
        return 'bg-primary/10 text-primary';
      case 'Apartment':
        return 'bg-secondary/10 text-secondary';
      case 'Villa':
        return 'bg-purple-100 text-purple-800';
      case 'Commercial':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBedroomColor = (bedrooms: number) => {
    switch (bedrooms) {
      case 1:
        return 'bg-blue-100 text-blue-800';
      case 2:
        return 'bg-primary/10 text-primary';
      case 3:
        return 'bg-secondary/10 text-secondary';
      case 4:
        return 'bg-green-100 text-green-800';
      case 5:
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = () => {
    setIsLoading(true);
    // Navigate to property details page
    window.location.href = `/properties/${id}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        {!imageError ? (
          <>
            <Image
              src={mainImage || `/images/${id}/main.jpg`}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient Overlay - Dark blue at bottom to light blue at center, covering only bottom half */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        
        {/* Overlay with badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
            {status === 'completed' ? 'Completed' : 'Ongoing'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(type)}`}>
            {type}
          </span>
        </div>

        {/* Price badge */}
        {price && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-primary backdrop-blur-sm">
              KES {numericPrice.toLocaleString()}
            </span>
          </div>
        )}

        {/* Area badge */}
        {area && (
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm">
              {area}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* Location */}
        {location && (
          <p className="text-gray-600 text-sm mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {bedrooms && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBedroomColor(bedrooms)}`}>
                {bedrooms} Bedroom{bedrooms > 1 ? 's' : ''}
              </span>
            )}
            {bathrooms && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {bathrooms} Bathroom{bathrooms > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Key Features
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 flex-shrink-0"></div>
                  <span className="truncate">{feature}</span>
                </div>
              ))}
              {features.length > 4 && (
                <div className="text-xs text-primary font-medium">
                  +{features.length - 4} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button 
          onClick={handleViewDetails}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-all duration-200 flex items-center justify-center group disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>View Details</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard; 