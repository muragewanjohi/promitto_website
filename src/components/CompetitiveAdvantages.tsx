import React from 'react';
import Link from 'next/link';

const CompetitiveAdvantages = () => {
  const advantages = [
    {
      title: 'Affordable Construction Financing',
      description: 'We provide construction loans covering 70% of project costs, enabling clients to build homes with minimal upfront investment, addressing financial barriers in homeownership.',
      icon: '💳',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Comprehensive Construction Services',
      description: 'We offer comprehensive construction services beyond financing, ensuring quality and consistency throughout the building process.',
      icon: '🏗️',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Client-Centric Approach',
      description: 'We enhance customer satisfaction by tailoring projects to individual preferences by allowing clients to select their preferred features.',
      icon: '👥',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Strategic Partnerships',
      description: 'Our partnerships with suppliers and contractors enable us to provide competitive pricing and maintain high standards in materials and workmanship.',
      icon: '🤝',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h4 className="text-4xl font-bold mb-4">
            Why Choose Promitto?
          </h4>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our unique combination of services and approach sets us apart in the construction financing industry, 
            making us your trusted partner in homeownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 ${advantage.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{advantage.icon}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3">
                    {advantage.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8">
            <h4 className="text-3xl font-bold mb-4 text-white">
              Ready to Experience the Difference?
            </h4>
            <p className="text-xl mb-6 text-white/90">
              Join thousands of satisfied homeowners who have turned their dreams into reality with Promitto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/customer-journey">
                <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Start Your Project
                </button>
              </Link>
              <Link href="/how-to-own">
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors">
                  View Our Portfolio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveAdvantages; 