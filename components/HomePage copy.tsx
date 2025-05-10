// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import ShowcaseLensEffect from '@/components/ShowcaseLensEffect';
// import Link from 'next/link';
// import Image from 'next/image';
// import SplitHeroSection from '@/components/hero/SplitHeroSection';
// import SplitHeroWithVideo from './hero/SplitHeroWithVideo';

// /**
//  * HomePage Component 
//  * Main landing page for AMP Vending Machines website
//  */
// const HomePage = () => {
//  // State hooks
//  const [isClient, setIsClient] = useState(false);
  
//  // Detect if we're running on client for animations
//  useEffect(() => {
//    setIsClient(true);
//  }, []);

//  return (
//    <div className="flex flex-col min-h-screen overflow-hidden py-4">
//      {/* Enhanced Hero Section with animated CTA buttons */}
//      <SplitHeroWithVideo
//        title="Premium Workplace Vending"
//        highlightedTitle="at Zero Cost to you"
//        subtitle="Enhance your workplace with state-of-the-art vending machines offering 50+ snack options and 20+ beverage options."
//        videoSrc="/video/vending-machine-demo.mp4"
//        posterSrc="/images/hero-poster.jpg"
//        primaryButtonText="View Machines"
//        primaryButtonHref="/vending-machines"
//        secondaryButtonText="Contact Us"
//        secondaryButtonHref="/contact"
//      />
     
//      {/* Transition element */}
//      <div className="h-32 bg-gradient-to-b from-transparent to-[#000000] -mt-32 relative z-20"></div>
     
//      {/* Vending Machine Showcase Section */}
//      <section className="py-16 bg-[#000000]">
//        <ShowcaseLensEffect />
//      </section>


//       {/* Workplace Benefits Section */}
//       <section className="py-16 bg-[#4d4d4d]/20 border-t border-[#4d4d4d]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//               Transform Your Workplace
//             </h2>
//             <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//               See how our premium vending machines enhance employee satisfaction and workplace convenience.
//             </p>
//           </div>

//           {/* Before/After Comparison */}
//           <div className="mb-16 bg-[#000000] rounded-xl overflow-hidden border border-[#a4acac]">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-[#A5ACAF] mb-4">Before AMP Vending</h3>
//                 <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
//                   <Image 
//                     src="/images/before-after/before-breakroom.jpg" 
//                     alt="Break room before vending machine installation" 
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <ul className="space-y-2">
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                     <span className="text-[#A5ACAF]">Limited refreshment options</span>
//                   </li>
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                     <span className="text-[#A5ACAF]">Employees leave premises for breaks</span>
//                   </li>
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                     <span className="text-[#A5ACAF]">Break time wasted traveling</span>
//                   </li>
//                 </ul>
//               </div>
              
//               <div className="p-6 bg-gradient-to-r from-[#FD5A1E]/5 to-transparent">
//                 <h3 className="text-xl font-bold text-[#FD5A1E] mb-4">After AMP Vending</h3>
//                 <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
//                   <Image 
//                     src="/images/machines/after-vending-machine-crop.jpg" 
//                     alt="Break room after vending machine installation" 
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <ul className="space-y-2">
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span className="text-[#F5F5F5]">50+ customizable product options</span>
//                   </li>
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span className="text-[#F5F5F5]">Modern touchscreen interface</span>
//                   </li>
//                   <li className="flex items-start">
//                     <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span className="text-[#F5F5F5]">Enhanced employee satisfaction</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Rest of your page content... */}
//         </div>
//       </section>

//       {/* Add the rest of your page sections here */}
      
//       {/* Enhanced CTA Section with Animated Buttons */}
//       <section className="py-16 bg-[#FD5A1E] text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Premium Refreshments, Zero Hassle
//           </h2>
//           <p className="text-xl max-w-3xl mx-auto mb-8">
//             Join leading workplaces enjoying state-of-the-art vending with no costs and no maintenance worries.
//           </p>
          
//           {/* Enhanced CTA Buttons */}
//           <div className="flex flex-wrap justify-center gap-4">
//             {/* Primary CTA with glow effect */}
//             <Link
//               href="/contact"
//               className="group relative px-8 py-4 bg-white text-black font-medium rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:shadow-white/30 hover:shadow-2xl"
//             >
//               {/* Glow effect */}
//               <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <span className="absolute inset-0 w-full h-full bg-white blur-md transform scale-110"></span>
//               </span>
              
