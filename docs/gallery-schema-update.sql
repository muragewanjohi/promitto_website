-- Gallery Category Schema Update
-- Run this SQL in your Supabase SQL editor to add gallery support to media_items table

-- Update the category constraint to include 'gallery'
ALTER TABLE media_items 
DROP CONSTRAINT IF EXISTS media_items_category_check;

ALTER TABLE media_items 
ADD CONSTRAINT media_items_category_check 
CHECK (category IN ('news', 'resources', 'events', 'blogs', 'gallery'));

-- Note: The existing columns (image_url, video_url) are already sufficient for gallery items
-- Gallery items will use either image_url OR video_url (not both), and will not have content/excerpt
-- This is handled at the application level

