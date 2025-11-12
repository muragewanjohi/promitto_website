'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function EditFAQPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    display_order: 0,
    published: true,
  });

  useEffect(() => {
    fetchFAQ();
  }, [id]);

  const fetchFAQ = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          question: data.question,
          answer: data.answer,
          display_order: data.display_order || 0,
          published: data.published !== undefined ? data.published : true,
        });
      }
    } catch (error: any) {
      console.error('Error fetching FAQ:', error);
      alert('Failed to load FAQ');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question.trim() || !formData.answer.trim()) {
      alert('Please fill in both question and answer');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('faqs')
        .update(formData)
        .eq('id', id);

      if (error) throw error;

      router.push('/admin/faqs');
    } catch (error: any) {
      console.error('Error updating FAQ:', error);
      alert('Failed to update FAQ: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading FAQ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/faqs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to FAQs
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit FAQ</h1>
        <p className="text-gray-600 mt-2">Update the frequently asked question</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
              Question *
            </label>
            <input
              type="text"
              id="question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter the question"
              required
            />
          </div>

          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
              Answer *
            </label>
            <textarea
              id="answer"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter the answer"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="display_order" className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                id="display_order"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={formData.published}
                    onChange={() => setFormData({ ...formData, published: true })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Published</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!formData.published}
                    onChange={() => setFormData({ ...formData, published: false })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Draft</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <Link
              href="/admin/faqs"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

