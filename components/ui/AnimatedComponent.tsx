// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// interface CtaButton {
//   text: string;
//   href: string;
// }

// interface ResponsiveHeroProps {
//   /**
//    * Hero title - can include JSX for styling parts differently
//    */
//   title: React.ReactNode;
  
//   /**
//    * Subtitle text to display below the title
//    */
//   subtitle: string;
  
//   /**
//    * Primary call to action button
//    */
//   primaryCta?: CtaButton;
  
//   /**
//    * Secondary call to action button
//    */
//   secondaryCta?: CtaButton;
  
//   /**
//    * Optional className for additional styling
//    */
//   className?: string;
  

// }

//   /**
//  * ResponsiveHero Component
//  * Accessible hero section with product grid background and animated content
//  */

// const ResponsiveHero: React.FC<ResponsiveHeroProps> = ({
//   title,
//   subtitle,
//   primaryCta,
//   secondaryCta,
//   className = ''
// }) => {
//   // Images for product grid background
//   const productImages = [
//     '/images/products/lays.jpg',
//     '/images/products/doritos.jpg',
//     '/images/products/snickers.jpg',
//     '/images/products/kitkat.jpg',
//     '/images/products/coke.jpg',
//     '/images/products/monster.jpg',
//     '/images/products/poptarts.jpg',
//     '/images/products/gatorade.jpg',
//     '/images/products/starburst.jpg',
//     '/images/products/RedBull.jpg',
//     '/images/products/cheetos.jpg',
//     '/images/products/mms.jpg',
//     '/images/products/orangecrush.jpg',
//     '/images/products/mountaindew.jpg',
//     '/images/products/threemusketeers.jpg',
//     '/images/products/fanta.jpg',
//     '/images/products/skittles.jpg',
//     '/images/products/drpepper.jpg',
//     '/images/products/Sprite.jpg',
//     '/images/products/layssourcream.jpg',
//   ];
  
//   // State to manage parallax effect
//   const [scrollY, setScrollY] = useState(0);
  
//   // Track scroll position for parallax effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };
    
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   return (
//     <div 
//       className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
//       aria-labelledby="hero-heading"
//     >
//       {/* Product grid background with parallax effect */}
//       <div 
//         className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2 p-2 z-10"
//         aria-hidden="true"
//       >
//         {productImages.map((src, index) => {
//           // Calculate parallax offset based on index and scroll position
//           const offset = Math.min(scrollY * 0.1 * (index % 6 + 1) * 0.2, 100);
//           const opacity = Math.max(0.3, 1 - (scrollY * 0.001));
          
//           return (
//             <div
//               key={index}
//               className="relative rounded-lg overflow-hidden w-full h-50"
//               style={{
//                 transform: `translateY(${offset}px)`,
//                 transition: 'transform 0.3s ease-out',
//                 opacity
//               }}
//             >
//               {/* Product background image */}
//               <div className="absolute inset-0 z-0">
//                 <Image
//                   src={src}
//                   alt=""
//                   fill
//                   sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
//                   className="object-cover"
//                   priority={index < 5}
//                   onError={(e) => {
//                     // Fallback if image doesn't load
//                     e.currentTarget.style.display = 'none';
//                   }}
//                 />
//               </div>
              
//               {/* Subtle gradient overlay */}
//               <div 
//                 className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50"
//               ></div>
//             </div>
//           );
//         })}
//       </div>
      
//       {/* Dark overlay */}
//       <div 
//         className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black z-10" 
//         aria-hidden="true"
//       ></div>
      
//       {/* Hero content */}
//       <motion.div
//         className="relative z-30 text-center px-4 sm:px-6 max-w-5xl"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1
//           id="hero-heading"
//           className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 drop-shadow-xl"
//         >
//           {title}
//         </h1>
        
//         <motion.p 
//           className="text-xl md:text-2xl text-[#F5F5F5] mb-8 drop-shadow-lg max-w-3xl mx-auto"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           {subtitle}
//         </motion.p>
        
//         {/* CTA Buttons */}
//         <motion.div 
//           className="flex flex-wrap justify-center gap-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//         >
//           {primaryCta && (
//             <Link
//               href={primaryCta.href}
//               className="px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
//               aria-label={primaryCta.text}
//             >
//               {primaryCta.text}
//             </Link>
//           )}
          
//           {secondaryCta && (
//             <Link
//               href={secondaryCta.href}
//               className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#FD5A1E] hover:border-[#FD5A1E] transition-colors"
//               aria-label={secondaryCta.text}
//             >
//               {secondaryCta.text}
//             </Link>
//           )}
//         </motion.div>
//       </motion.div>
      
//        {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 2.5, duration: 0.6 }}
//         className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block"
//       >
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           className="text-white/60 cursor-pointer text-center hover:text-white/80 transition-colors"
//           onClick={() => {
//             const nextSection = document.querySelector('main section:nth-child(2)');
//             nextSection?.scrollIntoView({ behavior: 'smooth' });
//           }}
//           role="button"
//           tabIndex={0}
//           aria-label="Scroll to explore"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' || e.key === ' ') {
//               const nextSection = document.querySelector('main section:nth-child(2)');
//               nextSection?.scrollIntoView({ behavior: 'smooth' });
//             }
//           }}
//         >
//           <div className="flex flex-col items-center">
//             <span className="text-sm mb-3 font-medium">Scroll to explore</span>
//             <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
//               <motion.div
//                 animate={{ y: [0, 12, 0] }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                 className="w-1 h-3 bg-white/60 rounded-full mt-2"
//               />
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default ResponsiveHero;