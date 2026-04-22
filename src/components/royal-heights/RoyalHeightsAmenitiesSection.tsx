 'use client';

import { useState } from 'react';
import Image from 'next/image';

const amenities = [
  'High-speed WiFi internet connection',
  'Fitted modular kitchen',
  'Fully integrated wardrobes in the bedrooms',
  'Anti-skid porcelain floors tiled in living rooms and balconies',
  'Swimming pool',
  'Expansive balconies on all units',
  'Large glider windows to let in maximum light',
  'Access to sports & recreational facilities',
];

const amenitySlides = [
  {
    image: '/4brm/4br_standard_flat_roof_2.png',
    title: 'Blended Nature',
    description: 'Green spaces and attractive landscaping on individual courts.',
  },
  {
    image: '/hero-house.jpg',
    title: 'Dedicated Entries',
    description: 'Gated courts with dedicated entry and exits to the main gate.',
  },
];

export default function RoyalHeightsAmenitiesSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? amenitySlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === amenitySlides.length - 1 ? 0 : prev + 1));
  };

  const current = amenitySlides[activeSlide];
  const firstColumnAmenities = amenities.slice(0, 4);
  const secondColumnAmenities = amenities.slice(4);

  return (
    <section id="apartments" className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-start">
          <div className="relative h-[500px] lg:h-[560px] overflow-hidden">
            <Image
              src={current.image}
              alt="Royal Heights Amenities"
              fill
              className="object-cover transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 bg-primary/90 text-white px-8 py-7 max-w-[360px]">
              <p className="uppercase tracking-[0.2em] text-[11px] text-secondary">{current.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/90">{current.description}</p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-secondary font-semibold">Explore</p>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#cbc3a2] text-white flex items-center">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous amenity slide"
                className="px-4 py-3 hover:bg-black/10 transition-colors"
              >
                &#8249;
              </button>
              <span className="text-sm px-3">
                {activeSlide + 1}/{amenitySlides.length}
              </span>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next amenity slide"
                className="px-4 py-3 hover:bg-black/10 transition-colors"
              >
                &#8250;
              </button>
            </div>
          </div>

          <div className="pt-3">
            <h2 className="text-[34px] lg:text-[38px] font-medium tracking-wide text-gray-900">AMENITIES</h2>
            <p className="mt-4 text-[15px] text-gray-600 leading-7 max-w-[520px]">
              The residences at Royal Heights Sukari showcase a modernized design direction with
              practical layouts that bring to life comfort-driven lifestyle experiences.
            </p>

            <div className="mt-7 grid sm:grid-cols-2 gap-x-10 gap-y-3">
              <ul className="space-y-3 text-gray-700">
                {firstColumnAmenities.map((amenity) => (
                  <li key={amenity} className="flex items-start text-sm leading-6">
                    <span className="mr-2 text-secondary">&bull;</span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-gray-700">
                {secondColumnAmenities.map((amenity) => (
                  <li key={amenity} className="flex items-start text-sm leading-6">
                    <span className="mr-2 text-secondary">&bull;</span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
