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
  houseType: string;
  imagePath: string;
  area?: string;
  description?: string;
  features?: string[];
  folderPath: string;
  images: string[];
}

export default function PropertyDesignsPage() {
  const [designs, setDesigns] = useState<PropertyDesign[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<PropertyDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    bedrooms: 0,
    roofType: '',
    houseType: ''
  });

  useEffect(() => {
    // Load all property designs from the organized folder structure
    const loadDesigns = () => {
      const allDesigns: PropertyDesign[] = [
        // 2 Bedroom Designs
        {
          id: '2br-flat-bungalow',
          name: '2 Bedroom Flat Roof Bungalow',
          bedrooms: 2,
          roofType: 'Flat Roof',
          houseType: 'Bungalow',
          folderPath: '/house_designs/2BR FLAT ROOF BUNGALOW',
          imagePath: '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_1 - Photo (2).webp',
          area: '92 sqm',
          description: 'Modern 2-bedroom bungalow with flat roof design, perfect for small families.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Open Plan Living', 'Kitchen', 'Parking Space'],
          images: [
            '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_1 - Photo (2).webp',
            '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_3 - Photo (2).webp',
            '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_4 - Photo (2).webp',
            '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_5 - Photo (1).webp',
            '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_7 - Photo.webp'
          ]
        },
        {
          id: '2br-hidden-bungalow',
          name: '2 Bedroom Hidden Roof Bungalow',
          bedrooms: 2,
          roofType: 'Hidden Roof',
          houseType: 'Bungalow',
          folderPath: '/house_designs/2BR HIDDEN ROOF BUNGALOW',
          imagePath: '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_1 - Photo (1).webp',
          area: '80 sqm',
          description: 'Contemporary 2-bedroom bungalow featuring a hidden roof design.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Modern Design', 'Kitchen', 'Garden Space'],
          images: [
            '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_1 - Photo (1).webp',
            '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_2 - Photo.webp',
            '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_3 - Photo.webp',
            '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_7 - Photo (1).webp'
          ]
        },
        {
          id: '2br-pitched-bungalow',
          name: '2 Bedroom Pitched Roof Bungalow',
          bedrooms: 2,
          roofType: 'Pitched Roof',
          houseType: 'Bungalow',
          folderPath: '/house_designs/2BR PITCHED BUNGALOW',
          imagePath: '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_1 - Photo.webp',
          area: '80-92 sqm',
          description: 'Classic 2-bedroom bungalow with traditional pitched roof design.',
          features: ['2 Bedrooms', '2 Bathrooms', 'Classic Design', 'Kitchen', 'Veranda'],
          images: [
            '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_1 - Photo.webp',
            '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_2 - Photo.webp',
            '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_3 - Photo.webp',
            '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_5 - Photo.webp',
            '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_7 - Photo.webp'
          ]
        },

        // 3 Bedroom Designs
        {
          id: '3br-flat-bungalow',
          name: '3 Bedroom Flat Roof Bungalow',
          bedrooms: 3,
          roofType: 'Flat Roof',
          houseType: 'Bungalow',
          folderPath: '/house_designs/3BR FLAT ROOF BUNGALOW',
          imagePath: '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_1 - Photo.webp',
          area: '140 sqm',
          description: 'Spacious 3-bedroom bungalow with modern flat roof design.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Large Living Area', 'Kitchen', 'Double Parking'],
          images: [
            '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_1 - Photo.webp',
            '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_3 - Photo.webp',
            '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_5 - Photo.webp',
            '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_7 - Photo.webp'
          ]
        },
        {
          id: '3br-flat-mansionette',
          name: '3 Bedroom Flat Roof Mansionette',
          bedrooms: 3,
          roofType: 'Flat Roof',
          houseType: 'Mansionette',
          folderPath: '/house_designs/3BR FLAT ROOF MANSIONETTE',
          imagePath: '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._1 - Photo.webp',
          area: '180 sqm',
          description: 'Luxurious 3-bedroom mansionette with flat roof and premium features.',
          features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden'],
          images: [
            '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._1 - Photo.webp',
            '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._3 - Photo.webp',
            '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._5 - Photo.webp',
            '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._7 - Photo.webp'
          ]
        },
        {
          id: '3br-hidden-bungalow',
          name: '3 Bedroom Hidden Roof Bungalow',
          bedrooms: 3,
          roofType: 'Hidden Roof',
          houseType: 'Bungalow',
          folderPath: '/house_designs/3BR HIDDEN ROOF BUNGALOW',
          imagePath: '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_1 - Photo.webp',
          area: '110 sqm',
          description: 'Contemporary 3-bedroom bungalow with sleek hidden roof design.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony'],
          images: [
            '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_1 - Photo.webp',
            '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_5 - Photo.webp',
            '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_7 - Photo.webp',
            '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_9 - Photo.webp'
          ]
        },
        {
          id: '3br-pitched-bungalow',
          name: '3 Bedroom Pitched Roof Bungalow',
          bedrooms: 3,
          roofType: 'Pitched Roof',
          houseType: 'Bungalow',
          folderPath: '/house_designs/3BR PITCHED ROOF BUNGALOW',
          imagePath: '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_1 - Photo.webp',
          area: '110 sqm',
          description: 'Classic 3-bedroom bungalow with pitched roof and traditional charm.',
          features: ['3 Bedrooms', '2 Bathrooms', 'Traditional Design', 'Kitchen', 'Veranda'],
          images: [
            '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_1 - Photo.webp',
            '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_5 - Photo.webp',
            '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_7 - Photo.webp',
            '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_9 - Photo.webp'
          ]
        },
        {
          id: '3br-pitched-mansionette',
          name: '3 Bedroom Pitched Roof Mansionette',
          bedrooms: 3,
          roofType: 'Pitched Roof',
          houseType: 'Mansionette',
          folderPath: '/house_designs/3BR PITCHED ROOF MANSIONETTE',
          imagePath: '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._1 - Photo.webp',
          area: '200 sqm',
          description: 'Elegant 3-bedroom mansionette with traditional pitched roof design.',
          features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
          images: [
            '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._1 - Photo.webp',
            '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._3 - Photo.webp',
            '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._5 - Photo.webp',
            '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._7 - Photo.webp'
          ]
        },

        // 4 Bedroom Designs
        {
          id: '4br-flat-mansionette-172',
          name: '4 Bedroom 172 sqm Standard Pitched Mansionette',
          bedrooms: 4,
          roofType: 'Pitched Roof',
          houseType: 'Mansionette',
          folderPath: '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE',
          imagePath: '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED_1 - Photo.webp',
          area: '172 sqm',
          description: 'Standard 4-bedroom mansionette with pitched roof design.',
          features: ['4 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden'],
          images: [
            '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED_1 - Photo.webp',
            '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED _2 - Photo.webp',
            '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED _3 - Photo.webp',
            '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED _4 - Photo.webp'
          ]
        },
        {
          id: '4br-flat-mansionette-224',
          name: '4 Bedroom 224 sqm Flat Roof Mansionette',
          bedrooms: 4,
          roofType: 'Flat Roof',
          houseType: 'Mansionette',
          folderPath: '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE',
          imagePath: '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._1 - Photo.webp',
          area: '224 sqm',
          description: 'Luxurious 4-bedroom mansionette with flat roof design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
          images: [
            '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._1 - Photo.webp',
            '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._3 - Photo.webp',
            '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._5 - Photo.webp',
            '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._6 - Photo.webp'
          ]
        },
        {
          id: '4br-pitched-bungalow',
          name: '4 Bedroom Pitched Roof Bungalow',
          bedrooms: 4,
          roofType: 'Pitched Roof',
          houseType: 'Bungalow',
          folderPath: '/house_designs/4BR PITCHED ROOF BUNGALOW',
          imagePath: '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_1 - Photo.webp',
          area: '280 sqm',
          description: 'Elegant 4-bedroom bungalow with traditional pitched roof design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
          images: [
            '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_1 - Photo.webp',
            '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_3 - Photo.webp',
            '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_4 - Photo.webp',
            '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_5 - Photo.webp'
          ]
        },
        {
          id: '4br-pitched-hybrid-mansionette',
          name: '4 Bedroom Pitched Roof Hybrid Mansionette',
          bedrooms: 4,
          roofType: 'Pitched Roof',
          houseType: 'Hybrid Mansionette',
          folderPath: '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE',
          imagePath: '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._1 - Photo.webp',
          area: '300 sqm',
          description: 'Elegant Hybrid 4-bedroom mansionette with pitched roof design.',
          features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
          images: [
            '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._1 - Photo.webp',
            '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._2 - Photo.webp',
            '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._7 - Photo.webp',
            '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._8 - Photo.webp'
          ]
        },

        // 5 Bedroom Designs
        {
          id: '5br-flat-mansionette',
          name: '5 Bedroom Flat Roof Mansionette',
          bedrooms: 5,
          roofType: 'Flat Roof',
          houseType: 'Mansionette',
          folderPath: '/house_designs/5BR FLAT ROOF MANSIONETTE',
          imagePath: '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_1 - Photo.webp',
          area: '380 sqm',
          description: 'Luxurious 5-bedroom mansionette with modern flat roof design.',
          features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Swimming Pool'],
          images: [
            '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_1 - Photo.webp',
            '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_2 - Photo.webp',
            '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_3 - Photo.webp',
            '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_7 - Photo.webp'
          ]
        },
        {
          id: '5br-pitched-mansionette',
          name: '5 Bedroom Pitched Roof Mansionette',
          bedrooms: 5,
          roofType: 'Pitched Roof',
          houseType: 'Mansionette',
          folderPath: '/house_designs/5BR PITCHED ROOF MANSIONETTE',
          imagePath: '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_2 - Photo.webp',
          area: '380 sqm',
          description: 'Elegant 5-bedroom mansionette with traditional pitched roof.',
          features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
          images: [
            '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_2 - Photo.webp',
            '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_5 - Photo.webp',
            '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_7 - Photo.webp',
            '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_8 - Photo.webp'
          ]
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
        design.houseType.toLowerCase().includes(searchLower) ||
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

    // Filter by house type
    if (filters.houseType && filters.houseType !== 'All types') {
      filtered = filtered.filter(design => design.houseType === filters.houseType);
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

  const handleFilterChange = (newFilters: { bedrooms: number; roofType: string; houseType: string }) => {
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
                  placeholder="Search by design name, roof type, house type, or features..."
                  className="w-full pl-12 pr-24 py-4 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                  className="absolute right-2 top-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
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