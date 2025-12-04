'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });

      if (error) throw error;

      setFaqs(data || []);
      // Expand first FAQ by default
      if (data && data.length > 0) {
        setExpandedId(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h1 className="site-title text-primary">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Find answers to common questions about Promitto Limited, our services, and how we can help you achieve your homeownership dreams.
          </p>
        </div>

        {/* FAQ Accordion */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading FAQs...</p>
            </div>
          </div>
        ) : faqs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600">No FAQs available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className={`text-lg font-semibold pr-8 transition-colors ${
                      isExpanded ? 'text-secondary' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-secondary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-6 pb-5 border-t border-gray-100">
                      <div className="pt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Please get in touch with our friendly team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}

