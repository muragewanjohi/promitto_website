'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      setFaqs(data || []);
    } catch (err: any) {
      console.error('Error fetching FAQs:', err);
      setError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFaqs(faqs.filter((faq) => faq.id !== id));
    } catch (err: any) {
      console.error('Error deleting FAQ:', err);
      alert('Failed to delete FAQ');
    }
  };

  const togglePublished = async (id: string, currentPublished: boolean) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ published: !currentPublished })
        .eq('id', id);

      if (error) throw error;

      setFaqs(
        faqs.map((faq) =>
          faq.id === id ? { ...faq, published: !currentPublished } : faq
        )
      );
    } catch (err: any) {
      console.error('Error toggling published status:', err);
      alert('Failed to update FAQ status');
    }
  };

  const moveOrder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = faqs.findIndex((f) => f.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= faqs.length) return;

    const currentFAQ = faqs[currentIndex];
    const targetFAQ = faqs[newIndex];

    try {
      // Swap display orders
      const { error: error1 } = await supabase
        .from('faqs')
        .update({ display_order: targetFAQ.display_order })
        .eq('id', currentFAQ.id);

      const { error: error2 } = await supabase
        .from('faqs')
        .update({ display_order: currentFAQ.display_order })
        .eq('id', targetFAQ.id);

      if (error1 || error2) throw error1 || error2;

      // Update local state
      const newFaqs = [...faqs];
      [newFaqs[currentIndex], newFaqs[newIndex]] = [
        newFaqs[newIndex],
        newFaqs[currentIndex],
      ];
      setFaqs(newFaqs);
    } catch (err: any) {
      console.error('Error moving FAQ order:', err);
      alert('Failed to update FAQ order');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-600 mt-2">Manage frequently asked questions</p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add FAQ
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* FAQs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Answer Preview
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {faqs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No FAQs found. Create your first FAQ to get started.
                </td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveOrder(faq.id, 'up')}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={faqs.indexOf(faq) === 0}
                      >
                        <ArrowUp className="w-4 h-4 text-gray-500" />
                      </button>
                      <span className="text-sm font-medium text-gray-900">
                        {faq.display_order}
                      </span>
                      <button
                        onClick={() => moveOrder(faq.id, 'down')}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={faqs.indexOf(faq) === faqs.length - 1}
                      >
                        <ArrowDown className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-md">
                      {faq.question}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-md line-clamp-2">
                      {faq.answer.substring(0, 100)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePublished(faq.id, faq.published)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        faq.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {faq.published ? (
                        <>
                          <Eye className="w-3 h-3" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/faqs/${faq.id}`}
                        className="text-primary hover:text-primary/80"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

