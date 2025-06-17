// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
// import { 
//   ChevronLeftIcon, 
//   ChevronRightIcon, 
//   MonitorIcon, 
//   CreditCardIcon,
//   WifiIcon,
//   ZapIcon,
//   CheckCircleIcon,
//   ArrowRightIcon
// } from 'lucide-react';

// // Import your existing data utilities
// import { 
//   getAllVendingMachines, 
//   normalizeMachineData,
//   type MachineData 
// } from '@/lib/data/vendingMachineData';

// /**
//  * Props interface for the 
//  *MachineShowcase component
//  */
// interface MachineShowcaseProps {
//   /**
//    * Optional className for custom styling
//    */
//   className?: string;
  
//   /**
//    * Maximum number of machines to display
//    * @default 2
//    */
//   maxMachines?: number;
  
//   /**
//    * Whether to show the "View All Machines" CTA
//    * @default true
//    */
//   showViewAllCTA?: boolean;
  
//   /**
//    * Custom heading text
//    * @default "Our Premium Vending Solutions"
//    */
//   heading?: string;
  
//   /**
//    * Custom description text
//    */
//   description?: string;
// }

// /**
//  * Props for individual machine showcase cards
//  */
// interface MachineShowcaseCardProps {
//   machine: MachineData;
//   index: number;
//   isActive: boolean;
//   onSelect: () => void;
// }

// /**
//  * Technology indicator component for displaying machine features
//  */
// interface TechIndicatorProps {
//   icon: React.ElementType;
//   label: string;
//   available: boolean;
// }

// const TechIndicator = ({ icon: Icon, label, available }: TechIndicatorProps) => {
//   if (!available) return null;

//   return (
//     <div className="flex items-center px-3 py-2 bg-[#111111]/80 rounded-full border border-[#333333] backdrop-blur-sm">
//       <Icon size={16} className="text-[#FD5A1E] mr-2" aria-hidden="true" />
//       <span className="text-[#F5F5F5] text-sm font-medium">{label}</span>
//     </div>
//   );
// };

// /**
//  * Individual machine showcase card component
//  * Displays machine image, key features, and CTA
//  */
// const MachineShowcaseCard = ({ machine, index, isActive, onSelect }: MachineShowcaseCardProps) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
//   // Normalize machine data for consistent display
//   const normalizedMachine = normalizeMachineData(machine);
  
//   if (!normalizedMachine) return null;

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, delay: index * 0.2 }}
//       className={`relative group cursor-pointer transition-all duration-500 ${
//         isActive ? 'scale-105 z-10' : 'scale-95 hover:scale-100'
//       }`}
//       onClick={onSelect}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//           e.preventDefault();
//           onSelect();
//         }
//       }}
//       tabIndex={0}
//       role="button"
//       aria-label={`View details for ${normalizedMachine.name}`}
//     >
//       {/* Main card container */}
//       <div className="relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl overflow-hidden border border-[#333333] group-hover:border-[#FD5A1E]/50 transition-all duration-500 shadow-2xl">
        
//         {/* Image section with overlay */}
//         <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
//           <Image
//             src={normalizedMachine.image}
//             alt={`${normalizedMachine.name} - Premium vending machine with professional installation`}
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className="object-cover transition-transform duration-700 group-hover:scale-110"
//             priority={index === 0}
//           />
          
//           {/* Gradient overlay for text readability */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
//           {/* Category badge */}
//           <div className="absolute top-4 left-4">
//             <span className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
//               machine.category === 'refrigerated' ? 'bg-blue-600/90' : 'bg-green-600/90'
//             }`}>
//               {machine.category === 'refrigerated' ? 'Refrigerated' : 'Non-Refrigerated'}
//             </span>
//           </div>

//           {/* Technology indicators overlay */}
//           <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-[200px]">
//             <TechIndicator 
//               icon={MonitorIcon} 
//               label="HD Touch" 
//               available={machine.features?.some(f => f.title.includes('21.5')) || false} 
//             />
//             <TechIndicator 
//               icon={CreditCardIcon} 
//               label="Tap-to-Pay" 
//               available={true} 
//             />
//           </div>

