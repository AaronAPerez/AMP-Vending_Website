// components/VendingMachineDetailPage.tsx
// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Types for image gallery and machine data
// interface MachineImage {
//   id: number;
//   src: string;
//   alt: string;
// }

// interface FeatureItem {
//   title: string;
//   description: string;
//   icon?: string;
// }

// interface SpecificationGroup {
//   category: string;
//   items: {
//     label: string;
//     value: string | string[];
//   }[];
// }

// interface MachineData {
//   id: string;
//   name: string;
//   model: string;
//   shortDescription: string;
//   description: string;
//   images: MachineImage[];
//   dimensions: { label: string; value: string }[];
//   features: FeatureItem[];
//   specifications: SpecificationGroup[];
//   productOptions: string[];
//   bestFor: string[];
//   relatedMachines: {
//     id: string;
//     name: string;
//     model: string;
//     image: string;
//   }[];
// }

// interface VendingMachineDetailPageProps {
//   machine: MachineData;
// }

// /**
//  * VendingMachineDetailPage Component
//  * 
//  * Displays a detailed view of a specific vending machine model
//  * with responsive layout, accessible interactive elements,
//  * and comprehensive product information
//  */
// const VendingMachineDetailPage = ({ machine }: VendingMachineDetailPageProps) => {
//   // State for active image in gallery
//   const [activeImage, setActiveImage] = useState(0);
  
//   // State for active tab in product details
//   const [activeTab, setActiveTab] = useState('features');

//   return (
//     <div className="min-h-screen bg-[#000000] text-[#F5F5F5]">
//       {/* Product Header - Full Width */}
//       <section className="py-8 bg-gradient-to-b from-[#000000] to-[#000000]/80 w-full">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-2">{machine.name}</h1>
//           <p className="text-[#FD5A1E] text-xl mb-4">Model: {machine.model}</p>
//           <p className="text-xl text-[#A5ACAF] max-w-3xl">{machine.shortDescription}</p>
//         </div>
//       </section>
      
//       {/* Main Content - Using Grid for Better Space Utilization */}
//       <section className="py-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//             {/* Left Column - Images (Larger Area) */}
//             <div className="lg:col-span-7 xl:col-span-8 space-y-6">
//               {/* Main Image Gallery */}
//               <div className="bg-[#4d4d4d]/30 p-6 rounded-xl border border-[#a4acac]">
//                 {/* Large Main Image */}
//                 <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-4">
//                   <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/80 text-[#A5ACAF] z-0">
//                     {machine.images[activeImage].alt}
//                   </div>
//                   <Image 
//                     src={machine.images[activeImage].src} 
//                     alt={machine.images[activeImage].alt}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
//                     className="object-contain z-10"
//                     priority
//                   />
                  
//                   {/* Previous/Next Buttons */}
//                   <button 
//                     className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-black/70 rounded-full p-2 text-white hover:bg-[#FD5A1E] transition-colors"
//                     onClick={() => setActiveImage((prev) => (prev === 0 ? machine.images.length - 1 : prev - 1))}
//                     aria-label="Previous image"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                   </button>
//                   <button 
//                     className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-black/70 rounded-full p-2 text-white hover:bg-[#FD5A1E] transition-colors"
//                     onClick={() => setActiveImage((prev) => (prev === machine.images.length - 1 ? 0 : prev + 1))}
//                     aria-label="Next image"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
                
//                 {/* Thumbnail Navigation - Horizontal Scrolling */}
//                 <div className="flex space-x-2 overflow-x-auto pb-2">
//                   {machine.images.map((image, index) => (
//                     <button
//                       key={image.id}
//                       onClick={() => setActiveImage(index)}
//                       className={`relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 ${
//                         index === activeImage ? 'border-[#FD5A1E]' : 'border-[#a4acac]'
//                       }`}
//                       aria-label={`View ${image.alt}`}
//                       aria-current={index === activeImage}
//                     >
//                       <Image 
//                         src={image.src} 
//                         alt=""
//                         fill
//                         sizes="80px"
//                         className="object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Dimensions Box */}
//               <div className="bg-[#4d4d4d]/30 p-6 rounded-xl border border-[#a4acac]">
//                 <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Dimensions & Specifications</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {machine.dimensions.map((dimension, index) => (
//                     <div key={index} className="bg-[#000000]/30 p-4 rounded-lg text-center">
//                       <p className="text-[#A5ACAF] text-sm mb-1">{dimension.label}</p>
//                       <p className="text-[#F5F5F5] font-medium">{dimension.value}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Best For Section */}
//               <div className="bg-[#FD5A1E]/10 p-6 rounded-xl border border-[#FD5A1E]">
//                 <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Best For</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {machine.bestFor.map((item, index) => (
//                     <div key={index} className="flex items-start">
//                       <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       <span className="text-[#F5F5F5]">{item}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             {/* Right Column - Details */}
//             <div className="lg:col-span-5 xl:col-span-4">
//               {/* Description Box */}
//               <div className="bg-[#4d4d4d]/30 p-6 rounded-xl border border-[#a4acac] mb-6">
//                 <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Overview</h2>
//                 <div className="text-[#A5ACAF] space-y-4">
//                   <p>{machine.description}</p>
//                 </div>
//               </div>
              
