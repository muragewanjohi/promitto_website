import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import ClientWrapper from '@/components/ClientWrapper';
import WhatsAppChat from '@/components/WhatsAppChat';
import FloatingCalculator from '@/components/FloatingCalculator';
import FloatingGetStarted from '@/components/FloatingGetStarted';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Promitto - Your Dream Home Awaits',
  description: 'Find your perfect home with Promitto. Browse properties, calculate loans, and make your dream home a reality.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <ClientWrapper>
            <ScrollToTop />
            <WhatsAppChat />
            <FloatingCalculator />
            <FloatingGetStarted />
          </ClientWrapper>
        </AuthProvider>
      </body>
    </html>
  );
} 