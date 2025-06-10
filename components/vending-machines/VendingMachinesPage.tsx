// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// // Types for our vending machine data
// interface VendingMachine {
//   id: string;
//   name: string;
//   model: string;
//   image: string;
//   description: string;
//   features: string[];
//   dimensions: string;
//   bestFor: string;
//   category: string;
// }

// /**
//  * VendingMachinesPage Component
//  * Main page listing all available vending machine models with filtering options
//  */
// const VendingMachinesPage = () => {
//   // State for category filter
//   const [activeFilter, setActiveFilter] = useState<string>('all');
  
//   // Vending machines data
//   const vendingMachines: VendingMachine[] = [
//     {
//       id: 'km-vmrt-50-b',
//       name: 'Premium Refrigerated Machine',
//       model: 'KM-VMRT-50-B',
//       image: '/images/products/placeholder.jpg',
//       description: 'Our flagship refrigerated vending solution with a 21.5" HD touchscreen and dual temperature zones for maximum product flexibility.',
//       features: [
//         '21.5" HD touchscreen interface',
//         'Anti-fog double-paned glass',
//         'Bill acceptor ($1-$100)',
//         'Anti-theft drop sensor',
//         '6 metal plate shelves',
//         'ADA compliant design'
//       ],
//       dimensions: '51"W x 34.3"D x 76.7"H',
//       bestFor: 'Premium food & beverage service',
//       category: 'refrigerated'
//     },
//     {
//       id: 'km-vmr-40-b',
//       name: 'Standard Refrigerated Machine',
//       model: 'KM-VMR-40-B',
//       image: '/images/machines/amp-standard-refrigerated-vending-machine.jpg',
//       description: 'A versatile refrigerated vending machine designed for reliability and performance in medium to high-traffic locations.',
//       features: [
//         '60 product slots',
//         'Bill acceptor ($1-$100)',
//         'Multiple product configurations',
//         'Energy-efficient cooling',
//         'Anti-theft drop sensor',
//         'Bright interior lighting'
//       ],
//       dimensions: '40.4"W x 31"D x 76.7"H',
//       bestFor: 'Mixed snacks & beverages',
//       category: 'refrigerated'
//     },
//     {
//       id: 'km-vmr-30-b',
//       name: 'Compact Refrigerated Machine',
//       model: 'KM-VMR-30-B',
//       image: '/images/products/placeholder.jpg',
//       description: 'Space-saving refrigerated vending solution perfect for smaller locations that still need quality refrigerated product options.',
//       features: [
//         '36 product slots',
//         '5" touchscreen interface',
//         'Bill acceptor ($1-$100)',
//         'Double-paned heated glass',
//         'Automatic drop sensor',
//         'Data logging capability'
//       ],
//       dimensions: '30"W x 28"D x 76.7"H',
//       bestFor: 'Refrigerated snacks & beverages',
//       category: 'refrigerated'
//     },
//     {
//       id: 'km-vmnt-50-b',
//       name: 'Non-Refrigerated Snack Machine',
//       model: 'KM-VMNT-50-B',
//       image: '/images/machines/amp-premium-non-refrigerated-vending-machine.jpg',
//       description: 'Advanced snack vending machine with a large 22" touchscreen interface and maximum product capacity for non-refrigerated items.',
//       features: [
//         '60 product slots',
//         '22" HD touchscreen interface',
//         'Bill acceptor ($1-$100)',
//         'ADA compliant design',
//         'Anti-theft drop sensor',
//         'LED interior lighting'
//       ],
//       dimensions: '50"W x 30.2"D x 76.7"H',
//       bestFor: 'Dry snacks & packaged goods',
//       category: 'snack'
//     }
//   ];
  
//   // Filter categories
//   const categories = [
//     { id: 'all', label: 'All Machines' },
//     { id: 'refrigerated', label: 'Refrigerated' },
//     { id: 'snack', label: 'Snack' }
//   ];
  
