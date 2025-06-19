/**
 * Admin Page - Client Component Implementation
 * 
 * Build Process Documentation:
 * 1. Uses 'use client' directive to make entire page client-side
 * 2. Fixes Next.js 15+ dynamic import restrictions in Server Components
 * 3. Implements proper SSR safety with useEffect and useState
 * 4. Includes loading states and error boundaries
 * 5. Follows accessibility best practices
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Now we can use ssr: false because this is a client component
const AdminDashboardClient = dynamic(
  () => import('@/components/admin/AdminDashboardClient'),
  {
    ssr: false,
    loading: () => <AdminLoadingSkeleton />
  }
);

/**
 * Loading skeleton component for admin dashboard
 */
function AdminLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#000000] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-[#4d4d4d]/30 rounded-lg w-64 mb-4 animate-pulse" />
          <div className="h-5 bg-[#4d4d4d]/20 rounded w-96 animate-pulse" />
        </div>

        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#111111] rounded-xl p-6 border border-[#333333]"
            >
              <div className="h-4 bg-[#4d4d4d]/20 rounded w-20 mb-4 animate-pulse" />
              <div className="h-8 bg-[#4d4d4d]/30 rounded w-16 mb-2 animate-pulse" />
              <div className="h-3 bg-[#4d4d4d]/20 rounded w-32 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Content area skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-[#111111] rounded-xl p-6 border border-[#333333] h-96">
              <div className="h-6 bg-[#4d4d4d]/30 rounded w-40 mb-4 animate-pulse" />
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-4 bg-[#4d4d4d]/20 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#111111] rounded-xl p-6 border border-[#333333] h-96">
              <div className="h-6 bg-[#4d4d4d]/30 rounded w-32 mb-4 animate-pulse" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#4d4d4d]/20 rounded-full animate-pulse" />
                    <div className="flex-1">
                      <div className="h-3 bg-[#4d4d4d]/20 rounded w-full mb-1 animate-pulse" />
                      <div className="h-2 bg-[#4d4d4d]/10 rounded w-2/3 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Error boundary component for admin dashboard
 */
function AdminErrorBoundary({ 
  children, 
  error,
  onRetry 
}: { 
  children: React.ReactNode;
  error?: string | undefined;
  onRetry?: () => void;
}) {
  if (error) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#F5F5F5] mb-2">
              Admin Dashboard Error
            </h2>
            <p className="text-red-400 mb-4 text-sm">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-6 py-2 bg-[#FD5A1E] text-[#000000] rounded-lg hover:bg-[#FD5A1E]/90 transition-colors font-medium"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      <Suspense fallback={<AdminLoadingSkeleton />}>
        {children}
      </Suspense>
    </div>
  );
}

/**
 * Custom hook for client-side safety
 */
function useClientSide() {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsClient(true);
    } catch (err) {
      setError('Failed to initialize client-side rendering');
      console.error('Client-side initialization error:', err);
    }
  }, []);

  return { isClient, error };
}

/**
 * Main Admin Page Component
 * 
 * Uses client component approach to avoid Next.js 15+ SSR restrictions.
 * This entire component runs on the client side, preventing window access issues.
 */
export default function AdminPage() {
  const { isClient, error } = useClientSide();
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    // Force a page reload as last resort
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // Show loading until client-side is ready
  if (!isClient && !error) {
    return <AdminLoadingSkeleton />;
  }

  return (
    <AdminErrorBoundary error={error || undefined} onRetry={handleRetry}>
      <main className="min-h-screen bg-[#000000]">
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#FD5A1E] focus:text-[#000000] focus:rounded"
        >
          Skip to main content
        </a>

        <div id="main-content">
          <AdminDashboardClient key={retryCount} />
        </div>
      </main>
    </AdminErrorBoundary>
  );
}