//           {/* Bottom overlay with machine info */}
//           <div className="absolute bottom-0 left-0 right-0 p-6">
//             <div className="space-y-3">
//               {/* Machine name and model */}
//               <div>
//                 <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-1">
//                   {normalizedMachine.name}
//                 </h3>
//                 <p className="text-[#FD5A1E] font-semibold text-lg">
//                   {normalizedMachine.model}
//                 </p>
//               </div>

//               {/* Short description */}
//               <p className="text-[#A5ACAF] text-sm leading-relaxed line-clamp-2">
//                 {normalizedMachine.shortDescription}
//               </p>

//               {/* Key highlights */}
//               <div className="flex flex-wrap gap-2">
//                 {normalizedMachine.highlights?.slice(0, 2).map((highlight, idx) => (
//                   <div 
//                     key={idx}
//                     className="flex items-center px-3 py-1 bg-[#FD5A1E]/20 rounded-full"
//                   >
//                     <CheckCircleIcon size={14} className="text-[#FD5A1E] mr-2" aria-hidden="true" />
//                     <span className="text-[#F5F5F5] text-xs font-medium">{highlight}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action section */}
//         <div className="p-6 bg-gradient-to-r from-[#111111] to-[#0a0a0a]">
//           <div className="flex items-center justify-between">
//             <div className="space-y-1">
//               <p className="text-[#A5ACAF] text-sm">
//                 {normalizedMachine.bestFor?.split(',')[0] || 'Professional Installation'}
//               </p>
//               <div className="flex items-center space-x-4 text-xs text-[#FD5A1E]">
//                 <span className="flex items-center">
//                   <WifiIcon size={12} className="mr-1" aria-hidden="true" />
//                   Smart Monitoring
//                 </span>
//                 <span className="flex items-center">
//                   <ZapIcon size={12} className="mr-1" aria-hidden="true" />
//                   Energy Efficient
//                 </span>
//               </div>
//             </div>
            
//             <Link
//               href={`/vending-machines/${normalizedMachine.id}`}
//               className="flex items-center px-4 py-2 bg-[#FD5A1E] text-[#000000] rounded-full font-semibold hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black text-sm"
//               aria-label={`Learn more about ${normalizedMachine.name}`}
//             >
//               Learn More
//               <ArrowRightIcon size={16} className="ml-2" aria-hidden="true" />
//             </Link>
//           </div>
//         </div>

//         {/* Hover effect glow */}
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FD5A1E]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
//       </div>
//     </motion.div>
//   );
// };

// /**
//  * 
//  *MachineShowcase Component
//  * 
//  * Displays a curated selection of vending machines with interactive carousel
//  * and detailed information cards. Features responsive design, accessibility
//  * support, and smooth animations.
//  */
// const MachineShowcase = ({
//   className = '',
//   maxMachines = 2,
//   showViewAllCTA = true,
//   heading = "Our Premium Vending Solutions",
//   description
// }: MachineShowcaseProps) => {
//   // State management
//   const [machines, setMachines] = useState<MachineData[]>([]);
//   const [activeMachineIndex, setActiveMachineIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Refs for accessibility and animations
//   const sectionRef = useRef<HTMLElement>(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

//   /**
//    * Initialize machine data on component mount
//    */
//   useEffect(() => {
//     try {
//       const allMachines = getAllVendingMachines();
//       const limitedMachines = allMachines.slice(0, maxMachines);
//       setMachines(limitedMachines);
//     } catch (err) {
//       console.error('Error loading vending machine data:', err);
//       setError('Failed to load vending machines');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [maxMachines]);

//   /**
//    * Handle machine selection with keyboard support
//    */
//   const handleMachineSelect = (index: number) => {
//     setActiveMachineIndex(index);
    
//     // Optional: Analytics tracking
//     if (typeof window !== 'undefined' && 'gtag' in window) {
//       window.gtag('event', 'machine_showcase_select', {
//         event_category: 'Engagement',
//         event_label: machines[index]?.name,
//         value: index
//       });
//     }
//   };

//   /**
//    * Navigate to next machine
//    */
//   const handleNext = () => {
//     setActiveMachineIndex((prev) => (prev + 1) % machines.length);
//   };

//   /**
//    * Navigate to previous machine
//    */
//   const handlePrevious = () => {
//     setActiveMachineIndex((prev) => (prev - 1 + machines.length) % machines.length);
//   };

