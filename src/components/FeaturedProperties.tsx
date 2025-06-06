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

  useEffect(() => {
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
          .limit(3);

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
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Featured Properties</h2>
            <p className="text-gray-600">Loading featured properties...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Ongoing and Completed Projects</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Featured Projects</h2>
          <p className="text-gray-600">Discover our handpicked selection of premium projects</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-block bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 