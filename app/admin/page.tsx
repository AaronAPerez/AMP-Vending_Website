// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface AdminUser {
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Get user info from API or storage
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#F5F5F5]">Admin Dashboard</h1>
        <p className="text-[#A5ACAF] mt-2">
          Welcome back, {user?.email || 'Administrator'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Machines', value: '4', color: 'bg-blue-500' },
          { title: 'Active Locations', value: '12', color: 'bg-green-500' },
          { title: 'Monthly Revenue', value: '$2,450', color: 'bg-purple-500' },
          { title: 'Service Requests', value: '3', color: 'bg-orange-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-[#111111] rounded-lg p-6 border border-[#333333]">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${stat.color} mr-3`}></div>
              <h3 className="text-sm font-medium text-[#A5ACAF]">{stat.title}</h3>
            </div>
            <p className="text-2xl font-bold text-[#F5F5F5] mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#111111] rounded-lg p-6 border border-[#333333]">
        <h3 className="text-lg font-semibold text-[#F5F5F5] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Machine installed', location: 'Modesto Office Center', time: '2 hours ago' },
            { action: 'Service completed', location: 'Turlock Business Park', time: '1 day ago' },
            { action: 'New inquiry received', location: 'Stockton Medical Center', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div>
                <p className="text-[#F5F5F5] font-medium">{activity.action}</p>
                <p className="text-[#A5ACAF] text-sm">{activity.location}</p>
              </div>
              <span className="text-[#A5ACAF] text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// /**
//  * Admin Dashboard Page - SSR Safe Implementation
//  * 
//  * Build Process Documentation:
//  * 1. Implements dynamic imports for client-only components
//  * 2. Uses proper metadata and viewport exports for Next.js 14+
//  * 3. Includes SSR safety checks for window object access
//  * 4. Adds proper loading states and error boundaries
//  * 5. Follows accessibility best practices for admin interfaces
//  */


// import { Metadata, Viewport } from 'next';
// import dynamic from 'next/dist/shared/lib/dynamic';
// import { Suspense } from 'react';

// // Dynamic import for client-only admin dashboard component
// const AdminDashboardClient = dynamic(
//   () => import('@/components/admin/AdminDashboardClient'),
//   {
//     ssr: false, // Disable SSR for this component
//     loading: () => <AdminLoadingSkeleton />
//   }
// );

// /**
//  * Metadata configuration (server-side safe)
//  * Removed viewport and themeColor - moved to viewport export
//  */
// export const metadata: Metadata = {
//   title: 'Admin Dashboard | AMP Vending',
//   description: 'Administrative dashboard for AMP Vending management',
//   robots: {
//     index: false,
//     follow: false,
//   },
//   // Note: viewport and themeColor moved to viewport export below
// };

// /**
//  * Viewport configuration (Next.js 14+ requirement)
//  * Fixes the metadata viewport and themeColor warnings
//  */
// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: '#FD5A1E' },
//     { media: '(prefers-color-scheme: dark)', color: '#000000' }
//   ],
// };

// /**
//  * Loading skeleton component for admin dashboard
//  */
// function AdminLoadingSkeleton() {
//   return (
//     <div className="min-h-screen bg-[#000000] p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header skeleton */}
//         <div className="mb-8">
//           <div className="h-8 bg-[#4d4d4d]/30 rounded-lg w-64 mb-4 animate-pulse" />
//           <div className="h-5 bg-[#4d4d4d]/20 rounded w-96 animate-pulse" />
//         </div>

//         {/* Stats cards skeleton */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {Array.from({ length: 4 }).map((_, index) => (
//             <div
//               key={index}
//               className="bg-[#111111] rounded-xl p-6 border border-[#333333]"
//             >
//               <div className="h-4 bg-[#4d4d4d]/20 rounded w-20 mb-4 animate-pulse" />
//               <div className="h-8 bg-[#4d4d4d]/30 rounded w-16 mb-2 animate-pulse" />
//               <div className="h-3 bg-[#4d4d4d]/20 rounded w-32 animate-pulse" />
//             </div>
//           ))}
//         </div>

//         {/* Content area skeleton */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <div className="bg-[#111111] rounded-xl p-6 border border-[#333333] h-96">
//               <div className="h-6 bg-[#4d4d4d]/30 rounded w-40 mb-4 animate-pulse" />
//               <div className="space-y-3">
//                 {Array.from({ length: 6 }).map((_, index) => (
//                   <div key={index} className="h-4 bg-[#4d4d4d]/20 rounded animate-pulse" />
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="bg-[#111111] rounded-xl p-6 border border-[#333333] h-96">
//               <div className="h-6 bg-[#4d4d4d]/30 rounded w-32 mb-4 animate-pulse" />
//               <div className="space-y-4">
//                 {Array.from({ length: 4 }).map((_, index) => (
//                   <div key={index} className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-[#4d4d4d]/20 rounded-full animate-pulse" />
//                     <div className="flex-1">
//                       <div className="h-3 bg-[#4d4d4d]/20 rounded w-full mb-1 animate-pulse" />
//                       <div className="h-2 bg-[#4d4d4d]/10 rounded w-2/3 animate-pulse" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /**
//  * Error boundary wrapper for admin dashboard
//  */
// function AdminErrorBoundary({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen bg-[#000000]">
//       <Suspense fallback={<AdminLoadingSkeleton />}>
//         {children}
//       </Suspense>
//     </div>
//   );
// }

// /**
//  * Main Admin Dashboard Page Component
//  * 
//  * Uses dynamic imports and SSR safety to prevent window-related build errors.
//  * This page serves as the main entry point for the admin section.
//  */
// export default function AdminPage() {
//   return (
//     <AdminErrorBoundary>
//       <main className="min-h-screen bg-[#000000]">
//         {/* Skip link for accessibility */}
//         <a
//           href="#main-content"
//           className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#FD5A1E] focus:text-[#000000] focus:rounded"
//         >
//           Skip to main content
//         </a>

//         <div id="main-content">
//           <AdminDashboardClient />
//         </div>
//       </main>
//     </AdminErrorBoundary>
//   );
// }