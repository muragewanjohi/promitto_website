"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return { count, ref };
};

const KeyStatistics = () => {
  const stats = [
    {
      number: 200000,
      label: 'Housing Units Needed Annually',
      icon: '🏠',
      description: 'Annual demand gap in Kenya',
      suffix: ''
    },
    {
      number: 200,
      label: 'Homes Constructed Annually',
      icon: '🏗️',
      description: 'By Promitto in Kenya',
      suffix: '+'
    },
    {
      number: 2000000,
      label: 'Housing Deficit Units',
      icon: '📊',
      description: 'Total housing gap in Kenya',
      suffix: '+'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="site-title text-primary mb-4">
            The Housing Crisis in Numbers
          </h2>
          <p className="text-xl text-primary/80 max-w-3xl mx-auto">
            While Kenya has made strides in addressing its housing deficit through initiatives like the Affordable Housing Programme, 
            significant challenges remain. This presents a tremendous opportunity for Promitto to expand its reach and help address this crisis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const { count, ref } = useCountUp(stat.number, 2500);
            
            // Format the number with commas for better readability
            const formattedCount = count.toLocaleString();
            
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300"
                ref={ref}
              >
                <div className="text-6xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {formattedCount}{stat.suffix}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {stat.label}
                </h3>
                <p className="text-primary/70">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/signup">
            <div className="bg-primary text-white rounded-full px-8 py-4 inline-block hover:bg-primary/90 transition-colors duration-300 cursor-pointer transform hover:scale-105">
              <p className="text-lg font-semibold">
                Join us in bridging the housing gap and making homeownership a reality
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KeyStatistics; 