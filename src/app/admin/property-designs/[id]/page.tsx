'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';

export default function EditPropertyDesignPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState<number | null>(null);

  const getAccessToken = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token;
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) {
      return [];
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Session expired. Please log in again.');
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    const response = await fetch('/api/admin/property-designs/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || 'Failed to upload images');
    }

    return result.urls ?? [];
  };

  useEffect(() => {
    if (id) {
      fetchDesign();
    }
  }, [id]);

  useEffect(() => {
    return () => {
      newImagePreviews.forEach((preview) => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [newImagePreviews]);

  const fetchDesign = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Session expired. Please log in again.');
      }

      const response = await fetch(`/api/admin/property-designs/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to load property design');
      }

      if (data) {
        const existingImages: string[] = Array.isArray(data.images)
          ? data.images.filter((img: unknown): img is string => typeof img === 'string')
          : [];
        setFormData({
          name: data.name || '',
          bedrooms: data.bedrooms || 2,
          roof_type: data.roof_type || '',
          house_type: data.house_type || '',
          area: data.area || '',
          description: data.description || '',
          folder_path: data.folder_path || '',
          image_path: data.image_path || '',
          images: existingImages,
          features: Array.isArray(data.features) ? data.features : [],
          is_featured: data.is_featured || false,
          display_order: data.display_order || 0,
        });

        const initialFeaturedIndex = existingImages.findIndex((image) => image === data.image_path);
        setFeaturedIndex(existingImages.length > 0 ? (initialFeaturedIndex >= 0 ? initialFeaturedIndex : 0) : null);
      }
    } catch (err: any) {
      console.error('Error fetching property design:', err);
      setError(err.message || 'Failed to load property design');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.roof_type || !formData.house_type) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.images.length + newImages.length === 0) {
        throw new Error('Please upload at least one image');
      }

      const uploadedImageUrls = await uploadImages(newImages);

      const allImageUrls = [...formData.images, ...uploadedImageUrls];
      const resolvedFeaturedIndex = featuredIndex ?? 0;
      const featuredImageUrl =
        resolvedFeaturedIndex < formData.images.length
          ? formData.images[resolvedFeaturedIndex]
          : uploadedImageUrls[resolvedFeaturedIndex - formData.images.length];

      const payload = {
        ...formData,
        image_path: featuredImageUrl ?? allImageUrls[0],
        images: allImageUrls,
      };

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Session expired. Please log in again.');
      }

      const response = await fetch(`/api/admin/property-designs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Failed to update property design');
      }

      router.push('/admin/property-designs');
    } catch (err: any) {
      console.error('Error updating property design:', err);
      setError(err.message || 'Failed to update property design');
    } finally {
      setSaving(false);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) {
      return;
    }

    const currentCount = formData.images.length + newImages.length;
    const remainingSlots = 5 - currentCount;
    const filesToAdd = files.slice(0, remainingSlots);
    if (filesToAdd.length === 0) {
      return;
    }

    const previewsToAdd = filesToAdd.map((file) => URL.createObjectURL(file));
    setNewImages((prev) => [...prev, ...filesToAdd]);
    setNewImagePreviews((prev) => [...prev, ...previewsToAdd]);
    setFeaturedIndex((prev) => (prev === null ? 0 : prev));
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    if (index < formData.images.length) {
      const updatedExistingImages = formData.images.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        images: updatedExistingImages,
      });
    } else {
      const newIndex = index - formData.images.length;
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
      setNewImagePreviews((prev) => {
        const previewToRemove = prev[newIndex];
        if (previewToRemove?.startsWith('blob:')) {
          URL.revokeObjectURL(previewToRemove);
        }
        return prev.filter((_, i) => i !== newIndex);
      });
    }

    setFeaturedIndex((prev) => {
      if (prev === null) {
        return null;
      }

      const totalBeforeRemoval = formData.images.length + newImages.length;
      if (totalBeforeRemoval === 1) {
        return null;
      }
      if (prev === index) {
        return 0;
      }
      if (prev > index) {
        return prev - 1;
      }
      return prev;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-semibold">Edit Property Design</h1>
          <p className="text-primary-100 text-sm mt-1">Update property design information</p>
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
                Property Design Images <span className="text-red-500">*</span>{' '}
                <span className="text-xs text-gray-400">(max 5)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={saving || formData.images.length + newImages.length >= 5}
                className="block w-full"
              />

              {[...formData.images, ...newImagePreviews].length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {[...formData.images, ...newImagePreviews].map((preview, index) => (
                    <div key={`${preview}-${index}`} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className={`w-28 h-28 object-cover rounded border-2 transition-all duration-200 cursor-pointer ${
                          featuredIndex === index ? 'border-primary shadow-lg' : 'border-gray-300'
                        }`}
                        onClick={() => setFeaturedIndex(index)}
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded opacity-80 hover:opacity-100 shadow"
                        onClick={() => removeImage(index)}
                        aria-label="Remove image"
                      >
                        &times;
                      </button>
                      {featuredIndex === index && (
                        <span className="absolute top-1 left-1 bg-primary text-white text-xs px-2 py-1 rounded shadow">
                          Featured
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Upload up to 5 images. Click any preview to mark it as the featured image.
              </p>
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
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

