'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import { Eye, EyeOff, Lock, Home, Shield, CheckCircle } from 'lucide-react';

function ResetPasswordPageInner() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const router = useRouter();
  const { updatePassword, loading: authLoading } = useAuth();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for password reset token in URL hash or query params
  useEffect(() => {
    if (!mounted) return;

    let subscription: { unsubscribe: () => void } | null = null;

    const checkToken = async () => {
      try {
        // Check URL hash fragment (Supabase typically uses this)
        const hash = window.location.hash;
        const hashParams = new URLSearchParams(hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);
        
        const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
        const type = hashParams.get('type') || queryParams.get('type');

        console.log('Reset password check:', { 
          hash: hash.substring(0, 50) + '...', 
          accessToken: !!accessToken, 
          type 
        });

        // Listen for auth state changes to catch when Supabase processes the recovery token
        const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event, session) => {
          console.log('Auth state change:', event, { hasSession: !!session });
          if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
            setTokenValid(true);
            setError(null);
          }
          // If USER_UPDATED event fires, password was successfully updated
          if (event === 'USER_UPDATED') {
            console.log('USER_UPDATED event detected - password update successful!');
            setPasswordUpdateSuccess(true);
            setSuccess(true);
            setLoading(false);
            window.history.replaceState(null, '', window.location.pathname);
            // Sign out the recovery session so user can sign in fresh
            setTimeout(async () => {
              console.log('Signing out recovery session...');
              await supabase.auth.signOut();
              console.log('Redirecting to login...');
              router.push('/login');
            }, 2000);
          }
        });
        subscription = authSubscription;

        // If we have a token in the URL, allow the user to proceed
        // The actual validation will happen when they submit the form
        if (accessToken && type === 'recovery') {
          console.log('Token found in URL params');
          setTokenValid(true);
          setError(null);
          return;
        }

        // Check if hash contains recovery indicators (even if not parsed correctly)
        if (hash.includes('access_token') && (hash.includes('type=recovery') || hash.includes('recovery'))) {
          console.log('Token found in hash');
          setTokenValid(true);
          setError(null);
          return;
        }

        // Check if we already have a session (might be from a previous recovery attempt)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log('Session check:', { hasSession: !!session, sessionError });
        
        if (session) {
          // If we have a session and there's a hash, it's likely from recovery
          if (hash.includes('access_token') || hash.includes('type=recovery') || hash.includes('recovery')) {
            console.log('Session found with recovery hash');
            setTokenValid(true);
            setError(null);
            return;
          }
        }

        // If we have a hash but no session yet, wait a bit for Supabase to process it
        if (hash.includes('access_token')) {
          console.log('Hash found, waiting for Supabase to process...');
          setTimeout(async () => {
            const { data: { session: updatedSession } } = await supabase.auth.getSession();
            if (updatedSession) {
              console.log('Session created after wait');
              setTokenValid(true);
              setError(null);
            } else {
              console.log('No session after wait, but allowing form anyway');
              // Still allow the form - validation will happen on submit
              setTokenValid(true);
              setError(null);
            }
          }, 1500);
          return;
        }

        // No valid token found
        console.log('No token found');
        setError('Invalid or missing reset token. Please request a new password reset link.');
        setTokenValid(false);
      } catch (err) {
        console.error('Error checking token:', err);
        setError('An error occurred while validating the reset token. Please try again.');
        setTokenValid(false);
      }
    };

    // Small delay to ensure hash is processed
    const timer = setTimeout(() => {
      checkToken();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Ensure we have a valid session before updating password
      // Supabase needs a session to update the password
      let session = null;
      const hash = window.location.hash;
      
      // If we have a hash token, wait for Supabase to process it
      if (hash.includes('access_token')) {
        console.log('Hash token found, waiting for Supabase to process...');
        // Wait for Supabase to process the hash and create a session
        for (let i = 0; i < 5; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
          if (currentSession && !sessionError) {
            session = currentSession;
            console.log('Session established from hash token');
            break;
          }
        }
      } else {
        // Check for existing session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        if (currentSession && !sessionError) {
          session = currentSession;
          console.log('Existing session found');
        }
      }
      
      if (!session) {
        console.error('No valid session found');
        setError('Invalid or expired reset token. Please request a new password reset link.');
        setLoading(false);
        return;
      }

      console.log('Updating password with session...');
      
      try {
        const result = await updatePassword(password);
        console.log('Update password result received:', result);
        
        const { error } = result || {};
        
        console.log('Update password result:', { 
          result,
          error, 
          errorType: typeof error, 
          errorValue: error,
          hasError: !!error,
          errorNull: error === null,
          errorUndefined: error === undefined,
          errorString: String(error)
        });
        
        // Check if there's an actual error object (not null/undefined/false)
        if (error && typeof error === 'object' && error !== null) {
          console.error('Password update error detected:', error);
          // If update fails, it might be because the token is invalid
          if (error.message && (error.message.includes('session') || error.message.includes('token') || error.message.includes('expired'))) {
            setError('Invalid or expired reset token. Please request a new password reset link.');
          } else {
            setError(error.message || 'An error occurred while resetting your password');
          }
          setLoading(false);
        } else {
          // No error - password update was successful
          console.log('Password updated successfully! Setting success state...');
          // Check if USER_UPDATED event already handled it
          if (!passwordUpdateSuccess) {
            setSuccess(true);
            setLoading(false);
            // Clear the hash from URL
            window.history.replaceState(null, '', window.location.pathname);
            console.log('Success state set, signing out and redirecting to login in 2 seconds...');
            // Sign out the recovery session so user can sign in fresh
            setTimeout(async () => {
              console.log('Signing out recovery session...');
              await supabase.auth.signOut();
              console.log('Executing redirect to /login');
              router.push('/login');
            }, 2000);
          }
        }
      } catch (updateError) {
        console.error('Exception during updatePassword call:', updateError);
        // Even if there's an exception, if USER_UPDATED event fired, password was updated
        // Check if we have a session as confirmation
        const { data: { session: confirmSession } } = await supabase.auth.getSession();
        if (confirmSession) {
          console.log('Session exists after update, treating as success');
          setSuccess(true);
          setLoading(false);
          window.history.replaceState(null, '', window.location.pathname);
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          setError(updateError instanceof Error ? updateError.message : 'An error occurred while resetting your password');
          setLoading(false);
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while resetting your password');
      setLoading(false);
    }
  };

  // Show loading state until component is mounted or token is validated
  if (!mounted || authLoading || tokenValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Password Reset Successful!
              </h2>
              <p className="text-gray text-sm md:text-base mb-6">
                Your password has been successfully reset. Redirecting to login...
              </p>
              <Link
                href="/login"
                className="inline-flex items-center text-primary hover:text-secondary transition-colors text-sm md:text-base font-medium"
              >
                Go to Login
              </Link>
            </div>
          </div>
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
                Reset Password
              </h2>
              <p className="text-gray text-sm md:text-base">
                Enter your new password below
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg relative" role="alert">
                  <span className="block sm:inline text-sm">{error}</span>
                </div>
              )}
              
              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={6}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm md:text-base transition-colors"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={6}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm md:text-base transition-colors"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
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
                      Resetting...
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <Link href="/login" className="text-sm text-primary hover:text-secondary transition-colors font-medium">
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

export default function ResetPasswordPage() {
  return <ResetPasswordPageInner />;
}

