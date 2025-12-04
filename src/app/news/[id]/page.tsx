'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaSidebar from '@/components/MediaSidebar';
import { Newspaper, Calendar, User, ArrowLeft } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  author?: string;
  published_at?: string;
  created_at: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsItem();
  }, [id]);

  const fetchNewsItem = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('media_items')
        .select('*')
        .eq('id', id)
        .eq('category', 'news')
        .eq('published', true)
        .single();

      if (fetchError) throw fetchError;
      if (!data) {
        setError('News article not found');
      } else {
        setNewsItem(data);
      }
    } catch (err) {
      console.error('Error fetching news item:', err);
      setError('Failed to load news article');
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

  if (error || !newsItem) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
              <p className="text-gray-600 mb-6">{error || 'The news article you are looking for does not exist.'}</p>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to News
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
                <Link href="/news" className="hover:text-primary transition-colors">News</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-900 font-medium truncate">{newsItem.title}</span>
              </nav>

              {/* Article */}
              <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                {newsItem.image_url && (
                  <div className="relative h-96">
                    <Image
                      src={newsItem.image_url}
                      alt={newsItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h1 className="site-title text-gray-900 mb-4">{newsItem.title}</h1>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b">
                    {newsItem.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{newsItem.author}</span>
                      </div>
                    )}
                    {newsItem.published_at && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(newsItem.published_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    )}
                  </div>

                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: newsItem.content.replace(/\n/g, '<br />') }}
                  />
                </div>
              </article>

              {/* Back Button */}
              <div className="mt-8">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to News
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

