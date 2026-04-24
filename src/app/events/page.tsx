'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaSidebar from '@/components/MediaSidebar';
import { Calendar, User, Clock } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  excerpt?: string;
  image_url?: string;
  author?: string;
  published_at?: string;
  created_at: string;
}

// Cache key for client-side caching (5 minutes)
const EVENTS_CACHE_KEY = 'events_page_cache';
const EVENTS_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function EventsPage() {
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(EVENTS_CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const now = Date.now();
          if (now - timestamp < EVENTS_CACHE_DURATION) {
            setEventItems(data);
            setLoading(false);
            return;
          }
        }
      }

      // Optimize: Only select needed fields (exclude large 'content' field)
      // Add limit to prevent fetching too many records
      const { data, error: fetchError } = await supabase
        .from('media_items')
        .select('id, title, excerpt, image_url, author, published_at, created_at')
        .eq('category', 'events')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(50); // Limit to 50 events to prevent timeout

      if (fetchError) {
        // Check if it's a timeout error
        if (fetchError.code === '57014' || fetchError.message?.includes('timeout')) {
          throw new Error('Query timeout - the database query took too long. Please try again or contact support.');
        }
        throw fetchError;
      }

      const events = (data || []) as EventItem[];
      setEventItems(events);

      // Cache the result
      if (typeof window !== 'undefined') {
        localStorage.setItem(EVENTS_CACHE_KEY, JSON.stringify({
          data: events,
          timestamp: Date.now()
        }));
      }
    } catch (err: any) {
      console.error('Error fetching events:', err);
      const errorMessage = err?.message || 'Failed to load events';
      setError(errorMessage);
      
      // Try to load from cache even if expired
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(EVENTS_CACHE_KEY);
        if (cached) {
          try {
            const { data } = JSON.parse(cached);
            setEventItems(data || []);
            setError('Using cached data. Some events may be outdated.');
          } catch (e) {
            // Cache is corrupted, ignore
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-gray-200 rounded w-1/4"></div>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow h-96"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                  <h1 className="site-title text-gray-900">Events</h1>
                </div>
                <p className="text-gray-600 text-lg">Discover upcoming events and activities</p>
              </div>

              {error && (
                <div className={`border px-4 py-3 rounded-lg mb-6 ${
                  error.includes('cached') 
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>{error}</span>
                    {error.includes('timeout') && (
                      <button
                        onClick={fetchEvents}
                        className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                      >
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Events Grid */}
              {eventItems.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No events available at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {eventItems.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/events/${item.id}`}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                    >
                      {item.image_url && (
                        <div className="relative h-48 bg-gray-100">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                            loading={index < 2 ? undefined : 'lazy'}
                            priority={index < 2}
                            quality={index < 2 ? 80 : 60}
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {item.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{item.author}</span>
                            </div>
                          )}
                          {item.published_at && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{new Date(item.published_at).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <MediaSidebar />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

