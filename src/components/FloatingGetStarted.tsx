'use client';

import React, { useState, useEffect } from 'react';
import { Rocket, ArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FloatingGetStartedProps {
  className?: string;
}

const FloatingGetStarted: React.FC<FloatingGetStartedProps> = ({ className = '' }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false); // Start hidden

  // Simple scroll handler for visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100); // Show after 100px scroll
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple click handler
  const handleGetStartedClick = () => {
    console.log('Get Started button clicked!');
    
    // Try navigation
    try {
      router.push('/signup/');
    } catch (error) {
      console.error('Navigation failed:', error);
      window.location.href = '/signup/';
    }
  };

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateX(-50%) ${isVisible ? 'translateY(0)' : 'translateY(20px)'}`,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <button
        onClick={handleGetStartedClick}
        className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 group cursor-pointer"
        title="Get Started with Promitto"
        aria-label="Get Started with Promitto"
      >
        <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-semibold text-sm sm:text-base">Get Started</span>
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default FloatingGetStarted;
