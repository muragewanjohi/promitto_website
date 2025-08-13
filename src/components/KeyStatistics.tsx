import React from 'react';
import Link from 'next/link';

const KeyStatistics = () => {
  const stats = [
    {
      number: '200,000',
      label: 'Housing Units Needed Annually',
      icon: '🏠',
      description: 'Annual demand gap in Kenya'
    },
    {
      number: '50',
      label: 'Homes Constructed Annually',
      icon: '🏗️',
      description: 'By Promitto in Kenya'
    },
    {
      number: '2M+',
      label: 'Housing Deficit Units',
      icon: '📊',
      description: 'Total housing gap in Kenya'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Housing Crisis in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            While Kenya has made strides in addressing its housing deficit through initiatives like the Affordable Housing Programme, 
            significant challenges remain. This presents a tremendous opportunity for Promitto to expand its reach and help address this crisis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/signup">
            <div className="bg-blue-600 text-white rounded-full px-8 py-4 inline-block hover:bg-blue-700 transition-colors duration-300 cursor-pointer transform hover:scale-105">
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