//   /**
//    * Keyboard navigation handler
//    */
//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     switch (event.key) {
//       case 'ArrowLeft':
//         event.preventDefault();
//         handlePrevious();
//         break;
//       case 'ArrowRight':
//         event.preventDefault();
//         handleNext();
//         break;
//     }
//   };

//   // Auto-rotation effect (optional)
//   useEffect(() => {
//     if (machines.length <= 1) return;

//     const interval = setInterval(() => {
//       setActiveMachineIndex((prev) => (prev + 1) % machines.length);
//     }, 8000); // Rotate every 8 seconds

//     return () => clearInterval(interval);
//   }, [machines.length]);

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className={`flex justify-center items-center py-12 ${className}`}>
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FD5A1E]" />
//         <span className="ml-3 text-[#A5ACAF]">Loading machines...</span>
//       </div>
//     );
//   }

//   // Show error state
//   if (error || machines.length === 0) {
//     return (
//       <div className={`text-center py-12 ${className}`}>
//         <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
//           <h3 className="text-lg font-semibold text-red-400 mb-2">
//             Unable to Load Machines
//           </h3>
//           <p className="text-red-300 text-sm">
//             {error || 'No vending machines available to display.'}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section 
//       ref={sectionRef}
//       className={`relative overflow-hidden ${className}`}
//       aria-labelledby="showcase-heading"
//       onKeyDown={handleKeyDown}
//       tabIndex={-1}
//     >
//       {/* Section Header */}
//       <motion.div
//         className="text-center mb-12 max-w-4xl mx-auto"
//         initial={{ opacity: 0, y: 30 }}
//         animate={isInView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 
//           id="showcase-heading"
//           className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-6"
//         >
//           {heading}
//         </h2>
        
//         <p className="text-lg sm:text-xl text-[#A5ACAF] leading-relaxed">
//           {description || `Experience the future of workplace refreshment with our state-of-the-art vending machines featuring advanced technology, professional installation, and complete maintenance service.`}
//         </p>
//       </motion.div>

//       {/* Machine Showcase */}
//       <div className="relative">
//         {/* Main showcase area */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
//           {machines.map((machine, index) => (
//             <MachineShowcaseCard
//               key={machine.id}
//               machine={machine}
//               index={index}
//               isActive={index === activeMachineIndex}
//               onSelect={() => handleMachineSelect(index)}
//             />
//           ))}
//         </div>

//         {/* Navigation controls for multiple machines */}
//         {machines.length > 1 && (
//           <motion.div
//             className="flex items-center justify-center space-x-4 mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <button
//               onClick={handlePrevious}
//               className="p-3 bg-[#111111] border border-[#333333] rounded-full hover:border-[#FD5A1E] hover:bg-[#FD5A1E]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
//               aria-label="View previous machine"
//             >
//               <ChevronLeftIcon size={20} className="text-[#F5F5F5]" />
//             </button>

//             {/* Dots indicator */}
//             <div className="flex space-x-2">
//               {machines.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleMachineSelect(index)}
//                   className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] ${
//                     index === activeMachineIndex 
//                       ? 'bg-[#FD5A1E] scale-125' 
//                       : 'bg-[#333333] hover:bg-[#FD5A1E]/50'
//                   }`}
//                   aria-label={`View ${machines[index].name}`}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={handleNext}
//               className="p-3 bg-[#111111] border border-[#333333] rounded-full hover:border-[#FD5A1E] hover:bg-[#FD5A1E]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
//               aria-label="View next machine"
//             >
//               <ChevronRightIcon size={20} className="text-[#F5F5F5]" />
//             </button>
//           </motion.div>
//         )}

//         {/* Call to Action */}
//         {showViewAllCTA && (
//           <motion.div
//             className="text-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.6 }}
//           >
//             <Link
//               href="/vending-machines"
//               className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FD5A1E] to-[#FD5A1E]/90 text-[#000000] font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
//             >
//               <span>View All Machines</span>
//               <ArrowRightIcon size={20} className="ml-3" aria-hidden="true" />
//             </Link>
            
//             <p className="mt-4 text-[#A5ACAF] text-sm">
//               Explore our complete collection of premium vending solutions
//             </p>
//           </motion.div>
//         )}
//       </div>

//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#FD5A1E]/5 to-transparent rounded-full blur-3xl -z-10" />
//       <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#FD5A1E]/5 to-transparent rounded-full blur-3xl -z-10" />
//     </section>
//   );
// };

// export default MachineShowcase;