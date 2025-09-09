'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

function formatPrice(price: string | number | null | undefined) {
  // Handle null, undefined, or empty values
  if (price === null || price === undefined || price === '') {
    return 'Price not set';
  }
  
  const num = typeof price === 'number' ? price : parseFloat(price.toString().replace(/,/g, ''));
  if (isNaN(num)) return 'N/A';
  return `Ksh ${num.toLocaleString()}`;
}

export default function PropertiesAdmin() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    property: '',
    location: '',
    price: '',
    status: '',
  });
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState<'name' | 'location' | 'price' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    const { error } = await supabase
      .from('properties')
      .update({ featured: !currentFeatured })
      .eq('id', id);

    if (!error) {
      setProperties(prev => prev.map(p => 
        p.id === id ? { ...p, featured: !currentFeatured } : p
      ));
    } else {
      alert('Failed to update featured status');
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('properties').select('*');
      if (error) {
        setError('Failed to fetch properties');
        setProperties([]);
      } else {
        setProperties(data || []);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('Failed to delete property.');
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      property: '',
      location: '',
      price: '',
      status: '',
    });
  };

  // Filtering and sorting logic
  const filteredAndSortedProperties = properties
    .filter((property) => {
    const matchesProperty = (property.name || '').toLowerCase().includes(filters.property.toLowerCase());
    const matchesLocation = (property.location || '').toLowerCase().includes(filters.location.toLowerCase());
    const matchesPrice = filters.price === '' || String(formatPrice(property.price)).includes(filters.price.replace(/,/g, ''));
    const matchesStatus = (property.status_name || '').toLowerCase().includes(filters.status.toLowerCase());
    return matchesProperty && matchesLocation && matchesPrice && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'location':
          aValue = a.location || '';
          bValue = b.location || '';
          break;
        case 'price':
          aValue = parseFloat(a.price?.toString().replace(/,/g, '') || '0');
          bValue = parseFloat(b.price?.toString().replace(/,/g, '') || '0');
          break;
        case 'status':
          aValue = a.status_name || '';
          bValue = b.status_name || '';
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6 space-y-4 lg:space-y-0">
    <div>
        <h1 className="text-2xl font-bold text-gray-900">Properties Management</h1>
              <p className="text-gray-600 mt-1 text-sm">Manage and organize your property listings</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'table' 
                      ? 'bg-white text-[#1E40AF] shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-18 8h18m-18 4h18" />
                  </svg>
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-[#1E40AF] shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Grid
                </button>
              </div>
              
        <Link
          href="/admin/properties/new"
                className="inline-flex items-center bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
        >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
          Add New Property
        </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#1E40AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-xs font-medium text-gray-600">Total Properties</p>
                <p className="text-xl font-semibold text-gray-900">{properties.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-xs font-medium text-gray-600">Completed</p>
                <p className="text-xl font-semibold text-gray-900">{properties.filter(p => p.status_name === 'completed').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-xs font-medium text-gray-600">Featured</p>
                <p className="text-xl font-semibold text-gray-900">{properties.filter(p => p.featured).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-xs font-medium text-gray-600">Filtered Results</p>
                <p className="text-xl font-semibold text-gray-900">{filteredAndSortedProperties.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <h3 className="text-base font-medium text-gray-900">Filters & Sorting</h3>
              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                >
                  <option value="name">Sort by Name</option>
                  <option value="location">Sort by Location</option>
                  <option value="price">Sort by Price</option>
                  <option value="status">Sort by Status</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {sortOrder === 'asc' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <button
              onClick={clearFilters}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                  <input
                    type="text"
                placeholder="Search properties..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    value={filters.property}
                    onChange={e => setFilters(f => ({ ...f, property: e.target.value }))}
                  />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                placeholder="Search locations..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    value={filters.location}
                    onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                  />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                placeholder="Search prices..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    value={filters.price}
                    onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}
                  />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <input
                    type="text"
                placeholder="Search status..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    value={filters.status}
                    onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                  />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-[#1E40AF] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 text-lg">Loading properties...</p>
              <p className="text-gray-400 text-sm mt-2">Please wait while we fetch your data</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Error Loading Properties</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {viewMode === 'table' ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAndSortedProperties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                        <img
                                  className="h-12 w-12 rounded-lg object-cover"
                          src={property.featuredImage || '/images/placeholder.png'}
                          alt={property.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.type_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{property.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{formatPrice(property.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.status_name === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {property.status_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleFeatured(property.id, property.featured)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                        property.featured
                          ? 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A]'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {property.featured ? 'Featured' : 'Not Featured'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/properties/${property.id}`}
                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-[#1E40AF] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors duration-200"
                    >
                      Edit
                    </Link>
                    <button
                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200"
                      onClick={() => handleDelete(property.id)}
                    >
                      Delete
                    </button>
                            </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                
                {filteredAndSortedProperties.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters or add a new property.</p>
                  </div>
                )}
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        className="w-full h-48 object-cover"
                        src={property.featuredImage || '/images/placeholder.png'}
                        alt={property.name}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{property.name}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          property.status_name === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status_name}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{property.type_name}</p>
                      <p className="text-sm text-gray-600 mb-3">{property.location}</p>
                      <p className="text-lg font-semibold text-gray-900 mb-4">{formatPrice(property.price)}</p>
                      
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleToggleFeatured(property.id, property.featured)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                            property.featured
                              ? 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A]'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {property.featured ? 'Featured' : 'Not Featured'}
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/properties/${property.id}`}
                            className="text-[#1E40AF] hover:text-[#1E3A8A] text-sm font-medium transition-colors duration-200"
                          >
                            Edit
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-900 text-sm font-medium transition-colors duration-200"
                            onClick={() => handleDelete(property.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredAndSortedProperties.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters or add a new property.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 