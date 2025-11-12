'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import { 
  LayoutDashboard, 
  Home, 
  Building2, 
  PlusCircle, 
  Tag, 
  FileText, 
  Layers, 
  Star, 
  Settings, 
  Users, 
  LogOut,
  ChevronRight,
  Newspaper
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/');
    }
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(path);
  };

  const NavLink = ({ href, icon: Icon, children, badge }: { href: string; icon: React.ElementType; children: React.ReactNode; badge?: string }) => {
    const active = isActive(href);
    return (
      <Link 
        href={href} 
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
          active 
            ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-md' 
            : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
        }`}
      >
        <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500 group-hover:text-primary'}`} />
        <span className="flex-1 font-medium text-sm">{children}</span>
        {badge && (
          <span className={`px-2 py-0.5 text-xs rounded-full ${
            active ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
          }`}>
            {badge}
          </span>
        )}
        {active && <ChevronRight className="w-4 h-4 text-white" />}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white text-gray-900 min-h-screen border-r border-gray-200 flex flex-col shadow-sm">
          <div className="p-4 flex-grow overflow-y-auto">
            <nav className="space-y-6">
              {/* Dashboard Section */}
              <div>
                <div className="flex items-center gap-2 mb-3 px-3">
                  <LayoutDashboard className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dashboard</span>
                </div>
                <ul className="space-y-1">
                  <li>
                    <NavLink href="/admin" icon={Home}>
                      Overview
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Property Management Section */}
              <div>
                <div className="flex items-center gap-2 mb-3 px-3">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Property Management</span>
                </div>
                <ul className="space-y-1">
                  <li>
                    <NavLink href="/admin/properties" icon={Building2}>
                      All Properties
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/admin/properties/new" icon={PlusCircle}>
                      Add Property
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/admin/property-types" icon={Tag}>
                      Property Types
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/admin/property-statuses" icon={FileText}>
                      Property Statuses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/admin/roof-types" icon={Layers}>
                      Roof Types
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/admin/features" icon={Star}>
                      Features Management
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Media Management Section */}
              <div>
                <div className="flex items-center gap-2 mb-3 px-3">
                  <Newspaper className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Media Management</span>
                </div>
                <ul className="space-y-1">
                  <li>
                    <NavLink href="/admin/media" icon={Newspaper}>
                      All Media
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/admin/media/new" icon={PlusCircle}>
                      Add Media Item
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/admin/faqs" icon={FileText}>
                      FAQs
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Settings Section */}
              <div>
                <div className="flex items-center gap-2 mb-3 px-3">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Settings</span>
                </div>
                <ul className="space-y-1">
                  <li>
                    <NavLink href="/admin/membership-management" icon={Users}>
                      Membership Management
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          
          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              <LogOut className="w-5 h-5" />
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