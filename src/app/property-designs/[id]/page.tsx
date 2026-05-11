'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { safeNextImageSrc } from '@/lib/safeNextImageSrc';

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

export default function PropertyDesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [design, setDesign] = useState<PropertyDesign | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Keyboard shortcuts for zoom
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showImageModal) return;
      
      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showImageModal]);

  useEffect(() => {
    // Load property design from database
    const loadDesign = async () => {
      try {
        setLoading(true);
        const designId = params.id as string;
        
        if (!designId) {
          setLoading(false);
          return;
        }

        // Fetch design from database by ID
        const { data, error } = await supabase
          .from('property_designs')
          .select('*')
          .eq('id', designId)
          .single();

        if (error) throw error;

        if (data) {
          // Transform database data to match PropertyDesign interface
          const transformedDesign: PropertyDesign = {
            id: data.id,
            name: data.name,
            bedrooms: data.bedrooms,
            roofType: data.roof_type,
            houseType: data.house_type,
            imagePath: data.image_path,
            area: data.area,
            description: data.description,
            features: Array.isArray(data.features) ? data.features : [],
            folderPath: data.folder_path || '',
            images: Array.isArray(data.images) && data.images.length > 0 
              ? data.images 
              : [data.image_path], // Fallback to main image if no additional images
          };

          setDesign(transformedDesign);
          // Pre-fill the subject with the house name
          setContactForm(prev => ({
            ...prev,
            subject: `Inquiry about ${transformedDesign.name}`
          }));
        }
      } catch (err) {
        console.error('Error loading property design:', err);
        // Design not found or error occurred
        setDesign(null);
      } finally {
        setLoading(false);
      }
    };

    loadDesign();
  }, [params.id]);

  const nextImage = () => {
    if (design && design.images && design.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === design.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (design && design.images && design.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? design.images.length - 1 : prev - 1
      );
    }
  };

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setImageZoom(1); // Reset zoom when closing modal
  };

  const zoomIn = () => {
    setImageZoom(prev => Math.min(prev + 0.5, 3)); // Max zoom 3x
  };

  const zoomOut = () => {
    setImageZoom(prev => Math.max(prev - 0.5, 0.5)); // Min zoom 0.5x
  };

  const resetZoom = () => {
    setImageZoom(1);
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', contactForm);
    // For now, just close the form
    setShowContactForm(false);
    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: design ? `Inquiry about ${design.name}` : '',
      message: ''
    });
  };

  const getRoofTypeColor = (roofType: string) => {
    switch (roofType) {
      case 'Flat Roof':
        return 'bg-blue-100 text-blue-800';
      case 'Pitched Roof':
        return 'bg-green-100 text-green-800';
      case 'Hidden Roof':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHouseTypeColor = (houseType: string) => {
    switch (houseType) {
      case 'Bungalow':
        return 'bg-primary/10 text-primary';
      case 'Mansionette':
        return 'bg-secondary/10 text-secondary';
      case 'Hybrid Mansionette':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!design) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Not Found</h3>
            <p className="text-gray-600 mb-6">The property design you&apos;re looking for doesn&apos;t exist.</p>
            <button 
              onClick={() => router.push('/property-designs')}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
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
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Header />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <button 
            onClick={() => router.push('/property-designs')}
            className="hover:text-primary transition-colors"
          >
            Property Designs
          </button>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">{design.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100 cursor-pointer" onClick={openImageModal}>
              {!imageError && design.images && design.images.length > 0 ? (
                <Image
                  src={safeNextImageSrc(design.images[currentImageIndex] || design.imagePath)}
                  alt={`${design.name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={currentImageIndex === 0}
                  quality={currentImageIndex === 0 ? 85 : 75}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              )}
              
              {/* Navigation Arrows */}
              {design.images && design.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {design.images && design.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {design.images.length}
                </div>
              )}

              {/* Click to expand indicator */}
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {design.images && design.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {design.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-primary' 
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={safeNextImageSrc(image)}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Design Details */}
          <div className="space-y-6">
            {/* Title and Badges */}
            <div>
              <h1 className="site-title text-gray-900 mb-4">{design.name}</h1>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getHouseTypeColor(design.houseType)}`}>
                  {design.houseType}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getRoofTypeColor(design.roofType)}`}>
                  {design.roofType}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                  {design.bedrooms} Bedroom{design.bedrooms > 1 ? 's' : ''}
                </span>
                {design.area && (
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-secondary/10 text-secondary">
                    {design.area}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {design.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{design.description}</p>
              </div>
            )}

            {/* Features */}
            {design.features && design.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {design.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-6">
              <button 
                onClick={() => setShowContactForm(true)}
                className="w-full bg-primary text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2" onClick={closeImageModal}>
          <div className="relative w-full h-full max-w-7xl max-h-[95vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-10"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-6 left-6 flex gap-3 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomOut();
                }}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                title="Zoom Out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                }}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full transition-colors text-sm font-medium"
                title="Reset Zoom"
              >
                {Math.round(imageZoom * 100)}%
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomIn();
                }}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                title="Zoom In"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Arrows */}
            {design.images && design.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-colors z-10"
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-colors z-10"
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="relative overflow-hidden rounded-lg w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <div 
                className="transition-transform duration-300 ease-in-out flex items-center justify-center"
                style={{ transform: `scale(${imageZoom})` }}
              >
                <Image
                  src={safeNextImageSrc(
                    design.images && design.images.length > 0
                      ? design.images[currentImageIndex]
                      : design.imagePath
                  )}
                  alt={`${design.name} - Image ${currentImageIndex + 1}`}
                  width={1200}
                  height={900}
                  className="max-w-full max-h-[90vh] object-contain"
                  priority
                />
              </div>
              
              {/* Image Counter */}
              {design.images && design.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-base font-medium">
                  {currentImageIndex + 1} / {design.images.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white px-4 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
} 