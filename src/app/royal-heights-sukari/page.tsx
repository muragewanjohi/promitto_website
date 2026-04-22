import Footer from '@/components/Footer';
import RoyalHeightsHero from '@/components/royal-heights/RoyalHeightsHero';
import RoyalHeightsAboutSection from '@/components/royal-heights/RoyalHeightsAboutSection';
import RoyalHeightsUnitsSection from '@/components/royal-heights/RoyalHeightsUnitsSection';
import RoyalHeightsAmenitiesSection from '@/components/royal-heights/RoyalHeightsAmenitiesSection';
import RoyalHeightsLifeSection from '@/components/royal-heights/RoyalHeightsLifeSection';
import RoyalHeightsLocationInquirySection from '@/components/royal-heights/RoyalHeightsLocationInquirySection';

export default function RoyalHeightsSukariPage() {
  return (
    <main className="min-h-screen bg-white">
      <RoyalHeightsHero />
      <RoyalHeightsAboutSection />
      <RoyalHeightsUnitsSection />
      <RoyalHeightsAmenitiesSection />
      <RoyalHeightsLifeSection />
      <RoyalHeightsLocationInquirySection />

      <Footer />
    </main>
  );
}
