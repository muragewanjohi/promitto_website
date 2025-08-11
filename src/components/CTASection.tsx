import React from 'react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Dream Home?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of satisfied homeowners who chose Promitto for their construction financing and project management needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Link href="/how-to-own" className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="text-3xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
                <p className="text-sm opacity-80">
                  Begin with a free consultation and site visit
                </p>
              </div>
            </Link>
            <Link href="/loan-calculator" className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Calculate Your Loan</h3>
                <p className="text-sm opacity-80">
                  Use our loan calculator to estimate costs
                </p>
              </div>
            </Link>
            <Link href="/contact" className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">Speak to Experts</h3>
                <p className="text-sm opacity-80">
                  Get personalized advice from our team
                </p>
              </div>
            </Link>
          </div>

          

         
        </div>
      </div>
    </section>
  );
};

export default CTASection;
