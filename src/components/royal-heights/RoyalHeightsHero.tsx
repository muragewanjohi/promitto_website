'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type HeroSlide = {
  id: number;
  image: string;
  heading: string;
  description: string;
};

const AUTO_SLIDE_MS = 6000;

const slides: HeroSlide[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80',
    heading: 'Royal Heights Sukari Apartments',
    description:
      'Lush, exclusive and secure. Convenient location and strategic home investments in Studio, 1, 2, and 3 bedroom units.',
  },
  {
    id: 2,
    image: '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._3 - Photo.webp',
    heading: 'Modern Living in a Gated Community',
    description:
      'Tastefully finished homes designed for comfort, privacy, and long-term value in a serene neighborhood setting.',
  },
];

export default function RoyalHeightsHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[680px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={index !== activeIndex}
        >
          <Image src={slide.image} alt={slide.heading} fill priority={index === 0} className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo4.png" alt="Promitto" width={120} height={64} className="h-14 w-auto" priority />
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-white text-sm font-medium">
              <a href="#home" className="hover:text-secondary transition-colors">Home</a>
              <a href="#about" className="hover:text-secondary transition-colors">About Us</a>
              <a href="#apartments" className="hover:text-secondary transition-colors">The Apartments</a>
              <a href="#availability" className="hover:text-secondary transition-colors">Availability</a>
              <a href="#contact" className="hover:text-secondary transition-colors">Contact Us</a>
            </nav>

            <a
              href="/contact"
              className="inline-flex items-center rounded-full bg-white text-primary px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule a Visit
            </a>
          </div>
        </div>
      </header>

      <div id="home" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-20">
        <h1 className="mt-8 text-4xl sm:text-6xl font-bold text-white max-w-4xl leading-tight">
          {activeSlide.heading}
        </h1>
        <p className="mt-5 text-white/95 text-lg sm:text-2xl max-w-4xl">
          {activeSlide.description}
        </p>

        <div className="mt-8 flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
