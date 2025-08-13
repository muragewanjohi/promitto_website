'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyDesignCard from '@/components/PropertyDesignCard';
import PropertyDesignFilters from '@/components/PropertyDesignFilters'; 

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

export default function PropertyDesignsPage() {
  const [designs, setDesigns] = useState<PropertyDesign[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<PropertyDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    bedrooms: 0,
    roofType: ''
  });

  useEffect(() => {
    // Load all property designs
    const loadDesigns = () => {
      const allDesigns: PropertyDesign[] = [
        // 2 Bedroom Designs
        {
          id: '2brm-1',
          name: '2 Bedroom Bungalow - Flat Roof',
          bedrooms: 2,
          roofType: 'Flat Roofed',
          imagePath: '/2brm/2bdrm_bungalow_flat_roof.jpeg',
          area: '120 sqm',
          description: 'Modern 2-bedroom bungalow with flat roof design, perfect for small families.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Open Plan Living', 'Kitchen', 'Parking Space']
        },
        {
          id: '2brm-2',
          name: '2 Bedroom Bungalow - Hidden Roof',
          bedrooms: 2,
          roofType: 'Hidden Roof',
          imagePath: '/2brm/2bdrm_bungalow_hidden_roof.jpeg',
          area: '125 sqm',
          description: 'Contemporary 2-bedroom bungalow featuring a hidden roof design.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Modern Design', 'Kitchen', 'Garden Space']
        },
        {
          id: '2brm-3',
          name: '2 Bedroom Bungalow - Hidden Roof 2',
          bedrooms: 2,
          roofType: 'Hidden Roof',
          imagePath: '/2brm/2bdrm_bungalow_hidden_roof_2.jpeg',
          area: '130 sqm',
          description: 'Elegant 2-bedroom bungalow with alternative hidden roof styling.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Elegant Design', 'Kitchen', 'Outdoor Space']
        },
        {
          id: '2brm-4',
          name: '2 Bedroom Bungalow - Pitched Roof',
          bedrooms: 2,
          roofType: 'Pitch Roofed',
          imagePath: '/2brm/2bdrm_bungalow_pitched_roof.jpeg',
          area: '135 sqm',
          description: 'Classic 2-bedroom bungalow with traditional pitched roof design.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Classic Design', 'Kitchen', 'Veranda']
        },
        {
          id: '2brm-5',
          name: '2 Bedroom Bungalow - Pitched Roof 2',
          bedrooms: 2,
          roofType: 'Pitch Roofed',
          imagePath: '/2brm/2bdrm_bungalow_pitched_roof_2.jpeg',
          area: '140 sqm',
          description: 'Traditional 2-bedroom bungalow with enhanced pitched roof features.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Traditional Style', 'Kitchen', 'Patio']
        },

        // 3 Bedroom Designs
        {
          id: '3brm-1',
          name: '3 Bedroom Bungalow - Flat Roof',
          bedrooms: 3,
          roofType: 'Flat Roofed',
          imagePath: '/3brm/3brm_bungalow_flat_roof.jpeg',
          area: '180 sqm',
          description: 'Spacious 3-bedroom bungalow with modern flat roof design.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Large Living Area', 'Kitchen', 'Double Parking']
        },
        {
          id: '3brm-2',
          name: '3 Bedroom Bungalow - Flat Roof Mansionate',
          bedrooms: 3,
          roofType: 'Flat Roofed',
          imagePath: '/3brm/3brm_bungalow_flat_roof_mansionate.jpeg',
          area: '200 sqm',
          description: 'Luxurious 3-bedroom mansionate with flat roof and premium features.',
          features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden']
        },
        {
          id: '3brm-3',
          name: '3 Bedroom Bungalow - Hidden Roof',
          bedrooms: 3,
          roofType: 'Hidden Roof',
          imagePath: '/3brm/3brm_bungalow_hidden_roof.jpeg',
          area: '190 sqm',
          description: 'Contemporary 3-bedroom bungalow with sleek hidden roof design.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony']
        },
        {
          id: '3brm-4',
          name: '3 Bedroom Bungalow - Mansion Pitched Roof',
          bedrooms: 3,
          roofType: 'Pitch Roofed',
          imagePath: '/3brm/3brm_bungalow_masion_pitched_roof.jpeg',
          area: '220 sqm',
          description: 'Elegant 3-bedroom mansion with traditional pitched roof design.',
          features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '3brm-5',
          name: '3 Bedroom Bungalow - Pitch Roof',
          bedrooms: 3,
          roofType: 'Pitch Roofed',
          imagePath: '/3brm/3brm_bungalow_pitch_roof.jpeg',
          area: '200 sqm',
          description: 'Classic 3-bedroom bungalow with pitched roof and traditional charm.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Traditional Design', 'Kitchen', 'Veranda']
        },

        // 4 Bedroom Designs
        {
          id: '4brm-1',
          name: '4 Bedroom Bungalow - Flat Roof',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof.png',
          area: '280 sqm',
          description: 'Luxurious 4-bedroom bungalow with modern flat roof design.',
          features: ['4 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-2',
          name: '4 Bedroom Bungalow - Flat Roof',
          bedrooms: 4,
          roofType: 'Flat Roof',
          imagePath: '/4brm/4br_standard_flat_roof_2.png',
          area: '290 sqm',
          description: 'Contemporary 4-bedroom bungalow with sleek hidden roof design.',
          features: ['4 Bedrooms', '3 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony']
        },
        {
          id: '4brm-3',
          name: '4 Bedroom Bungalow - Flat Roof',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof_3.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with traditional pitched roof design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-4',
          name: '4 Bedroom Bungalow - Flat Roof',
          bedrooms: 4,
          roofType: 'Flat Roof',
          imagePath: '/4brm/4br_standard_flat_roof_4.png',
          area: '290 sqm',
          description: 'Contemporary 4-bedroom bungalow with sleek hidden roof design.',
          features: ['4 Bedrooms', '3 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony']
        },
        {
          id: '4brm-5',
          name: '4 Bedroom Bungalow - Flat Roof',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof_5.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with traditional pitched roof design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-14',
          name: '4 Bedroom Bungalow - Flat Roof',
          bedrooms: 4,
          roofType: 'Flat Roofed',
          imagePath: '/4brm/4br_standard_flat_roof_6.png',
          area: '300 sqm',
          description: 'Elegant 4-bedroom bungalow with traditional pitched roof design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-6',
          name: '4 Bedroom Hybrid',
          bedrooms: 4,
          roofType: 'Hybrid Pitch Roof',
          imagePath: '/4brm/4br_HYBRID_4BEDROOM_pitched.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-7',
          name: '4 Bedroom Hybrid',
          bedrooms: 4,
          roofType: 'Hybrid Pitch Roof',
          imagePath: '/4brm/4br_HYBRID_4BEDROOM_pitched_2.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },{
          id: '4brm-8',
          name: '4 Bedroom Hybrid',
          bedrooms: 4,
          roofType: 'Hybrid Pitch Roof',
          imagePath: '/4brm/4br_HYBRID_4BEDROOM_pitched_3.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },{
          id: '4brm-9',
          name: '4 Bedroom Hybrid',
          bedrooms: 4,
          roofType: 'Hybrid Pitch Roof',
          imagePath: '/4brm/4br_HYBRID_4BEDROOM_pitched_4.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-10',
          name: '4 Bedroom Pitched Bungalow',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_pitched_bungalow.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-11',
          name: '4 Bedroom Pitched Bungalow',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_pitched_bungalow_2.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-12',
          name: '4 Bedroom Pitched Bungalow',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_pitched_bungalow_3.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-13',
          name: '4 Bedroom Pitched Bungalow',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_pitched_bungalow_4.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        }, // 14 taken
        {
          id: '4brm-15',
          name: '4 Bedroom StandardPitched',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-16',
          name: '4 Bedroom StandardPitched',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched_2.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-17',
          name: '4 Bedroom StandardPitched',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched_3.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-18',
          name: '4 Bedroom StandardPitched',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched_4.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '4brm-19',
          name: '4 Bedroom StandardPitched',
          bedrooms: 4,
          roofType: 'Pitch Roofed',
          imagePath: '/4brm/4br_standard_4br_pitched_5.png',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom pitched design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },

        // 5 Bedroom Designs
        {
          id: '5brm-1',
          name: '5 Bedroom Mansion - Flat Roof',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bdrm_mansion_flat_roof.jpeg',
          area: '380 sqm',
          description: 'Luxurious 5-bedroom mansion with modern flat roof design.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Swimming Pool']
        },
        {
          id: '5brm-2',
          name: '5 Bedroom Mansion - Pitched Roof',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5_bdrm_mansion_pitched_roof.jpeg',
          area: '400 sqm',
          description: 'Elegant 5-bedroom mansion with traditional pitched roof.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '5brm-3',
          name: '5 Bedroom Mansion - Pitched Roof 2',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5_bdrm_mansion_pitched_roof_2.jpeg',
          area: '420 sqm',
          description: 'Grand 5-bedroom mansion with enhanced pitched roof features.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Tennis Court']
        },
        {
          id: '5brm-4',
          name: '5 Bedroom Mansionete - Pitched Roof',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5_bdrm_mansionete_pitched_roof.jpeg',
          area: '450 sqm',
          description: 'Luxurious 5-bedroom mansionete with premium pitched roof design.',
          features: ['5 Bedrooms', '6 Bathrooms', 'Master Suite', 'Kitchen', 'Helipad']
        },
        {
          id: '5brm-5',
          name: '5 Bedroom Flat Roof - Design 1',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bedroom_flat_roof_1.png',
          area: '380 sqm',
          description: 'Modern 5-bedroom mansion with contemporary flat roof design.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Rooftop Garden']
        },
        {
          id: '5brm-6',
          name: '5 Bedroom Flat Roof - Design 2',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bedroom_flat_roof_2.png',
          area: '400 sqm',
          description: 'Contemporary 5-bedroom mansion with sleek flat roof styling.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Infinity Pool']
        },
        {
          id: '5brm-7',
          name: '5 Bedroom Flat Roof - Design 3',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bedroom_flat_roof_3.png',
          area: '420 sqm',
          description: 'Luxurious 5-bedroom mansion with premium flat roof features.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Home Theater']
        },
        {
          id: '5brm-8',
          name: '5 Bedroom Flat Roof - Classic',
          bedrooms: 5,
          roofType: 'Flat Roofed',
          imagePath: '/5drm/5_bedroom_flat_roof.png',
          area: '400 sqm',
          description: 'Classic 5-bedroom mansion with timeless flat roof design.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Garden']
        },
        {
          id: '5brm-9',
          name: '5 Bedroom Pitched Roof - 380sqm',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5br_pitched_380sqm_1.png',
          area: '380 sqm',
          description: 'Elegant 5-bedroom mansion with 380sqm pitched roof design.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden']
        },
        {
          id: '5brm-10',
          name: '5 Bedroom Pitched Roof - 380sqm 2',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5br_pitched_380sqm_5.png',
          area: '380 sqm',
          description: 'Traditional 5-bedroom mansion with enhanced pitched roof.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Veranda']
        },
        {
          id: '5brm-11',
          name: '5 Bedroom Pitched Roof - 380sqm 3',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5br_pitched_380sqm_7.png',
          area: '380 sqm',
          description: 'Classic 5-bedroom mansion with traditional pitched roof styling.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Patio']
        },
        {
          id: '5brm-12',
          name: '5 Bedroom Pitched Roof - 380sqm 4',
          bedrooms: 5,
          roofType: 'Pitch Roofed',
          imagePath: '/5drm/5br_pitched_380sqm_8.png',
          area: '380 sqm',
          description: 'Elegant 5-bedroom mansion with premium pitched roof design.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Garden']
        }
      ];

      setDesigns(allDesigns);
      setFilteredDesigns(allDesigns);
      setLoading(false);
    };

    loadDesigns();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...designs];

    // Apply search filter
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(design =>
        design.name.toLowerCase().includes(searchLower) ||
        design.roofType.toLowerCase().includes(searchLower) ||
        (design.description && design.description.toLowerCase().includes(searchLower)) ||
        (design.features && design.features.some(feature => 
          feature.toLowerCase().includes(searchLower)
        ))
      );
    }

    // Filter by bedrooms
    if (filters.bedrooms > 0) {
      filtered = filtered.filter(design => design.bedrooms === filters.bedrooms);
    }

    // Filter by roof type
    if (filters.roofType && filters.roofType !== 'All types') {
      filtered = filtered.filter(design => design.roofType === filters.roofType);
    }

    setFilteredDesigns(filtered);
  }, [designs, searchQuery, filters]);

  // Apply filters when designs, search query, or filters change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Apply real-time search
    applyFilters();
  };

  const clearSearch = () => {
    setSearchQuery('');
    applyFilters();
  };

  const handleFilterChange = (newFilters: { bedrooms: number; roofType: string }) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      <div>
        {/* Hero Section with Search */}
        <section className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url(/hero-house.jpg)' }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 shadow-xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Property Designs
                </h1>
              </div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto mb-8">
                Explore our comprehensive collection of architectural designs
              </p>
            </div>
            <div className="w-full max-w-2xl px-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search by design name, roof type, or features..."
                  className="w-full pl-12 pr-24 py-4 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-sm"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-16 top-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bg-[#1E40AF] text-white px-6 py-2 rounded-lg hover:bg-[#1E3A8A] transition-colors text-sm font-medium"
                >
                  Search
                </button>
                <svg
                  className="absolute left-4 top-4 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <div className="w-80 flex-shrink-0">
                <PropertyDesignFilters 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Designs Grid */}
              <div className="flex-grow">
                            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {loading ? 'Loading Designs...' : `${filteredDesigns.length} Designs Available`}
                </h2>
                {searchQuery && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Search results for:</span>
                    <span className="font-semibold text-primary">"{searchQuery}"</span>
                    <button 
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
                  <div className="flex items-center gap-4">
                    <select
                      className="p-3 border border-gray-300 rounded-xl bg-white text-sm focus:ring-2 focus:ring-primary focus:border-primary font-medium"
                      defaultValue="newest"
                    >
                      <option value="newest">Newest First</option>
                      <option value="bedrooms-asc">Bedrooms: Low to High</option>
                      <option value="bedrooms-desc">Bedrooms: High to Low</option>
                      <option value="area-asc">Area: Small to Large</option>
                      <option value="area-desc">Area: Large to Small</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                        <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                        <div className="bg-gray-200 h-4 rounded mb-2"></div>
                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredDesigns.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No designs found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDesigns.map((design) => (
                      <PropertyDesignCard key={design.id} design={design} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
} 