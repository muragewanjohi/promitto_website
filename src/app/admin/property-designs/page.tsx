'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { safeNextImageSrc } from '@/lib/safeNextImageSrc';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

interface PropertyDesign {
  id: string;
  name: string;
  bedrooms: number;
  roof_type: string;
  house_type: string;
  area?: string;
  description?: string;
  image_path: string;
  images: string[];
  features: string[];
  is_featured: boolean;
  display_order: number;
  createdat: string;
  updatedat: string;
}

export default function PropertyDesignsAdmin() {
  const [designs, setDesigns] = useState<PropertyDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterBedrooms, setFilterBedrooms] = useState<string>('all');
  const [filterRoofType, setFilterRoofType] = useState<string>('all');
  const getAccessToken = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token;
  };

  useEffect(() => {
    fetchDesigns();
  }, [filterBedrooms, filterRoofType]);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Session expired. Please log in again.');
      }

      const params = new URLSearchParams({
        bedrooms: filterBedrooms,
        roofType: filterRoofType,
      });

      const response = await fetch(`/api/admin/property-designs?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Failed to fetch property designs');
      }

      setDesigns(result || []);
    } catch (err) {
      console.error('Error fetching property designs:', err);
      setError('Failed to load property designs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property design?')) return;
    
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Session expired. Please log in again.');
      }

      const response = await fetch(`/api/admin/property-designs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Failed to delete property design');
      }
      
      setDesigns(designs.filter(design => design.id !== id));
    } catch (err) {
      console.error('Error deleting property design:', err);
      alert('Failed to delete property design');
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Session expired. Please log in again.');
      }

      const response = await fetch(`/api/admin/property-designs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ is_featured: !currentFeatured }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Failed to update property design');
      }
      
      setDesigns(designs.map(design => 
        design.id === id ? { ...design, is_featured: !currentFeatured } : design
      ));
    } catch (err) {
      console.error('Error toggling featured status:', err);
      alert('Failed to update featured status');
    }
  };

  // Get unique values for filters
  const uniqueBedrooms = Array.from(new Set(designs.map(d => d.bedrooms))).sort((a, b) => a - b);
  const uniqueRoofTypes = Array.from(new Set(designs.map(d => d.roof_type))).sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Property Designs Management</h1>
          <p className="text-gray-600 mt-2">Manage property design listings</p>
        </div>
        <Link
          href="/admin/property-designs/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Property Design
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <select
            value={filterBedrooms}
            onChange={(e) => setFilterBedrooms(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Bedrooms</option>
            {uniqueBedrooms.map(bedrooms => (
              <option key={bedrooms} value={bedrooms.toString()}>{bedrooms} Bedrooms</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Roof Type</label>
          <select
            value={filterRoofType}
            onChange={(e) => setFilterRoofType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Roof Types</option>
            {uniqueRoofTypes.map(roofType => (
              <option key={roofType} value={roofType}>{roofType}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Designs Grid */}
      {designs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No property designs found.</p>
          <Link
            href="/admin/property-designs/new"
            className="text-primary hover:underline font-medium"
          >
            Create your first property design
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <div key={design.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                {design.image_path ? (
                  <Image
                    src={safeNextImageSrc(design.image_path)}
                    alt={design.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  {design.is_featured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </span>
                  )}
                  <span className="bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                    {design.bedrooms} BR
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{design.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>{design.roof_type}</span>
                  <span>•</span>
                  <span>{design.house_type}</span>
                  {design.area && (
                    <>
                      <span>•</span>
                      <span>{design.area}</span>
                    </>
                  )}
                </div>
                {design.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{design.description}</p>
                )}
                
                {/* Featured Toggle */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                  <button
                    onClick={() => toggleFeatured(design.id, design.is_featured)}
                    type="button"
                    role="switch"
                    aria-checked={design.is_featured}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 ${
                      design.is_featured ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    title={design.is_featured ? 'Set as inactive' : 'Set as active'}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 ${
                        design.is_featured ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/property-designs/${design.id}`}
                      className="text-primary hover:text-primary/80 p-2 rounded hover:bg-primary/10 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(design.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    Order: {design.display_order}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

