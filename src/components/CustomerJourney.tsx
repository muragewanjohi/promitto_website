import React from 'react';
import Link from 'next/link';
import { CheckCircle, FileText, Home, Palette, Calculator, Rocket, Hammer, Key } from 'lucide-react';

const CustomerJourney = () => {
  const steps = [
    {
      step: 1,
      title: 'Account Opening',
      description: 'Start your journey by opening an account with us and completing your registration process.',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      step: 2,
      title: 'Site Visit',
      description: 'Our professional team conducts a comprehensive site assessment and feasibility study.',
      icon: Home,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      step: 3,
      title: 'Design Discussion',
      description: 'Collaborate with our architects to customize your dream home design and layout.',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      step: 4,
      title: 'Bill of Quantity',
      description: 'Detailed cost estimation, material planning, and comprehensive project budgeting.',
      icon: Calculator,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      step: 5,
      title: 'Project Mobilization',
      description: 'Site preparation, contractor mobilization, and construction timeline establishment.',
      icon: Rocket,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      step: 6,
      title: 'Project Implementation',
      description: 'Professional construction work begins with quality assurance and progress monitoring.',
      icon: Hammer,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      step: 7,
      title: 'Project Handover',
      description: 'Final inspection, quality checks, and handover of your completed dream home.',
      icon: Key,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 ">
            Your Journey to <span className="text-primary">Homeownership</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed ">
            From your first consultation to moving into your dream home, we guide you through every step 
            with our comprehensive 7-step process designed for success.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Main timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-primary via-secondary to-primary rounded-full shadow-lg"></div>
          
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:space-x-12 space-y-8`}
                >
                  {/* Step Content Card */}
                  <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                    <div className={`${step.bgColor} ${step.borderColor} border-2 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden`}>
                      {/* Step number badge */}
                      <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-lg">{step.step}</span>
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="mt-6 flex items-center justify-center lg:justify-start">
                        <div className="flex space-x-1">
                          {steps.map((_, stepIndex) => (
                            <div
                              key={stepIndex}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                stepIndex <= index 
                                  ? `bg-gradient-to-r ${step.color}` 
                                  : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-primary rounded-full z-20 flex items-center justify-center shadow-xl">
                    <div className={`w-4 h-4 bg-gradient-to-r ${step.color} rounded-full`}></div>
                  </div>

                  {/* Mobile Step Number */}
                  <div className="lg:hidden w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                </div>
              );
            })}
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
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">95%</h4>
            <p className="text-gray-600">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">500+</h4>
            <p className="text-gray-600">Homes Delivered</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">6-12</h4>
            <p className="text-gray-600">Months Average</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerJourney; 