import React from 'react';

const ProductPackages = () => {
  const packages = [
    {
      title: 'Residential/Commercial Package',
      description: 'We fund the construction of both residential and commercial/rental projects',
      features: [
        'Up to 70% funding of total project cost',
        '1-7 years repayment period',
        '12% interest rate per annum',
        'Comprehensive construction services',
        'Project management included'
      ],
      icon: '🏢',
      color: 'from-primary to-secondary',
      popular: false
    },
    {
      title: 'Renovations/Finishings',
      description: 'Transform your existing property with our renovation and finishing services',
      features: [
        'Up to 70% funding available',
        'Up to 5 years repayment period',
        '12% interest rate per annum',
        'Interior and exterior renovations',
        'Quality finishing materials'
      ],
      icon: '🔨',
      color: 'from-primary to-secondary',
      popular: true
    },
    {
      title: 'Perimeter Walls',
      description: 'Secure your property with our perimeter wall construction financing',
      features: [
        'Financial help for perimeter walls',
        'Up to 2 years repayment period',
        '12% interest rate per annum',
        'Professional construction team',
        'Quality materials and workmanship'
      ],
      icon: '🧱',
      color: 'from-primary to-secondary',
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h4 className="text-4xl font-bold text-gray-900 mb-4">
            Our Construction Solutions
          </h4>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our range of construction financing packages designed to meet your specific needs 
            and turn your construction dreams into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                pkg.popular ? 'ring-4 ring-orange-500' : ''
              }`}
            >
              {/* {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )} */}

              <div className={`bg-gradient-to-r ${pkg.color} text-white p-8 rounded-t-2xl`}>
                <div className="text-4xl mb-4">{pkg.icon}</div>
                <h4 className="text-xl font-bold mb-2">{pkg.title}</h4>
                <p className="text-blue-100">{pkg.description}</p>
              </div>

              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full bg-gradient-to-r ${pkg.color} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              Not sure which package is right for you?
            </h4>
            <p className="text-gray-600 mb-6">
              Our team of experts is here to help you choose the perfect solution for your construction needs.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
              Speak to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPackages; 