'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface PropertyType {
  id: number;
  name: string;
}

interface RoofType {
  id: number;
  name: string;
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

interface PropertyFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({
    priceMin: null,
    priceMax: null,
    type: '',
    location: '',
    rooms: 0,
    bathrooms: 0,
    roofType: ''
  });

  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [roofTypes, setRoofTypes] = useState<RoofType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const fetchFilterOptions = async () => {
    setLoading(true);
    try {
      console.log('Fetching filter options from database...');
      
      // Fetch property types
      const { data: propertyTypesData, error: propertyTypesError } = await supabase
        .from('property_types')
        .select('*')
        .order('name');

      if (propertyTypesError) {
        console.error('Error fetching property types:', propertyTypesError);
        // Fallback to default property types if database fails
        setPropertyTypes([
          { id: 1, name: 'House' },
          { id: 2, name: 'Apartment' },
          { id: 3, name: 'Villa' },
          { id: 4, name: 'Commercial' }
        ]);
      } else {
        console.log('Property types fetched:', propertyTypesData);
        if (!propertyTypesData || propertyTypesData.length === 0) {
          console.log('No property types found in database, using fallback data...');
          setPropertyTypes([
            { id: 1, name: 'House' },
            { id: 2, name: 'Apartment' },
            { id: 3, name: 'Villa' },
            { id: 4, name: 'Commercial' }
          ]);
        } else {
          setPropertyTypes(propertyTypesData);
        }
      }

      // Fetch roof types
      const { data: roofTypesData, error: roofTypesError } = await supabase
        .from('roof_types')
        .select('*')
        .order('name');

      if (roofTypesError) {
        console.error('Error fetching roof types:', roofTypesError);
        // Fallback to default roof types if database fails
        setRoofTypes([
          { id: 1, name: 'Flat Roofed' },
          { id: 2, name: 'Pitch Roofed' },
          { id: 3, name: 'Hybrid Pitch Roof' },
          { id: 4, name: 'Hidden Roof' }
        ]);
      } else {
        console.log('Roof types fetched:', roofTypesData);
        if (!roofTypesData || roofTypesData.length === 0) {
          console.log('No roof types found in database, using fallback data...');
          setRoofTypes([
            { id: 1, name: 'Flat Roofed' },
            { id: 2, name: 'Pitch Roofed' },
            { id: 3, name: 'Hybrid Pitch Roof' },
            { id: 4, name: 'Hidden Roof' }
          ]);
        } else {
          setRoofTypes(roofTypesData);
        }
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
      // Fallback to default options if there's any error
      setPropertyTypes([
        { id: 1, name: 'House' },
        { id: 2, name: 'Apartment' },
        { id: 3, name: 'Villa' },
        { id: 4, name: 'Commercial' }
      ]);
      setRoofTypes([
        { id: 1, name: 'Flat Roofed' },
        { id: 2, name: 'Pitch Roofed' },
        { id: 3, name: 'Hybrid Pitch Roof' },
        { id: 4, name: 'Hidden Roof' }
      ]);
    } finally {
      setLoading(false);
    }
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
      type: value
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
      roofType: value
    }));
  };

  const handleReset = () => {
    setFilters({
      priceMin: null,
      priceMax: null,
      type: '',
      location: '',
      rooms: 0,
      bathrooms: 0,
      roofType: ''
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button 
            onClick={handleReset}
            className="text-primary hover:text-secondary text-sm font-medium transition-colors"
          >
            Reset all
          </button>
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
                className="w-full pl-12 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-primary focus:border-primary text-sm"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">Ksh</span>
              <input
                type="number"
                placeholder="Maximum price"
                value={filters.priceMax || ''}
                onChange={(e) => handlePriceChange('priceMax', e.target.value)}
                className="w-full pl-12 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-primary focus:border-primary text-sm"
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
            className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-primary focus:border-primary text-sm"
          >
            <option value="">All types</option>
            {propertyTypes.length > 0 ? (
              propertyTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))
            ) : (
              <option value="" disabled>Loading...</option>
            )}
          </select>
          {propertyTypes.length === 0 && !loading && (
            <p className="text-xs text-gray-500 mt-1">No property types found</p>
          )}
        </div>

        {/* Location */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">LOCATION</h3>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-primary focus:border-primary text-sm"
          />
        </div>

        {/* Bedrooms */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">BEDROOMS</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleRoomsChange(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
              disabled={filters.rooms === 0}
            >
              -
            </button>
            <span className="text-gray-900 font-medium">{filters.rooms}</span>
            <button
              onClick={() => handleRoomsChange(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
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
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
              disabled={filters.bathrooms === 0}
            >
              -
            </button>
            <span className="text-gray-900 font-medium">{filters.bathrooms}</span>
            <button
              onClick={() => handleBathroomsChange(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
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
            className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-primary focus:border-primary text-sm"
          >
            <option value="">All types</option>
            {roofTypes.length > 0 ? (
              roofTypes.map((roofType) => (
                <option key={roofType.id} value={roofType.name}>
                  {roofType.name}
                </option>
              ))
            ) : (
              <option value="" disabled>Loading...</option>
            )}
          </select>
          {roofTypes.length === 0 && !loading && (
            <p className="text-xs text-gray-500 mt-1">No roof types found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters; 