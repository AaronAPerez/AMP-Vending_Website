// 'use client';

// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import SplitCompareWithVideo from '@/components/comparison/SplitCompareWithVideo';
// import ExpandableCard from '@/components/ui/ExpandableCard';
// import ZeroCostExplanationContent from '../ZeroCostExplanationContent';
// import Image from 'next/image';


// /**
//  * Props for WorkplaceTransformSection component
//  */
// interface WorkplaceTransformSectionProps {
//   /**
//    * Optional className for additional styling
//    */
//   className?: string;
  
//   /**
//    * Optional ID for anchor links
//    * @default "workplace-transformation"
//    */
//   id?: string;
// }

// /**
//  * Background Beams Component
//  * Inspired by Aceternity UI
//  */
// const BackgroundBeams: React.FC<{ className?: string }> = ({ className }) => {
//   // SVG paths for the beams
//   const paths = [
//     'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
//     'M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867',
//     'M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859',
//     'M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851',
//     'M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843'
//   ];

//   // Random starting positions for beams
//   const getRandomParams = () => ({
//     x: Math.random() * 100 - 50,
//     delay: Math.random() * 0.5,
//     duration: 3 + Math.random() * 8
//   });

//   return (
//     <div className={`absolute inset-0 overflow-hidden opacity-40 ${className}`}>
//       <svg
//         className="absolute w-full h-full"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 800 800"
//         preserveAspectRatio="none"
//       >
//         {paths.map((path, i) => {
//           const { x, delay, duration } = getRandomParams();
          
//           return (
//             <motion.path
//               key={i}
//               d={path}
//               fill="none"
//               stroke="url(#beam-gradient)"
//               strokeWidth={2}
//               strokeOpacity={0.4}
//               initial={{ pathLength: 0, x }}
//               animate={{ 
//                 pathLength: [0, 1, 0],
//                 x: [x, x + 20, x - 20, x]
//               }}
//               transition={{
//                 pathLength: {
//                   duration,
//                   repeat: Infinity,
//                   repeatType: 'loop',
//                   ease: 'easeInOut',
//                   delay
//                 },
//                 x: {
//                   duration: duration * 2,
//                   repeat: Infinity,
//                   repeatType: 'mirror',
//                   ease: 'easeInOut',
//                   delay
//                 }
//               }}
//             />
//           );
//         })}
      
//         <defs>
//           <linearGradient id="beam-gradient" gradientTransform="rotate(90)">
//             <stop offset="0%" stopColor="#FD5A1E" stopOpacity="0" />
//             <stop offset="50%" stopColor="#FD5A1E" stopOpacity="0.6" />
//             <stop offset="100%" stopColor="#FD5A1E" stopOpacity="0" />
//           </linearGradient>
//         </defs>
//       </svg>
//     </div>
//   );
// };

// /**
//  * Parallax Effect Component
//  */
// const ParallaxEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });
  
//   // Create smooth motion values with spring physics
//   const springConfig = { stiffness: 150, damping: 30 };
//   const translateY = useSpring(
//     useTransform(scrollYProgress, [0, 1], [100, -100]), 
//     springConfig
//   );
//   const scale = useSpring(
//     useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]), 
//     springConfig
//   );
//   const opacity = useSpring(
//     useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]), 
//     springConfig
//   );
  
//   return (
//     <div ref={containerRef} className="relative">
//       <motion.div
//         style={{ translateY, scale, opacity }}
//         className="flex-1"
//       >
//         {children}
//       </motion.div>
//     </div>
//   );
// };

// /**
//  * Advanced Technology Content Component
//  */
// const AdvancedTechnologyContent: React.FC = () => {
//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-3">
//           <h4 className="font-semibold text-whitesmoke">Cutting-Edge Features</h4>
//           <ul className="list-disc pl-5 text-silver space-y-1 text-sm">
//             <li>21.5&quot; HD Touchscreen Interface</li>
//             <li>Remote Inventory Monitoring</li>
//             <li>Contactless Payment Options</li>
//             <li>Digital Product Information</li>
//             <li>Energy-Efficient Operations</li>
//           </ul>
//         </div>
        
//         <div className="bg-primary-black/40 rounded-lg overflow-hidden">
//           <div className="relative h-48 w-full">
//             <Image
//               src="/images/touchscreen.jpg"
//               alt="Modern vending machine touchscreen interface"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /**
//  * Employee Benefits Content Component
//  */
// const EmployeeBenefitsContent: React.FC = () => {
//   return (
//     <div className="space-y-4">
//       <p className="text-whitesmoke">
//         Premium vending machines enhance workplace satisfaction through:
//       </p>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//         <div className="bg-dark-gray/20 p-3 rounded-lg">
//           <h4 className="font-semibold text-orange mb-2">Time Efficiency</h4>
//           <p className="text-sm text-silver">
//             Employees save valuable break time by having refreshments available on-site.
//           </p>
//         </div>
        
