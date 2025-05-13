'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();

  return (
    <header className="fixed w-full bg-transparent z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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
            <Link href="/" className="text-white hover:text-[#F59E0B]">
              Home
            </Link>
            <Link href="/properties" className="text-white hover:text-[#F59E0B]">
              Properties
            </Link>
            <Link href="/how-to-own" className="text-white hover:text-[#F59E0B]">
              How to Own
            </Link>
            <Link href="/about" className="text-white hover:text-[#F59E0B]">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-[#F59E0B]">
              Contact
            </Link>
            {userProfile?.role === 'admin' && (
              <Link href="/admin" className="text-white hover:text-[#F59E0B] font-semibold">
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
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#F59E0B] text-white px-4 py-2 rounded-md hover:bg-[#D97706]"
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
              >
                Home
              </Link>
              <Link
                href="/properties"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/how-to-own"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
              >
                How to Own
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-[#F59E0B]"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {userProfile?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-white hover:text-[#F59E0B] font-semibold"
                  onClick={() => setIsMenuOpen(false)}
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
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#F59E0B] text-white px-4 py-2 rounded-md hover:bg-[#D97706]"
                    onClick={() => setIsMenuOpen(false)}
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