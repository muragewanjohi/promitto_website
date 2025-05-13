'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import FeatureSelector from "./FeatureSelector";

interface PropertyFormProps {
  initialData?: {
    id: string;
    name: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    type: 'House' | 'Apartment' | 'Villa' | 'Commercial';
    status: 'completed' | 'ongoing';
    roofType: 'Flatroofed' | 'Pitch Roofed' | 'Hybrid Pitch Roof' | 'Hidden Roof';
    description?: string;
    features?: string[];
    images?: string[];
    featuredImage?: string;
    type_id: string;
    status_id: string;
    roof_type_id: string;
  };
  onSubmit: (data: any) => void;
}

export default function PropertyForm({ initialData, onSubmit }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    price: initialData?.price || '',
    bedrooms: initialData?.bedrooms || 0,
    bathrooms: initialData?.bathrooms || 0,
    type_id: initialData?.type_id || '',
    status_id: initialData?.status_id || '',
    roof_type_id: initialData?.roof_type_id || '',
    description: initialData?.description || '',
    features: Array.isArray(initialData?.features)
      ? initialData.features.map(f => typeof f === 'number' ? f : parseInt(f, 10)).filter(f => !isNaN(f))
      : [],
  });

  // New: Track existing images and previews
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New: Load previews for existing images on mount
  useEffect(() => {
    if (initialData?.images && initialData.images.length > 0) {
      setImagePreviews(initialData.images);
      setFeaturedIndex(
        initialData.images.findIndex(img => img === initialData.featuredImage) || 0
      );
    }
  }, [initialData]);

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).slice(0, 5 - existingImages.length) : [];
    setImages(files);
    setImagePreviews([...existingImages, ...files.map(file => URL.createObjectURL(file))]);
    setFeaturedIndex(existingImages.length); // Default to first new image as featured if none selected
  };

  // Remove an image (existing or new)
  const handleRemoveImage = (idx: number) => {
    if (idx < existingImages.length) {
      // Remove from existing images
      const updated = existingImages.filter((_, i) => i !== idx);
      setExistingImages(updated);
      setImagePreviews(prev => prev.filter((_, i) => i !== idx));
      if (featuredIndex === idx) setFeaturedIndex(null);
    } else {
      // Remove from new images
      const newIdx = idx - existingImages.length;
      setImages(prev => prev.filter((_, i) => i !== newIdx));
      setImagePreviews(prev => prev.filter((_, i) => i !== idx));
      if (featuredIndex === idx) setFeaturedIndex(null);
    }
  };

  // Handle featured image selection
  const handleFeaturedSelect = (idx: number) => {
    setFeaturedIndex(idx);
  };

  // Price formatting with commas
  const formatPrice = (value: string) => {
    // Remove non-digit except dot
    const cleaned = value.replace(/[^\d.]/g, '');
    // Add commas
    const parts = cleaned.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value);
    setFormData({ ...formData, price: formatted });
  };

  // New: Add options state
  const [typeOptions, setTypeOptions] = useState<{ id: number; name: string }[]>([]);
  const [statusOptions, setStatusOptions] = useState<{ id: number; name: string }[]>([]);
  const [roofTypeOptions, setRoofTypeOptions] = useState<{ id: number; name: string }[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      setOptionsLoading(true);
      const [types, statuses, roofs] = await Promise.all([
        supabase.from('property_types').select('*'),
        supabase.from('property_statuses').select('*'),
        supabase.from('roof_types').select('*'),
      ]);
      setTypeOptions(types.data || []);
      setStatusOptions(statuses.data || []);
      setRoofTypeOptions(roofs.data || []);
      setOptionsLoading(false);
    };
    fetchOptions();
  }, []);

  // Enhanced submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    let imageUrls: string[] = [...existingImages];
    try {
      // Upload new images to Supabase Storage
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileExt = file.name.split('.').pop();
        const filePath = `property-${Date.now()}-${i}.${fileExt}`;
        let { data, error: uploadError } = await supabase.storage
          .from('properties')
          .upload(filePath, file, { upsert: false });
        if (uploadError) throw uploadError;
        // Always get the public URL after upload
        const { data: publicUrlData } = supabase.storage
          .from('properties')
          .getPublicUrl(filePath);
        imageUrls.push(publicUrlData.publicUrl);
      }
      // Prepare property data
      const propertyData = {
        ...formData,
        price: formData.price.replace(/,/g, ''), // Remove commas for saving
        features: formData.features.map(f => Number(f)),
        images: imageUrls,
        featuredImage: imageUrls[featuredIndex ?? 0] || null,
      };
      await onSubmit(propertyData);
    } catch (err: any) {
      setError('Failed to upload images or save property.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Basic Info Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <h2 className="text-lg font-semibold text-[#1E40AF] mb-4">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E40AF] focus:ring-[#1E40AF] focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E40AF] focus:ring-[#1E40AF] focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">Price <span className="text-[#F59E0B] font-bold">Ksh</span></label>
            <input
              type="text"
              value={formData.price}
              onChange={handlePriceChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F59E0B] focus:ring-[#F59E0B] focus:outline-none focus:ring-2"
              required
              inputMode="numeric"
              pattern="[0-9,]*"
              placeholder="e.g. 1,200,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.type_id}
              onChange={(e) => setFormData({ ...formData, type_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E40AF] focus:ring-[#1E40AF] focus:outline-none focus:ring-2"
              disabled={optionsLoading}
            >
              {optionsLoading ? (
                <option>Loading...</option>
              ) : (
                typeOptions.map(option => (
                  <option key={option.id} value={option.id.toString()}>{option.name}</option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status_id}
              onChange={(e) => setFormData({ ...formData, status_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E40AF] focus:ring-[#1E40AF] focus:outline-none focus:ring-2"
              disabled={optionsLoading}
            >
              {optionsLoading ? (
                <option>Loading...</option>
              ) : (
                statusOptions.map(option => (
                  <option key={option.id} value={option.id.toString()}>{option.name}</option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Roof Type</label>
            <select
              value={formData.roof_type_id}
              onChange={(e) => setFormData({ ...formData, roof_type_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E40AF] focus:ring-[#1E40AF] focus:outline-none focus:ring-2"
              disabled={optionsLoading}
            >
              {optionsLoading ? (
                <option>Loading...</option>
              ) : (
                roofTypeOptions.map(option => (
                  <option key={option.id} value={option.id.toString()}>{option.name}</option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
            <input
              type="number"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E40AF] focus:ring-[#1E40AF] focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
            <input
              type="number"
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E40AF] focus:ring-[#1E40AF] focus:outline-none focus:ring-2"
              required
            />
          </div>
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <h2 className="text-lg font-semibold text-[#1E40AF] mb-4">Description</h2>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E40AF] focus:ring-[#1E40AF] focus:outline-none focus:ring-2"
        />
      </div>

      {/* Features Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <h2 className="text-lg font-semibold text-[#1E40AF] mb-4">Features</h2>
        <FeatureSelector
          selectedFeatures={formData.features}
          onChange={(selected) => setFormData({ ...formData, features: selected })}
        />
      </div>

      {/* Images Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <h2 className="text-lg font-semibold text-[#1E40AF] mb-4">Property Images <span className="text-xs text-gray-400">(max 5)</span></h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          disabled={uploading || existingImages.length >= 5}
          className="mt-1 block w-full"
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {imagePreviews.map((src, idx) => (
            <div key={idx} className="relative group">
              <img
                src={src}
                alt={`Preview ${idx + 1}`}
                className={`w-28 h-28 object-cover rounded border-2 transition-all duration-200 cursor-pointer ${featuredIndex === idx ? 'border-[#F59E0B] shadow-lg' : 'border-gray-300'}`}
                onClick={() => handleFeaturedSelect(idx)}
                tabIndex={0}
                role="button"
                aria-label={`Set image ${idx + 1} as featured`}
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded opacity-80 hover:opacity-100 shadow"
                onClick={() => handleRemoveImage(idx)}
                aria-label="Remove image"
              >
                &times;
              </button>
              {featuredIndex === idx && (
                <span className="absolute top-1 left-1 bg-[#F59E0B] text-white text-xs px-2 py-1 rounded shadow">Featured</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Click an image to select as featured.</p>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-6 py-2 rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 transition-all"
          disabled={uploading}
        >
          {uploading ? 'Saving...' : initialData ? 'Update Property' : 'Add Property'}
        </button>
      </div>
    </form>
  );
} 