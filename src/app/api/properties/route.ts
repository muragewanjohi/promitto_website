import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { propertyDetails } from '../../../data/properties';
import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public/images');
    const propertyFolders = fs.readdirSync(imagesDir);

    const properties = propertyFolders.map(folder => {
      const propertyDir = path.join(imagesDir, folder);
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
    });

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (userError || userData?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Only admins can create properties' },
        { status: 403 }
      );
    }

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

const { data: inserted, error } = await supabase
  .from('properties')
  .insert([
    {
      name: data.name,
      location: data.location,
      // ...other fields
    },
  ])
  .select()
  .single(); 