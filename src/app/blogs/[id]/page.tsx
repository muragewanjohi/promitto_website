'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaSidebar from '@/components/MediaSidebar';
import { BookOpen, Calendar, User, ArrowLeft } from 'lucide-react';

interface BlogItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  author?: string;
  published_at?: string;
  created_at: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [blogItem, setBlogItem] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogItem();
  }, [id]);

  const fetchBlogItem = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('media_items')
        .select('*')
        .eq('id', id)
        .eq('category', 'blogs')
        .eq('published', true)
        .single();

      if (fetchError) throw fetchError;
      if (!data) {
        setError('Blog post not found');
      } else {
        setBlogItem(data);
      }
    } catch (err) {
      console.error('Error fetching blog item:', err);
      setError('Failed to load blog post');
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

  if (error || !blogItem) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Post Not Found</h2>
              <p className="text-gray-600 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
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
                <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-900 font-medium truncate">{blogItem.title}</span>
              </nav>

              {/* Article */}
              <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                {blogItem.image_url && (
                  <div className="relative h-96">
                    <Image
                      src={blogItem.image_url}
                      alt={blogItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h1 className="site-title text-gray-900 mb-4">{blogItem.title}</h1>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b">
                    {blogItem.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{blogItem.author}</span>
                      </div>
                    )}
                    {blogItem.published_at && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(blogItem.published_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    )}
                  </div>

                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blogItem.content.replace(/\n/g, '<br />') }}
                  />
                </div>
              </article>

              {/* Back Button */}
              <div className="mt-8">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blogs
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

