"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

const TrustSection = () => {
  const trustMetrics = [
    {
      number: 400,
      label: 'Homes Built',
      description: 'Successfully completed projects'
    },
    {
      number: 400,
      label: 'Happy Clients',
      description: 'Satisfied homeowners'
    },
    {
      number: 15,
      label: 'Years Experience',
      description: 'Industry expertise'
    },
    {
      number: 100,
      label: 'Approval Rate',
      description: 'Loan application success'
    }
  ];
  const metricA = useCountUp(trustMetrics[0].number, 2500);
  const metricB = useCountUp(trustMetrics[1].number, 2500);
  const metricC = useCountUp(trustMetrics[2].number, 2500);
  const metricD = useCountUp(trustMetrics[3].number, 2500);
  const trustCounts = [metricA, metricB, metricC, metricD];

  const awards = [
    {
      name: 'East Africa Star Brands 2025-2026',
      image: '/awards/EastAfricaStarBrands2025-2026.jpeg',
      description: 'Recognized for excellence in construction financing'
    },
    {
      name: 'Excellence in Real Estate Dynamics',
      image: '/awards/ExcellenceInRealEstateDynamics.jpeg',
      description: 'Outstanding performance in real estate sector'
    },
    {
      name: 'Real Estate Mortgage Company of the Year 2023',
      image: '/awards/RealEstateMorgageCompanyOfTheYear2023.jpeg',
      description: 'Industry leadership in mortgage solutions'
    },
    {
      name: 'The Real Estate Mortgage Company of the Year 2023',
      image: '/awards/TheRealEstateMorgageCompanyOfTheYear2023.jpeg',
      description: 'Premier mortgage company recognition'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics */}
        <div className="text-center mb-16">
          <h2 className="site-title text-gray-900 mb-4">
            Trusted by Thousands of Homeowners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join thousands of satisfied clients who have turned their homeownership dreams into reality with Promitto
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustMetrics.map((metric, index) => {
              const { count, ref } = trustCounts[index];
              const suffix = metric.label === 'Approval Rate' ? '%' : metric.label === 'Years Experience' ? '+' : '+';
              
              return (
                <div key={index} className="text-center" ref={ref}>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {count}{suffix}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {metric.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Awards & Recognition
            </h3>
            <p className="text-gray-600">
              Recognized for excellence and industry leadership
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden bg-white shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={award.image}
                    alt={award.name}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2 leading-tight">
                  {award.name}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Success Stories */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Start your journey to homeownership today with our proven process
            </p>
                         <div className="flex justify-center">
               <Link href="/signup">
                 <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer animate-pulse hover:animate-none relative overflow-hidden group">
                   <span className="relative z-10">Get Started Today</span>
                   <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                 </button>
               </Link>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
