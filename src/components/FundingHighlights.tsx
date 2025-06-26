import React from 'react';
import Link from 'next/link';

const FundingHighlights = () => {
  const highlights = [
    {
      icon: '💰',
      title: 'Up to 70% Funding',
      description: 'We fund up to 70% of the total construction costs',
      color: 'bg-green-500'
    },
    {
      icon: '📈',
      title: '12% Interest Rate',
      description: 'Competitive 12% per annum on reducing balance',
      color: 'bg-blue-500'
    },
    {
      icon: '⏰',
      title: '1-7 Years Repayment',
      description: 'Flexible repayment period to suit your needs',
      color: 'bg-orange-500'
    },
    {
      icon: '🎯',
      title: '30 Days Grace Period',
      description: 'Repayment starts 30 days after site mobilization',
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h4 className="text-4xl font-bold text-gray-900 mb-4">
            Construction Funding Made Simple
          </h4>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our affordable and sustainable Jenga Nyumba Loan Product is designed to make your dream home a reality 
            with minimal upfront investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-16 h-16 ${highlight.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{highlight.icon}</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {highlight.title}
              </h4>
              <p className="text-gray-600 text-center">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-white text-center">
          <h4 className="text-3xl font-bold mb-4">
            Only 30% Deposit Required
          </h4>
          <p className="text-xl mb-6">
            Start your construction project with just 30% of the total project cost. 
            We handle the rest, including all construction approvals and project management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/loan-calculator">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Calculate Your Loan
              </button>
            </Link>
            <Link href="/how-to-own">
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingHighlights; 