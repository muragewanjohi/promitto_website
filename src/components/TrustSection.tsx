import React from 'react';
import Link from 'next/link';

const TrustSection = () => {
  const trustMetrics = [
    {
      number: '100+',
      label: 'Homes Built',
      description: 'Successfully completed projects'
    },
    {
      number: '100+',
      label: 'Happy Clients',
      description: 'Satisfied homeowners'
    },
    {
      number: '15+',
      label: 'Years Experience',
      description: 'Industry expertise'
    },
    {
      number: '95%',
      label: 'Approval Rate',
      description: 'Loan application success'
    }
  ];

  const certifications = [
    {
      name: 'NCA Registered',
      description: 'National Construction Authority',
      icon: '🏗️'
    },
    {
      name: 'ISO Certified',
      description: 'Quality Management System',
      icon: '✅'
    },
    {
      name: 'Licensed Builder',
      description: 'Government Approved',
      icon: '📋'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Homeowners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join thousands of satisfied clients who have turned their homeownership dreams into reality with Promitto
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {metric.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Awards */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Certifications & Licenses
            </h3>
            <p className="text-gray-600">
              We maintain the highest standards of quality and compliance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {cert.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {cert.description}
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
