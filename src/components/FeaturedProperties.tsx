"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyCard from './PropertyCard';
import { supabase } from '@/lib/supabase';

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const fetchFeaturedProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            property_types(name),
            property_statuses(name),
            roof_types(name)
          `)
          .eq('featured', true)
          .limit(6); // Increased limit to allow for navigation

        if (error) throw error;

        const propertiesWithImages = data.map(property => ({
          ...property,
          mainImage: property.featuredImage || '/images/placeholder.png',
          status: property.property_statuses?.name || 'completed',
          type: property.property_types?.name || 'House'
        }));

        setFeaturedProperties(propertiesWithImages);
      } catch (err) {
        setError('Failed to load featured properties');
        console.error('Error loading featured properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, [mounted]);

  // Show all featured properties (limit to 6)
  const visibleProperties = featuredProperties.slice(0, 6);

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center flex-1">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mr-4"></div>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center flex-1">
              <h2 className="text-3xl font-bold text-primary mr-4">Featured Projects</h2>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <Link
                href="/properties"
                className="text-primary font-semibold uppercase hover:text-secondary transition-colors border-b-2 border-red-500 pb-1"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center flex-1">
              <h2 className="text-3xl font-bold text-primary mr-4">Featured Projects</h2>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <Link
                href="/properties"
                className="text-primary font-semibold uppercase hover:text-secondary transition-colors border-b-2 border-red-500 pb-1"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with "On Show" title, separator, VIEW ALL link, and navigation */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center flex-1">
            <h2 className="text-3xl font-bold text-primary mr-4">On Show</h2>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <Link
              href="/properties"
              className="text-primary font-semibold uppercase hover:text-secondary transition-colors border-b-2 border-red-500 pb-1"
            >
              VIEW ALL
            </Link>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 