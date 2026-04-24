'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaSidebar from '@/components/MediaSidebar';
import { Calendar, Clock, User, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  gallery_images?: string[];
  author?: string;
  published_at?: string;
  created_at: string;
}

const getEventDisplayImages = (item: EventItem): string[] => {
  if (item.gallery_images && item.gallery_images.length > 0) {
    return item.gallery_images;
  }
  if (item.image_url) return [item.image_url];
  return [];
};

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [eventItem, setEventItem] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    fetchEventItem();
  }, [id]);

  useEffect(() => {
    setGalleryIndex(0);
  }, [eventItem?.id]);

  const fetchEventItem = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('media_items')
        .select('*')
        .eq('id', id)
        .eq('category', 'events')
        .eq('published', true)
        .single();

      if (fetchError) throw fetchError;
      if (!data) {
        setError('Event not found');
      } else {
        setEventItem(data);
      }
    } catch (err) {
      console.error('Error fetching event item:', err);
      setError('Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !eventItem) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
              <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Events
              </Link>
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
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-900 font-medium truncate">{eventItem.title}</span>
              </nav>

              {/* Article */}
              <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                {(() => {
                  const displayImages = getEventDisplayImages(eventItem);
                  const currentImage = displayImages[galleryIndex];
                  const hasMultipleImages = displayImages.length > 1;

                  return currentImage ? (
                    <div className="relative h-96 bg-gray-100">
                      <Image
                        src={currentImage}
                        alt={`${eventItem.title} - ${galleryIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={galleryIndex === 0}
                        quality={85}
                      />
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={() => setGalleryIndex((i) => (i === 0 ? displayImages.length - 1 : i - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-8 h-8" />
                          </button>
                          <button
                            onClick={() => setGalleryIndex((i) => (i === displayImages.length - 1 ? 0 : i + 1))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-8 h-8" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                            {galleryIndex + 1} / {displayImages.length}
                          </div>
                        </>
                      )}
                    </div>
                  ) : null;
                })()}
                <div className="p-8">
                  <h1 className="site-title text-gray-900 mb-4">{eventItem.title}</h1>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b">
                    {eventItem.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{eventItem.author}</span>
                      </div>
                    )}
                    {eventItem.published_at && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(eventItem.published_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    )}
                  </div>

                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: eventItem.content.replace(/\n/g, '<br />') }}
                  />
                </div>
              </article>

              {/* Back Button */}
              <div className="mt-8">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Events
                </Link>
              </div>
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

