'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Newspaper, FileText, Calendar, BookOpen, Twitter, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';

type MediaCategory = 'news' | 'resources' | 'events' | 'blogs';

interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  image_url?: string;
  published_at?: string;
  created_at: string;
}

const categoryIcons = {
  news: Newspaper,
  resources: FileText,
  events: Calendar,
  blogs: BookOpen,
};

const categoryLabels = {
  news: 'News & Highlights',
  resources: 'Featured Resources',
  events: 'Upcoming Events',
  blogs: 'Latest Blogs',
};

const categoryRoutes = {
  news: '/news',
  resources: '/resources',
  events: '/events',
  blogs: '/blogs',
};

// Cache key for client-side caching (5 minutes)
const CACHE_KEY = 'media_sidebar_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function MediaSidebar() {
  const [latestByCategory, setLatestByCategory] = useState<Record<MediaCategory, MediaItem[]>>({
    news: [],
    resources: [],
    events: [],
    blogs: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeSocial, setActiveSocial] = useState<'twitter' | 'facebook'>('twitter');

  useEffect(() => {
    fetchLatestMedia();
  }, []);

  const fetchLatestMedia = async () => {
    try {
      setLoading(true);
      
      // Check cache first
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const now = Date.now();
          if (now - timestamp < CACHE_DURATION) {
            setLatestByCategory(data);
            setLoading(false);
            return;
          }
        }
      }

      const categories: MediaCategory[] = ['news', 'resources', 'events', 'blogs'];
      
      // Optimize: Use a single query instead of 4 separate queries
      // Fetch all published items for all categories at once
      const { data, error } = await supabase
        .from('media_items')
        .select('id, title, category, image_url, published_at, created_at')
        .eq('published', true)
        .in('category', categories)
        .order('created_at', { ascending: false })
        .limit(20); // Fetch more than needed, then filter client-side

      if (error) throw error;

      // Group by category and limit to 5 per category
      const grouped: Record<MediaCategory, MediaItem[]> = {
        news: [],
        resources: [],
        events: [],
        blogs: [],
      };

      // Group items by category
      (data || []).forEach((item) => {
        const category = item.category as MediaCategory;
        if (grouped[category] && grouped[category].length < 5) {
          grouped[category].push(item);
        }
      });

      setLatestByCategory(grouped);

      // Cache the result
      if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: grouped,
          timestamp: Date.now()
        }));
      }
    } catch (err) {
      console.error('Error fetching latest media:', err);
      // Don't block the page - show empty state if fetch fails
      setLatestByCategory({
        news: [],
        resources: [],
        events: [],
        blogs: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const socialLinks = {
    twitter: 'https://twitter.com/promittohttps://x.com/PromittoLtd',
    facebook: 'https://facebook.com/PromittoSacco',
    linkedin: 'https://www.linkedin.com/company/promittoltd',
    youtube: 'https://http://www.youtube.com/@promittoltd3271',
    instagram: 'https://www.instagram.com/promitto_ltd',
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
      {/* Latest Media by Category */}
      {(['news', 'resources', 'events', 'blogs'] as MediaCategory[]).map((category) => {
        const items = latestByCategory[category];
        const Icon = categoryIcons[category];
        const label = categoryLabels[category];
        const route = categoryRoutes[category];

        if (loading) {
          return (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          );
        }

        if (items.length === 0) return null;

        return (
          <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">{label}</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="px-6 py-4 space-y-4">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`${route}/${item.id}`}
                    className="block group hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* Image or Icon */}
                      <div className="flex-shrink-0">
                        {item.image_url ? (
                          <div className="relative w-16 h-16 rounded overflow-hidden">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="64px"
                              loading="lazy"
                              quality={70}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-green-600 font-medium mb-1">
                          {formatDate(item.published_at || item.created_at)}
                        </div>
                        <p className="text-sm text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <Link
                href={route}
                className="text-sm text-primary hover:text-secondary font-semibold transition-colors"
              >
                [View All]
              </Link>
            </div>
          </div>
        );
      })}

      {/* Social Media Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Social Media</h3>
        
        {/* Social Media Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveSocial('twitter')}
            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
              activeSocial === 'twitter'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <Twitter className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setActiveSocial('facebook')}
            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
              activeSocial === 'facebook'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <Facebook className="w-4 h-4 mx-auto" />
          </button>
        </div>

        {/* Social Media Feed Placeholder */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">
              {activeSocial === 'twitter' ? '🐦' : '📘'}
            </div>
            <p className="text-sm text-gray-600">
              {activeSocial === 'twitter' ? '#promitto Tweets' : 'Promitto Facebook Feed'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Connect with us on social media
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              title="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              title="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

