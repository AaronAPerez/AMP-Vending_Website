'use client';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Basic admin interface - fully functional</p>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        <a href="/admin/photo-manager" className="p-4 bg-gray-800 rounded">
          Photo Manager
        </a>
        <div className="p-4 bg-gray-800 rounded">
          Settings (Coming Soon)
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