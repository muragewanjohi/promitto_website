-- Media Items Table Schema
-- Run this SQL in your Supabase SQL editor to create the media_items table

CREATE TABLE IF NOT EXISTS media_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('news', 'resources', 'events', 'blogs')),
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  author TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_media_items_category ON media_items(category);

-- Create an index on is_featured for faster featured queries
CREATE INDEX IF NOT EXISTS idx_media_items_featured ON media_items(is_featured);

-- Create an index on published for faster published queries
CREATE INDEX IF NOT EXISTS idx_media_items_published ON media_items(published);

-- Create a composite index for common queries (featured + published + category)
CREATE INDEX IF NOT EXISTS idx_media_items_featured_published_category 
ON media_items(is_featured, published, category);

-- Enable Row Level Security (RLS)
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published items
CREATE POLICY "Public can view published media items"
ON media_items
FOR SELECT
USING (published = true);

-- Policy: Allow authenticated users to manage media items (adjust based on your auth setup)
-- You may need to adjust this based on your user roles/permissions
CREATE POLICY "Authenticated users can manage media items"
ON media_items
FOR ALL
USING (auth.role() = 'authenticated');

-- Optional: Add a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_media_items_updated_at
BEFORE UPDATE ON media_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SUPABASE STORAGE SETUP
-- ============================================
-- After running the above SQL, you need to create a storage bucket for media images:
--
-- 1. Go to Supabase Dashboard > Storage
-- 2. Click "Create a new bucket"
-- 3. Name: "media"
-- 4. Make it PUBLIC (so images can be accessed without authentication)
-- 5. Click "Create bucket"
--
-- The bucket will be used to store uploaded images for media items (news, resources, events, blogs).

