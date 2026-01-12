'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Newspaper, FileText, Calendar, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

type MediaCategory = 'news' | 'resources' | 'events' | 'blogs';

interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  excerpt?: string;
  image_url?: string;
  author?: string;
  published_at?: string;
}

const categoryIcons = {
  news: Newspaper,
  resources: FileText,
  events: Calendar,
  blogs: BookOpen,
};

const categoryLabels = {
  news: 'News',
  resources: 'Resources',
  events: 'Events',
  blogs: 'Blogs',
};

const categoryRoutes = {
  news: '/news',
  resources: '/resources',
  events: '/events',
  blogs: '/blogs',
};

export default function FeaturedMedia() {
  const [featuredByCategory, setFeaturedByCategory] = useState<Record<MediaCategory, MediaItem[]>>({
    news: [],
    resources: [],
    events: [],
    blogs: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentIndices, setCurrentIndices] = useState<Record<MediaCategory, number>>({
    news: 0,
    resources: 0,
    events: 0,
    blogs: 0,
  });

  useEffect(() => {
    fetchFeaturedMedia();
  }, []);

  const fetchFeaturedMedia = async () => {
    try {
      const categories: MediaCategory[] = ['news', 'resources', 'events', 'blogs'];
      const featuredData: Record<MediaCategory, MediaItem[]> = {
        news: [],
        resources: [],
        events: [],
        blogs: [],
      };

      for (const category of categories) {
        const { data, error } = await supabase
          .from('media_items')
          .select('*')
          .eq('category', category)
          .eq('is_featured', true)
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (!error && data) {
          featuredData[category] = data;
        }
      }

      setFeaturedByCategory(featuredData);
    } catch (error) {
      console.error('Error fetching featured media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = (category: MediaCategory) => {
    setCurrentIndices((prev) => {
      const items = featuredByCategory[category];
      const newIndex = prev[category] === 0 ? Math.max(0, items.length - 3) : Math.max(0, prev[category] - 3);
      return { ...prev, [category]: newIndex };
    });
  };

  const handleNext = (category: MediaCategory) => {
    setCurrentIndices((prev) => {
      const items = featuredByCategory[category];
      const newIndex = prev[category] + 3 >= items.length ? 0 : prev[category] + 3;
      return { ...prev, [category]: newIndex };
    });
  };

  if (loading) {
    return null;
  }

  // Only show categories that have featured items
  const categoriesWithItems = (Object.keys(featuredByCategory) as MediaCategory[]).filter(
    (category) => featuredByCategory[category].length > 0
  );

  if (categoriesWithItems.length === 0) {
    return null;
  }

  return (
    <>
      {categoriesWithItems.map((category) => {
        const items = featuredByCategory[category];
        const visibleItems = items.slice(currentIndices[category], currentIndices[category] + 3);
        const CategoryIcon = categoryIcons[category];
        const categoryLabel = categoryLabels[category];
        const categoryRoute = categoryRoutes[category];

        return (
          <section key={category} className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center flex-1">
                  <CategoryIcon className="w-8 h-8 text-primary mr-3" />
                  <h2 className="site-title text-primary mr-4">Featured {categoryLabel}</h2>
                  <div className="flex-1 h-px bg-gray-400"></div>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <Link
                    href={categoryRoute}
                    className="text-primary font-semibold uppercase hover:text-secondary transition-colors border-b-2 border-red-500 pb-1"
                  >
                    VIEW ALL
                  </Link>
                  {items.length > 3 && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePrevious(category)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleNext(category)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Image */}
                    {item.image_url && (
                      <div className="relative h-64 bg-gray-100">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading={index < 3 ? undefined : 'lazy'}
                          priority={index < 3}
                          quality={index < 3 ? 80 : 65}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <CategoryIcon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary uppercase">{categoryLabel}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                      {item.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {item.author && (
                          <span className="text-sm text-gray-500">By {item.author}</span>
                        )}
                        <Link
                          href={`${categoryRoute}/${item.id}`}
                          className="text-primary font-semibold hover:text-secondary transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

