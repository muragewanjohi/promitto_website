-- Fix trigger for properties table
-- The properties table uses 'updatedat' (camelCase) instead of 'updated_at' (snake_case)
-- Run this SQL in your Supabase SQL editor

-- First, drop the existing trigger if it exists
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;

-- Create a new trigger function specifically for the properties table
CREATE OR REPLACE FUNCTION update_properties_updatedat()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedat = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the trigger for the properties table
CREATE TRIGGER update_properties_updatedat
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_properties_updatedat();

-- Verify the trigger was created
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table, 
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'properties';

