'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaSidebar from '@/components/MediaSidebar';
import { BookOpen, Calendar, User } from 'lucide-react';

interface BlogItem {
  id: string;
  title: string;
  excerpt?: string;
  image_url?: string;
  author?: string;
  published_at?: string;
  created_at: string;
}

export default function BlogsPage() {
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('media_items')
        .select('*')
        .eq('category', 'blogs')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setBlogItems(data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blog posts');
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
                  <BookOpen className="w-8 h-8 text-primary" />
                  <h1 className="site-title text-gray-900">Blogs</h1>
                </div>
                <p className="text-gray-600 text-lg">Read our latest blog posts and insights</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* Blogs Grid */}
              {blogItems.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/blogs/${item.id}`}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                    >
                      {item.image_url && (
                        <div className="relative h-48">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                              <Calendar className="w-4 h-4" />
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

