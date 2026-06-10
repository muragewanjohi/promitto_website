import type { Metadata } from 'next';
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import ClientWrapper from '@/components/ClientWrapper';
import WhatsAppChat from '@/components/WhatsAppChat';
import FloatingCalculator from '@/components/FloatingCalculator';
import FloatingGetStarted from '@/components/FloatingGetStarted';
import GoogleAnalytics from '@/components/GoogleAnalytics';

// Avoid Next.js lucide-react barrel optimization breaking icons during static prerender.
export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Promitto - Your Dream Home Awaits',
  description: 'Find your perfect home with Promitto. Browse properties, calculate loans, and make your dream home a reality.',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  manifest: '/favicon/site.webmanifest'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <GoogleAnalytics />
        <AuthProvider>
          {children}
          <ClientWrapper>
            <WhatsAppChat />
            <ScrollToTop />
            <FloatingCalculator />
            <FloatingGetStarted />
          </ClientWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