//   // Filter machines based on selected category
//   const filteredMachines = activeFilter === 'all' 
//     ? vendingMachines 
//     : vendingMachines.filter(machine => machine.category === activeFilter);

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="relative py-12 mb-10 bg-gradient-to-b from-[#000000] to-[#4d4d4d]/20 rounded-xl overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           {/* Background Pattern */}
//           <div className="absolute inset-0">
//             <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//               <defs>
//                 <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
//                   <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
//                 </pattern>
//               </defs>
//               <rect width="100%" height="100%" fill="url(#grid-pattern)" />
//             </svg>
//           </div>
//         </div>
        
//         <div className="relative z-10 px-6 py-8 md:py-12 max-w-4xl mx-auto text-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//             Premium Vending Machines
//           </h1>
//           <p className="text-xl text-[#A5ACAF] max-w-2xl mx-auto mb-8">
//             Explore our range of state-of-the-art vending machines featuring free installation, 
//             complete maintenance service, and customizable product options.
//           </p>
//           <div className="flex flex-wrap justify-center gap-3">
//             <Link 
//               href="/contact" 
//               className="px-5 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-full font-medium hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
//             >
//               Request Consultation
//             </Link>
//             <Link 
//               href="/proposal" 
//               className="px-5 py-2 border border-[#F5F5F5] text-[#F5F5F5] rounded-full font-medium hover:bg-[#FD5A1E] hover:border-[#FD5A1E] transition-colors"
//             >
//               View Our Proposal
//             </Link>
//           </div>
//         </div>
//       </section>
      
