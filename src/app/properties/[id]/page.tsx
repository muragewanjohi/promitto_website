import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { propertyDetails } from '../../../data/properties';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

function getPropertyImages(id: string): string[] {
  const propertyDir = path.join(process.cwd(), 'public/images', id);
  const images = fs.readdirSync(propertyDir);
  return images.sort().map(img => `/images/${id}/${img}`);
}

export async function generateStaticParams() {
  return Object.keys(propertyDetails).map((id) => ({
    id,
  }));
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const images = getPropertyImages(params.id);
  const details = propertyDetails[params.id] || {
    id: params.id,
    name: params.id.replace(/([A-Z])/g, ' $1').trim(),
    location: 'Nairobi, Kenya',
    description: 'Contact us for more information about this property.',
    features: [],
    price: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
    area: undefined
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/properties" className="inline-flex items-center text-[#1E40AF] hover:text-[#F59E0B] mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Properties
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{details.name}</h1>
            <div className="flex items-center text-xl text-gray-600">
              <svg className="w-6 h-6 mr-2 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {details.location}
            </div>
          </div>

          {/* Main Image */}
          <div className="relative h-[60vh] w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={images[0]}
              alt={details.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {details.price && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Price</h3>
                <p className="text-lg font-semibold text-[#1E40AF]">KES {details.price}</p>
              </div>
            )}
            {details.bedrooms && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Bedrooms</h3>
                <p className="text-lg font-semibold text-gray-900">{details.bedrooms}</p>
              </div>
            )}
            {details.bathrooms && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Bathrooms</h3>
                <p className="text-lg font-semibold text-gray-900">{details.bathrooms}</p>
              </div>
            )}
            {details.area && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Area</h3>
                <p className="text-lg font-semibold text-gray-900">{details.area}</p>
              </div>
            )}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {images.slice(1).map((image, index) => (
              <div key={image} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${details.name} - Image ${index + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>

          {/* Property Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Description and Features */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Description</h2>
              <p className="text-gray-600 mb-8">{details.description}</p>

              {details.features && details.features.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {details.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">+254 729 506 506</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">info@promitto.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Office Address</p>
                    <p className="text-gray-900">Pension Towers, Mezzanine Floor, Loita Street, Nairobi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 