//         <div className="bg-dark-gray/20 p-3 rounded-lg">
//           <h4 className="font-semibold text-orange mb-2">Personalized Options</h4>
//           <p className="text-sm text-silver">
//             Customized product selection based on employee preferences.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// /**
//  * WorkplaceTransformSection Component
//  * 
//  * A section container for the before/after workplace comparison with video
//  * Enhanced with Aceternity UI-inspired components
//  */
// const WorkplaceTransformSection: React.FC<WorkplaceTransformSectionProps> = ({ 
//   className = "",
//   id = "workplace-transformation" 
// }) => {
//   return (
//     <section 
//       id={id}
//       className={`relative py-16 md:py-32 bg-primary-black overflow-hidden ${className}`}
//       aria-labelledby="workplace-transform-heading"
//     >
//       {/* Background Effects */}
//       <BackgroundBeams />
      
//       {/* Grid pattern */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div 
//           className="absolute inset-0 opacity-5"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H20V20H0V0Z' fill='none' stroke='%23A5ACAF' stroke-width='0.2'/%3E%3C/svg%3E")`,
//             backgroundSize: '20px 20px'
//           }}
//           aria-hidden="true"
//         />
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
//         {/* Floating Heading with Parallax Effect */}
//         <div className="mb-16">
//           <ParallaxEffect>
//             <div className="text-center">
//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//               >
//                 <span className="inline-block px-3 py-1 bg-orange/10 text-orange text-sm font-medium rounded-full mb-4">
//                   Workplace Transformation
//                 </span>
//                 <h2 
//                   id="workplace-transform-heading"
//                   className="text-4xl md:text-5xl font-bold text-whitesmoke mb-6"
//                 >
//                   <span className="inline-block">Enhanced Work Environment</span>
//                 </h2>
//                 <p className="text-xl text-silver max-w-3xl mx-auto">
//                   See how premium vending machines transform ordinary workplaces into 
//                   modern, employee-focused environments with zero-cost implementation.
//                 </p>
//               </motion.div>
//             </div>
//           </ParallaxEffect>
//         </div>
        
//         {/* Main Split Compare with Video */}
//         <ParallaxEffect>
//           <SplitCompareWithVideo
//             beforeSrc="/images/before-vending-machine.jpg"
//             beforeAlt="Break room before vending machines installation"
//             afterSrc="/images/after-vending-machine.jpg"
//             afterAlt="Break room after vending machines installation"
//             videoSrc="/videos/premium-vending-demo.mp4"
//             videoPoster="/images/vending-video-poster.jpg"
//             videoDescription="See our premium vending machine with 21.5 inch touchscreen in action"
//             autoplayVideo={true}
//             className="mb-16"
//           />
//         </ParallaxEffect>
        
//         {/* Expandable Feature Cards */}
//         <div className="mt-16 space-y-6 max-w-4xl mx-auto">
//           <h3 className="text-2xl font-bold text-center text-whitesmoke mb-8">
//             Premium Vending Benefits
//           </h3>
          
//           <ExpandableCard
//             title="Zero-Cost Implementation"
//             subtitle="No upfront investment required"
//             iconName="payment"
//             content={<ZeroCostExplanationContent />}
//             defaultExpanded={true}
//             className="shadow-highlight"
//           />
          
//           <ExpandableCard
//             title="Advanced Technology"
//             subtitle="Modern touchscreen interfaces with multiple payment options"
//             iconName="technology"
//             content={<AdvancedTechnologyContent />}
//             colorTheme="orange"
//           />
          
//           <ExpandableCard
//             title="Employee Satisfaction"
//             subtitle="Enhance workplace experience and productivity"
//             iconName="satisfaction"
//             content={<EmployeeBenefitsContent />}
//             colorTheme="silver"
//           />
//         </div>
        
//         {/* CTA */}
//         <div className="mt-16 text-center">
//           <h3 className="text-2xl font-bold text-whitesmoke mb-4">Ready to Transform Your Workplace?</h3>
//           <p className="text-silver mb-8 max-w-2xl mx-auto">
//             Join businesses like Stanislaus Regional Transit Authority who are enhancing 
//             their work environments with zero-cost vending solutions.
//           </p>
          
//           <div className="flex flex-wrap justify-center gap-4">
//             <a 
//               href="/contact" 
//               className="px-8 py-3 bg-orange text-whitesmoke rounded-full font-medium shadow-highlight hover:bg-orange/90 transition-colors"
//             >
//               Schedule a Consultation
//             </a>
//             <a 
//               href="/proposal" 
//               className="px-8 py-3 border border-silver text-whitesmoke rounded-full font-medium hover:bg-dark-gray transition-colors"
//             >
//               View Proposal
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WorkplaceTransformSection;