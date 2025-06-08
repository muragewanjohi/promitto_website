'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed w-full bg-[#1E40AF] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center" prefetch={false}>
            <Image
              src="/logo.png"
              alt="Promitto Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-white">Promitto</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-[#F59E0B]" prefetch={false}>
              Home
            </Link>
            <Link href="/properties" className="text-white hover:text-[#F59E0B]" prefetch={false}>
              Product Designs
            </Link>
            <Link href="/how-to-own" className="text-white hover:text-[#F59E0B]" prefetch={false}>
              How to Own
            </Link>
            <Link href="/loan-calculator" className="text-white hover:text-[#F59E0B]" prefetch={false}>
              Loan Calculator
            </Link>
            <Link href="/about" className="text-white hover:text-[#F59E0B]" prefetch={false}>
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-[#F59E0B]" prefetch={false}>
              Contact
            </Link>
            {userProfile?.role === 'admin' && (
              <Link href="/admin" className="text-white hover:text-[#F59E0B] font-semibold" prefetch={false}>
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-[#F59E0B] text-white px-4 py-2 rounded-md hover:bg-[#D97706]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-[#F59E0B]"
                  prefetch={false}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#F59E0B] text-white px-4 py-2 rounded-md hover:bg-[#D97706]"
                  prefetch={false}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:bg-white/10 p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-2">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/properties"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                Product Designs
              </Link>
              <Link
                href="/how-to-own"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                How to Own
              </Link>
              <Link
                href="/loan-calculator"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                Loan Calculator
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
                prefetch={false}
              >
                Contact
              </Link>
              {userProfile?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-white hover:text-[#F59E0B] font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                  prefetch={false}
                >
                  Admin Dashboard
                </Link>
              )}
              {user ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-white">Welcome, {user.email}</span>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="bg-[#F59E0B] text-white px-4 py-2 rounded-md hover:bg-[#D97706]"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/login"
                    className="text-white hover:text-[#F59E0B]"
                    onClick={() => setIsMenuOpen(false)}
                    prefetch={false}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#F59E0B] text-white px-4 py-2 rounded-md hover:bg-[#D97706]"
                    onClick={() => setIsMenuOpen(false)}
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 