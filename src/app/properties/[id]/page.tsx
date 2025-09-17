'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useAuth } from '@/contexts/AuthContext';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

// Enhanced Image Slider Component
function ImageSlider({ images, propertyName }: { images: string[], propertyName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (images.length > 1 && !isFullscreen) {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    }
  }, [nextImage, images.length, isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') setIsFullscreen(false);
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFullscreen, nextImage, prevImage]);

  if (images.length === 0) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
        <div className="text-center">
          <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 text-lg">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Slider */}
      <div className="relative h-[70vh] rounded-3xl overflow-hidden shadow-2xl group">
        <div className="relative h-full">
          <Image
            src={images[currentIndex]}
            alt={`${propertyName} - Image ${currentIndex + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={currentIndex === 0}
            sizes="100vw"
            onLoadingComplete={() => setIsLoading(false)}
            onLoadStart={() => setIsLoading(true)}
          />
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
          )}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-xl backdrop-blur-sm"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-xl backdrop-blur-sm"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute top-6 left-6">
            <span className="px-4 py-2 bg-black/50 text-white rounded-full text-sm font-medium backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-6 right-6 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all duration-200 ${
                index === currentIndex 
                  ? 'ring-4 ring-primary scale-105' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-8">
            <Image
              src={images[currentIndex]}
              alt={`${propertyName} - Fullscreen`}
              fill
              className="object-contain"
              sizes="100vw"
            />
            
            {/* Fullscreen Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function InquiryCard({ propertyId, propertyName }: { propertyId: string, propertyName: string }) {
  const { user, userProfile } = useAuth();
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState(userProfile && 'phone' in userProfile ? (userProfile as any).phone || '' : '');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const inquiryData: any = {
        user_id: user?.id,
        property_id: propertyId,
        message,
        created_at: new Date().toISOString(),
        user_email: userProfile?.email || user?.email || '',
        user_phone: phone,
      };
      
      // Save to database
      const { error } = await supabase.from('inquiries').insert([inquiryData]);
      if (error) throw error;

      // Send email notification via API route
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'info@promitto.com', // info@promitto.com
          propertyName,
          message,
          phone,
          userEmail: userProfile?.email || user?.email || '',
        }),
      });
      const result = await response.json();
      if (!result.success) {
        console.error('Failed to send email notification:', result.error);
      }

      setSuccess('Inquiry submitted! We will contact you soon.');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-primary/5 via-blue-50 to-secondary/5 border border-blue-200/50 rounded-3xl p-8 shadow-xl backdrop-blur-sm mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary mb-1">Interested in a Similar Design?</h3>
            <p className="text-secondary font-medium">Let's build your dream home</p>
          </div>
        </div>
        <p className="mb-6 text-gray-700 leading-relaxed">Start your journey to owning a similar house design. Learn more about the process and get started with our personalized consultation.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/customer-journey">
            <span className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Start Your Journey
            </span>
          </Link>
          <Link href="/auth/login">
            <span className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-primary font-semibold px-8 py-4 rounded-2xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/40">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login to Inquire
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 via-blue-50 to-secondary/5 border border-blue-200/50 rounded-3xl p-8 shadow-xl backdrop-blur-sm mb-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary mb-1">Interested in a Similar Design?</h3>
          <p className="text-secondary font-medium">Let's discuss your dream home project</p>
        </div>
      </div>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Tell us about your interest in <span className="font-bold text-primary">{propertyName}</span>. 
        Our team will get in touch to discuss your needs, timeline, and how we can bring your vision to life.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="tel"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="+254 700 000 000"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Your Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                value={userProfile?.email || user?.email || ''}
                disabled
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Tell us about your project (optional)</label>
          <textarea
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
            rows={4}
            placeholder="Share details about your plot size, budget range, timeline, or any specific requirements..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Submit Inquiry
              </>
            )}
          </button>
          
          <div className="flex gap-2">
            <a 
              href="tel:+254729506506" 
              className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl transition-all duration-200 shadow-lg"
              title="Call us"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            
            <a 
              href="https://wa.me/254729506506" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl transition-all duration-200 shadow-lg"
              title="WhatsApp us"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-700 font-medium">{success}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('properties')
        .select(`*, property_types(name), property_statuses(name), roof_types(name)`)
        .eq('id', params.id)
        .single();
      if (error || !data) {
        setError('Property not found');
        setProperty(null);
      } else {
        setProperty(data);
      }
      setLoading(false);
    };
    fetchProperty();
  }, [params.id]);

  // Enhanced loading state
  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
              <div className="h-[70vh] bg-gray-200 rounded-3xl"></div>
              <div className="grid md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The property you are looking for does not exist.'}</p>
            <Link href="/properties" className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Properties
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const images: string[] = property.images || (property.featuredImage ? [property.featuredImage] : []);

  // Helper function to format price
  const formatPrice = (price: string | number | null) => {
    if (!price) return 'Price on request';
    const num = typeof price === 'number' ? price : parseFloat(price.toString().replace(/,/g, ''));
    if (isNaN(num)) return 'Price on request';
    return `KES ${num.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-orange-50">
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/properties" className="hover:text-primary transition-colors">Properties</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-medium truncate">{property.name}</span>
            </nav>

            {/* Property Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{property.name}</h1>
                  
                  {/* Location */}
                  <div className="flex items-center text-lg text-gray-600 mb-6">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium">{property.location}</span>
                  </div>

                  {/* Status and Type Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {(property.property_statuses?.name || property.status) && (
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        (property.property_statuses?.name || property.status)?.toLowerCase() === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {(property.property_statuses?.name || property.status)?.toLowerCase() === 'completed' ? '✓ Completed' : '🚧 Ongoing'}
                      </span>
                    )}
                    {(property.property_types?.name || property.type) && (
                      <span className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                        {property.property_types?.name || property.type}
                      </span>
                    )}
                    {(property.roof_types?.name || property.roofType) && (
                      <span className="px-4 py-2 rounded-full text-sm font-semibold bg-secondary/10 text-secondary">
                        {property.roof_types?.name || property.roofType}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 mb-2">Starting from</p>
                    <p className="text-2xl font-bold text-primary mb-4">{formatPrice(property.price)}</p>
                    <Link href="#inquiry" className="inline-flex items-center bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Image Slider */}
            <ImageSlider images={images} propertyName={property.name} />

            {/* Key Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
              {property.bedrooms && (
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Bedrooms</p>
                      <p className="text-lg font-bold text-gray-900">{property.bedrooms}</p>
                    </div>
                  </div>
                </div>
              )}

              {property.bathrooms && (
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Bathrooms</p>
                      <p className="text-lg font-bold text-gray-900">{property.bathrooms}</p>
                    </div>
                  </div>
                </div>
              )}

              {property.area && (
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Floor Area</p>
                      <p className="text-lg font-bold text-gray-900">{property.area}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Timeline</p>
                    <p className="text-lg font-bold text-gray-900">6-8 Months</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Section */}
            <div id="inquiry">
              <InquiryCard propertyId={property.id} propertyName={property.name} />
            </div>

            {/* Property Details Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Description */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Property Description
                </h2>
                <div className="prose text-gray-600 max-w-none">
                  <p className="text-base leading-relaxed">{property.description || 'This beautiful property represents modern design and functionality, carefully crafted to meet the needs of contemporary living.'}</p>
                </div>

                {/* Features */}
                {property.features && property.features.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Key Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {property.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200 h-fit">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  Contact Us
                </h2>
                
                <div className="space-y-4">
                  <a href="tel:+254729506506" className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 group">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Call us</p>
                      <p className="text-sm font-bold text-gray-900">+254 729 506 506</p>
                    </div>
                  </a>

                  <a href="mailto:info@promitto.com" className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Email us</p>
                      <p className="text-sm font-bold text-gray-900">info@promitto.com</p>
                    </div>
                  </a>

                  <a href="https://wa.me/254729506506" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 group">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">WhatsApp</p>
                      <p className="text-sm font-bold text-gray-900">Chat with us</p>
                    </div>
                  </a>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Visit our office</p>
                        <p className="text-xs font-medium text-gray-900 leading-relaxed">Pension Towers, Mezzanine Floor, Loita Street, Nairobi</p>
                      </div>
                    </div>
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