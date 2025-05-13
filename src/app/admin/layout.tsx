import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white text-gray-900 min-h-screen border-r border-gray-200">
          <div className="p-4">
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 