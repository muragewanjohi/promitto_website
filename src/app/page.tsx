import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ConstructionFinancing from '../components/ConstructionFinancing';
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
        <ConstructionFinancing />
        <FeaturedProperties />
        <WhyChooseUs />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
} 