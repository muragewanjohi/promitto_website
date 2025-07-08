import React from 'react';
import { 
  Handshake,
  Users,
  Calculator,
  FileCheck,
  Banknote,
  HardHat,
  ArrowRight
} from 'lucide-react';

const ConstructionProcess = () => {
  const processSteps = [
    {
      id: 1,
      icon: Handshake,
      title: 'Expression of Interest',
      description: 'Client expresses interest to construct and commits with a deposit of KES 20,000. Promitto kicks off by performing due diligence including basic title search and KYC verification.',
      color: 'bg-primary',
      bgColor: 'bg-primary',//'bg-blue-50',
      delay: '0ms',
      row: 1
    },
    {
      id: 2,
      icon: Users,
      title: 'Client Authorization Stage',
      description: 'Promitto shares project details with contractor for preparation of a Bill of Quantities.',
      color: 'bg-secondary',
      bgColor: 'bg-secondary',
      delay: '100ms',
      row: 1
    },
    {
      id: 3,
      icon: Calculator,
      title: 'Project Assignment',
      description: 'Promitto provides Bill of Quantities within a maximum of 14 working days.',
      color: 'bg-primary',
      bgColor: 'bg-primary',
      delay: '200ms',
      row: 1
    },
    {
      id: 4,
      icon: FileCheck,
      title: 'Clearance Stage',
      description: 'Promitto shares the Bill of Quantities with the Client. Client makes deposit of 30% to Promitto.',
      color: 'bg-secondary',
      bgColor: 'bg-secondary',
      delay: '300ms',
      row: 2
    },
    {
      id: 5,
      icon: Banknote,
      title: 'Confirmation Stage',
      description: 'Promitto shares the Bill of Quantities with the Client. Client makes deposit of 30% to Promitto.',
      color: 'bg-primary',
      bgColor: 'bg-primary',
      delay: '400ms',
      row: 2
    },
    {
      id: 6,
      icon: HardHat,
      title: 'Implementation, Monitoring and Evaluation Stage',
      description: 'Promitto flags off construction and oversees management of project. Construction ends in 6 - 12 months as client continues to make monthly repayments. Client starts making monthly repayments a month after construction begins.',
      color: 'bg-secondary',
      bgColor: 'bg-secondary',
      delay: '500ms',
      row: 2
    }
  ];

  // Group steps by row
  const groupedSteps = processSteps.reduce((acc, step) => {
    if (!acc[step.row]) {
      acc[step.row] = [];
    }
    acc[step.row].push(step);
    return acc;
  }, {} as Record<number, typeof processSteps>);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" id="process">
      {/* Background Construction Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-600 transform rotate-45"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Construction imagery header */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center shadow-lg">
                <HardHat className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Our Construction Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A transparent, step-by-step approach to bringing your dream home to life. 
            From initial interest to final completion, we guide you through every stage.
          </p>
        </div>

        {/* Render steps grouped by rows */}
        <div className="space-y-8">
          {Object.entries(groupedSteps).map(([row, steps]) => (
            <div key={row} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`group relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${step.bgColor}`}
                  style={{ animationDelay: step.delay }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative`}>
                    <step.icon className="w-8 h-8 text-white" />
                    {/* Construction tool accent */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-white leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector for larger screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-green-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Timeline for mobile */}
        <div className="lg:hidden mt-12 relative">
          {/* Construction site background for mobile */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-b from-orange-100 to-blue-100 rounded-2xl"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-green-600 rounded-full opacity-30"></div>
            {processSteps.map((step, index) => (
              <div key={`mobile-${step.id}`} className="relative flex items-start space-x-4 pb-8">
                <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 shadow-lg relative`}>
                  <step.icon className="w-8 h-8 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0 pt-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border border-gray-100 relative overflow-hidden">
            {/* Construction pattern background */}
            <div className="absolute inset-0 opacity-5">
                          <div className="absolute top-4 right-4 w-8 h-8 border-2 border-secondary rotate-45"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-primary rounded-full"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Construction Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of satisfied homeowners who trusted Promitto with their construction projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl">
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg bg-white">
                Download Process Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionProcess;