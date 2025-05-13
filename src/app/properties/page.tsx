'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropertyCard from '../../components/PropertyCard';
import PropertyFilters from '../../components/PropertyFilters';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { propertyDetails } from '../../data/properties';

interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  mainImage?: string;
  status: 'completed' | 'ongoing';
  type: 'House' | 'Apartment' | 'Villa' | 'Commercial';
  area?: string;
  description?: string;
  features?: string[];
  roofType?: 'Flatroofed' | 'Pitch Roofed' | 'Hybrid Pitch Roof' | 'Hidden Roof';
}

interface Filters {
  propertyType: 'completed' | 'ongoing' | null;
  priceMin: number | null;
  priceMax: number | null;
  type: 'House' | 'Apartment' | 'Villa' | 'Commercial' | '';
  location: string;
  rooms: number;
  bathrooms: number;
  roofType: 'Flatroofed' | 'Pitch Roofed' | 'Hybrid Pitch Roof' | 'Hidden Roof' | '';
}

export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Instead of fetching from API, use the static data
    try {
      const propertiesArray = Object.values(propertyDetails).map(property => ({
        ...property,
        mainImage: `/images/${property.id}/main.jpg`, // Update image path to use images folder
      }));
      setProperties(propertiesArray);
      setFilteredProperties(propertiesArray);
      setLoading(false);
    } catch (err) {
      setError('Failed to load properties');
      console.error('Error loading properties:', err);
      setLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = properties.filter(property =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handleFilterChange = useCallback((filters: Filters) => {
    let filtered = [...properties];

    // Filter by property type (completed/ongoing)
    if (filters.propertyType) {
      filtered = filtered.filter(property => 
        property.status === filters.propertyType
      );
    }

    // Filter by price range
    if (filters.priceMin !== null) {
      filtered = filtered.filter(property => 
        property.price && parseFloat(property.price.replace(/[^0-9]/g, '')) >= filters.priceMin
      );
    }
    if (filters.priceMax !== null) {
      filtered = filtered.filter(property => 
        property.price && parseFloat(property.price.replace(/[^0-9]/g, '')) <= filters.priceMax
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
  }, [properties]);

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  if (error) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gray-50">
        {/* Hero Section with Search */}
        <div className="relative h-[300px] bg-cover bg-center" style={{ backgroundImage: 'url(/hero-house.jpg)' }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Find Your Dream Home</h1>
            <div className="w-full max-w-2xl px-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location or property name"
                  className="w-full pl-12 pr-24 py-4 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bg-[#1E40AF] text-white px-6 py-2 rounded-lg hover:bg-[#1E3A8A] transition-colors text-sm font-medium"
                >
                  Search
                </button>
                <svg
                  className="absolute left-4 top-4 w-5 h-5 text-gray-400"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="w-80 flex-shrink-0">
              <PropertyFilters onFilterChange={handleFilterChange} />
            </div>

            {/* Properties Grid */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {loading ? 'Loading...' : `${filteredProperties.length} Properties Available`}
                </h2>
                <div className="flex items-center gap-4">
                  <select
                    className="p-2 border rounded-lg bg-white text-sm focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF]"
                    defaultValue="newest"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <PropertyCard key={index} property={null} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <div key={property.id} onClick={() => handlePropertyClick(property.id)} className="cursor-pointer">
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 