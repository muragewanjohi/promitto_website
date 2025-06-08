'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

function VerifyEmailPageInner() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      router.push('/signup');
    }
  }, [searchParams, router]);

  const handleResendVerification = async () => {
    if (!email) return;
    setResendLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) throw error;
      setSuccess('Verification email has been resent successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E40AF]"></div>
            </div>
            <p className="mt-4 text-gray-600">
              We've sent a verification link to <span className="font-medium">{email}</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Please click the link in your email to complete your registration.
            </p>
             <p className="mt-2 text-sm text-gray-500">
              Close this page after you verify your email.
            </p>
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {success && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{success}</span>
              </div>
            )}
            <div className="mt-6 space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#F59E0B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E40AF] disabled:opacity-50"
              >
                {resendLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resending...
                  </span>
                ) : (
                  'Resend verification email'
                )}
              </button>
              <div className="text-center">
                <Link
                  href="/signup"
                  className="text-[#1E40AF] hover:text-[#F59E0B] font-medium"
                >
                  Try another email
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailPageInner />
    </Suspense>
  );
} 