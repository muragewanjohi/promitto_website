-- Property Designs Table Schema
-- Run this SQL in your Supabase SQL editor to create the property_designs table

CREATE TABLE IF NOT EXISTS property_designs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  roof_type TEXT NOT NULL,
  house_type TEXT NOT NULL,
  area TEXT,
  description TEXT,
  folder_path TEXT,
  image_path TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  createdat TIMESTAMPTZ DEFAULT NOW(),
  updatedat TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_property_designs_bedrooms ON property_designs(bedrooms);
CREATE INDEX IF NOT EXISTS idx_property_designs_roof_type ON property_designs(roof_type);
CREATE INDEX IF NOT EXISTS idx_property_designs_house_type ON property_designs(house_type);
CREATE INDEX IF NOT EXISTS idx_property_designs_featured ON property_designs(is_featured);
CREATE INDEX IF NOT EXISTS idx_property_designs_display_order ON property_designs(display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE property_designs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all property designs
CREATE POLICY "Public can view property designs"
ON property_designs
FOR SELECT
USING (true);

-- Policy: Allow authenticated users to manage property designs (adjust based on your auth setup)
CREATE POLICY "Authenticated users can manage property designs"
ON property_designs
FOR ALL
USING (auth.role() = 'authenticated');

-- Trigger to update updatedat timestamp
CREATE OR REPLACE FUNCTION update_property_designs_updatedat()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedat = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_property_designs_updatedat
BEFORE UPDATE ON property_designs
FOR EACH ROW
EXECUTE FUNCTION update_property_designs_updatedat();

-- ============================================
-- INSERT INITIAL PROPERTY DESIGNS DATA
-- ============================================
-- This populates the table with the existing hardcoded designs
-- so you don't have to start from scratch

INSERT INTO property_designs (name, bedrooms, roof_type, house_type, area, description, folder_path, image_path, images, features, is_featured, display_order) VALUES
-- 2 Bedroom Designs
('2 Bedroom Flat Roof Bungalow', 2, 'Flat Roof', 'Bungalow', '92 sqm', 'Modern 2-bedroom bungalow with flat roof design, perfect for small families.', '/house_designs/2BR FLAT ROOF BUNGALOW', '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_1 - Photo (2).webp', ARRAY['/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_1 - Photo (2).webp', '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_3 - Photo (2).webp', '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_4 - Photo (2).webp', '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_5 - Photo (1).webp', '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_7 - Photo.webp'], ARRAY['2 Bedrooms', '2 Bathrooms', 'Open Plan Living', 'Kitchen', 'Parking Space'], false, 1),

('2 Bedroom Hidden Roof Bungalow', 2, 'Hidden Roof', 'Bungalow', '80 sqm', 'Contemporary 2-bedroom bungalow featuring a hidden roof design.', '/house_designs/2BR HIDDEN ROOF BUNGALOW', '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_1 - Photo (1).webp', ARRAY['/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_1 - Photo (1).webp', '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_2 - Photo.webp', '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_3 - Photo.webp', '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_7 - Photo (1).webp'], ARRAY['2 Bedrooms', '2 Bathrooms', 'Modern Design', 'Kitchen', 'Garden Space'], false, 2),

('2 Bedroom Pitched Roof Bungalow', 2, 'Pitched Roof', 'Bungalow', '80-92 sqm', 'Classic 2-bedroom bungalow with traditional pitched roof design.', '/house_designs/2BR PITCHED BUNGALOW', '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_1 - Photo.webp', ARRAY['/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_1 - Photo.webp', '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_2 - Photo.webp', '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_3 - Photo.webp', '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_5 - Photo.webp', '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_7 - Photo.webp'], ARRAY['2 Bedrooms', '2 Bathrooms', 'Classic Design', 'Kitchen', 'Veranda'], false, 3),

-- 3 Bedroom Designs
('3 Bedroom Flat Roof Bungalow', 3, 'Flat Roof', 'Bungalow', '140 sqm', 'Spacious 3-bedroom bungalow with modern flat roof design.', '/house_designs/3BR FLAT ROOF BUNGALOW', '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_1 - Photo.webp', ARRAY['/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_1 - Photo.webp', '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_3 - Photo.webp', '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_5 - Photo.webp', '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_7 - Photo.webp'], ARRAY['3 Bedrooms', '2 Bathrooms', 'Large Living Area', 'Kitchen', 'Double Parking'], false, 4),

('3 Bedroom Flat Roof Mansionette', 3, 'Flat Roof', 'Mansionette', '180 sqm', 'Luxurious 3-bedroom mansionette with flat roof and premium features.', '/house_designs/3BR FLAT ROOF MANSIONETTE', '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._1 - Photo.webp', ARRAY['/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._1 - Photo.webp', '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._3 - Photo.webp', '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._5 - Photo.webp', '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._7 - Photo.webp'], ARRAY['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden'], false, 5),

('3 Bedroom Hidden Roof Bungalow', 3, 'Hidden Roof', 'Bungalow', '110 sqm', 'Contemporary 3-bedroom bungalow with sleek hidden roof design.', '/house_designs/3BR HIDDEN ROOF BUNGALOW', '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_1 - Photo.webp', ARRAY['/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_1 - Photo.webp', '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_5 - Photo.webp', '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_7 - Photo.webp', '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_9 - Photo.webp'], ARRAY['3 Bedrooms', '2 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony'], false, 6),

('3 Bedroom Pitched Roof Bungalow', 3, 'Pitched Roof', 'Bungalow', '110 sqm', 'Classic 3-bedroom bungalow with pitched roof and traditional charm.', '/house_designs/3BR PITCHED ROOF BUNGALOW', '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_1 - Photo.webp', ARRAY['/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_1 - Photo.webp', '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_5 - Photo.webp', '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_7 - Photo.webp', '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_9 - Photo.webp'], ARRAY['3 Bedrooms', '2 Bathrooms', 'Traditional Design', 'Kitchen', 'Veranda'], false, 7),

('3 Bedroom Pitched Roof Mansionette', 3, 'Pitched Roof', 'Mansionette', '200 sqm', 'Elegant 3-bedroom mansionette with traditional pitched roof design.', '/house_designs/3BR PITCHED ROOF MANSIONETTE', '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._1 - Photo.webp', ARRAY['/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._1 - Photo.webp', '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._3 - Photo.webp', '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._5 - Photo.webp', '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._7 - Photo.webp'], ARRAY['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'], false, 8),

-- 4 Bedroom Designs
('4 Bedroom 172 sqm Standard Pitched Mansionette', 4, 'Pitched Roof', 'Mansionette', '172 sqm', 'Standard 4-bedroom mansionette with pitched roof design.', '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE', '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED_1 - Photo.webp', ARRAY['/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED_1 - Photo.webp', '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED _2 - Photo.webp', '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED _3 - Photo.webp', '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED _4 - Photo.webp'], ARRAY['4 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden'], false, 9),

('4 Bedroom 224 sqm Flat Roof Mansionette', 4, 'Flat Roof', 'Mansionette', '224 sqm', 'Luxurious 4-bedroom mansionette with flat roof design.', '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE', '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._1 - Photo.webp', ARRAY['/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._1 - Photo.webp', '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._3 - Photo.webp', '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._5 - Photo.webp', '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._6 - Photo.webp'], ARRAY['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'], false, 10),

('4 Bedroom Pitched Roof Bungalow', 4, 'Pitched Roof', 'Bungalow', '280 sqm', 'Elegant 4-bedroom bungalow with traditional pitched roof design.', '/house_designs/4BR PITCHED ROOF BUNGALOW', '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_1 - Photo.webp', ARRAY['/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_1 - Photo.webp', '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_3 - Photo.webp', '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_4 - Photo.webp', '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_5 - Photo.webp'], ARRAY['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'], false, 11),

('4 Bedroom Pitched Roof Hybrid Mansionette', 4, 'Pitched Roof', 'Hybrid Mansionette', '300 sqm', 'Elegant Hybrid 4-bedroom mansionette with pitched roof design.', '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE', '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._1 - Photo.webp', ARRAY['/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._1 - Photo.webp', '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._2 - Photo.webp', '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._7 - Photo.webp', '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._8 - Photo.webp'], ARRAY['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'], false, 12),

-- 5 Bedroom Designs
('5 Bedroom Flat Roof Mansionette', 5, 'Flat Roof', 'Mansionette', '380 sqm', 'Luxurious 5-bedroom mansionette with modern flat roof design.', '/house_designs/5BR FLAT ROOF MANSIONETTE', '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_1 - Photo.webp', ARRAY['/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_1 - Photo.webp', '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_2 - Photo.webp', '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_3 - Photo.webp', '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_7 - Photo.webp'], ARRAY['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Swimming Pool'], false, 13),

('5 Bedroom Pitched Roof Mansionette', 5, 'Pitched Roof', 'Mansionette', '380 sqm', 'Elegant 5-bedroom mansionette with traditional pitched roof.', '/house_designs/5BR PITCHED ROOF MANSIONETTE', '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_2 - Photo.webp', ARRAY['/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_2 - Photo.webp', '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_5 - Photo.webp', '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_7 - Photo.webp', '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_8 - Photo.webp'], ARRAY['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'], false, 14);