//               {/* Button content */}
//               <span className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300">
//                 Get Started
//               </span>
//             </Link>
            
//             {/* Secondary CTA with hover effect */}
//             <Link
//               href="/vending-machines"
//               className="group relative px-8 py-4 border-2 border-white text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-black/30"
//             >
//               {/* Background effect */}
//               <span className="absolute inset-0 w-full h-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-30"></span>
              
//               {/* Button content */}
//               <span className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300">
//                 View Machines
//               </span>
//             </Link>
//           </div>
//         </div>
//       </section>
      
//       {/* Testimonials Section with Enhanced Animations */}
//       <section className="py-16 bg-[#000000] border-t border-[#4d4d4d]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//               What Our Clients Say
//             </h2>
//             <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//               Hear from businesses that have enhanced their workplace with our vending solutions.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Testimonial 1 - With enhanced animations */}
//             <div className="bg-[#4d4d4d] rounded-lg shadow-lg border border-[#a4acac] p-6 overflow-visible hover:border-[#FD5A1E] transition-all duration-300 group">
//               <div className="relative">
//                 {/* Quote mark decorative element */}
//                 <div className="absolute -top-8 -left-2 text-6xl text-[#FD5A1E] opacity-30 font-serif group-hover:opacity-80 transition-opacity duration-300">&quot;</div>
                
//                 <blockquote className="relative z-10">
//                   <p className="text-[#F5F5F5] italic mb-4 pl-4 group-hover:text-white transition-colors duration-300">
//                     Our employees love having access to snacks and drinks during their breaks. It's made a noticeable difference in workplace satisfaction.
//                   </p>
//                   <div className="flex items-center">
//                     {/* Avatar with pulsing effect on hover */}
//                     <div className="w-12 h-12 rounded-full bg-[#000000] flex items-center justify-center text-[#FD5A1E] mr-4 border border-[#a4acac] group-hover:border-[#FD5A1E] transition-colors duration-300 relative">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
                      
//                       {/* Pulse effect on hover */}
//                       <span className="absolute inset-0 rounded-full border border-[#FD5A1E] opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
//                     </div>
//                     <div>
//                       <div className="font-semibold text-[#F5F5F5] group-hover:text-white transition-colors duration-300">Operations Manager</div>
//                       <div className="text-sm text-[#A5ACAF] group-hover:text-[#FD5A1E] transition-colors duration-300">Regional Transit Authority</div>
//                     </div>
//                   </div>
//                 </blockquote>
//               </div>
//             </div>
            
//             {/* Testimonial 2 - With enhanced animations */}
//             <div className="bg-[#4d4d4d] rounded-lg shadow-lg border border-[#a4acac] p-6 overflow-visible hover:border-[#FD5A1E] transition-all duration-300 group">
//               <div className="relative">
//                 {/* Quote mark decorative element */}
//                 <div className="absolute -top-8 -left-2 text-6xl text-[#FD5A1E] opacity-30 font-serif group-hover:opacity-80 transition-opacity duration-300">&quot;</div>
                
//                 <blockquote className="relative z-10">
//                   <p className="text-[#F5F5F5] italic mb-4 pl-4 group-hover:text-white transition-colors duration-300">
//                     The touchscreen interface and variety of payment options makes this such a convenient solution for our break room. Zero maintenance on our part!
//                   </p>
//                   <div className="flex items-center">
//                     {/* Avatar with pulsing effect on hover */}
//                     <div className="w-12 h-12 rounded-full bg-[#000000] flex items-center justify-center text-[#FD5A1E] mr-4 border border-[#a4acac] group-hover:border-[#FD5A1E] transition-colors duration-300 relative">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
                      
//                       {/* Pulse effect on hover */}
//                       <span className="absolute inset-0 rounded-full border border-[#FD5A1E] opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
//                     </div>
//                     <div>
//                       <div className="font-semibold text-[#F5F5F5] group-hover:text-white transition-colors duration-300">Facilities Director</div>
//                       <div className="text-sm text-[#A5ACAF] group-hover:text-[#FD5A1E] transition-colors duration-300">Manufacturing Company</div>
//                     </div>
//                   </div>
//                 </blockquote>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;