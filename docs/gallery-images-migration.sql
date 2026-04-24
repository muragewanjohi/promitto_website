-- Multi-Image Gallery Migration
-- Run this SQL in your Supabase SQL editor to add multi-image support for events and gallery categories

-- Add gallery_images column for storing multiple images (events and gallery categories)
ALTER TABLE media_items 
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;

-- Add video_url if it doesn't exist (referenced in gallery code)
ALTER TABLE media_items 
ADD COLUMN IF NOT EXISTS video_url TEXT;

COMMENT ON COLUMN media_items.gallery_images IS 'Array of image URLs for events/gallery items. Stored as JSON array of strings.';
