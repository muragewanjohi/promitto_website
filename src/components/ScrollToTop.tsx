'use client';

import React, { useState, useEffect, useCallback } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = useCallback(() => {
    if (typeof window !== 'undefined') {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, []);

  // Set the scroll event listener with throttling for better performance
  useEffect(() => {
    if (!mounted) return;
    
    let timeoutId: NodeJS.Timeout;
    const throttledToggleVisibility = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(toggleVisibility, 100);
    };

    window.addEventListener('scroll', throttledToggleVisibility, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledToggleVisibility);
      clearTimeout(timeoutId);
    };
  }, [mounted, toggleVisibility]);

  // Scroll to top handler with better mobile support
  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      // For mobile devices, use a more reliable scroll method
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Use requestAnimationFrame for smoother mobile scrolling
        const scrollStep = -window.scrollY / (500 / 15);
        const scrollInterval = setInterval(() => {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        }, 15);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // Don't render on server side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 bg-primary hover:bg-primary/90 active:bg-primary/80 text-white rounded-full p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 touch-manipulation"
          aria-label="Scroll to top"
          style={{ 
            minWidth: '48px', 
            minHeight: '48px',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop; 