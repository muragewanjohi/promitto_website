'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { PhoneIcon, EnvelopeIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Newspaper, FileText, Calendar, BookOpen, HelpCircle, Lightbulb, Building2, Calculator, Images, User, Settings, LogOut } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
  const [isInsightsDropdownOpen, setIsInsightsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
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
    setIsMediaDropdownOpen(false);
    setIsInsightsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  }, [pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown-container')) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileDropdownOpen]);

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <header className="w-full z-50 relative">
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
    <header className="w-full z-50 relative">
     

      {/* Navigation Bar */}
      <div className="w-full bg-primary">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <nav className="flex justify-between items-center py-3 sm:py-4 text-white font-medium font-sans">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center" prefetch={false}>
                <Image
                  src="/logo4.png"
                  alt="Promitto Logo"
                  width={100}
                  height={100}
                  className="h-12 sm:h-14 lg:h-16 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex space-x-8">
              <Link 
                href="/" 
                className={`text-base hover:text-secondary transition-colors capitalize font-semibold ${pathname === '/' ? 'text-secondary' : ''}`}
                onClick={() => {
                  setIsAboutDropdownOpen(false);
                  setIsMediaDropdownOpen(false);
                }}
              >
                Home
              </Link>
              
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
                    <Link 
                      href="/about" 
                      className="block px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsAboutDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-sm">Company Overview</div>
                      <div className="text-xs text-gray-600 hover:text-gray-300">Our story and mission</div>
                    </Link>
                    {/* Our Team - commented out
                    <Link 
                      href="/about/team" 
                      className="block px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsAboutDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-sm">Our Team</div>
                      <div className="text-xs text-gray-600 hover:text-gray-300">Management & Board members</div>
                    </Link>
                    */}
                    <Link 
                      href="/about/offices" 
                      className="block px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsAboutDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-sm">Our Offices</div>
                      <div className="text-xs text-gray-600 hover:text-gray-300">Kenya & Zambia locations</div>
                    </Link>
                    <Link 
                      href="/about/expertise" 
                      className="block px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsAboutDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-sm">Technical Expertise</div>
                      <div className="text-xs text-gray-600 hover:text-gray-300">Our departments & capabilities</div>
                    </Link>
                    <Link 
                      href="/about/requirements" 
                      className="block px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsAboutDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-sm">Registration Requirements</div>
                      <div className="text-xs text-gray-600 hover:text-gray-300">Individual & Corporate</div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Media Dropdown */}
              <div className="relative group">
                <button 
                  className={`text-base hover:text-secondary transition-colors capitalize font-semibold flex items-center ${pathname?.startsWith('/news') || pathname?.startsWith('/resources') || pathname?.startsWith('/events') || pathname?.startsWith('/blogs') || pathname?.startsWith('/gallery') || pathname?.startsWith('/faq') || pathname?.startsWith('/about') || pathname?.startsWith('/how-to-own') || pathname?.startsWith('/loan-calculator') ? 'text-secondary' : ''}`}
                  onMouseEnter={() => setIsMediaDropdownOpen(true)}
                  onMouseLeave={() => {
                    setIsMediaDropdownOpen(false);
                    setIsInsightsDropdownOpen(false);
                  }}
                >
                  Media
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 z-50 ${isMediaDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                  onMouseEnter={() => setIsMediaDropdownOpen(true)}
                  onMouseLeave={() => {
                    setIsMediaDropdownOpen(false);
                    setIsInsightsDropdownOpen(false);
                  }}
                >
                  <div className="py-2">
                    <Link 
                      href="/news" 
                      className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsMediaDropdownOpen(false);
                      }}
                    >
                      <Newspaper className="w-4 h-4 mr-3" />
                      <div>
                        <div className="font-medium text-sm">News</div>
                        <div className="text-xs text-gray-600 hover:text-gray-300">Latest news and updates</div>
                      </div>
                    </Link>
                    <Link 
                      href="/resources" 
                      className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsMediaDropdownOpen(false);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-3" />
                      <div>
                        <div className="font-medium text-sm">Resources</div>
                        <div className="text-xs text-gray-600 hover:text-gray-300">Helpful guides and resources</div>
                      </div>
                    </Link>
                    <Link 
                      href="/events" 
                      className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsMediaDropdownOpen(false);
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-3" />
                      <div>
                        <div className="font-medium text-sm">Events</div>
                        <div className="text-xs text-gray-600 hover:text-gray-300">Upcoming events and activities</div>
                      </div>
                    </Link>
                    <Link 
                      href="/blogs" 
                      className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsMediaDropdownOpen(false);
                      }}
                    >
                      <BookOpen className="w-4 h-4 mr-3" />
                      <div>
                        <div className="font-medium text-sm">Blogs</div>
                        <div className="text-xs text-gray-600 hover:text-gray-300">Latest blog posts and insights</div>
                      </div>
                    </Link>
                    <Link 
                      href="/gallery" 
                      className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsMediaDropdownOpen(false);
                      }}
                    >
                      <Images className="w-4 h-4 mr-3" />
                      <div>
                        <div className="font-medium text-sm">Gallery</div>
                        <div className="text-xs text-gray-600 hover:text-gray-300">Photos and videos gallery</div>
                      </div>
                    </Link>
                    <Link 
                      href="/faq" 
                      className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        setIsMediaDropdownOpen(false);
                      }}
                    >
                      <HelpCircle className="w-4 h-4 mr-3" />
                      <div>
                        <div className="font-medium text-sm">FAQ</div>
                        <div className="text-xs text-gray-600 hover:text-gray-300">Frequently asked questions</div>
                      </div>
                    </Link>
                    {/* Insights with nested dropdown */}
                    <div 
                      className="relative"
                      onMouseEnter={() => setIsInsightsDropdownOpen(true)}
                      onMouseLeave={() => setIsInsightsDropdownOpen(false)}
                    >
                      <div className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                        <Lightbulb className="w-4 h-4 mr-3" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">Insights</div>
                          <div className="text-xs text-gray-600 hover:text-gray-300">Learn more about Promitto</div>
                        </div>
                        <ChevronDownIcon className="w-4 h-4 ml-2" />
                      </div>
                      {/* Nested Dropdown */}
                      {isInsightsDropdownOpen && (
                        <div 
                          className="absolute left-full top-0 ml-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                          onMouseEnter={() => setIsInsightsDropdownOpen(true)}
                          onMouseLeave={() => setIsInsightsDropdownOpen(false)}
                        >
                          <div className="py-2">
                            <Link 
                              href="/about" 
                              className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                              onClick={() => {
                                setIsMediaDropdownOpen(false);
                                setIsInsightsDropdownOpen(false);
                              }}
                            >
                              <Building2 className="w-4 h-4 mr-3" />
                              <div>
                                <div className="font-medium text-sm">Who is Promitto?</div>
                                <div className="text-xs text-gray-600 hover:text-gray-300">Learn about our company</div>
                              </div>
                            </Link>
                            <Link 
                              href="/how-to-own#journey-to-homeownership" 
                              className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                              onClick={() => {
                                setIsMediaDropdownOpen(false);
                                setIsInsightsDropdownOpen(false);
                              }}
                            >
                              <FileText className="w-4 h-4 mr-3" />
                              <div>
                                <div className="font-medium text-sm">Steps to Home Ownership</div>
                                <div className="text-xs text-gray-600 hover:text-gray-300">Your journey to homeownership</div>
                              </div>
                            </Link>
                            <Link 
                              href="/loan-calculator" 
                              className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                              onClick={() => {
                                setIsMediaDropdownOpen(false);
                                setIsInsightsDropdownOpen(false);
                              }}
                            >
                              <Calculator className="w-4 h-4 mr-3" />
                              <div>
                                <div className="font-medium text-sm">Home Loan Calculator</div>
                                <div className="text-xs text-gray-600 hover:text-gray-300">Calculate your loan</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/properties" 
                className={`text-base hover:text-secondary transition-colors capitalize font-semibold ${pathname === '/properties' ? 'text-secondary' : ''}`}
                onClick={() => {
                  setIsAboutDropdownOpen(false);
                  setIsMediaDropdownOpen(false);
                }}
              >
                Projects
              </Link>
              <Link 
                href="/property-designs" 
                className={`text-base hover:text-secondary transition-colors capitalize font-semibold ${pathname === '/property-designs' ? 'text-secondary' : ''}`}
                onClick={() => {
                  setIsAboutDropdownOpen(false);
                }}
              >
                Designs
              </Link>
              <Link 
                href="/how-to-own" 
                className={`text-base hover:text-secondary transition-colors capitalize font-semibold ${pathname === '/how-to-own' ? 'text-secondary' : ''}`}
                onClick={() => {
                  setIsAboutDropdownOpen(false);
                }}
              >
                How to own
              </Link>
              <Link 
                href="/loan-calculator" 
                className={`text-base hover:text-secondary transition-colors capitalize font-semibold ${pathname === '/loan-calculator' ? 'text-secondary' : ''}`}
                onClick={() => {
                  setIsAboutDropdownOpen(false);
                }}
              >
                Calculator
              </Link>
              <Link 
                href="/contact" 
                className={`text-base hover:text-secondary transition-colors capitalize font-semibold ${pathname === '/contact' ? 'text-secondary' : ''}`}
                onClick={() => {
                  setIsAboutDropdownOpen(false);
                }}
              >
                Contact
              </Link>
            </div>
            
            {/* Auth Links */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {userProfile?.role === 'admin' && (
                <Link 
                  href="/admin" 
                  className="hidden sm:block text-sm lg:text-base hover:text-secondary font-bold transition-colors capitalize"
                >
                  Admin
                </Link>
              )}
              {user ? (
                <div className="flex items-center space-x-2 sm:space-x-4 profile-dropdown-container">
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/10 transition-colors group"
                      aria-label="Profile menu"
                      aria-expanded={isProfileDropdownOpen}
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center hover:ring-2 hover:ring-white/50 transition-all shadow-md group-hover:shadow-lg">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <span className="hidden lg:inline text-sm font-medium text-white group-hover:text-secondary transition-colors">
                        Profile
                      </span>
                      <ChevronDownIcon className={`hidden lg:block w-4 h-4 text-white transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                        <div className="py-2">
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {(() => {
                                const profile = userProfile as any;
                                if (profile?.first_name && profile?.surname) {
                                  return `${profile.first_name} ${profile.surname}`;
                                }
                                return user?.email?.split('@')[0] || 'User';
                              })()}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              {user?.email}
                            </p>
                          </div>

                          {/* Profile Link */}
                          <Link
                            href="/profile"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                          >
                            <User className="w-4 h-4 mr-3" />
                            <span className="text-sm font-medium">My Profile</span>
                          </Link>

                          {/* Admin Link (if admin) */}
                          {userProfile?.role === 'admin' && (
                            <Link
                              href="/admin"
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                            >
                              <Settings className="w-4 h-4 mr-3" />
                              <span className="text-sm font-medium">Admin Panel</span>
                            </Link>
                          )}

                          {/* Divider */}
                          <div className="border-t border-gray-200 my-1"></div>

                          {/* Logout */}
                          <button
                            onClick={async () => {
                              setIsProfileDropdownOpen(false);
                              await signOut();
                              router.push('/');
                            }}
                            className="w-full flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            <span className="text-sm font-medium">Log Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="text-sm lg:text-base hover:text-secondary transition-colors capitalize px-2 py-1 rounded hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="text-xs sm:text-sm bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 capitalize shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="hidden sm:inline">Sign up</span>
                    <span className="sm:hidden">Sign up</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-secondary transition-colors p-2 -m-2 rounded-lg hover:bg-white/10"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-primary border-t border-white/20 shadow-lg">
              <div className="px-4 pt-4 pb-6 space-y-1">
                {/* Main Navigation */}
                <div className="space-y-1">
                  <Link 
                    href="/" 
                    className={`block px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium ${pathname === '/' ? 'text-secondary bg-white/10' : ''}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    Home
                  </Link>
                  
                  {/* About Section with Submenu */}
                  <div className="space-y-1">
                    <div className="px-4 py-2 text-white/80 text-sm font-semibold uppercase tracking-wider">
                      About
                    </div>
                    <Link 
                      href="/about" 
                      className={`block px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname === '/about' ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      Company Overview
                    </Link>
                    {/* Our Team - commented out
                    <Link 
                      href="/about/team" 
                      className={`block px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname === '/about/team' ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      Our Team
                    </Link>
                    */}
                    <Link 
                      href="/about/offices" 
                      className={`block px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname === '/about/offices' ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      Our Offices
                    </Link>
                    <Link 
                      href="/about/expertise" 
                      className={`block px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname === '/about/expertise' ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      Technical Expertise
                    </Link>
                    <Link 
                      href="/about/requirements" 
                      className={`block px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname === '/about/requirements' ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      Requirements
                    </Link>
                  </div>

                  {/* Media Section with Submenu */}
                  <div className="space-y-1">
                    <div className="px-4 py-2 text-white/80 text-sm font-semibold uppercase tracking-wider">
                      Media
                    </div>
                    <Link 
                      href="/news" 
                      className={`flex items-center px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname?.startsWith('/news') ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <Newspaper className="w-4 h-4 mr-3" />
                      News
                    </Link>
                    <Link 
                      href="/resources" 
                      className={`flex items-center px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname?.startsWith('/resources') ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-3" />
                      Resources
                    </Link>
                    <Link 
                      href="/events" 
                      className={`flex items-center px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname?.startsWith('/events') ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-3" />
                      Events
                    </Link>
                    <Link 
                      href="/blogs" 
                      className={`flex items-center px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname?.startsWith('/blogs') ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <BookOpen className="w-4 h-4 mr-3" />
                      Blogs
                    </Link>
                    <Link 
                      href="/gallery" 
                      className={`flex items-center px-6 py-2 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 ${pathname?.startsWith('/gallery') ? 'text-secondary bg-white/10' : ''}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <Images className="w-4 h-4 mr-3" />
                      Gallery
                    </Link>
                  </div>
                  
                  <Link 
                    href="/properties" 
                    className={`block px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium ${pathname === '/properties' ? 'text-secondary bg-white/10' : ''}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    Projects
                  </Link>
                  <Link 
                    href="/property-designs" 
                    className={`block px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium ${pathname === '/property-designs' ? 'text-secondary bg-white/10' : ''}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    Designs
                  </Link>
                  <Link 
                    href="/how-to-own" 
                    className={`block px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium ${pathname === '/how-to-own' ? 'text-secondary bg-white/10' : ''}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    How to Own
                  </Link>
                  <Link 
                    href="/loan-calculator" 
                    className={`block px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium ${pathname === '/loan-calculator' ? 'text-secondary bg-white/10' : ''}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    Calculator
                  </Link>
                  <Link 
                    href="/contact" 
                    className={`block px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium ${pathname === '/contact' ? 'text-secondary bg-white/10' : ''}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    Contact
                  </Link>
                </div>
                
                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-white/20">
                  {userProfile?.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="block px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      Admin Panel
                    </Link>
                  )}
                  {user ? (
                    <div className="space-y-2">
                      {/* User Info */}
                      <div className="px-4 py-3 bg-white/10 rounded-lg mb-2">
                        <p className="text-sm font-semibold text-white truncate">
                          {(() => {
                            const profile = userProfile as any;
                            if (profile?.first_name && profile?.surname) {
                              return `${profile.first_name} ${profile.surname}`;
                            }
                            return user?.email?.split('@')[0] || 'User';
                          })()}
                        </p>
                        <p className="text-xs text-white/80 truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>
                      
                      <Link 
                        href="/profile" 
                        className="flex items-center px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium"
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-3 shadow-md">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <span>My Profile</span>
                      </Link>
                      
                      {userProfile?.role === 'admin' && (
                        <Link 
                          href="/admin" 
                          className="flex items-center px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium"
                          onClick={() => {
                            setIsMenuOpen(false);
                          }}
                        >
                          <Settings className="w-5 h-5 mr-3" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={async () => {
                          await signOut();
                          router.push('/');
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-3 text-red-300 hover:text-red-200 transition-colors capitalize rounded-lg hover:bg-red-500/20 font-medium"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link 
                        href="/login" 
                        className="block px-4 py-3 text-white hover:text-secondary transition-colors capitalize rounded-lg hover:bg-white/10 font-medium"
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        Login
                      </Link>
                      <Link 
                        href="/signup" 
                        className="block px-4 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg transition-all duration-300 capitalize font-medium text-center"
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 