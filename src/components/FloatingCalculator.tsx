'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calculator, X, ChevronRight, Info } from 'lucide-react';

interface FloatingCalculatorProps {
  className?: string;
}

type ViewState = 'form' | 'notes' | 'results';

const FloatingCalculator: React.FC<FloatingCalculatorProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('form');
  const [propertyCost, setPropertyCost] = useState<string>('3,000,000');
  const [downPayment, setDownPayment] = useState<string>('900,000');
  const [propertyType, setPropertyType] = useState<string>('residential');
  const [loanTerm, setLoanTerm] = useState<string>('7');
  const [interestRate] = useState<string>('12');
  const [processingFee] = useState<string>('2.5');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [processingFeeAmount, setProcessingFeeAmount] = useState<number>(0);
  const [salary, setSalary] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Close calculator when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calculatorRef.current && !calculatorRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setViewState('form'); // Reset to form when closing
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Close calculator on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
        setViewState('form'); // Reset to form when closing
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isExpanded]);

  const formatNumber = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (value: string): number => {
    return Number(value.replace(/,/g, ''));
  };

  const calculateLoan = () => {
    const principal = parseNumber(propertyCost) - parseNumber(downPayment);
    const annualRate = Number(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = Number(loanTerm) * 12;
    
    const processingFeeAmount = Math.round(principal * (Number(processingFee) / 100));
    
    const monthlyPaymentAmount = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPaymentAmount = monthlyPaymentAmount * numberOfPayments;
    const totalInterestAmount = totalPaymentAmount - principal;
    
    setMonthlyPayment(Math.round(monthlyPaymentAmount));
    setTotalPayment(Math.round(totalPaymentAmount));
    setTotalInterest(Math.round(totalInterestAmount));
    setProcessingFeeAmount(processingFeeAmount);
    setIsCalculated(true);
    setViewState('results'); // Switch to results view

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

  const resetToForm = () => {
    setViewState('form');
    setIsCalculated(false);
  };

  // Update down payment whenever property cost changes
  React.useEffect(() => {
    const cost = parseNumber(propertyCost);
    const downPaymentAmount = Math.round(cost * 0.3);
    setDownPayment(formatNumber(downPaymentAmount.toString()));
  }, [propertyCost]);

  // Update loan term when property type changes
  React.useEffect(() => {
    if (propertyType === 'residential' && Number(loanTerm) > 7) {
      setLoanTerm('7');
    } else if (propertyType === 'commercial' && Number(loanTerm) > 10) {
      setLoanTerm('10');
    }
    setIsCalculated(false);
  }, [propertyType, loanTerm]);

  const renderForm = () => (
    <div className="space-y-3 sm:space-y-4">
      {/* Property Type */}
      <div>
        <label className="block text-primary font-medium mb-2 text-xs sm:text-sm">Property Type</label>
        <select
          value={propertyType}
          onChange={(e) => { setPropertyType(e.target.value); setIsCalculated(false); }}
          className="w-full px-3 py-2 rounded-lg border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
        >
          <option value="residential">Residential Property</option>
          <option value="commercial">Commercial Property</option>
        </select>
      </div>

      {/* Property Cost */}
      <div>
        <label className="block text-primary font-medium mb-2 text-xs sm:text-sm">Property Cost (KES)</label>
        <input
          type="text"
          value={propertyCost}
          onChange={(e) => handleInputChange('propertyCost', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
          placeholder="Enter property cost"
        />
      </div>

      {/* Down Payment */}
      <div>
        <label className="block text-primary font-medium mb-2 text-xs sm:text-sm">Down Payment (30%)</label>
        <input
          type="text"
          value={downPayment}
          readOnly
          className="w-full px-3 py-2 rounded-lg border bg-gray-100 text-xs sm:text-sm text-primary"
        />
      </div>

      {/* Loan Term */}
      <div>
        <label className="block text-primary font-medium mb-2 text-xs sm:text-sm">Loan Term (Years)</label>
        <select
          value={loanTerm}
          onChange={(e) => { setLoanTerm(e.target.value); setIsCalculated(false); }}
          className="w-full px-3 py-2 rounded-lg border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
        >
          {[...Array(propertyType === 'residential' ? 7 : 10)].map((_, i) => (
            <option key={i+1} value={i+1}>{i+1} {i+1 === 1 ? 'year' : 'years'}</option>
          ))}
        </select>
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block text-primary font-medium mb-2 text-xs sm:text-sm">Interest Rate (%)</label>
        <input
          type="number"
          value={interestRate}
          readOnly
          className="w-full px-3 py-2 rounded-lg border bg-gray-100 text-xs sm:text-sm text-primary"
        />
      </div>

      {/* Processing Fee */}
      <div>
        <label className="block text-primary font-medium mb-2 text-xs sm:text-sm">Processing Fee (%)</label>
        <input
          type="number"
          value={processingFee}
          readOnly
          className="w-full px-3 py-2 rounded-lg border bg-gray-100 text-xs sm:text-sm text-primary"
        />
      </div>

      {/* Monthly Salary */}
      <div>
        <label className="block text-primary font-medium mb-2 text-xs sm:text-sm">Monthly Salary (Optional)</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => handleInputChange('salary', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
          placeholder="Enter your monthly salary"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateLoan}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-xs sm:text-sm touch-manipulation"
      >
        <Calculator className="w-4 h-4" />
        <span>Calculate Loan</span>
      </button>

      {/* Important Notes Link */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => setViewState('notes')}
          className="w-full flex items-center justify-center space-x-2 text-secondary hover:text-secondary/80 transition-colors text-xs sm:text-sm font-medium py-2"
        >
          <Info className="w-4 h-4" />
          <span>Important Notes</span>
        </button>
      </div>
    </div>
  );

  const renderImportantNotes = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-primary flex items-center">
          <Info className="w-5 h-5 mr-2 text-secondary" />
          Important Notes
        </h4>
        <button
          onClick={resetToForm}
          className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium"
        >
          Back to Calculator
        </button>
      </div>
      
      <div className="bg-gradient-to-r from-gray-50 to-primary/5 p-4 rounded-xl border border-gray-200">
        <ul className="list-disc pl-6 text-primary space-y-2 text-xs sm:text-sm">
          <li>Down payment is fixed at <span className="font-bold text-primary">30%</span> of the property cost</li>
          <li>Loan term is adjustable from <span className="font-bold text-primary">1-7 years</span> for residential properties</li>
          <li>Loan term is adjustable from <span className="font-bold text-primary">1-10 years</span> for commercial properties</li>
          <li>Interest rate is fixed at <span className="font-bold text-primary">12% per annum</span> on reducing balance</li>
          <li>Processing fee is <span className="font-bold text-secondary">2.5%</span> of the loan amount</li>
          <li>Monthly payments start one month after construction begins</li>
          <li>Construction period is typically <span className="font-bold text-primary">6-12 months</span></li>
        </ul>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-primary flex items-center">
          <svg className="w-5 h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Loan Summary
        </h4>
        <button
          onClick={resetToForm}
          className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium"
        >
          New Calculation
        </button>
      </div>

      <div className="space-y-3">
        {/* Property Cost */}
        <div>
          <p className="text-primary text-xs">Property Cost</p>
          <p className="text-lg font-bold text-primary">KES {propertyCost}</p>
        </div>

        {/* Down Payment */}
        <div>
          <p className="text-primary text-xs">Down Payment (30%)</p>
          <p className="text-lg font-bold text-primary">KES {downPayment}</p>
        </div>

        {/* Interest Rate */}
        <div>
          <p className="text-primary text-xs">Interest Rate</p>
          <p className="text-sm font-bold text-primary">12% per annum (reducing balance)</p>
        </div>

        {/* Processing Fee */}
        <div>
          <p className="text-primary text-xs">Processing Fee</p>
          <p className="text-sm font-bold text-secondary">{processingFee}% of loan amount</p>
        </div>

        {/* Property Type */}
        <div>
          <p className="text-primary text-xs">Property Type</p>
          <p className="text-sm font-bold text-primary capitalize">{propertyType} Property</p>
        </div>

        {/* Loan Term */}
        <div>
          <p className="text-primary text-xs">Loan Term</p>
          <p className="text-sm font-bold text-primary">{loanTerm} {loanTerm === '1' ? 'year' : 'years'} ({Number(loanTerm) * 12} months)</p>
        </div>

        {/* Monthly Payment - Prominently Displayed */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-primary text-xs">Estimated Monthly Payment</p>
          <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-1">
            KES {formatNumber(monthlyPayment.toString())}
          </p>
        </div>

        {/* Processing Fee Amount */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-primary text-xs">Processing Fee Amount</p>
          <p className="text-sm font-bold text-secondary mt-1">
            KES {formatNumber(processingFeeAmount.toString())}
          </p>
        </div>

        {/* Total Interest */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-primary text-xs">Total Interest</p>
          <p className="text-sm font-bold text-primary mt-1">
            KES {formatNumber(totalInterest.toString())}
          </p>
        </div>

        {/* Total Payment */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-primary text-xs">Total Payment</p>
          <p className="text-sm font-bold text-primary mt-1">
            KES {formatNumber(totalPayment.toString())}
          </p>
        </div>

        {/* Recommendation */}
        {recommendation && (
          <div className="pt-3 border-t border-gray-200">
            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-3 rounded-lg border border-secondary/20">
              <p className="text-xs text-primary font-medium mb-1">Recommendation</p>
              <p className="text-xs text-primary">{recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div ref={calculatorRef} className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 ${className}`}>
      {/* Floating Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-white text-primary border border-primary/20 rounded-r-2xl px-3 sm:px-4 py-4 sm:py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 group touch-manipulation animate-pulse"
          title="Loan Calculator"
          aria-label="Open Loan Calculator"
        >
          <Calculator className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold text-xs sm:text-sm whitespace-nowrap hidden sm:block">Calculators</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      )}

      {/* Expanded Calculator Panel */}
      {isExpanded && (
        <div className="bg-white border border-primary/20 rounded-r-2xl shadow-2xl w-80 sm:w-96 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-3 sm:p-4 rounded-tr-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="font-semibold text-base sm:text-lg">Loan Calculator</h3>
              </div>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setViewState('form'); // Reset to form when closing
                }}
                className="text-white hover:text-gray-200 transition-colors p-1 touch-manipulation"
                title="Close Calculator"
                aria-label="Close Calculator"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm opacity-90 mt-1">Jenga Nyumba Loan Calculator</p>
          </div>

          {/* Calculator Content */}
          <div className="p-3 sm:p-4">
            {viewState === 'form' && renderForm()}
            {viewState === 'notes' && renderImportantNotes()}
            {viewState === 'results' && renderResults()}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCalculator;