//               {/* Tabbed Content */}
//               <div className="mb-6 bg-[#4d4d4d]/30 rounded-xl border border-[#a4acac] overflow-hidden">
//                 {/* Tab navigation */}
//                 <div className="flex border-b border-[#a4acac]">
//                   <button
//                     onClick={() => setActiveTab('features')}
//                     className={`flex-1 py-3 px-4 font-medium text-sm focus:outline-none transition-colors
//                       ${activeTab === 'features' 
//                         ? "bg-[#000000]/50 text-[#FD5A1E] border-b-2 border-[#FD5A1E]" 
//                         : "text-[#A5ACAF] hover:text-white hover:bg-[#000000]/30"
//                       }`}
//                     aria-selected={activeTab === 'features'}
//                     role="tab"
//                   >
//                     Features
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('specs')}
//                     className={`flex-1 py-3 px-4 font-medium text-sm focus:outline-none transition-colors
//                       ${activeTab === 'specs' 
//                         ? "bg-[#000000]/50 text-[#FD5A1E] border-b-2 border-[#FD5A1E]" 
//                         : "text-[#A5ACAF] hover:text-white hover:bg-[#000000]/30"
//                       }`}
//                     aria-selected={activeTab === 'specs'}
//                     role="tab"
//                   >
//                     Specifications
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('products')}
//                     className={`flex-1 py-3 px-4 font-medium text-sm focus:outline-none transition-colors
//                       ${activeTab === 'products' 
//                         ? "bg-[#000000]/50 text-[#FD5A1E] border-b-2 border-[#FD5A1E]" 
//                         : "text-[#A5ACAF] hover:text-white hover:bg-[#000000]/30"
//                       }`}
//                     aria-selected={activeTab === 'products'}
//                     role="tab"
//                   >
//                     Products
//                   </button>
//                 </div>
                
//                 {/* Tab content */}
//                 <div className="p-6">
//                   {/* Features Tab */}
//                   {activeTab === 'features' && (
//                     <div className="space-y-4">
//                       {machine.features.map((feature, index) => (
//                         <div key={index} className="bg-[#000000]/30 p-4 rounded-lg">
//                           <div className="flex items-center mb-2">
//                             <div className="bg-[#FD5A1E]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
//                               {feature.icon ? (
//                                 <span className="text-[#FD5A1E]" dangerouslySetInnerHTML={{ __html: feature.icon }} />
//                               ) : (
//                                 <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                 </svg>
//                               )}
//                             </div>
//                             <h3 className="font-medium text-white">{feature.title}</h3>
//                           </div>
//                           <p className="text-[#A5ACAF] text-sm pl-12">{feature.description}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}
                  
//                   {/* Specifications Tab */}
//                   {activeTab === 'specs' && (
//                     <div className="space-y-6">
//                       {machine.specifications.map((specGroup, groupIndex) => (
//                         <div key={groupIndex} className="space-y-2">
//                           <h3 className="font-medium text-white mb-2">{specGroup.category}</h3>
//                           <div className="bg-[#000000]/30 rounded-lg">
//                             {specGroup.items.map((item, itemIndex) => (
//                               <div 
//                                 key={itemIndex} 
//                                 className={`flex justify-between py-2 px-4 text-sm ${
//                                   itemIndex !== specGroup.items.length - 1 ? 'border-b border-[#a4acac]/30' : ''
//                                 }`}
//                               >
//                                 <span className="text-[#A5ACAF]">{item.label}</span>
//                                 <span className="text-[#F5F5F5] text-right">
//                                   {Array.isArray(item.value) ? item.value.join(', ') : item.value}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
                  
