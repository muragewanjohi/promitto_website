'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';

export default function NewPropertyDesignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    bedrooms: 2,
    roof_type: '',
    house_type: '',
    area: '',
    description: '',
    folder_path: '',
    image_path: '',
    images: [] as string[],
    features: [] as string[],
    is_featured: false,
    display_order: 0,
  });
  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.roof_type || !formData.house_type || !formData.image_path) {
        throw new Error('Please fill in all required fields');
      }

      const { error: insertError } = await supabase
        .from('property_designs')
        .insert([formData]);

      if (insertError) throw insertError;

      router.push('/admin/property-designs');
    } catch (err: any) {
      console.error('Error creating property design:', err);
      setError(err.message || 'Failed to create property design');
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage.trim()],
      });
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/admin/property-designs"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Property Designs
      </Link>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-primary to-primary/90 text-white">
          <h1 className="text-2xl font-semibold">Add New Property Design</h1>
          <p className="text-primary-100 text-sm mt-1">Create a new property design listing</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Design Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roof Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.roof_type}
                  onChange={(e) => setFormData({ ...formData, roof_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select Roof Type</option>
                  <option value="Flat Roof">Flat Roof</option>
                  <option value="Pitched Roof">Pitched Roof</option>
                  <option value="Hidden Roof">Hidden Roof</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  House Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.house_type}
                  onChange={(e) => setFormData({ ...formData, house_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select House Type</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Mansionette">Mansionette</option>
                  <option value="Hybrid Mansionette">Hybrid Mansionette</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (e.g., &quot;140 sqm&quot;)</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="140 sqm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Describe the property design..."
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Images</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.image_path}
                onChange={(e) => setFormData({ ...formData, image_path: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="/house_designs/..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter image URL and press Enter"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
              </div>
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1 text-sm text-gray-700 truncate">{image}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Features</h2>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter feature and press Enter"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-primary hover:text-primary/80"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Other Settings */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Settings</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Folder Path</label>
              <input
                type="text"
                value={formData.folder_path}
                onChange={(e) => setFormData({ ...formData, folder_path: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="/house_designs/..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
                Mark as Featured
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <Link
              href="/admin/property-designs"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Property Design'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

