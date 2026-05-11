"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const fetchFeaturedProperties = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/featured-properties', {
        method: 'GET',
        cache: 'no-store',
        signal,
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.details || payload?.error || 'Failed to load featured properties');
      }

      setFeaturedProperties(Array.isArray(payload) ? payload : []);
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      const errorMessage = err?.message || 'Failed to load featured properties';
      setError(errorMessage);
      console.error('Error loading featured properties:', err);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const controller = new AbortController();
    fetchFeaturedProperties(controller.signal);

    return () => controller.abort();
  }, [mounted, fetchFeaturedProperties]);

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
              <h2 className="site-title text-primary mr-4">On Show</h2>
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
              <h2 className="site-title text-primary mr-4">On Show</h2>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => {
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
            <p className="text-gray-500 mb-4">No properties are On Show at the moment.</p>
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