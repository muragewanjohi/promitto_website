'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

function formatPrice(price: string | number) {
  const num = typeof price === 'number' ? price : parseFloat(price.toString().replace(/,/g, ''));
  if (isNaN(num)) return price;
  return num.toLocaleString();
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

  // Filtering logic
  const filteredProperties = properties.filter((property) => {
    const matchesProperty = (property.name || '').toLowerCase().includes(filters.property.toLowerCase());
    const matchesLocation = (property.location || '').toLowerCase().includes(filters.location.toLowerCase());
    const matchesPrice = filters.price === '' || String(formatPrice(property.price)).includes(filters.price.replace(/,/g, ''));
    const matchesStatus = (property.status_name || '').toLowerCase().includes(filters.status.toLowerCase());
    return matchesProperty && matchesLocation && matchesPrice && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Properties Management</h1>
        <Link
          href="/admin/properties/new"
          className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-4 py-2 rounded-lg"
        >
          Add New Property
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading properties...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div>Property</div>
                  <input
                    type="text"
                    placeholder="Filter..."
                    className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs"
                    value={filters.property}
                    onChange={e => setFilters(f => ({ ...f, property: e.target.value }))}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div>Location</div>
                  <input
                    type="text"
                    placeholder="Filter..."
                    className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs"
                    value={filters.location}
                    onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div>Price</div>
                  <input
                    type="text"
                    placeholder="Filter..."
                    className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs"
                    value={filters.price}
                    onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div>Status</div>
                  <input
                    type="text"
                    placeholder="Filter..."
                    className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs"
                    value={filters.status}
                    onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                  />
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
              {filteredProperties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
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
                    <div className="text-sm text-gray-900">{formatPrice(property.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property.featured
                          ? 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A]'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {property.featured ? 'Featured' : 'Not Featured'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/admin/properties/${property.id}`}
                      className="text-[#1E40AF] hover:text-[#1E3A8A] mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(property.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 