import React from 'react';
import Link from 'next/link';

const ConstructionFinancing = () => {
  const benefits = [
    {
      title: 'Flexible Payment Terms',
      description: 'Customized payment schedules that align with your construction milestones'
    },
    {
      title: 'Competitive Rates',
      description: 'Access to industry-leading interest rates and financing options'
    },
    {
      title: 'Quick Approval',
      description: 'Streamlined application process with fast turnaround times'
    },
    {
      title: 'Expert Guidance',
      description: 'Professional support throughout the financing process'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Construction Financing Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide tailored financing solutions to help bring your construction projects to life. 
            Our expert team works with you to find the best financing options for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#1E40AF] text-white rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-lg text-gray-100 mb-6">
                Get in touch with our financing team today to discuss your construction project 
                and explore our flexible financing options.
              </p>
              <Link
                href="/customer-journey"
                className="inline-block bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Apply for Financing
              </Link>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-lg font-semibold">Construction Loans</p>
                <p className="text-gray-200">Flexible financing options for new construction projects</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-lg font-semibold">Renovation Financing</p>
                <p className="text-gray-200">Specialized loans for property improvements and renovations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionFinancing; 