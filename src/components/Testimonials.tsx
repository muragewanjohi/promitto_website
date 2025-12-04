"use client";

import React, { useState, useEffect, useRef } from 'react';

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

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Irene Krauser',
      role: 'Rental Units Client',
      location: 'Nairobi, Kenya',
      quote: 'I\'m very happy because this is not what I expected; I never thought I could get help like this with my construction. I was stranded, with lots of thoughts on how to do my rentals, but when I discovered Promitto, it was like they were God sent to help me.',
      rating: 5,
      project: '4-Bedroom Rental Units'
    },
    {
      id: 2,
      name: 'Lydia Ngugi',
      role: 'Residential House Client',
      location: 'Kiambu, Kenya',
      quote: 'I got exactly what I had asked Promitto to build for me: a beautiful 4-bedroom mansion within the agreed time. They also did some extra landscaping finishes from their pocket. They are the best partners to engage in hassle-free construction.',
      rating: 5,
      project: '4-Bedroom Mansion'
    },
    {
      id: 3,
      name: 'George Muroki',
      role: 'Residential House Client',
      location: 'Nakuru, Kenya',
      quote: 'As you handover my house, we are going to broadcast that so that those who are in doubts, wherever they are, will not be in doubts anymore, and I believe I have convincing evidence that you are doing a good job and you will do a good job to many people who have cried over and over.',
      rating: 5,
      project: '3-Bedroom House'
    },
  ];

  const communityMetrics = [
    { number: 400, label: 'Homes Built', suffix: '+' },
    { number: 400, label: 'Happy Clients', suffix: '+' },
    { number: 100, label: 'Approval Rate', suffix: '%' }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
         {/* Additional Social Proof */}
         <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Join Our Growing Community of Happy Homeowners
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Over 3,000 families have trusted us with their dream homes. Will you be next?
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {communityMetrics.map((metric, index) => {
              const { count, ref } = useCountUp(metric.number, 2500);
              
              return (
                <div key={index} className="text-center" ref={ref}>
                  <div className="text-3xl font-bold mb-2">
                    {count}{metric.suffix}
                  </div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              );
            })}
          </div>
          {/* <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Read More Reviews
          </button> */}
        </div>

        <div className="text-center mb-16 pt-8">
          <h2 className="site-title text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from our satisfied customers about their experience with Promitto
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-3">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm text-gray-600">Excellent</span>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-secondary font-medium">{testimonial.role}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default Testimonials; 