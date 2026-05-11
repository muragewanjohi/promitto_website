"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { safeNextImageSrc } from '@/lib/safeNextImageSrc';

interface PropertyDesign {
  id: string;
  name: string;
  bedrooms: number;
  roofType: string;
  imagePath: string;
  area: string;
  description?: string;
  features?: string[];
}

const FeaturedDesigns = () => {
  const [designs, setDesigns] = useState<PropertyDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load all property designs from the same source as property-designs page
  useEffect(() => {
    setMounted(true);
    const loadDesigns = async () => {
      try {
        const { data, error } = await supabase
          .from('property_designs')
          .select('*')
          .eq('is_featured', true)
          .order('display_order', { ascending: true })
          .order('updatedat', { ascending: false })
          .limit(12);

        if (error) {
          throw error;
        }

        const mapped: PropertyDesign[] = (data || []).map((design: any) => ({
          id: design.id,
          name: design.name,
          bedrooms: design.bedrooms,
          roofType: design.roof_type,
          imagePath: design.image_path,
          area: design.area || '',
          description: design.description || '',
          features: Array.isArray(design.features) ? design.features : [],
        }));

        setDesigns(mapped);
      } catch (error) {
        console.error('Error loading featured designs:', error);
        setDesigns([]);
      } finally {
        setLoading(false);
      }
    };

    loadDesigns();
  }, []);

  // Show up to 12 designs (4 rows × 3 columns)
  const visibleDesigns = designs.slice(0, 12);

  // Show loading state until component is mounted or data is loading
  if (!mounted || loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="flex items-center flex-1">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mr-4"></div>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-72 bg-gray-200 animate-pulse"></div>
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-12">
          <div className="flex items-center flex-1">
            <h2 className="site-title text-primary mr-4">Featured Designs</h2>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>
        </div>

        {/* Designs Grid */}
        {visibleDesigns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleDesigns.map((design, index) => (
            <div key={design.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-72 bg-gray-100">
                <Image
                  src={safeNextImageSrc(design.imagePath)}
                  alt={design.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={index < 3 ? undefined : 'lazy'}
                  priority={index < 3}
                  quality={index < 3 ? 80 : 65}
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {design.bedrooms} BR
                </div>
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {design.area}
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{design.name}</h3>
                <p className="text-gray-600 mb-4">{design.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{design.roofType}</span>
                  <Link
                    href={`/property-designs/${design.id}`}
                    className="text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* View More Button */}
        <div className="flex justify-end mt-8">
          <Link
            href="/property-designs"
            className="text-primary font-semibold uppercase hover:text-secondary transition-colors border-b-2 border-red-500 pb-1"
          >
            VIEW MORE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;