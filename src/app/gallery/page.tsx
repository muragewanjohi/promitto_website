'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaSidebar from '@/components/MediaSidebar';
import { Images, Video, Calendar } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  image_url?: string;
  video_url?: string;
  published_at?: string;
  created_at: string;
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Optimize: Only select needed fields (exclude large 'content' field)
      // Add limit to prevent fetching too many records
      const { data, error: fetchError } = await supabase
        .from('media_items')
        .select('id, title, image_url, video_url, published_at, created_at')
        .eq('category', 'gallery')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(50); // Limit to 50 items to prevent timeout

      if (fetchError) {
        if (fetchError.code === '57014' || fetchError.message?.includes('timeout')) {
          throw new Error('Query timeout - the database query took too long. Please try again.');
        }
        throw fetchError;
      }
      setGalleryItems(data || []);
    } catch (err: any) {
      console.error('Error fetching gallery:', err);
      setError(err?.message || 'Failed to load gallery items');
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
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow h-64"></div>
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <h1 className="site-title text-gray-900 mb-4">Gallery</h1>
                <p className="text-gray-600 text-lg">
                  Browse through our collection of photos and videos showcasing our projects and events.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {galleryItems.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                  <Images className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No gallery items available yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {galleryItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.image_url ? (
                        <div className="relative h-64 overflow-hidden bg-gray-100">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading={index < 4 ? undefined : 'lazy'}
                            priority={index < 4}
                            quality={index < 4 ? 75 : 60}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Images className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ) : item.video_url ? (
                        <div className="relative h-64 overflow-hidden bg-black">
                          <video
                            src={item.video_url}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Video className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ) : null}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                        {item.published_at && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(item.published_at).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
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

      {/* Modal for viewing gallery item */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="max-w-4xl w-full bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedItem.image_url ? (
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={selectedItem.image_url}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : selectedItem.video_url ? (
                <div className="relative w-full h-[70vh]">
                  <video
                    src={selectedItem.video_url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : null}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.title}</h2>
              {selectedItem.published_at && (
                <p className="text-gray-600">
                  {new Date(selectedItem.published_at).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

