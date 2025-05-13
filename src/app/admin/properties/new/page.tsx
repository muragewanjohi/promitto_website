'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PropertyForm from '@/components/admin/PropertyForm';
import { supabase } from '@/lib/supabase';

export default function NewPropertyPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('You must be logged in to upload images.');
        return;
      }

      const response = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/admin/properties');
      } else {
        // Handle error
        console.error('Failed to create property');
      }
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Property</h1>
      <PropertyForm onSubmit={handleSubmit} />
    </div>
  );
} 