'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="w-full z-50">
      {/* Top Contact Bar */}
      <div className="w-full bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-secondary" />
                <span className="font-medium">(+254) 729 506 506</span>
            </div>
            <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4 text-secondary" />
                <span className="font-medium">info@promittoltd.com</span>
          </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Mon - Fri: 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-4 text-white font-medium font-sans">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center" prefetch={false}>
                <Image
                  src="/logo4.png"
                  alt="Promitto Logo"
                  width={100}
                  height={100}
                  className="h-16 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex space-x-8">
              <Link href="/" className="text-base hover:text-secondary transition-colors capitalize font-semibold" prefetch={false}>Home</Link>
              <Link href="/about" className="text-base hover:text-secondary transition-colors capitalize font-semibold" prefetch={false}>About</Link>
              <Link href="/properties" className="text-base hover:text-secondary transition-colors capitalize font-semibold" prefetch={false}>Properties</Link>
              <Link href="/property-designs" className="text-base hover:text-secondary transition-colors capitalize font-semibold" prefetch={false}>Designs</Link>
              <Link href="/how-to-own" className="text-base hover:text-secondary transition-colors capitalize font-semibold" prefetch={false}>How to own</Link>
              <Link href="/loan-calculator" className="text-base hover:text-secondary transition-colors capitalize font-semibold" prefetch={false}>Calculator</Link>
              <Link href="/contact" className="text-base hover:text-secondary transition-colors capitalize font-semibold" prefetch={false}>Contact</Link>
            </div>
            
            {/* Auth Links */}
            <div className="flex items-center space-x-4">
              {userProfile?.role === 'admin' && (
                <Link href="/admin" className="text-base hover:text-secondary font-bold transition-colors capitalize" prefetch={false}>Admin</Link>
              )}
              {user ? (
                <Link href="/profile" className="text-base hover:text-secondary font-bold transition-colors capitalize" prefetch={false}>Profile</Link>
              ) : (
                <>
                  <Link href="/login" className="text-base hover:text-secondary transition-colors capitalize " prefetch={false}>Login</Link>
                  <Link href="/signup" className="text-base bg-secondary hover:bg-accent text-white px-6 py-3 rounded-lg transition-all duration-300 capitalize shadow-lg hover:shadow-xl transform hover:scale-105" prefetch={false}>Sign up</Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-secondary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-primary border-t border-white/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" className="block px-3 py-2 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>Home</Link>
                <Link href="/about" className="block px-3 py-2 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>About</Link>
                <Link href="/properties" className="block px-3 py-2 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>Properties</Link>
                <Link href="/property-designs" className="block px-3 py-2 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>Designs</Link>
                <Link href="/how-to-own" className="block px-3 py-2 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>How to own</Link>
                <Link href="/loan-calculator" className="block px-3 py-2 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>Calculator</Link>
                <Link href="/contact" className="block px-3 py-2 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>Contact</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 