'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Route, Plane, Building2, GraduationCap, ShoppingBag, Hospital } from 'lucide-react';

const aboutSlides = [
  {
    id: 1,
    src: '/4brm/4br_standard_flat_roof_2.png',
    alt: 'Royal Heights Sukari exterior view',
  },
  {
    id: 2,
    src: '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._3 - Photo.webp',
    alt: 'Royal Heights Sukari apartment perspective',
  },
];

const AUTO_SLIDE_MS = 5000;

const proximityLocations = [
  { label: 'Near Northlands City Corridor', icon: MapPin },
  { label: 'Quick access to Thika Road, Eastern Bypass, and JKIA', icon: Route },
  { label: 'Close to Safari Park Hotel and key hospitality hubs', icon: Building2 },
  { label: 'Nearby universities: KU, AMREF, JKUAT, USIU, PAC, and other institutions', icon: GraduationCap },
  { label: 'Retail centers: Naivas, Quickmart, China Square, TRM, Garden City, Spur Mall, Juja Mall', icon: ShoppingBag },
  { label: 'Health facilities: Sukari Level 3, Ruiru Hospital, Aga Khan Hospital (TRM)', icon: Hospital },
  { label: 'Convenient airport connectivity via JKIA corridor', icon: Plane },
];

export default function RoyalHeightsAboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % aboutSlides.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="site-title text-gray-900 tracking-wide whitespace-nowrap">
              ROYAL HEIGHTS SUKARI
            </h2>
            <p className="mt-6 text-gray-700 leading-8 max-w-xl">
              Welcome to Royal Heights Sukari gated community, a haven of tranquility nestled
              amidst nature&apos;s embrace. A gated community where modern living harmonizes with
              the serene beauty of the natural world.
            </p>
            <p className="mt-6 text-gray-600 leading-8 max-w-xl">
              Royal Heights Sukari offers a unique blend of luxurious living spaces and
              landscaped surroundings. Every detail, from architecture to neighborhood planning,
              is intentionally crafted to create an inspiring residential experience.
            </p>

            <div className="mt-6 max-w-xl">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary">Proximity to Key Locations</h3>
              <ul className="mt-3 space-y-2 text-gray-600">
                {proximityLocations.map((location) => {
                  const Icon = location.icon;
                  return (
                  <li key={location.label} className="flex items-start">
                    <Icon className="mr-2 mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>{location.label}</span>
                  </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div>
            <div className="relative h-[390px] sm:h-[460px] overflow-hidden">
              {aboutSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {aboutSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-400 hover:bg-gray-500'
                  }`}
                  aria-label={`Show about image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-8">
          <div className="text-center sm:text-left">
            <div className="text-5xl font-light text-gray-800">60</div>
            <div className="text-gray-500 mt-2 uppercase tracking-wide text-sm">Units</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-5xl font-light text-gray-800">10</div>
            <div className="text-gray-500 mt-2 uppercase tracking-wide text-sm">Floors</div>
          </div>
        </div>
      </div>
    </section>
  );
}