//       {/* Filter Controls */}
//       <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
//         <div className="flex flex-wrap gap-2">
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => setActiveFilter(category.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                 activeFilter === category.id
//                   ? 'bg-[#FD5A1E] text-[#F5F5F5]'
//                   : 'bg-[#4d4d4d]/50 text-[#F5F5F5] hover:bg-[#4d4d4d]'
//               }`}
//             >
//               {category.label}
//             </button>
//           ))}
//         </div>
        
//         <p className="text-[#A5ACAF] text-sm">
//           Showing {filteredMachines.length} of {vendingMachines.length} machines
//         </p>
//       </div>
      
//       {/* Machines Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
//         {filteredMachines.map((machine) => (
//           <Link
//             key={machine.id}
//             href={`/vending-machines/${machine.id}`}
//             className="group bg-[#4d4d4d]/30 rounded-xl overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all flex flex-col h-full"
//           >
//             {/* Machine Image */}
//             <div className="relative h-64 md:h-72 bg-black overflow-hidden">
//               <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/80 text-[#A5ACAF] z-0">
//                 {machine.name}
//               </div>
//               <Image 
//                 src={machine.image} 
//                 alt={machine.name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 className="object-cover object-center z-10 group-hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute top-3 right-3 bg-[#FD5A1E] text-[#F5F5F5] px-3 py-1 rounded-full text-xs font-medium z-20">
//                 {machine.category === 'refrigerated' ? 'Refrigerated' : 'Snack'}
//               </div>
//             </div>
            
//             {/* Content */}
//             <div className="p-6 flex-1 flex flex-col">
//               <div className="mb-4">
//                 <h2 className="text-xl font-bold text-[#F5F5F5] mb-1">{machine.name}</h2>
//                 {/* <p className="text-[#FD5A1E] text-sm font-medium">{machine.model}</p> */}
//               </div>
              
//               <p className="text-[#A5ACAF] mb-5">{machine.description}</p>
              
//               <div className="mt-auto">
//                 <div className="mb-4">
//                   <h3 className="text-sm font-medium text-[#F5F5F5] mb-2">Key Features:</h3>
//                   <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
//                     {machine.features.slice(0, 4).map((feature, index) => (
//                       <li key={index} className="flex items-start text-xs">
//                         <svg className="h-3 w-3 text-[#FD5A1E] mr-1 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-[#A5ACAF]">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 <div className="flex justify-between text-xs text-[#A5ACAF] mb-4">
//                   <span>Dimensions: <span className="text-[#F5F5F5]">{machine.dimensions}</span></span>
//                   <span>Best for: <span className="text-[#F5F5F5]">{machine.bestFor}</span></span>
//                 </div>
                
//                 <span className="inline-flex items-center text-[#FD5A1E] font-medium text-sm group-hover:underline">
//                   View Details
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
      
//       {/* Benefits Section */}
//       <section className="py-12 bg-[#4d4d4d]/20 rounded-xl border border-[#a4acac] mb-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-4">
//               Why Choose Our Vending Machines
//             </h2>
//             <p className="text-lg text-[#A5ACAF] max-w-2xl mx-auto">
//               All our machines come with these core benefits, regardless of the model you choose.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="bg-[#000000]/50 rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
//               <div className="bg-[#FD5A1E]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
//                 <svg className="w-7 h-7 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">Zero Upfront Cost</h3>
//               <p className="text-[#A5ACAF]">
//                 No purchase or lease fees. All our machines are installed at no cost to qualified locations, 
//                 with no monthly payments or hidden charges.
//               </p>
//             </div>
            
//             <div className="bg-[#000000]/50 rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
//               <div className="bg-[#FD5A1E]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
//                 <svg className="w-7 h-7 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">Complete Maintenance</h3>
//               <p className="text-[#A5ACAF]">
//                 We handle all maintenance, repairs, and restocking. Your team never has to worry about 
//                 the machines - we take care of everything.
//               </p>
//             </div>
            
//             <div className="bg-[#000000]/50 rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
//               <div className="bg-[#FD5A1E]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
//                 <svg className="w-7 h-7 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">Customizable Selection</h3>
//               <p className="text-[#A5ACAF]">
//                 We tailor the product selection based on your workplace preferences and continuously 
//                 optimize based on consumption patterns and feedback.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* FAQ Section */}
//       <section className="mb-12">
//         <div className="max-w-3xl mx-auto">
//           <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-6">
//             Frequently Asked Questions
//           </h2>
          
//           <div className="space-y-4">
//             <div className="bg-[#4d4d4d]/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold text-white mb-2">How do you offer machines at zero cost?</h3>
//               <p className="text-[#A5ACAF]">
//                 Our business model allows us to provide premium machines at no cost to qualified locations 
//                 that meet our minimum traffic requirements. We generate revenue through product sales, 
//                 eliminating the need to charge for the machines themselves.
//               </p>
//             </div>
            
//             <div className="bg-[#4d4d4d]/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold text-white mb-2">What are the space requirements?</h3>
//               <p className="text-[#A5ACAF]">
//                 Each machine has different dimensions, but all require standard electrical outlets and 
//                 adequate clearance for servicing. Our team will perform a site assessment to determine 
//                 the best placement and machine model for your specific location.
//               </p>
//             </div>
            
//             <div className="bg-[#4d4d4d]/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold text-white mb-2">How often are machines serviced?</h3>
//               <p className="text-[#A5ACAF]">
//                 We remotely monitor inventory levels and typically restock once per week, though high-traffic 
//                 locations may receive more frequent service. Maintenance is performed regularly to ensure 
//                 optimal machine operation, and any issues are addressed promptly.
//               </p>
//             </div>
//           </div>
          
//           <div className="mt-6 text-center">
//             <Link
//               href="/faq"
//               className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 font-medium inline-flex items-center"
//             >
//               View all FAQs
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </section>
      
//       {/* CTA Section */}
//       <section className="bg-[#FD5A1E]/10 rounded-xl border border-[#FD5A1E] p-8 text-center">
//         <h2 className="text-2xl font-bold text-white mb-4">
//           Ready to Enhance Your Workplace?
//         </h2>
//         <p className="text-[#A5ACAF] max-w-2xl mx-auto mb-6">
//           Schedule a free consultation today and see how our zero-cost vending solutions can benefit your business.
//         </p>
//         <div className="flex flex-wrap justify-center gap-3">
//           <Link 
//             href="/contact" 
//             className="px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full font-medium hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
//           >
//             Schedule Consultation
//           </Link>
//           <Link 
//             href="/proposal" 
//             className="px-6 py-3 border border-[#F5F5F5] text-[#F5F5F5] rounded-full font-medium hover:bg-[#FD5A1E] hover:border-[#FD5A1E] transition-colors"
//           >
//             View Proposal
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default VendingMachinesPage;