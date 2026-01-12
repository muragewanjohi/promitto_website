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
        setLoading(true);
        setError(null);
        
        // First, try to fetch with relationships
        let query = supabase
          .from('properties')
          .select(`
            *,
            property_types(name),
            property_statuses(name),
            roof_types(name)
          `)
          .eq('featured', true)
          .order('updatedat', { ascending: false })
          .limit(12);

        let { data, error } = await query;

        // If the query with relationships fails, try without relationships
        if (error) {
          console.warn('Error fetching with relationships, trying without:', error);
          const simpleQuery = supabase
            .from('properties')
            .select('*')
            .eq('featured', true)
            .order('updatedat', { ascending: false })
            .limit(12);
          
          const simpleResult = await simpleQuery;
          if (simpleResult.error) {
            throw simpleResult.error;
          }
          data = simpleResult.data;
        }

        if (!data || data.length === 0) {
          console.log('No featured properties found');
          setFeaturedProperties([]);
          setLoading(false);
          return;
        }

        const propertiesWithImages = data.map(property => ({
          ...property,
          mainImage: property.featuredImage || property.image_url || '/images/placeholder.png',
          status: property.property_statuses?.name || property.status || 'completed',
          type: property.property_types?.name || property.type || 'House'
        }));

        setFeaturedProperties(propertiesWithImages);
      } catch (err: any) {
        const errorMessage = err?.message || 'Failed to load featured properties';
        setError(errorMessage);
        console.error('Error loading featured properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, [mounted]);

  // Show all featured properties (limit to 12)
  const visibleProperties = featuredProperties.slice(0, 12);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-80 bg-gray-200 animate-pulse"></div>
                <div className="p-7 space-y-4">
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
          <div className="flex items-center mb-12">
            <div className="flex items-center flex-1">
              <h2 className="site-title text-primary mr-4">Featured Projects</h2>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-80 bg-gray-200 animate-pulse"></div>
                <div className="p-7 space-y-4">
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
          <div className="flex items-center mb-12">
            <div className="flex items-center flex-1">
              <h2 className="site-title text-primary mr-4">Featured Projects</h2>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                const fetchFeaturedProperties = async () => {
                  try {
                    setLoading(true);
                    setError(null);
                    
                    let query = supabase
                      .from('properties')
                      .select('*')
                      .eq('featured', true)
                      .order('updatedat', { ascending: false })
                      .limit(12);

                    const { data, error } = await query;

                    if (error) throw error;

                    if (!data || data.length === 0) {
                      setFeaturedProperties([]);
                      setLoading(false);
                      return;
                    }

                    const propertiesWithImages = data.map(property => ({
                      ...property,
                      mainImage: property.featuredImage || property.image_url || '/images/placeholder.png',
                      status: property.status || 'completed',
                      type: property.type || 'House'
                    }));

                    setFeaturedProperties(propertiesWithImages);
                  } catch (err: any) {
                    setError(err?.message || 'Failed to load featured properties');
                    console.error('Error loading featured properties:', err);
                  } finally {
                    setLoading(false);
                  }
                };
                fetchFeaturedProperties();
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with "On Show" title and separator */}
        <div className="flex items-center mb-12">
          <div className="flex items-center flex-1">
            <h2 className="site-title text-primary mr-4">On Show</h2>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>
        </div>

        {/* Properties Grid */}
        {visibleProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              priority={index < 3} // Only prioritize first 3 cards
            />
          ))}
        </div>
            {/* View More Button */}
            <div className="flex justify-end mt-8">
              <Link
                href="/properties"
                className="text-primary font-semibold uppercase hover:text-secondary transition-colors border-b-2 border-red-500 pb-1"
              >
                VIEW MORE
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No featured properties available at the moment.</p>
            <Link
              href="/properties"
              className="text-primary font-semibold uppercase hover:text-secondary transition-colors border-b-2 border-red-500 pb-1"
            >
              VIEW ALL PROPERTIES
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties; 