import React from 'react';
import Link from 'next/link';

const CustomerJourney = () => {
  const steps = [
    {
      step: 1,
      title: 'Account Opening',
      description: 'Start your journey by opening an account with us',
      icon: '📝',
      color: 'bg-blue-500'
    },
    {
      step: 2,
      title: 'Site Visit',
      description: 'Our team visits your site for assessment',
      icon: '🏠',
      color: 'bg-green-500'
    },
    {
      step: 3,
      title: 'Design Discussion',
      description: 'Collaborate on your dream home design',
      icon: '✏️',
      color: 'bg-purple-500'
    },
    {
      step: 4,
      title: 'Bill of Quantity Discussion',
      description: 'Detailed cost estimation and planning',
      icon: '📊',
      color: 'bg-orange-500'
    },
    {
      step: 5,
      title: 'Project Mobilization',
      description: 'We begin construction preparations',
      icon: '🚀',
      color: 'bg-red-500'
    },
    {
      step: 6,
      title: 'Project Implementation',
      description: 'Construction work begins on your site',
      icon: '🏗️',
      color: 'bg-indigo-500'
    },
    {
      step: 7,
      title: 'Project Handover',
      description: 'Your dream home is ready for occupancy',
      icon: '🎉',
      color: 'bg-pink-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h4 className="text-4xl font-bold text-gray-900 mb-4">
            Your Journey to Homeownership
          </h4>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From your first consultation to moving into your dream home, we guide you through every step 
            with our comprehensive 7-step process.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-orange-500"></div>
          
          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:space-x-8 space-y-4`}
              >
                {/* Step content */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mr-4`}>
                        <span className="text-xl">{step.icon}</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                {/* <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full z-10 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-500">{step.step}</span>
                </div> */}

                {/* Mobile step number */}
                {/* <div className="lg:hidden w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">{step.step}</span>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-full px-8 py-4 inline-block">
            <Link href="/contact">
              <h4 className="text-lg font-semibold cursor-pointer hover:underline">
                Ready to start your journey? Contact us today!
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerJourney; 