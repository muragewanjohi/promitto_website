import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Property {
  id: string;
  name: string;
  location: string;
  price: string | null | undefined;
  bedrooms: number;
  bathrooms: number;
  mainImage?: string;
  images?: string[];
  featuredImage?: string;
  description?: string;
  features?: string[];
  roofType?: string;
  status?: 'completed' | 'ongoing';
  status_name?: string;
  type?: 'House' | 'Apartment' | 'Villa' | 'Commercial';
  type_name?: string;
  area?: string;
}

interface PropertyCardProps {
  property: Property | null;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [autoSlideInterval, setAutoSlideInterval] = useState<NodeJS.Timeout | null>(null);

  if (!property) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 animate-pulse border border-gray-100">
        <div className="bg-gray-200 h-72 rounded-2xl mb-4"></div>
        <div className="bg-gray-200 h-5 rounded-lg mb-3"></div>
        <div className="bg-gray-200 h-4 rounded-lg w-3/4 mb-2"></div>
        <div className="bg-gray-200 h-4 rounded-lg w-1/2 mb-4"></div>
        <div className="flex space-x-2 mb-4">
          <div className="bg-gray-200 h-6 rounded-full w-16"></div>
          <div className="bg-gray-200 h-6 rounded-full w-20"></div>
        </div>
        <div className="bg-gray-200 h-10 rounded-lg"></div>
      </div>
    );
  }

  const { id, name, mainImage, images, featuredImage, location, price, bedrooms, bathrooms, status, status_name, type, type_name, description, features, area } = property;

  // Get the actual status value - prefer status_name from database
  const actualStatus = status_name || status || 'ongoing';
  const actualType = type_name || type || 'Property';

  // Prepare image array for slider
  const imageArray = React.useMemo(() => {
    const allImages = [];
    if (featuredImage) allImages.push(featuredImage);
    if (mainImage && mainImage !== featuredImage) allImages.push(mainImage);
    if (images && images.length > 0) {
      images.forEach(img => {
        if (img !== featuredImage && img !== mainImage) {
          allImages.push(img);
        }
      });
    }
    // Fallback to default image if no images available
    if (allImages.length === 0) {
      allImages.push(`/images/${id}/main.jpg`);
    }
    return allImages;
  }, [featuredImage, mainImage, images, id]);

  // Auto-slide functionality
  useEffect(() => {
    if (imageArray.length > 1 && !isHovering) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
      }, 4000);
      setAutoSlideInterval(interval);
      return () => clearInterval(interval);
    } else if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      setAutoSlideInterval(null);
    }
  }, [imageArray.length, isHovering, autoSlideInterval]);

  // Navigation functions
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };
  
  // Handle price formatting and parsing safely
  const formatPrice = (priceValue: string | null | undefined): { formatted: string; numeric: number } => {
    if (!priceValue || priceValue === null || priceValue === undefined || priceValue === '') {
      return { formatted: 'Price on request', numeric: 0 };
    }
    
    const numericPrice = parseFloat(priceValue.toString().replace(/[^0-9]/g, ''));
    if (isNaN(numericPrice)) {
      return { formatted: 'Price on request', numeric: 0 };
    }
    
    return { 
      formatted: `KES ${numericPrice.toLocaleString()}`, 
      numeric: numericPrice 
    };
  };
  
  const { formatted: formattedPrice, numeric: numericPrice } = formatPrice(price);

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplay = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return '✓ Completed';
      case 'ongoing':
        return '🚧 Ongoing';
      default:
        return status; // Return original status if no match
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
    <div 
      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Enhanced Image Slider Section */}
      <div className="relative h-72 overflow-hidden">
        {!imageError ? (
          <>
            {/* Main Image Display */}
            <div className="relative h-full w-full">
              <Image
                src={imageArray[currentImageIndex]}
                alt={`${name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-all duration-700 ease-in-out transform group-hover:scale-110"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={currentImageIndex === 0}
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/20 via-transparent to-[#F59E0B]/20"></div>
            </div>

            {/* Navigation Arrows */}
            {imageArray.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg backdrop-blur-sm"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg backdrop-blur-sm"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Indicators */}
            {imageArray.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {imageArray.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => goToImage(index, e)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125 shadow-lg' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Image Counter */}
            {imageArray.length > 1 && (
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                  {currentImageIndex + 1} / {imageArray.length}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1E40AF]/20 via-gray-100 to-[#F59E0B]/20 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-sm text-gray-500">No image available</p>
            </div>
          </div>
        )}
        
        {/* Enhanced Status and Type Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${getStatusColor(actualStatus)}`}>
            {getStatusDisplay(actualStatus)}
          </span>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${getTypeColor(actualType)}`}>
            {actualType}
          </span>
        </div>

        {/* Enhanced Price Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="px-4 py-2 rounded-full text-sm font-bold bg-white/95 text-[#1E40AF] shadow-lg backdrop-blur-sm border border-white/20">
            {formattedPrice}
          </span>
        </div>

        {/* Area Badge */}
        {area && (
          <div className="absolute bottom-16 right-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/50 text-white backdrop-blur-sm">
              📐 {area}
            </span>
          </div>
        )}
      </div>

      {/* Enhanced Content Section */}
      <div className="p-6 space-y-4">
        {/* Title with hover effect */}
        <div className="group/title cursor-pointer">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover/title:text-[#1E40AF] transition-colors duration-200">
            {name}
          </h3>
        </div>

        {/* Location with enhanced styling */}
        {location && (
          <div className="flex items-center text-gray-600 text-xs">
            <div className="w-6 h-6 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-medium">{location}</span>
          </div>
        )}

        {/* Description with better styling */}
        {description && (
          <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed bg-gray-50 p-2 rounded-lg border-l-2 border-[#1E40AF]">
            {description}
          </p>
        )}

        {/* Enhanced Property Details */}
        <div className="flex items-center gap-2 flex-wrap">
          {bedrooms && (
            <div className="flex items-center bg-gradient-to-r from-[#1E40AF]/10 to-[#1E40AF]/5 px-2 py-1.5 rounded-lg">
              <svg className="w-3 h-3 text-[#1E40AF] mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
              </svg>
              <span className="text-xs font-semibold text-[#1E40AF]">
                {bedrooms} Bed{bedrooms > 1 ? 's' : ''}
              </span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 px-2 py-1.5 rounded-lg">
              <svg className="w-3 h-3 text-[#F59E0B] mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
              </svg>
              <span className="text-xs font-semibold text-[#F59E0B]">
                {bathrooms} Bath{bathrooms > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Enhanced Features */}
        {features && features.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-900 flex items-center">
              <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                <svg className="w-2 h-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Key Features
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-700 bg-gray-50 px-2 py-1.5 rounded-md">
                  <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full mr-2 flex-shrink-0"></div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
              {features.length > 3 && (
                <div className="text-xs text-[#1E40AF] font-semibold text-center py-0.5">
                  +{features.length - 3} more features
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Action Button */}
        <button 
          onClick={handleViewDetails}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#1E40AF] via-[#1E40AF] to-[#1E3A8A] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#1E3A8A] hover:to-[#1E40AF] transition-all duration-300 flex items-center justify-center group disabled:opacity-75 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>View Property Details</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard; 