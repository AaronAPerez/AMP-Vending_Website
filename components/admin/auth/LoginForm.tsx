// components/admin/LoginForm.tsx
'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { LoginCredentials } from '@/lib/types/auth';

/**
 * Secure Admin Login Form Component
 * Build Process: Implements WCAG 2.1 AA accessibility standards with comprehensive form validation
 */
interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<boolean>;
  isLoading?: boolean;
  className?: string;
}

export default function LoginForm({ onLogin, isLoading = false, className = '' }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attemptCount, setAttemptCount] = useState(0);

  /**
   * Handle form submission with security measures
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting - max 5 attempts
    if (attemptCount >= 5) {
      toast.error('Too many failed attempts. Please wait 15 minutes before trying again.');
      return;
    }

    // Validate form
    const validationErrors = validateForm(credentials);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setErrors({});
      const success = await onLogin(credentials);
      
      if (success) {
        toast.success('Login successful! Redirecting to admin dashboard...');
        setAttemptCount(0);
      } else {
        setAttemptCount(prev => prev + 1);
        toast.error('Invalid email or password. Please try again.');
        
        // Clear password on failed attempt
        setCredentials(prev => ({ ...prev, password: '' }));
      }
    } catch (error) {
      setAttemptCount(prev => prev + 1);
      toast.error('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  }, [credentials, onLogin, attemptCount]);

  /**
   * Handle input changes with real-time validation
   */
  const handleInputChange = useCallback((field: keyof LoginCredentials, value: string | boolean) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-md mx-auto ${className}`}
    >
      <div className="bg-[#111111] rounded-2xl p-8 border border-[#333333] shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[#FD5A1E]/10 rounded-full mb-4"
          >
            <LockClosedIcon className="w-8 h-8 text-[#FD5A1E]" aria-hidden="true" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-[#F5F5F5] mb-2">
            Admin Login
          </h1>
          <p className="text-[#A5ACAF] text-sm">
            Access AMP Vending administration dashboard
          </p>
        </div>

        {/* Security Warning */}
        {attemptCount > 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
          >
            <p className="text-yellow-400 text-sm text-center">
              ⚠️ Multiple failed attempts detected. Account will be locked after 5 attempts.
            </p>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Email Field */}
          <div>
            <label 
              htmlFor="admin-email" 
              className="block text-sm font-medium text-[#F5F5F5] mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-[#A5ACAF]" aria-hidden="true" />
              </div>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={credentials.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-[#000000] text-[#F5F5F5] placeholder-[#A5ACAF] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] transition-colors ${
                  errors.email ? 'border-red-500' : 'border-[#333333]'
                }`}
                placeholder="Enter your admin email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-400" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label 
              htmlFor="admin-password" 
              className="block text-sm font-medium text-[#F5F5F5] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-[#A5ACAF]" aria-hidden="true" />
              </div>
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`block w-full pl-10 pr-12 py-3 border rounded-lg bg-[#000000] text-[#F5F5F5] placeholder-[#A5ACAF] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] transition-colors ${
                  errors.password ? 'border-red-500' : 'border-[#333333]'
                }`}
                placeholder="Enter your password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-2 text-sm text-red-400" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={credentials.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="h-4 w-4 text-[#FD5A1E] bg-[#000000] border-[#333333] rounded focus:ring-[#FD5A1E] focus:ring-2"
              disabled={isLoading}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-[#A5ACAF]">
              Keep me signed in for 7 days
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading || attemptCount >= 5}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#000000] bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD5A1E] focus:ring-offset-[#111111] transition-all duration-200 ${
              isLoading || attemptCount >= 5 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-lg'
            }`}
            aria-describedby="submit-help"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#000000]" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing In...
              </div>
            ) : (
              'Sign In to Admin Dashboard'
            )}
          </motion.button>
          
          <p id="submit-help" className="text-xs text-[#A5ACAF] text-center mt-2">
            Secure access to AMP Vending administration tools
          </p>
        </form>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-[#000000]/50 rounded-lg border border-[#333333]/50">
          <p className="text-xs text-[#A5ACAF] text-center">
            🔒 This is a secure admin area. All activities are logged and monitored.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Validate login form data
 */
function validateForm(credentials: LoginCredentials): Record<string, string> {
  const errors: Record<string, string> = {};

  // Email validation
  if (!credentials.email) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!credentials.password) {
    errors.password = 'Password is required';
  } else if (credentials.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  return errors;
}