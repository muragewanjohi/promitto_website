'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PropertyDesign {
  id: string;
  name: string;
  bedrooms: number;
  roofType: string;
  houseType: string;
  imagePath: string;
  area?: string;
  description?: string;
  features?: string[];
  folderPath: string;
  images: string[];
}

interface PropertyDesignCardProps {
  design: PropertyDesign;
}

export default function PropertyDesignCard({ design }: PropertyDesignCardProps) {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const getRoofTypeColor = (roofType: string) => {
    switch (roofType) {
      case 'Flat Roof':
        return 'bg-blue-100 text-blue-800';
      case 'Pitched Roof':
        return 'bg-green-100 text-green-800';
      case 'Hidden Roof':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHouseTypeColor = (houseType: string) => {
    switch (houseType) {
      case 'Bungalow':
        return 'bg-primary/10 text-primary';
      case 'Mansionette':
        return 'bg-secondary/10 text-secondary';
      case 'Hybrid Mansionette':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBedroomColor = (bedrooms: number) => {
    switch (bedrooms) {
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

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
        {!imageError ? (
          <Image
            src={design.imagePath}
            alt={design.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        
        {/* Overlay with badges */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getBedroomColor(design.bedrooms)}`}>
            {design.bedrooms} Bedroom{design.bedrooms > 1 ? 's' : ''}
          </span>
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getHouseTypeColor(design.houseType)}`}>
            {design.houseType}
          </span>
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getRoofTypeColor(design.roofType)}`}>
            {design.roofType}
          </span>
        </div>

        {/* Area badge */}
        {design.area && (
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
            <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm">
              {design.area}
            </span>
          </div>
        )}

        {/* Image count badge */}
        {design.images && design.images.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4">
            <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-black/70 text-white backdrop-blur-sm">
              {design.images.length} Photos
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight">
          {design.name}
        </h3>

        {/* Description */}
        {design.description && (
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
            {design.description}
          </p>
        )}

        {/* Features */}
        {design.features && design.features.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Key Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              {design.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-secondary rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></div>
                  <span className="truncate">{feature}</span>
                </div>
              ))}
              {design.features.length > 4 && (
                <div className="text-xs text-primary font-medium">
                  +{design.features.length - 4} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button 
          onClick={() => router.push(`/property-designs/${design.id}`)}
          className="w-full bg-white border-2 border-primary text-primary py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center group text-sm sm:text-base"
        >
          <span>View Details</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
} 