//                   {/* Products Tab */}
//                   {activeTab === 'products' && (
//                     <div>
//                       <p className="text-[#A5ACAF] mb-4">
//                         This machine can be stocked with a customized selection from our extensive product catalog:
//                       </p>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
//                         {machine.productOptions.map((product, index) => (
//                           <div key={index} className="flex items-start">
//                             <svg className="h-5 w-5 text-[#FD5A1E] mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             <span className="text-[#F5F5F5]">{product}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               {/* CTA Box */}
//               <div className="bg-[#000000] p-6 rounded-xl border border-[#FD5A1E]">
//                 <div className="flex items-center mb-4">
//                   <div className="bg-[#FD5A1E]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
//                     <svg className="w-6 h-6 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-white">Zero Cost Installation</h3>
//                     <p className="text-[#A5ACAF] text-sm">Installed completely free of charge</p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-4 mt-4">
//                   <Link 
//                     href="/contact" 
//                     className="flex-1 py-3 px-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg font-medium hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors text-center"
//                   >
//                     Request This Machine
//                   </Link>
//                   <Link 
//                     href="/proposal" 
//                     className="flex-1 py-3 px-4 border-2 border-[#FD5A1E] text-[#FD5A1E] rounded-lg font-medium hover:bg-[#FD5A1E]/10 transition-colors text-center"
//                   >
//                     View Proposal
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Maintenance Section */}
//       <section className="py-12 bg-gradient-to-b from-[#000000] to-[#4d4d4d]/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
//               Maintenance-Free Operation
//             </h2>
//             <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//               We handle all aspects of machine operation so you can focus on your business.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="bg-[#4d4d4d] rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
//               <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
//                 <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3 text-center">Regular Restocking</h3>
//               <p className="text-[#A5ACAF] text-center">
//                 We monitor inventory levels and proactively restock all products to ensure your machine is never empty.
//               </p>
//             </div>
            
//             <div className="bg-[#4d4d4d] rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
//               <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
//                 <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3 text-center">Maintenance & Repairs</h3>
//               <p className="text-[#A5ACAF] text-center">
//                 All maintenance, cleaning, and repairs are handled by our technicians at no cost to you.
//               </p>
//             </div>
            
//             <div className="bg-[#4d4d4d] rounded-xl p-6 border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
//               <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
//                 <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3 text-center">Technical Support</h3>
//               <p className="text-[#A5ACAF] text-center">
//                 24/7 support for any issues, with rapid response times and remote diagnostics capability.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Related Machines */}
//       <section className="py-12 bg-[#000000]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-2xl font-bold text-[#F5F5F5] mb-8">
//             Related Vending Machines
//           </h2>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {machine.relatedMachines.map((relatedMachine) => (
//               <Link
//                 key={relatedMachine.id}
//                 href={`/vending-machines/${relatedMachine.id}`}
//                 className="bg-[#4d4d4d]/30 rounded-xl overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all flex flex-col"
//               >
//                 <div className="relative h-48">
//                   <Image 
//                     src={relatedMachine.image} 
//                     alt={relatedMachine.name}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     className="object-cover"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-medium text-white">{relatedMachine.name}</h3>
//                   <p className="text-[#FD5A1E] text-sm">{relatedMachine.model}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
          
//           <div className="mt-8 text-center">
//             <Link
//               href="/vending-machines"
//               className="px-6 py-3 bg-[#4d4d4d] text-[#F5F5F5] font-medium rounded-full shadow-lg 
//                         hover:bg-[#4d4d4d]/80 transition-colors inline-flex items-center"
//             >
//               View All Machines
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </section>
      
//       {/* CTA Section */}
//       <section className="py-12 bg-[#FD5A1E]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
//             Ready to Enhance Your Workplace?
//           </h2>
//           <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
//             Join businesses enhancing employee satisfaction with our premium vending solutions.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link 
//               href="/contact" 
//               className="px-8 py-4 bg-[#F5F5F5] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#000000] hover:text-[#F5F5F5] hover:border-[#F5F5F5] border border-transparent transition-colors"
//             >
//               Contact Us Today
//             </Link>
//             <Link 
//               href="/proposal" 
//               className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#F5F5F5]/10 transition-colors"
//             >
//               View Our Proposal
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default VendingMachineDetailPage;