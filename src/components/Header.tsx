'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { PhoneIcon, EnvelopeIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsAboutDropdownOpen(false);
  }, [pathname]);

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <header className="w-full z-50">
        <div className="w-full bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between items-center py-4 text-white font-medium font-sans">
              <div className="flex items-center">
                <div className="h-16 w-24 bg-white/20 rounded animate-pulse"></div>
              </div>
              <div className="hidden lg:flex space-x-8">
                <div className="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-20 bg-white/20 rounded animate-pulse"></div>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full z-50">
     

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
              
              {/* About Dropdown */}
              <div className="relative group">
                <button 
                  className="text-base hover:text-secondary transition-colors capitalize font-semibold flex items-center"
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                >
                  About
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 z-50 ${isAboutDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                >
                  <div className="py-2">
                    <Link href="/about" className="block px-4 py-3 text-gray-800 hover:bg-primary hover:text-white transition-colors" prefetch={false}>
                      <div className="font-semibold">Company Overview</div>
                      <div className="text-sm text-gray-600">Our story and mission</div>
                    </Link>
                    <Link href="/about/team" className="block px-4 py-3 text-gray-800 hover:bg-primary hover:text-white transition-colors" prefetch={false}>
                      <div className="font-semibold">Our Team</div>
                      <div className="text-sm text-gray-600">Management & Board members</div>
                    </Link>
                    <Link href="/about/offices" className="block px-4 py-3 text-gray-800 hover:bg-primary hover:text-white transition-colors" prefetch={false}>
                      <div className="font-semibold">Our Offices</div>
                      <div className="text-sm text-gray-600">Kenya & Zambia locations</div>
                    </Link>
                    <Link href="/about/expertise" className="block px-4 py-3 text-gray-800 hover:bg-primary hover:text-white transition-colors" prefetch={false}>
                      <div className="font-semibold">Technical Expertise</div>
                      <div className="text-sm text-gray-600">Our departments & capabilities</div>
                    </Link>
                    <Link href="/about/requirements" className="block px-4 py-3 text-gray-800 hover:bg-primary hover:text-white transition-colors" prefetch={false}>
                      <div className="font-semibold">Registration Requirements</div>
                      <div className="text-sm text-gray-600">Individual & Corporate</div>
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link href="/properties" className="text-base hover:text-secondary transition-colors capitalize font-semibold" prefetch={false}>Projects</Link>
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
                <div className="flex items-center space-x-4">
                  <Link href="/profile" className="text-base hover:text-secondary font-bold transition-colors capitalize" prefetch={false}>
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      router.push('/');
                    }}
                    className="text-base bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg transition-all duration-300 capitalize shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-base hover:text-secondary transition-colors capitalize " prefetch={false}>Login</Link>
                  <Link href="/signup" className="text-base bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-3 rounded-lg transition-all duration-300 capitalize shadow-lg hover:shadow-xl transform hover:scale-105" prefetch={false}>Sign up</Link>
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
                <Link href="/about/team" className="block px-3 py-2 pl-6 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>Our Team</Link>
                <Link href="/about/offices" className="block px-3 py-2 pl-6 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>Our Offices</Link>
                <Link href="/about/expertise" className="block px-3 py-2 pl-6 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>Technical Expertise</Link>
                <Link href="/about/requirements" className="block px-3 py-2 pl-6 text-white hover:text-secondary transition-colors capitalize" prefetch={false}>Requirements</Link>
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