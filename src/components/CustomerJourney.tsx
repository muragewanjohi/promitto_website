"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Home } from 'lucide-react';

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

const CustomerJourney = () => {
  const steps = [
    {
      step: 1,
      title: 'Account Opening',
      description: 'Start your journey by opening an account with us and completing your registration process.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'from-primary to-primary/90',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20'
    },
    {
      step: 2,
      title: 'Site Visit',
      description: 'Our professional team conducts a comprehensive site assessment and feasibility study.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'from-primary to-primary/90',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20'
    },
    {
      step: 3,
      title: 'Design Discussion',
      description: 'Collaborate with our architects to customize your dream home design and layout.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'from-primary to-primary/90',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20'
    },
    {
      step: 4,
      title: 'Bill of Quantity',
      description: 'Detailed cost estimation, material planning, and comprehensive project budgeting.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'from-primary to-primary/90',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20'
    },
    {
      step: 5,
      title: 'Project Mobilization',
      description: 'Site preparation, contractor mobilization, and construction timeline establishment.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'from-primary to-primary/90',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20'
    },
    {
      step: 6,
      title: 'Project Implementation',
      description: 'Professional construction work begins with quality assurance and progress monitoring.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'from-primary to-primary/90',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20'
    },
    {
      step: 7,
      title: 'Project Handover',
      description: 'Final inspection, quality checks, and handover of your completed dream home.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      color: 'from-primary to-primary/90',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary rounded-full"></div>
      </div>

      <div id="journey-to-homeownership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 className="site-title text-gray-900 mb-6 ">
            Your Journey to <span className="text-primary">Homeownership</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed ">
            From your first consultation to moving into your dream home, we guide you through every step 
            with our comprehensive 7-step process designed for success.
          </p>
        </div>

        {/* Grid Layout Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${step.borderColor} overflow-hidden`}
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    Step {step.step}: {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {step.description}
                  </p>
                  
                  {/* Special content for Account Opening step - Deposit Account only */}
                  {step.step === 1 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-900 text-sm">Deposit Account</h4>
                        </div>
                        <p className="text-gray-700 text-xs mb-3">
                          Our clients are allowed to save 30% of their Bills of Quantities in instalments via their members deposit account.
                        </p>
                        <div>
                          <h5 className="font-semibold text-gray-900 text-xs mb-2">Requirements for Opening an Account:</h5>
                          <ul className="text-gray-600 text-xs space-y-1">
                            <li>• Registration fees</li>
                            <li>• Property search fees</li>
                            <li>• Legal fees</li>
                            <li>• Property charge</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Document Downloads Section - Below all cards */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-300 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Document Downloads</h3>
          </div>
          <p className="text-gray-600 mb-6">Download these essential forms to get started:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="/documents/PROMITTO_BANK_ACCOUNT_DETAILS.pdf" 
              className="flex items-center justify-between bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-base font-medium text-gray-900">Bank Account Details</span>
              </div>
              <div className="flex items-center text-blue-600 group-hover:text-blue-800">
                <span className="text-sm font-semibold mr-2">DOWNLOAD</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                </svg>
              </div>
            </a>
            <a 
              href="/documents/membership_application_form.pdf" 
              className="flex items-center justify-between bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <span className="text-base font-medium text-gray-900">Application Form</span>
              </div>
              <div className="flex items-center text-blue-600 group-hover:text-blue-800">
                <span className="text-sm font-semibold mr-2">DOWNLOAD</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow-lg">
                Ready to Start Your Journey?
              </h3>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join thousands of satisfied homeowners who achieved their dreams with our proven process.
              </p>
              <Link href="/contact">
                <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Contact Us Today →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {(() => {
            const successRate = useCountUp(100, 2500);
            const homesDelivered = useCountUp(200, 2500);
            
            return (
              <>
                <div className="text-center" ref={successRate.ref}>
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{successRate.count}%</h4>
                  <p className="text-gray-600">Success Rate</p>
                </div>
                <div className="text-center" ref={homesDelivered.ref}>
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{homesDelivered.count}+</h4>
                  <p className="text-gray-600">Homes Delivered Per Year</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">4-6</h4>
                  <p className="text-gray-600">Months Average</p>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default CustomerJourney; 