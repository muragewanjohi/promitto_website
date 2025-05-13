'use client';

import React, { useState, useEffect } from 'react';

type PropertyStatus = 'completed' | 'ongoing';
type PropertyType = 'House' | 'Apartment' | 'Villa' | 'Commercial';
type RoofType = 'Flatroofed' | 'Pitch Roofed' | 'Hybrid Pitch Roof' | 'Hidden Roof';

interface Filters {
  propertyType: PropertyStatus | null;
  priceMin: number | null;
  priceMax: number | null;
  type: PropertyType | '';
  location: string;
  rooms: number;
  bathrooms: number;
  roofType: RoofType | '';
}

interface PropertyFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({
    propertyType: null,
    priceMin: null,
    priceMax: null,
    type: '',
    location: '',
    rooms: 0,
    bathrooms: 0,
    roofType: ''
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handlePropertyTypeChange = (type: PropertyStatus) => {
    setFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType === type ? null : type
    }));
  };

  const handlePriceChange = (field: 'priceMin' | 'priceMax', value: string) => {
    const numValue = value ? parseInt(value) : null;
    setFilters(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleTypeChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      type: value as PropertyType | ''
    }));
  };

  const handleLocationChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      location: value
    }));
  };

  const handleRoomsChange = (increment: boolean) => {
    setFilters(prev => ({
      ...prev,
      rooms: Math.min(Math.max(increment ? prev.rooms + 1 : prev.rooms - 1, 0), 10)
    }));
  };

  const handleBathroomsChange = (increment: boolean) => {
    setFilters(prev => ({
      ...prev,
      bathrooms: Math.min(Math.max(increment ? prev.bathrooms + 1 : prev.bathrooms - 1, 0), 10)
    }));
  };

  const handleRoofTypeChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      roofType: value as RoofType | ''
    }));
  };

  const handleReset = () => {
    setFilters({
      propertyType: null,
      priceMin: null,
      priceMax: null,
      type: '',
      location: '',
      rooms: 0,
      bathrooms: 0,
      roofType: ''
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button 
            onClick={handleReset}
            className="text-[#1E40AF] hover:text-[#F59E0B] text-sm font-medium"
          >
            Reset all
          </button>
        </div>

        {/* Property Status */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">STATUS</h3>
          <div className="flex gap-3">
            <button 
              onClick={() => handlePropertyTypeChange('completed')}
              className={`flex-1 px-4 py-2.5 ${
                filters.propertyType === 'completed' 
                  ? 'bg-[#1E40AF] text-white' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              } rounded-lg text-sm font-medium transition-colors`}
            >
              Completed
            </button>
            <button 
              onClick={() => handlePropertyTypeChange('ongoing')}
              className={`flex-1 px-4 py-2.5 ${
                filters.propertyType === 'ongoing' 
                  ? 'bg-[#1E40AF] text-white' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              } rounded-lg text-sm font-medium transition-colors`}
            >
              Ongoing
            </button>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">PRICE RANGE</h3>
          <div className="space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">Ksh</span>
              <input
                type="number"
                placeholder="Minimum price"
                value={filters.priceMin || ''}
                onChange={(e) => handlePriceChange('priceMin', e.target.value)}
                className="w-full pl-12 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] text-sm"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">Ksh</span>
              <input
                type="number"
                placeholder="Maximum price"
                value={filters.priceMax || ''}
                onChange={(e) => handlePriceChange('priceMax', e.target.value)}
                className="w-full pl-12 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">PROPERTY TYPE</h3>
          <select 
            value={filters.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] text-sm"
          >
            <option value="">All types</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">LOCATION</h3>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] text-sm"
          />
        </div>

        {/* Bedrooms */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">BEDROOMS</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleRoomsChange(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100"
              disabled={filters.rooms === 0}
            >
              -
            </button>
            <span className="text-gray-900 font-medium">{filters.rooms}</span>
            <button
              onClick={() => handleRoomsChange(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">BATHROOMS</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleBathroomsChange(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100"
              disabled={filters.bathrooms === 0}
            >
              -
            </button>
            <span className="text-gray-900 font-medium">{filters.bathrooms}</span>
            <button
              onClick={() => handleBathroomsChange(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Roof Type */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">ROOF TYPE</h3>
          <select 
            value={filters.roofType}
            onChange={(e) => handleRoofTypeChange(e.target.value)}
            className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] text-sm"
          >
            <option value="">All types</option>
            <option value="Flatroofed">Flat Roofed</option>
            <option value="Pitch Roofed">Pitch Roofed</option>
            <option value="Hybrid Pitch Roof">Hybrid Pitch Roof</option>
            <option value="Hidden Roof">Hidden Roof</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters; 