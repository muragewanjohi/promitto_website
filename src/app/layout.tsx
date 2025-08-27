import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import ClientWrapper from '@/components/ClientWrapper';
import WhatsAppChat from '@/components/WhatsAppChat';
import FloatingCalculator from '@/components/FloatingCalculator';
import FloatingGetStarted from '@/components/FloatingGetStarted';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
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
      <body className={montserrat.className}>
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