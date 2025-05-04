// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// // Types for our navigation sidebar
// interface SidebarItem {
//   name: string;
//   path: string;
//   model?: string;
// }

// /**
//  * VendingMachinesLayout Component
//  * Provides consistent layout and navigation for vending machine pages
//  */
// const VendingMachinesLayout = ({ children }: { children: React.ReactNode }) => {
//   const pathname = usePathname();
  
//   // Data for sidebar navigation
//   const sidebarItems: SidebarItem[] = [
//     { name: 'All Vending Machines', path: '/vending-machines' },
//     { 
//       name: 'Premium Refrigerated Machine', 
//       path: '/vending-machines/km-vmrt-50-b',
//       model: 'KM-VMRT-50-B'
//     },
//     { 
//       name: 'Standard Refrigerated Machine', 
//       path: '/vending-machines/km-vmr-40-b',
//       model: 'KM-VMR-40-B'
//     },
//     { 
//       name: 'Compact Refrigerated Machine', 
//       path: '/vending-machines/km-vmr-30-b',
//       model: 'KM-VMR-30-B'
//     },
//     { 
//       name: 'Non-Refrigerated Snack Machine', 
//       path: '/vending-machines/km-vmnt-50-b',
//       model: 'KM-VMNT-50-B'
//     }
//   ];

//   // Check if the current page is the main vending machines page
//   const isMainVendingPage = pathname === '/vending-machines';
  
//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Breadcrumb Navigation */}
//       <div className="bg-[#000000]/50 border-b border-[#4d4d4d]">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-[#A5ACAF]">
//           <Link href="/" className="hover:text-[#FD5A1E]">Home</Link>
//           <span className="mx-2">/</span>
//           {isMainVendingPage ? (
//             <span className="text-[#F5F5F5]">Vending Machines</span>
//           ) : (
//             <>
//               <Link href="/vending-machines" className="hover:text-[#FD5A1E]">Vending Machines</Link>
//               <span className="mx-2">/</span>
//               <span className="text-[#F5F5F5]">
//                 {sidebarItems.find(item => item.path === pathname)?.name || 'Machine Details'}
//               </span>
//             </>
//           )}
//         </div>
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Navigation - Only visible on individual machine pages */}
//           {!isMainVendingPage && (
//             <div className="lg:w-64 flex-shrink-0">
//               <div className="bg-[#4d4d4d]/30 rounded-xl p-5 sticky top-24">
//                 <h3 className="text-lg font-bold text-white mb-4">Vending Machines</h3>
//                 <nav className="space-y-2">
//                   {sidebarItems.map((item) => (
//                     <Link
//                       key={item.path}
//                       href={item.path}
//                       className={`block px-3 py-2 rounded-lg text-sm hover:bg-[#4d4d4d] transition-colors ${
//                         pathname === item.path 
//                           ? 'bg-[#FD5A1E]/10 text-[#FD5A1E] border-l-2 border-[#FD5A1E]' 
//                           : 'text-[#F5F5F5]'
//                       }`}
//                     >
//                       {item.name}
//                       {item.model && (
//                         <span className="block text-xs mt-1 opacity-75">
//                           {item.model}
//                         </span>
//                       )}
//                     </Link>
//                   ))}
//                 </nav>
                
//                 <div className="mt-6 pt-6 border-t border-[#a4acac]/30">
//                   <Link
//                     href="/contact"
//                     className="flex items-center justify-center w-full px-4 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg hover:bg-[#FD5A1E]/90 transition-colors text-sm font-medium"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                     </svg>
//                     Request Consultation
//                   </Link>
                  
//                   {/* <Link
//                     href="/proposal"
//                     className="flex items-center justify-center w-full px-4 py-2 mt-2 text-[#F5F5F5] rounded-lg border border-[#a4acac] hover:bg-[#4d4d4d] transition-colors text-sm font-medium"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     View Proposal
//                   </Link> */}
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* Main Content */}
//           <div className={`${isMainVendingPage ? 'w-full' : 'lg:flex-1'}`}>
//             {children}
//           </div>
//         </div>
//       </div>
      
//       {/* Zero Cost Banner */}
//       <section className="py-10 bg-[#000000] border-t border-[#4d4d4d]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-gradient-to-r from-[#FD5A1E]/20 to-[#000000] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
//             {/* Icon */}
//             <div className="bg-[#FD5A1E]/10 w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
//               <svg className="w-10 h-10 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
            
//             {/* Content */}
//             <div className="text-center md:text-left">
//               <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Zero Cost Vending Solutions</h2>
//               <p className="text-[#A5ACAF] text-lg mb-4 max-w-3xl">
//                 All our vending machines are installed with absolutely no upfront costs or monthly fees. 
//                 We handle everything from installation to maintenance and restocking, so you can enjoy 
//                 the benefits without any operational burden.
//               </p>
//               <div className="flex flex-wrap justify-center md:justify-start gap-3">
//                 <Link 
//                   href="/contact" 
//                   className="px-5 py-2 bg-[#FD5A1E] text-white rounded-full hover:bg-[#F5F5F5] hover:text-black transition-colors"
//                 >
//                   Get Started
//                 </Link>
//                 <Link 
//                   href="/proposal" 
//                   className="px-5 py-2 border border-[#A5ACAF] text-white rounded-full hover:bg-[#4d4d4d] transition-colors"
//                 >
//                   View Our Proposal
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default VendingMachinesLayout;