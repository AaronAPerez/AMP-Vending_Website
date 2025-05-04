'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console
    console.error('Application error:', error);
    
    // Log error to monitoring service if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // Type guard for gtag
      const gtag = window.gtag as (command: string, eventName: string, params: Record<string, unknown>) => void;
      gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FD5A1E]/10 mb-6">
            <svg 
              className="w-10 h-10 text-[#FD5A1E]" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-[#F5F5F5] mb-4">
            Something went wrong
          </h1>
          <p className="text-[#A5ACAF] mb-8">
            We encountered an error while loading this page. Please try again.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-x-4">
          <button
            onClick={reset}
            className="px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-block px-8 py-4 border border-[#A5ACAF] text-[#F5F5F5] rounded-full hover:bg-[#4d4d4d] transition-colors font-medium"
          >
            Go Home
          </Link>
        </div>

        {/* Debug Information (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 text-left bg-[#4d4d4d] rounded-lg p-4">
            <pre className="text-[#FD5A1E] text-sm overflow-auto">
              {error.toString()}
            </pre>
            {error.digest && (
              <p className="text-[#A5ACAF] text-sm mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}