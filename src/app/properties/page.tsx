'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PropertyCard from '../../components/PropertyCard';
import PropertyFilters from '../../components/PropertyFilters';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { supabase } from '@/lib/supabase';
import { isPropertySafe } from '@/lib/security/propertySafety';

interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  mainImage?: string;
  images?: string[];
  featuredImage?: string;
  status: 'completed' | 'ongoing';
  type: 'House' | 'Apartment' | 'Villa' | 'Commercial';
  area?: string;
  description?: string;
  features?: string[];
  roofType?: 'Flatroofed' | 'Pitch Roofed' | 'Hybrid Pitch Roof' | 'Hidden Roof';
}

interface Filters {
  priceMin: number | null;
  priceMax: number | null;
  type: string;
  location: string;
  rooms: number;
  bathrooms: number;
  roofType: string;
}

function normalizePropertyStatus(status?: string | null): 'completed' | 'ongoing' {
  return status?.toLowerCase() === 'ongoing' ? 'ongoing' : 'completed';
}

function PropertiesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'completed' | 'ongoing' | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('properties')
        .select(`*, property_types(name), property_statuses(name), roof_types(name)`);
      if (error) {
        setError('Failed to load properties');
        setLoading(false);
        return;
      }
      const propertiesArray = (data || [])
        .filter((property: any) => isPropertySafe(property))
        .map((property: any) => ({
          id: property.id,
          name: property.name,
          location: property.location,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          mainImage: property.featuredImage || (property.images && property.images[0]) || '/images/placeholder.png',
          images: property.images || [],
          featuredImage: property.featuredImage,
          status: normalizePropertyStatus(property.property_statuses?.name),
          type: property.property_types?.name || 'House',
          area: property.area,
          description: property.description,
          features: property.features,
          roofType: property.roof_types?.name || '',
        }));
      setProperties(propertiesArray);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...properties];

    // Apply search filter
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.type.toLowerCase().includes(searchLower) ||
        (property.description && property.description.toLowerCase().includes(searchLower)) ||
        (property.features && property.features.some(feature => 
          feature.toLowerCase().includes(searchLower)
        ))
      );
    }

    // Filter by status (completed/ongoing)
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(property => 
        property.status === selectedStatus
      );
    }

    setFilteredProperties(filtered);
  }, [properties, searchQuery, selectedStatus]);

  // Read search query from URL on component mount
  useEffect(() => {
    const urlSearchQuery = searchParams.get('search');
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [searchParams]);

  // Apply filters when properties, search query, or selected status changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Apply real-time search
    applyFilters();
  };

  const clearSearch = () => {
    setSearchQuery('');
    applyFilters();
  };

  const handleFilterChange = useCallback((filters: Filters) => {
    let filtered = [...properties];

    // Apply search filter first
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.type.toLowerCase().includes(searchLower) ||
        (property.description && property.description.toLowerCase().includes(searchLower)) ||
        (property.features && property.features.some(feature => 
          feature.toLowerCase().includes(searchLower)
        ))
      );
    }

    // Filter by status (completed/ongoing)
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(property => 
        property.status === selectedStatus
      );
    }

    // Filter by price range
    if (filters.priceMin !== null && filters.priceMin !== undefined) {
      filtered = filtered.filter(property => 
        property.price && parseFloat(property.price.replace(/[^0-9]/g, '')) >= filters.priceMin!
      );
    }
    if (filters.priceMax !== null && filters.priceMax !== undefined) {
      filtered = filtered.filter(property => 
        property.price && parseFloat(property.price.replace(/[^0-9]/g, '')) <= filters.priceMax!
      );
    }

    // Filter by property type
    if (filters.type) {
      filtered = filtered.filter(property => 
        property.type === filters.type
      );
    }

    // Filter by roof type
    if (filters.roofType) {
      filtered = filtered.filter(property => 
        property.roofType === filters.roofType
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by rooms
    if (filters.rooms > 0) {
      filtered = filtered.filter(property => 
        property.bedrooms === filters.rooms
      );
    }

    // Filter by bathrooms
    if (filters.bathrooms > 0) {
      filtered = filtered.filter(property => 
        property.bathrooms === filters.bathrooms
      );
    }

    setFilteredProperties(filtered);
  }, [properties, selectedStatus, searchQuery]);

  // Trigger filtering when selectedStatus changes
  useEffect(() => {
    handleFilterChange({
      priceMin: null,
      priceMax: null,
      type: '',
      location: '',
      rooms: 0,
      bathrooms: 0,
      roofType: ''
    });
  }, [selectedStatus, handleFilterChange]);

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-gray-50 min-h-screen">
      {/* Hero Section with Search */}
      <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url(/hero-house.jpg)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="hero-title mb-4 sm:mb-6 text-center">Find Your Dream Home</h1>
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search by location, project name..."
                className="w-full pl-10 pr-16 sm:pr-20 py-2.5 sm:py-3 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-sm sm:text-base"
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-12 sm:right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button 
                type="submit"
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-[#1E40AF] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg hover:bg-[#1E3A8A] transition-colors text-xs sm:text-sm font-medium"
              >
                Search
              </button>
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Status Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex space-x-2 sm:space-x-4 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                selectedStatus === 'all'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setSelectedStatus('completed')}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                selectedStatus === 'completed'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setSelectedStatus('ongoing')}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                selectedStatus === 'ongoing'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Ongoing
            </button>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`w-full lg:w-80 flex-shrink-0 order-2 lg:order-1 ${showFilters ? 'block' : 'hidden lg:block'} lg:static top-0 z-10 lg:z-auto`}>
            <PropertyFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Properties Grid */}
          <div className="flex-grow order-1 lg:order-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {loading ? 'Loading...' : `${filteredProperties.length} Projects Available`}
                </h2>
                {searchQuery && (
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>Search results for:</span>
                    <span className="font-semibold text-primary">&quot;{searchQuery}&quot;</span>
                    <button 
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <select
                  className="px-3 py-2 border rounded-lg bg-white text-xs sm:text-sm focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] w-full sm:w-auto"
                  defaultValue="newest"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <PropertyCard key={index} property={null} />
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? `No properties match your search for "${searchQuery}". Try adjusting your filters or search terms.`
                      : "No properties match your current filters. Try adjusting your search criteria."
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        Clear Search
                      </button>
                    )}
                    <button
                      onClick={() => setShowFilters(true)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Adjust Filters
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onPropertyClick={() => handlePropertyClick(property.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        </div>
      }>
        <PropertiesContent />
      </Suspense>
      <Footer />
    </main>
  );
} 