'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LoanCalculator = () => {
  const [propertyCost, setPropertyCost] = useState<string>('3,000,000');
  const [downPayment, setDownPayment] = useState<string>('900,000');
  const [loanTerm] = useState<string>('84'); // Fixed at 7 years
  const [interestRate] = useState<string>('12');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [salary, setSalary] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const formatNumber = (value: string): string => {
    // Remove any existing commas and non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    // Add commas for thousands
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (value: string): number => {
    // Remove commas and convert to number
    return Number(value.replace(/,/g, ''));
  };

  // Update down payment whenever property cost changes
  useEffect(() => {
    const cost = parseNumber(propertyCost);
    const downPaymentAmount = Math.round(cost * 0.3); // 30% of property cost
    setDownPayment(formatNumber(downPaymentAmount.toString()));
  }, [propertyCost]);

  const calculateLoan = () => {
    const principal = parseNumber(propertyCost) - parseNumber(downPayment);
    const annualRate = Number(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = Number(loanTerm);
    
    // Calculate monthly payment using the loan amortization formula
    // PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    // Where:
    // PMT = Monthly Payment
    // P = Principal loan amount
    // r = Monthly interest rate (annual rate divided by 12)
    // n = Total number of months
    
    const monthlyPaymentAmount = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPaymentAmount = monthlyPaymentAmount * numberOfPayments;
    const totalInterestAmount = totalPaymentAmount - principal;
    
    setMonthlyPayment(Math.round(monthlyPaymentAmount));
    setTotalPayment(Math.round(totalPaymentAmount));
    setTotalInterest(Math.round(totalInterestAmount));
    setIsCalculated(true);

    // Calculate recommendation if salary is provided
    if (salary) {
      const monthlySalary = parseNumber(salary);
      const paymentRatio = monthlyPaymentAmount / monthlySalary;
      
      if (paymentRatio <= 0.3) {
        setRecommendation("Based on your salary, this loan appears affordable. The monthly payment is within the recommended 30% of your income.");
      } else if (paymentRatio <= 0.4) {
        setRecommendation("The monthly payment is slightly high for your income. Consider increasing your down payment.");
      } else {
        setRecommendation("This property cost may be too high for your current income. Consider exploring more affordable options.");
      }
    } else {
      setRecommendation('');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setIsCalculated(false);
    switch (field) {
      case 'propertyCost':
        setPropertyCost(formatNumber(value));
        break;
      case 'salary':
        setSalary(formatNumber(value));
        break;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#F59E0B] mb-4">Loan Calculator</h1>
          <h2 className="text-2xl text-gray-700">Jenga Nyumba Loan Calculator</h2>
          <p className="mt-2 text-lg text-[#1E40AF] font-semibold">Interest Rate: 12% per annum (fixed, reducing balance)</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-[#F5E6CC] p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Cost (KES)</label>
                <input
                  type="text"
                  value={propertyCost}
                  onChange={(e) => handleInputChange('propertyCost', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  placeholder="Enter property cost"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Down Payment (30% of Property Cost)</label>
                <input
                  type="text"
                  value={downPayment}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Loan Term</label>
                <input
                  type="text"
                  value="7 years (84 months)"
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Annual Interest Rate (%)</label>
                <input
                  type="number"
                  value={interestRate}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Monthly Salary (Optional)</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  placeholder="Enter your monthly salary"
                />
              </div>

              <button
                onClick={calculateLoan}
                className="w-full bg-[#1E40AF] text-white py-3 rounded-lg font-medium hover:bg-[#1E3A8A] transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Calculate Loan</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-[#1E40AF] mb-6">Loan Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Property Cost</p>
                  <p className="text-2xl font-bold">KES {propertyCost}</p>
                </div>
                <div>
                  <p className="text-gray-600">Down Payment (30%)</p>
                  <p className="text-2xl font-bold">KES {downPayment}</p>
                </div>
                <div>
                  <p className="text-gray-600">Interest Rate</p>
                  <p className="text-xl font-bold text-[#1E40AF]">12% per annum (reducing balance)</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-gray-600">Estimated Monthly Payment</p>
                  <p className="text-3xl font-bold text-[#1E40AF] mt-2">
                    KES {isCalculated ? formatNumber(monthlyPayment.toString()) : '---'}
                  </p>
                </div>
                {isCalculated && (
                  <>
                    <div className="pt-4 border-t">
                      <p className="text-gray-600">Total Interest</p>
                      <p className="text-xl font-bold text-gray-800 mt-1">
                        KES {formatNumber(totalInterest.toString())}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Payment</p>
                      <p className="text-xl font-bold text-gray-800 mt-1">
                        KES {formatNumber(totalPayment.toString())}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {isCalculated && recommendation && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-[#1E40AF] mb-2">Recommendation</h4>
                <p className="text-gray-700">{recommendation}</p>
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-[#1E40AF] mb-4">Important Notes</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Down payment is fixed at 30% of the property cost</li>
                <li>Loan term is fixed at 7 years (84 months)</li>
                <li>Interest rate is fixed at <span className="font-bold">12% per annum</span> on reducing balance</li>
                <li>Monthly payments start one month after construction begins</li>
                <li>Construction period is typically 6-12 months</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoanCalculator; 