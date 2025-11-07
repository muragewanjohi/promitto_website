'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Mail, Home, Shield, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { resetPasswordForEmail, loading: authLoading } = useAuth();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const { error } = await resetPasswordForEmail(email);
      if (error) {
        setError(error.message || 'An error occurred while sending the reset email');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while sending the reset email');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state until component is mounted
  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header />
      
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray text-sm md:text-base">
                {success 
                  ? 'Check your email for password reset instructions'
                  : 'Enter your email address and we\'ll send you a link to reset your password'
                }
              </p>
            </div>

            {success ? (
              /* Success Message */
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="w-6 h-6 mr-2" />
                    <span className="font-semibold">Email Sent!</span>
                  </div>
                  <p className="text-sm">
                    We've sent a password reset link to <strong>{email}</strong>. 
                    Please check your inbox and follow the instructions to reset your password.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setEmail('');
                    }}
                    className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg text-sm md:text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                  >
                    Send Another Email
                  </button>
                  
                  <Link
                    href="/login"
                    className="flex items-center justify-center text-primary hover:text-secondary transition-colors text-sm md:text-base font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Link>
                </div>
              </div>
            ) : (
              /* Form */
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg relative" role="alert">
                    <span className="block sm:inline text-sm">{error}</span>
                  </div>
                )}
                
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm md:text-base transition-colors"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm md:text-base font-semibold rounded-lg text-white bg-gradient-to-r from-primary to-secondary hover:from-accent hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <Link
                href="/login"
                className="flex items-center justify-center text-gray hover:text-primary transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
              <div className="mt-4 flex justify-center">
                <Link href="/" className="flex items-center text-gray hover:text-primary transition-colors text-sm">
                  <Home className="w-4 h-4 mr-1" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

