import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import NewHero from '../components/NewHero';
import ProductPackages from '../components/ProductPackages';
import FeaturedProperties from '../components/FeaturedProperties';
import FeaturedDesigns from '../components/FeaturedDesigns';
import FeaturedMedia from '../components/FeaturedMedia';
import CTASection from '../components/CTASection';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F4F6]">
      <Header />
      <div>
        {/* Hero Section with Search */}
        <NewHero />
        
        {/* Featured Properties */}
        <FeaturedProperties />
        
        {/* Featured Designs */}
        <FeaturedDesigns />
        
        {/* Product Packages */}
        <ProductPackages />
        
        {/* Featured Media (News, Resources, Events, Blogs) */}
        <FeaturedMedia />
        
        {/* Final CTA */}
        <CTASection />
      </div>
      <Footer />
    </main>
  );
} 