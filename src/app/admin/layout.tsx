'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white text-gray-900 min-h-screen border-r border-gray-200 flex flex-col">
          <div className="p-4 flex-grow">
            <nav>
              <ul className="space-y-1">
                {/* Dashboard Section */}
                <li className="mb-2">
                  <span className="block text-sm font-bold text-gray-900 mb-1">Dashboard</span>
                  <ul className="ml-2 space-y-1">
                    <li>
                      <Link href="/admin" className="block px-2 py-1 text-[#1E40AF] hover:text-[#D97706] rounded transition-colors">Overview</Link>
                    </li>
                    <li>
                      <Link href="/admin/analytics" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">Analytics</Link>
                    </li>
                  </ul>
                </li>
                <li><hr className="my-3 border-gray-200" /></li>
                {/* Property Management Section */}
                <li className="mb-2">
                  <span className="block text-sm font-bold text-gray-900 mb-1">Property Management</span>
                  <ul className="ml-2 space-y-1">
                    <li>
                      <Link href="/admin/properties" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">All Properties</Link>
                    </li>
                    <li>
                      <Link href="/admin/properties/new" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">Add Property</Link>
                    </li>
                    <li>
                      <Link href="/admin/property-types" className="block px-2 py-1 hover:text-[#F59E0B] rounded transition-colors font-semibold">Property Types</Link>
                    </li>
                    <li>
                      <Link href="/admin/property-statuses" className="block px-2 py-1 hover:text-[#F59E0B] rounded transition-colors font-semibold">Property Statuses</Link>
                    </li>
                    <li>
                      <Link href="/admin/roof-types" className="block px-2 py-1 hover:text-[#F59E0B] rounded transition-colors font-semibold">Roof Types</Link>
                    </li>
                    <li>
                      <Link href="/admin/documents" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">Documents</Link>
                    </li>
                    <li>
                      <Link href="/admin/features" className="block px-2 py-1 hover:text-[#F59E0B] rounded transition-colors font-semibold">Features Management</Link>
                    </li>
                  </ul>
                </li>
                <li><hr className="my-3 border-gray-200" /></li>
                {/* Content Management Section */}
                <li className="mb-2">
                  <span className="block text-sm font-bold text-gray-900 mb-1">Content Management</span>
                  <ul className="ml-2 space-y-1">
                    <li>
                      <Link href="/admin/blog-posts" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">Blog Posts</Link>
                    </li>
                    <li>
                      <Link href="/admin/property-descriptions" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">Property Descriptions</Link>
                    </li>
                    <li>
                      <Link href="/admin/news-updates" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">News & Updates</Link>
                    </li>
                    <li>
                      <Link href="/admin/faqs" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">FAQs</Link>
                    </li>
                    <li>
                      <Link href="/admin/testimonials" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">Testimonials</Link>
                    </li>
                    <li>
                      <Link href="/admin/email-templates" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">Email Templates</Link>
                    </li>
                  </ul>
                </li>
                <li><hr className="my-3 border-gray-200" /></li>
                {/* Settings Section */}
                <li className="mb-2">
                  <span className="block text-sm font-bold text-gray-900 mb-1">Settings</span>
                  <ul className="ml-2 space-y-1">
                    <li>
                      <Link href="/admin/user-management" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">User Management</Link>
                    </li>
                    <li>
                      <Link href="/admin/system-settings" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">System Settings</Link>
                    </li>
                    <li>
                      <Link href="/admin/backup-recovery" className="block px-2 py-1 hover:text-[#1E40AF] rounded transition-colors">Backup & Recovery</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 