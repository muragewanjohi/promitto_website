import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { propertyDetails } from '../../../data/properties';
import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public/images');
    
    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json([]);
    }
    
    const items = fs.readdirSync(imagesDir);
    
    // Filter out files and only keep directories
    const propertyFolders = items.filter(item => {
      const itemPath = path.join(imagesDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    const properties = propertyFolders.map(folder => {
      const propertyDir = path.join(imagesDir, folder);
      
      // Check if property directory exists and is a directory
      if (!fs.existsSync(propertyDir) || !fs.statSync(propertyDir).isDirectory()) {
        return null;
      }
      
      try {
        const images = fs.readdirSync(propertyDir);
        const mainImage = images.find(img => img.toLowerCase().startsWith('1')) || images[0];
        const details = propertyDetails[folder] || {
          id: folder,
          name: folder.replace(/([A-Z])/g, ' $1').trim(),
          location: 'Nairobi, Kenya',
          price: undefined,
          bedrooms: undefined,
          bathrooms: undefined
        };

        return {
          ...details,
          mainImage: `/images/${folder}/${mainImage}`,
        };
      } catch (error) {
        console.error(`Error processing folder ${folder}:`, error);
        return null;
      }
    }).filter(Boolean); // Remove null values

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
} 