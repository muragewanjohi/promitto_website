'use client';

import React from 'react';

interface Filters {
  bedrooms: number;
  roofType: string;
  houseType: string;
}

interface PropertyDesignFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function PropertyDesignFilters({ filters, onFilterChange }: PropertyDesignFiltersProps) {
  const handleBedroomChange = (bedrooms: number) => {
    onFilterChange({
      ...filters,
      bedrooms: filters.bedrooms === bedrooms ? 0 : bedrooms
    });
  };

  const handleRoofTypeChange = (roofType: string) => {
    onFilterChange({
      ...filters,
      roofType: filters.roofType === roofType ? '' : roofType
    });
  };

  const handleHouseTypeChange = (houseType: string) => {
    onFilterChange({
      ...filters,
      houseType: filters.houseType === houseType ? '' : houseType
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 sticky top-4 sm:top-24">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          Filters
        </h3>
      </div>

      {/* Bedrooms Filter */}
      <div className="mb-6 sm:mb-8">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
          </svg>
          Bedrooms
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {[2, 3, 4, 5].map((bedroom) => (
            <button
              key={bedroom}
              onClick={() => handleBedroomChange(bedroom)}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm sm:text-base ${
                filters.bedrooms === bedroom
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{bedroom} Bedroom{bedroom > 1 ? 's' : ''}</span>
                {filters.bedrooms === bedroom && (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* House Type Filter */}
      <div className="mb-6 sm:mb-8">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          House Type
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {[
            { value: 'All types', label: 'All Types' },
            { value: 'Bungalow', label: 'Bungalow' },
            { value: 'Mansionette', label: 'Mansionette' },
            { value: 'Hybrid Mansionette', label: 'Hybrid Mansionette' }
          ].map((houseType) => (
            <button
              key={houseType.value}
              onClick={() => handleHouseTypeChange(houseType.value)}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm sm:text-base ${
                filters.houseType === houseType.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{houseType.label}</span>
                {filters.houseType === houseType.value && (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Roof Type Filter */}
      <div className="mb-6 sm:mb-8">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
          Roof Type
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {[
            { value: 'All types', label: 'All Types' },
            { value: 'Flat Roof', label: 'Flat Roof' },
            { value: 'Pitched Roof', label: 'Pitched Roof' },
            { value: 'Hidden Roof', label: 'Hidden Roof' }
          ].map((roofType) => (
            <button
              key={roofType.value}
              onClick={() => handleRoofTypeChange(roofType.value)}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm sm:text-base ${
                filters.roofType === roofType.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{roofType.label}</span>
                {filters.roofType === roofType.value && (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.bedrooms > 0 || filters.roofType || filters.houseType) && (
        <button
          onClick={() => onFilterChange({ bedrooms: 0, roofType: '', houseType: '' })}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="hidden sm:inline">Clear All Filters</span>
          <span className="sm:hidden">Clear Filters</span>
        </button>
      )}

      {/* Active Filters Display */}
      {(filters.bedrooms > 0 || filters.roofType || filters.houseType) && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary/5 rounded-xl border border-primary/20">
          <h5 className="text-xs sm:text-sm font-semibold text-primary mb-2 sm:mb-3">Active Filters:</h5>
          <div className="space-y-1.5 sm:space-y-2">
            {filters.bedrooms > 0 && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-700">Bedrooms: {filters.bedrooms}</span>
                <button
                  onClick={() => handleBedroomChange(filters.bedrooms)}
                  className="text-primary hover:text-primary/80"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {filters.houseType && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-700">House Type: {filters.houseType}</span>
                <button
                  onClick={() => handleHouseTypeChange(filters.houseType)}
                  className="text-primary hover:text-primary/80"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {filters.roofType && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-700">Roof: {filters.roofType}</span>
                <button
                  onClick={() => handleRoofTypeChange(filters.roofType)}
                  className="text-primary hover:text-primary/80"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 