'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PropertyDesign {
  id: string;
  name: string;
  bedrooms: number;
  roofType: string;
  imagePath: string;
  area?: string;
  description?: string;
  features?: string[];
}

export default function PropertyDesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [design, setDesign] = useState<PropertyDesign | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load design data based on ID
    const loadDesign = () => {
      const allDesigns: PropertyDesign[] = [
        // 2 Bedroom Designs
        {
          id: '2brm-1',
          name: '2 Bedroom Bungalow - Flat Roof',
          bedrooms: 2,
          roofType: 'Flat Roofed',
          imagePath: '/2brm/2bdrm_bungalow_flat_roof.jpeg',
          area: '120 sqm',
          description: 'Modern 2-bedroom bungalow with flat roof design, perfect for small families. This design features an open-plan living area, modern kitchen, and two well-proportioned bedrooms. The flat roof design provides a contemporary aesthetic while ensuring excellent weather protection.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Open Plan Living', 'Modern Kitchen', 'Parking Space', 'Garden Area', 'Storage Room']
        },
        {
          id: '2brm-2',
          name: '2 Bedroom Bungalow - Hidden Roof',
          bedrooms: 2,
          roofType: 'Hidden Roof',
          imagePath: '/2brm/2bdrm_bungalow_hidden_roof.jpeg',
          area: '125 sqm',
          description: 'Contemporary 2-bedroom bungalow featuring a hidden roof design. This innovative design conceals the roof structure for a sleek, modern appearance while maintaining all the benefits of traditional roofing.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Modern Design', 'Kitchen', 'Garden Space', 'Balcony', 'Storage']
        },
        {
          id: '2brm-3',
          name: '2 Bedroom Bungalow - Hidden Roof 2',
          bedrooms: 2,
          roofType: 'Hidden Roof',
          imagePath: '/2brm/2bdrm_bungalow_hidden_roof_2.jpeg',
          area: '130 sqm',
          description: 'Elegant 2-bedroom bungalow with alternative hidden roof styling. This design offers a sophisticated approach to modern living with enhanced privacy and outdoor living spaces.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Elegant Design', 'Kitchen', 'Outdoor Space', 'Patio', 'Garden']
        },
        {
          id: '2brm-4',
          name: '2 Bedroom Bungalow - Pitched Roof',
          bedrooms: 2,
          roofType: 'Pitch Roofed',
          imagePath: '/2brm/2bdrm_bungalow_pitched_roof.jpeg',
          area: '135 sqm',
          description: 'Classic 2-bedroom bungalow with traditional pitched roof design. This timeless design combines traditional aesthetics with modern functionality for comfortable family living.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Classic Design', 'Kitchen', 'Veranda', 'Garden', 'Parking']
        },
        {
          id: '2brm-5',
          name: '2 Bedroom Bungalow - Pitched Roof 2',
          bedrooms: 2,
          roofType: 'Pitch Roofed',
          imagePath: '/2brm/2bdrm_bungalow_pitched_roof_2.jpeg',
          area: '140 sqm',
          description: 'Traditional 2-bedroom bungalow with enhanced pitched roof features. This design emphasizes durability and classic architectural elements while providing modern comfort.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Traditional Style', 'Kitchen', 'Patio', 'Garden', 'Storage']
        },

        // 3 Bedroom Designs
        {
          id: '3brm-1',
          name: '3 Bedroom Bungalow - Flat Roof',
          bedrooms: 3,
          roofType: 'Flat Roofed',
          imagePath: '/3brm/3brm_bungalow_flat_roof.jpeg',
          area: '180 sqm',
          description: 'Spacious 3-bedroom bungalow with modern flat roof design. This design maximizes space utilization with an open-plan layout, large living area, and three comfortable bedrooms.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Large Living Area', 'Modern Kitchen', 'Double Parking', 'Garden', 'Storage']
        },
        {
          id: '3brm-2',
          name: '3 Bedroom Bungalow - Flat Roof Mansionate',
          bedrooms: 3,
          roofType: 'Flat Roofed',
          imagePath: '/3brm/3brm_bungalow_flat_roof_mansionate.jpeg',
          area: '200 sqm',
          description: 'Luxurious 3-bedroom mansionate with flat roof and premium features. This upscale design includes a master suite, premium finishes, and extensive outdoor living spaces.',
          features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Premium Kitchen', 'Garden', 'Balcony', 'Parking']
        },
        {
          id: '3brm-3',
          name: '3 Bedroom Bungalow - Hidden Roof',
          bedrooms: 3,
          roofType: 'Hidden Roof',
          imagePath: '/3brm/3brm_bungalow_hidden_roof.jpeg',
          area: '190 sqm',
          description: 'Contemporary 3-bedroom bungalow with sleek hidden roof design. This modern design features clean lines, open spaces, and innovative architectural elements.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony', 'Garden', 'Storage']
        },
        {
          id: '3brm-4',
          name: '3 Bedroom Bungalow - Mansion Pitched Roof',
          bedrooms: 3,
          roofType: 'Pitch Roofed',
          imagePath: '/3brm/3brm_bungalow_masion_pitched_roof.jpeg',
          area: '220 sqm',
          description: 'Elegant 3-bedroom mansion with traditional pitched roof design. This luxurious design combines classic architecture with modern amenities and spacious living areas.',
          features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '3brm-5',
          name: '3 Bedroom Bungalow - Pitch Roof',
          bedrooms: 3,
          roofType: 'Pitch Roofed',
          imagePath: '/3brm/3brm_bungalow_pitch_roof.jpeg',
          area: '200 sqm',
          description: 'Classic 3-bedroom bungalow with pitched roof and traditional charm. This design offers timeless appeal with modern functionality and comfortable family living spaces.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Traditional Design', 'Kitchen', 'Veranda', 'Garden', 'Storage']
        },

        // 4 Bedroom Designs
        {
          id: '4brm-1',
          name: '4 Bedroom Bungalow - Flat Roof',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof.png',
          area: '280 sqm',
          description: 'Luxurious 4-bedroom bungalow with modern flat roof design. This spacious design accommodates large families with multiple living areas, a master suite, and extensive outdoor spaces.',
          features: ['4 Bedrooms', '3 Bathrooms', 'Master Suite', 'Modern Kitchen', 'Large Garden', 'Parking', 'Storage']
        },
        {
          id: '4brm-2',
          name: '4 Bedroom Bungalow - Flat Roof 2',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof_2.png',
          area: '290 sqm',
          description: 'Contemporary 4-bedroom bungalow with sleek flat roof design. This modern mansion features innovative design elements, premium finishes, and spacious family living areas.',
          features: ['4 Bedrooms', '3 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony', 'Garden', 'Storage']
        },
        {
          id: '4brm-3',
          name: '4 Bedroom Bungalow - Flat Roof 3',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof_3.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with modern flat roof design. This luxurious family home combines contemporary architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-4',
          name: '4 Bedroom Bungalow - Flat Roof 4',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof_4.png',
          area: '290 sqm',
          description: 'Contemporary 4-bedroom bungalow with sleek flat roof design. This modern mansion features innovative design elements, premium finishes, and spacious family living areas.',
          features: ['4 Bedrooms', '3 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony', 'Garden', 'Storage']
        },
        {
          id: '4brm-5',
          name: '4 Bedroom Bungalow - Flat Roof 5',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof_5.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with modern flat roof design. This luxurious family home combines contemporary architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-14',
          name: '4 Bedroom Bungalow - Flat Roof 6',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof_6.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with modern flat roof design. This luxurious family home combines contemporary architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-6',
          name: '4 Bedroom Hybrid - Pitched Roof',
          bedrooms: 4,
          roofType: 'Hybrid Pitch Roof',
          imagePath: '/4brm/4br_HYBRID_4BEDROOM pitched.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design. This innovative design combines the best of both flat and pitched roof elements for a unique architectural statement.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-7',
          name: '4 Bedroom Hybrid - Pitched Roof 2',
          bedrooms: 4,
          roofType: 'Hybrid Pitch Roof',
          imagePath: '/4brm/4br_HYBRID_4BEDROOM_pitched_2.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design. This innovative design combines the best of both flat and pitched roof elements for a unique architectural statement.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-8',
          name: '4 Bedroom Hybrid - Pitched Roof 3',
          bedrooms: 4,
          roofType: 'Hybrid Pitch Roof',
          imagePath: '/4brm/4br_HYBRID_4BEDROOM_pitched_3.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design. This innovative design combines the best of both flat and pitched roof elements for a unique architectural statement.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-9',
          name: '4 Bedroom Hybrid - Pitched Roof 4',
          bedrooms: 4,
          roofType: 'Hybrid Pitch Roof',
          imagePath: '/4brm/4br_HYBRID_4BEDROOM_pitched_4.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design. This innovative design combines the best of both flat and pitched roof elements for a unique architectural statement.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-10',
          name: '4 Bedroom Pitched Bungalow',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_pitched_bungalow.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with traditional pitched roof design. This luxurious family home combines classic architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-11',
          name: '4 Bedroom Pitched Bungalow 2',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_pitched_bungalow_2.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with traditional pitched roof design. This luxurious family home combines classic architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-12',
          name: '4 Bedroom Pitched Bungalow 3',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_pitched_bungalow_3.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with traditional pitched roof design. This luxurious family home combines classic architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-13',
          name: '4 Bedroom Pitched Bungalow 4',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_pitched_bungalow_4.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with traditional pitched roof design. This luxurious family home combines classic architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-15',
          name: '4 Bedroom Standard Pitched',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with standard pitched roof design. This luxurious family home combines classic architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-16',
          name: '4 Bedroom Standard Pitched 2',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched_2.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with standard pitched roof design. This luxurious family home combines classic architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-17',
          name: '4 Bedroom Standard Pitched 3',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched_3.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with standard pitched roof design. This luxurious family home combines classic architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-18',
          name: '4 Bedroom Standard Pitched 4',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched_4.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with standard pitched roof design. This luxurious family home combines classic architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '4brm-19',
          name: '4 Bedroom Standard Pitched 5',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched_5.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with standard pitched roof design. This luxurious family home combines classic architecture with modern amenities and spacious living areas.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },

        // 5 Bedroom Designs
        {
          id: '5brm-1',
          name: '5 Bedroom Mansion - Flat Roof',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bdrm_mansion_flat_roof.jpeg',
          area: '380 sqm',
          description: 'Luxurious 5-bedroom mansion with modern flat roof design. This grand residence features multiple living areas, a master suite, premium finishes, and extensive outdoor amenities.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Premium Kitchen', 'Swimming Pool', 'Garden', 'Parking']
        },
        {
          id: '5brm-2',
          name: '5 Bedroom Mansion - Pitched Roof',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5_bdrm_mansion_pitched_roof.jpeg',
          area: '400 sqm',
          description: 'Elegant 5-bedroom mansion with traditional pitched roof. This prestigious home combines classic architecture with modern luxury, featuring spacious rooms and premium amenities.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '5brm-3',
          name: '5 Bedroom Mansion - Pitched Roof 2',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5_bdrm_mansion_pitched_roof_2.jpeg',
          area: '420 sqm',
          description: 'Grand 5-bedroom mansion with enhanced pitched roof features. This magnificent residence offers the ultimate in luxury living with premium finishes and extensive amenities.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Tennis Court', 'Garden', 'Parking']
        },
        {
          id: '5brm-4',
          name: '5 Bedroom Mansionete - Pitched Roof',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5_bdrm_mansionete_pitched_roof.jpeg',
          area: '450 sqm',
          description: 'Luxurious 5-bedroom mansionete with premium pitched roof design. This exclusive residence represents the pinnacle of luxury living with world-class amenities and finishes.',
          features: ['5 Bedrooms', '6 Bathrooms', 'Master Suite', 'Kitchen', 'Helipad', 'Garden', 'Parking']
        },
        {
          id: '5brm-5',
          name: '5 Bedroom Flat Roof - Design 1',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bedroom_flat_roof_1.png',
          area: '380 sqm',
          description: 'Modern 5-bedroom mansion with contemporary flat roof design. This cutting-edge residence features innovative design elements and premium modern amenities.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Rooftop Garden', 'Garden', 'Parking']
        },
        {
          id: '5brm-6',
          name: '5 Bedroom Flat Roof - Design 2',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bedroom_flat_roof_2.png',
          area: '400 sqm',
          description: 'Contemporary 5-bedroom mansion with sleek flat roof styling. This modern masterpiece combines luxury with innovative design for the ultimate living experience.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Infinity Pool', 'Garden', 'Parking']
        },
        {
          id: '5brm-7',
          name: '5 Bedroom Flat Roof - Design 3',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bedroom_flat_roof_3.png',
          area: '420 sqm',
          description: 'Luxurious 5-bedroom mansion with premium flat roof features. This sophisticated residence offers the perfect blend of modern luxury and functional design.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Home Theater', 'Garden', 'Parking']
        },
        {
          id: '5brm-8',
          name: '5 Bedroom Flat Roof - Classic',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bedroom_flat_roof.png',
          area: '400 sqm',
          description: 'Classic 5-bedroom mansion with timeless flat roof design. This elegant residence combines traditional luxury with modern comfort and functionality.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Garden', 'Veranda', 'Parking']
        },
        {
          id: '5brm-9',
          name: '5 Bedroom Pitched Roof - 380sqm',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5br_pitched_380sqm_1.png',
          area: '380 sqm',
          description: 'Elegant 5-bedroom mansion with 380sqm pitched roof design. This sophisticated home offers spacious living areas and premium amenities for luxury family living.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden', 'Veranda', 'Parking']
        },
        {
          id: '5brm-10',
          name: '5 Bedroom Pitched Roof - 380sqm 2',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5br_pitched_380sqm_5.png',
          area: '380 sqm',
          description: 'Traditional 5-bedroom mansion with enhanced pitched roof. This classic design emphasizes durability and timeless architectural beauty.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Veranda', 'Garden', 'Parking']
        },
        {
          id: '5brm-11',
          name: '5 Bedroom Pitched Roof - 380sqm 3',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5br_pitched_380sqm_7.png',
          area: '380 sqm',
          description: 'Classic 5-bedroom mansion with traditional pitched roof styling. This elegant residence offers comfortable luxury living with classic architectural elements.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Patio', 'Garden', 'Parking']
        },
        {
          id: '5brm-12',
          name: '5 Bedroom Pitched Roof - 380sqm 4',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5br_pitched_380sqm_8.png',
          area: '380 sqm',
          description: 'Elegant 5-bedroom mansion with premium pitched roof design. This sophisticated home combines luxury with functionality for the ultimate living experience.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Garden', 'Veranda', 'Parking']
        }
      ];

      const foundDesign = allDesigns.find(d => d.id === params.id);
      if (foundDesign) {
        setDesign(foundDesign);
      }
      setLoading(false);
    };

    loadDesign();
  }, [params.id]);

  const getRoofTypeColor = (roofType: string) => {
    switch (roofType) {
      case 'Flat Roofed':
        return 'bg-blue-100 text-blue-800';
      case 'Pitch Roofed':
        return 'bg-green-100 text-green-800';
      case 'Hybrid Pitch Roof':
        return 'bg-purple-100 text-purple-800';
      case 'Hidden Roof':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBedroomColor = (bedrooms: number) => {
    switch (bedrooms) {
      case 2:
        return 'bg-primary/10 text-primary';
      case 3:
        return 'bg-secondary/10 text-secondary';
      case 4:
        return 'bg-green-100 text-green-800';
      case 5:
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
        <Header />
        <div className="pt-16">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <div className="animate-pulse">
              <div className="bg-gray-200 h-8 w-1/3 rounded mb-4"></div>
              <div className="bg-gray-200 h-96 rounded-xl mb-8"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!design) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
        <Header />
        <div className="pt-16">
          <div className="max-w-6xl mx-auto px-4 py-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Design Not Found</h1>
            <p className="text-gray-600 mb-8">The property design you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/property-designs')}
              className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-all duration-200"
            >
              Back to Designs
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      <div className="pt-16">
        {/* Hero Image Section */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center mb-6">
              <button
                onClick={() => router.push('/property-designs')}
                className="flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Designs
              </button>
            </div>
            
            {/* Hero Image */}
            <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-white shadow-xl cursor-pointer group" onClick={() => setShowModal(true)}>
              {!imageError ? (
                <Image
                  src={design.imagePath}
                  alt={design.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              )}
              
              {/* Click to zoom overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-8">
              {/* Title and Badges */}
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sans">{design.name}</h1>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getBedroomColor(design.bedrooms)}`}>
                    {design.bedrooms} Bedroom{design.bedrooms > 1 ? 's' : ''}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getRoofTypeColor(design.roofType)}`}>
                    {design.roofType}
                  </span>
                  {design.area && (
                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                      {design.area}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {design.description && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center font-sans">
                    <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{design.description}</p>
                </div>
              )}

              {/* Features */}
              {design.features && design.features.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center font-sans">
                    <svg className="w-6 h-6 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {design.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => router.push('/customer-journey')}
                  className="bg-gradient-to-r from-primary to-primary/90 text-white px-12 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-all duration-200 flex items-center justify-center font-sans"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Inquire About This Design
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Image Modal */}
        {showModal && design && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <div className="relative max-w-7xl max-h-full">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={design.imagePath}
                  alt={design.name}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
} 