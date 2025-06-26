import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import KeyStatistics from '../components/KeyStatistics';
import Services from '../components/Services';
import FundingHighlights from '../components/FundingHighlights';
import ConstructionFinancing from '../components/ConstructionFinancing';
import CustomerJourney from '../components/CustomerJourney';
import ProductPackages from '../components/ProductPackages';
import CompetitiveAdvantages from '../components/CompetitiveAdvantages';
import FeaturedProperties from '../components/FeaturedProperties';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F4F6]">
      <Header />
      <div className="pt-16">
        <Hero />
        <Services />

        <CompetitiveAdvantages />
        <KeyStatistics />
        {/* <WhyChooseUs /> */}
        <FundingHighlights />
        {/* <ConstructionFinancing /> */}
        <CustomerJourney />

        <FeaturedProperties />
        <ProductPackages />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
} 