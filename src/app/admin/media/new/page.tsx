'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Save, X, Video, Plus } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
// @ts-ignore - tus-js-client types will be available after npm install
import * as tus from 'tus-js-client';

type MediaCategory = 'news' | 'resources' | 'events' | 'blogs' | 'gallery';
type MediaType = 'image' | 'video';

const isMultiImageCategory = (category: MediaCategory) =>
  category === 'events' || category === 'gallery';

export default function NewMediaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<{ file: File; preview: string }[]>([]);
  const [galleryImageUrls, setGalleryImageUrls] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [galleryMediaType, setGalleryMediaType] = useState<MediaType>('image');
  const [formData, setFormData] = useState({
    title: '',
    category: 'news' as MediaCategory,
    content: '',
    excerpt: '',
    image_url: '',
    video_url: '',
    is_featured: false,
    published: false,
    author: '',
    published_at: new Date().toISOString().split('T')[0],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleMultiImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = '';
  };

  const handleRemoveMultiImage = (index: number) => {
    if (index < imagePreviews.length) {
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => {
        URL.revokeObjectURL(prev[index].preview);
        return prev.filter((_, i) => i !== index);
      });
    } else {
      const urlIndex = index - imagePreviews.length;
      setGalleryImageUrls((prev) => prev.filter((_, i) => i !== urlIndex));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, image_url: '' });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setFormData({ ...formData, video_url: '' });
  };

  // Resumable video upload function using TUS protocol
  const uploadVideoResumable = async (file: File, filePath: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        // Get the current session to use authenticated token
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          reject(new Error('You must be logged in to upload videos. Please sign in and try again.'));
          return;
        }

        // Get Supabase storage URL
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        
        // Extract project ref from URL (format: https://xxxxx.supabase.co)
        const urlMatch = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
        if (!urlMatch) {
          reject(new Error('Invalid Supabase URL format'));
          return;
        }
        const projectRef = urlMatch[1];

        // Use direct storage hostname for better performance
        const storageUrl = `https://${projectRef}.supabase.co/storage/v1/upload/resumable`;
        
        // Use the session access token instead of anon key for authenticated uploads
        const accessToken = session.access_token;
        
        const upload = new tus.Upload(file, {
          endpoint: storageUrl,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          headers: {
            authorization: `Bearer ${accessToken}`,
            'x-upsert': 'false',
          },
        metadata: {
          bucketName: 'media',
          objectName: filePath,
          contentType: file.type || 'video/mp4',
          cacheControl: '3600',
        },
        chunkSize: 6 * 1024 * 1024, // 6MB chunks (required by Supabase)
        removeFingerprintOnSuccess: true,
        onError: (error: Error) => {
          console.error('Upload error:', error);
          setUploading(false);
          setUploadProgress(0);
          reject(new Error(`Upload failed: ${error.message || 'Unknown error'}`));
        },
        onProgress: (bytesUploaded: number, bytesTotal: number) => {
          const progress = Math.round((bytesUploaded / bytesTotal) * 100);
          setUploadProgress(progress);
        },
        onSuccess: () => {
          // Get the public URL after successful upload
          const { data: publicUrlData } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);
          resolve(publicUrlData.publicUrl);
        },
      });

        // Check if there's a previous upload to resume
        // @ts-ignore - tus-js-client types
        upload.findPreviousUploads().then((previousUploads: any) => {
          if (previousUploads.length > 0) {
            // @ts-ignore - tus-js-client types
            upload.resumeFromPreviousUpload(previousUploads[0]);
          }
          upload.start();
        }).catch((error: Error) => {
          console.error('Error starting upload:', error);
          setUploading(false);
          setUploadProgress(0);
          reject(new Error(`Failed to start upload: ${error.message || 'Unknown error'}`));
        });
      } catch (error) {
        console.error('Error setting up upload:', error);
        setUploading(false);
        setUploadProgress(0);
        reject(new Error(`Failed to set up upload: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploading(false);
    setError(null);

    // Validation for gallery items
    if (formData.category === 'gallery') {
      if (galleryMediaType === 'image') {
        const hasImages = imageFiles.length > 0 || galleryImageUrls.length > 0 || imageFile || formData.image_url;
        if (!hasImages) {
          setError('Please upload at least one image for the gallery item');
          setLoading(false);
          return;
        }
      } else if (!videoFile && !formData.video_url) {
        setError('Please upload a video for the gallery item');
        setLoading(false);
        return;
      }
    }

    // Validation for events - need at least one image when using multi-image
    if (formData.category === 'events') {
      const hasImages = imageFiles.length > 0 || galleryImageUrls.length > 0 || imageFile || formData.image_url;
      if (!hasImages) {
        setError('Please upload at least one image for the event');
        setLoading(false);
        return;
      }
    }

    // Validation for non-gallery items
    if (formData.category !== 'gallery' && !formData.content.trim()) {
      setError('Content is required for this category');
      setLoading(false);
      return;
    }

    try {
      let imageUrl = formData.image_url;
      let videoUrl = formData.video_url;
      let galleryImages: string[] = [];

      const isMultiImage = isMultiImageCategory(formData.category) &&
        (formData.category !== 'gallery' || galleryMediaType === 'image');

      if (isMultiImage && (imageFiles.length > 0 || galleryImageUrls.length > 0)) {
        // Multi-image upload for events/gallery
        setUploading(true);
        const uploadedUrls: string[] = [...galleryImageUrls];

        for (const file of imageFiles) {
          const fileExt = file.name.split('.').pop();
          const filePath = `media/images/media-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file, { upsert: false });

          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);
          uploadedUrls.push(publicUrlData.publicUrl);
        }

        galleryImages = uploadedUrls;
        imageUrl = uploadedUrls[0] || imageUrl;
        setUploading(false);
      } else if (imageFile && !isMultiImage) {
        // Single image upload for other categories
        setUploading(true);
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `media/images/media-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, imageFile, { upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
        setUploading(false);
      }

      // Upload new video to Supabase Storage if a file was selected
      // Always use resumable upload for videos (better for reliability and progress tracking)
      if (videoFile) {
        setUploading(true);
        setUploadProgress(0);
        const fileExt = videoFile.name.split('.').pop();
        const filePath = `media/videos/video-${Date.now()}.${fileExt}`;
        
        try {
          // Use resumable upload for all videos (more reliable, especially for larger files)
          videoUrl = await uploadVideoResumable(videoFile, filePath);
        } catch (uploadError) {
          console.error('Video upload error:', uploadError);
          throw new Error(`Video upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`);
        } finally {
          setUploading(false);
          setUploadProgress(0);
        }
      }

      // For gallery items, only include image_url or video_url based on selection
      const insertData: any = {
        ...formData,
        published_at: formData.published_at ? new Date(formData.published_at).toISOString() : null,
      };

      // For gallery category, don't include content and excerpt
      if (formData.category === 'gallery') {
        delete insertData.content;
        delete insertData.excerpt;
        // Only set the relevant URL based on media type
        if (galleryMediaType === 'image') {
          insertData.image_url = imageUrl;
          insertData.video_url = null;
          insertData.gallery_images = galleryImages;
        } else {
          insertData.video_url = videoUrl;
          insertData.image_url = null;
          insertData.gallery_images = [];
        }
      } else if (formData.category === 'events') {
        insertData.image_url = imageUrl;
        insertData.video_url = videoUrl;
        insertData.gallery_images = galleryImages;
      } else {
        insertData.image_url = imageUrl;
        insertData.video_url = videoUrl;
      }

      const { error: insertError } = await supabase
        .from('media_items')
        .insert([insertData]);

      if (insertError) throw insertError;

      router.push('/admin/media');
    } catch (err) {
      console.error('Error creating media item:', err);
      setError(err instanceof Error ? err.message : 'Failed to create media item');
      setUploading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/media"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Media
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Media Item</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => {
                const newCategory = e.target.value as MediaCategory;
                setFormData({ ...formData, category: newCategory });
                // Reset content and excerpt when switching to gallery
                if (newCategory === 'gallery') {
                  setFormData((prev) => ({ ...prev, category: newCategory, content: '', excerpt: '' }));
                }
                // Reset multi-image state when switching away from events/gallery
                if (!isMultiImageCategory(newCategory)) {
                  setImageFiles([]);
                  setImagePreviews([]);
                  setGalleryImageUrls([]);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="news">News</option>
              <option value="resources">Resources</option>
              <option value="events">Events</option>
              <option value="blogs">Blogs</option>
              <option value="gallery">Gallery</option>
            </select>
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Gallery Media Type Selection */}
        {formData.category === 'gallery' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media Type *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="galleryMediaType"
                  value="image"
                  checked={galleryMediaType === 'image'}
                  onChange={(e) => {
                    setGalleryMediaType('image');
                    setVideoFile(null);
                    setVideoPreview(null);
                    setFormData({ ...formData, video_url: '' });
                  }}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">Image</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="galleryMediaType"
                  value="video"
                  checked={galleryMediaType === 'video'}
                  onChange={(e) => {
                    setGalleryMediaType('video');
                    setImageFile(null);
                    setImagePreview(null);
                    setFormData({ ...formData, image_url: '' });
                  }}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">Video</span>
              </label>
            </div>
          </div>
        )}

        {/* Excerpt - Hidden for gallery */}
        {formData.category !== 'gallery' && (
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Brief summary or preview text"
            />
          </div>
        )}

        {/* Image Upload - Show for all categories except gallery with video selected */}
        {formData.category !== 'gallery' || galleryMediaType === 'image' ? (
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              {isMultiImageCategory(formData.category)
                ? 'Gallery Images * (upload multiple)'
                : 'Image'}
            </label>

            {isMultiImageCategory(formData.category) ? (
              <>
                <div className="flex flex-wrap gap-4 mb-4">
                  {imagePreviews.map((item, index) => (
                    <div key={index} className="relative">
                      <img
                        src={item.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-32 h-24 object-cover rounded-lg border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMultiImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                        disabled={uploading || loading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {galleryImageUrls.map((url, index) => (
                    <div key={`url-${index}`} className="relative">
                      <img
                        src={url}
                        alt={`Uploaded ${index + 1}`}
                        className="w-32 h-24 object-cover rounded-lg border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMultiImage(imagePreviews.length + index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                        disabled={uploading || loading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <Plus className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">Add more images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultiImageChange}
                    disabled={uploading || loading}
                    className="hidden"
                  />
                </label>
                {uploading && (
                  <p className="text-sm text-gray-500 mt-2">Uploading images...</p>
                )}
              </>
            ) : (
              <>
                {!imagePreview && !formData.image_url && (
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading || loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                )}
                {(imagePreview || formData.image_url) && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview || formData.image_url}
                      alt="Preview"
                      className="w-64 h-48 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                      disabled={uploading || loading}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {!imagePreview && formData.image_url && (
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              setImageFile(file);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          };
                          input.click();
                        }}
                        className="absolute bottom-2 left-2 bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        disabled={uploading || loading}
                      >
                        Replace Image
                      </button>
                    )}
                  </div>
                )}
                {uploading && (
                  <p className="text-sm text-gray-500 mt-2">Uploading image...</p>
                )}
              </>
            )}
          </div>
        ) : null}

        {/* Content - Hidden for gallery */}
        {formData.category !== 'gallery' && (
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Enter the full content here..."
              />
            </div>
          </div>
        )}

        {/* Video Upload - Show for all categories except gallery with image selected */}
        {formData.category !== 'gallery' || galleryMediaType === 'video' ? (
          <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2">
              {formData.category === 'gallery' ? 'Gallery Video *' : 'Video'}
            </label>
            {!videoPreview && !formData.video_url && (
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={handleVideoChange}
                disabled={uploading || loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          )}
          {(videoPreview || formData.video_url) && (
            <div className="relative inline-block">
              <video
                src={videoPreview || formData.video_url}
                controls
                className="w-full max-w-2xl h-auto rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                disabled={uploading || loading}
              >
                <X className="w-4 h-4" />
              </button>
              {!videoPreview && formData.video_url && (
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'video/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        setVideoFile(file);
                        setVideoPreview(URL.createObjectURL(file));
                      }
                    };
                    input.click();
                  }}
                  className="absolute bottom-2 left-2 bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/90 transition-colors text-sm flex items-center gap-2"
                  disabled={uploading || loading}
                >
                  <Video className="w-4 h-4" />
                  Replace Video
                </button>
              )}
            </div>
          )}
          {uploading && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-2">Uploading video... {uploadProgress > 0 && `${uploadProgress}%`}</p>
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          )}
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-2">
              Published Date
            </label>
            <input
              type="date"
              id="published_at"
              value={formData.published_at}
              onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          <Link
            href="/admin/media"
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Save Media Item'}
          </button>
        </div>
      </form>
    </div>
  );
}

