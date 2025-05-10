// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// /**
//  * KoolMoreVendingShowcase Component
//  * Displays a selection of Koolmore vending machines with key features
//  */
// const KoolMoreVendingShowcase = () => {
//   // Array of available vending machines
//   const vendingMachines = [
//     {
//       id: 'km-vmnt-50-b',
//       name: 'Non-Refrigerated Snack Machine',
//       model: 'KM-VMNT-50-B',
//       image: '/images/machines/KM-VMNT-50-B (Non-Refrigerated Snack Machine) bg.png',
//       features: [
//         '60 product slots',
//         '22" HD touchscreen interface',
//         'Bill acceptor ($1-$100)',
//         'ADA compliant design',
//         'Anti-theft drop sensor',
//         'LED interior lighting'
//       ],
//       dimensions: '50"W x 30.2"D x 76.7"H',
//       best: 'Dry snacks & packaged goods'
//     },
//     {
//       id: 'km-vmr-30-b',
//       name: 'Compact Refrigerated Machine',
//       model: 'KM-VMR-30-B',
//       image: '/images/machines/KM-VMR-30-B (Compact Refrigerated Machine) bg.png',
//       features: [
//         '36 product slots',
//         '5" touchscreen interface',
//         'Bill acceptor ($1-$100)',
//         'Double-paned heated glass',
//         'Automatic drop sensor',
//         'Data logging capability'
//       ],
//       dimensions: '30"W x 28"D x 76.7"H',
//       best: 'Refrigerated snacks & beverages'
//     },
//     {
//       id: 'km-vmr-40-b',
//       name: 'Standard Refrigerated Machine',
//       model: 'KM-VMR-40-B',
//       image: '/images/machines/KM-VMR-40-B (Standard Refrigerated Machine) bg.png',
//       features: [
//         '60 product slots',
//         'Bill acceptor ($1-$100)',
//         'Multiple product configurations',
//         'Energy-efficient cooling',
//         'Anti-theft drop sensor',
//         'Bright interior lighting'
//       ],
//       dimensions: '40.4"W x 31"D x 76.7"H',
//       best: 'Mixed snacks & beverages'
//     },
//     {
//       id: 'km-vmrt-50-b',
//       name: 'Premium Refrigerated Machine',
//       model: 'KM-VMRT-50-B',
//       image: '/images/machines/KM-VMRT-50-B (Premium Refrigerated Machine) bg.png',
//       features: [
//         '60 product slots',
//         '22" HD touchscreen interface',
//         'Bill acceptor ($1-$100)',
//         'Anti-fog double-paned glass',
//         '6 metal plate shelves',
//         'ADA compliant design'
//       ],
//       dimensions: '51"W x 34.3"D x 76.7"H',
//       best: 'Premium food & beverage service'
//     }
//   ];

//   return (
//     <section className="py-16 bg-[#000000]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//             Premium Vending <span className="text-[#FD5A1E]">Solutions</span>
//           </h2>
//           <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//             Explore our range of state-of-the-art vending machines featuring advanced technology 
//             and customizable options for your workplace needs.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {vendingMachines.map((machine) => (
//             <div 
//               key={machine.id}
//               className="rounded-xl overflow-hidden border border-[#a4acac] 
//                         hover:border-[#FD5A1E] transition-all flex flex-col h-full"
//             >
//               {/* Machine Image */}
//               <div className="relative h-100 md:h-90">
//                 {/* Fallback display if image isn't available */}
//                 <div className="absolute inset-0 flex items-center justify-center bg-[#000000] text-[#A5ACAF]">
//                   {machine.model}
//                 </div>
//                 {/* Actual image would go here */}
//                 <Image 
//                   src={machine.image} 
//                   alt={`${machine.name} - ${machine.model}`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 25vw"
//                   className="object-cover object-center"
//                   onError={(e) => {
//                     // Fallback if image fails to load
//                     const target = e.target as HTMLImageElement;
//                     target.style.display = 'none';
//                   }}
//                 />
//               </div>
              
//               {/* Content */}
//               <div className="flex-1 p-6 flex flex-col">
//                 <h3 className="text-xl font-bold text-white mb-1">{machine.name}</h3>
//                 <p className="text-[#FD5A1E] text-sm font-semibold mb-4">{machine.model}</p>
                
//                 <div className="mb-4 flex-1">
//                   <p className="text-[#A5ACAF] text-xs mb-2">Key Features:</p>
//                   <ul className="space-y-1">
//                     {machine.features.slice(0, 3).map((feature, index) => (
//                       <li key={index} className="flex items-start text-sm">
//                         <svg className="h-4 w-4 text-[#FD5A1E] mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-[#F5F5F5]">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 <div className="text-sm text-[#A5ACAF] mb-4">
//                   <p>Dimensions: <span className="text-[#F5F5F5]">{machine.dimensions}</span></p>
//                   <p>Best for: <span className="text-[#F5F5F5]">{machine.best}</span></p>
//                 </div>
                
//                 <Link 
//                   href={`/vending-machines/${machine.id}`}
//                   className="py-2 px-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg text-center font-medium 
//                             hover:bg-[#FD5A1E]/90 transition-colors mt-auto"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="mt-12 text-center">
//           <Link
//             href="/vending-machines"
//             className="px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg 
//                       hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors inline-flex items-center"
//           >
//             Explore All Machines
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default KoolMoreVendingShowcase;