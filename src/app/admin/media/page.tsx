'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Eye, Star, FileText, Calendar, BookOpen, Newspaper, Images } from 'lucide-react';

type MediaCategory = 'news' | 'resources' | 'events' | 'blogs' | 'gallery';

interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  excerpt?: string;
  image_url?: string;
  is_featured: boolean;
  published: boolean;
  author?: string;
  published_at?: string;
  created_at: string;
}

const categoryIcons = {
  news: Newspaper,
  resources: FileText,
  events: Calendar,
  blogs: BookOpen,
  gallery: Images,
};

const categoryLabels = {
  news: 'News',
  resources: 'Resources',
  events: 'Events',
  blogs: 'Blogs',
  gallery: 'Gallery',
};

export default function MediaManagementPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<MediaCategory | 'all'>('all');
  const router = useRouter();

  useEffect(() => {
    fetchMediaItems();
  }, [filterCategory]);

  const fetchMediaItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('media_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (filterCategory !== 'all') {
        query = query.eq('category', filterCategory);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      setMediaItems(data || []);
    } catch (err) {
      console.error('Error fetching media items:', err);
      setError('Failed to load media items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    
    try {
      const { error } = await supabase
        .from('media_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setMediaItems(mediaItems.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting media item:', err);
      alert('Failed to delete media item');
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('media_items')
        .update({ is_featured: !currentFeatured })
        .eq('id', id);
      
      if (error) throw error;
      
      setMediaItems(mediaItems.map(item => 
        item.id === id ? { ...item, is_featured: !currentFeatured } : item
      ));
    } catch (err) {
      console.error('Error toggling featured status:', err);
      alert('Failed to update featured status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600 mt-2">Manage news, resources, events, and blog posts</p>
        </div>
        <Link
          href="/admin/media/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Media Item
        </Link>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterCategory === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {(Object.keys(categoryLabels) as MediaCategory[]).map((category) => {
          const Icon = categoryIcons[category];
          return (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                filterCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {categoryLabels[category]}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Media Items Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mediaItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No media items found. <Link href="/admin/media/new" className="text-primary hover:underline">Create one</Link>
                </td>
              </tr>
            ) : (
              mediaItems.map((item) => {
                const CategoryIcon = categoryIcons[item.category];
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.image_url && (
                          <div className="relative w-12 h-12 rounded mr-3 overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                              loading="lazy"
                              quality={70}
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          {item.excerpt && (
                            <div className="text-sm text-gray-500 truncate max-w-md">
                              {item.excerpt}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900 capitalize">{categoryLabels[item.category]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(item.id, item.is_featured)}
                        className={`p-2 rounded transition-colors ${
                          item.is_featured
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                        title={item.is_featured ? 'Remove from featured' : 'Mark as featured'}
                      >
                        <Star className={`w-5 h-5 ${item.is_featured ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/media/${item.id}`}
                          className="text-primary hover:text-primary/80 p-2 rounded hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

