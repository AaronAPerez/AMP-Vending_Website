// 'use client';

// import React from 'react';
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   MotionValue,
// } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';

// interface Product {
//   title: string;
//   thumbnail: string;
//   link: string;
// }

// interface HeroParallaxProps {
//   products: Product[];
//   children?: React.ReactNode;
// }

// export const HeroParallax: React.FC<HeroParallaxProps> = ({ products, children }) => {
//   const ref = React.useRef(null);
  
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ['start start', 'end start'],
//   });

//   const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

//   const translateX = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, 1000]),
//     springConfig
//   );
  
//   const translateXReverse = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, -1000]),
//     springConfig
//   );
  
//   const opacity = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
//     springConfig
//   );

//   const rotateX = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [15, 0]),
//     springConfig
//   );
  
//   const rotateZ = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [20, 0]),
//     springConfig
//   );
  
//   const translateY = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
//     springConfig
//   );

//   const first = Math.floor(products.length / 3);
//   const second = Math.floor(products.length / 3);
//   const third = products.length - first - second;

//   const firstRow = products.slice(0, first);
//   const secondRow = products.slice(first, first + second);
//   const thirdRow = products.slice(first + second);

//  return (
//     <div
//       ref={ref}
//       className="h-[300vh] relative overflow-hidden antialiased"
//       style={{
//         perspective: '1000px',
//       }}
//     >
//       {/* Top section - Sticky content area */}
//       <div className="sticky top-0 h-screen overflow-hidden">
//         <motion.div
//           style={{
//             rotateX,
//             rotateZ,
//             translateY,
//             opacity,
//           }}
//           className="absolute inset-0"
//         >
//           {/* Children content */}
//           <motion.div className="relative max-w-7xl mx-auto z-20 h-full">
//             {children}
//           </motion.div>

//           {/* Products Grid */}
//           <motion.div
//             style={{
//               transform: 'translateZ(0px)',
//             }}
//             className="absolute inset-0 flex flex-col"
//           >
//             {/* First Row */}
//             <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
//               {firstRow.map((product, idx) => (
//                 <ProductCard
//                   key={`product-first-row-${idx}`}
//                   product={product}
//                   translate={translateX}
//                   className="flex-shrink-0"
//                 />
//               ))}
//             </motion.div>

//             {/* Second Row */}
//             <motion.div className="flex flex-row mb-20 space-x-20">
//               {secondRow.map((product, idx) => (
//                 <ProductCard
//                   key={`product-second-row-${idx}`}
//                   product={product}
//                   translate={translateXReverse}
//                   className="flex-shrink-0"
//                 />
//               ))}
//             </motion.div>

//             {/* Third Row */}
//             <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
//               {thirdRow.map((product, idx) => (
//                 <ProductCard
//                   key={`product-third-row-${idx}`}
//                   product={product}
//                   translate={translateX}
//                   className="flex-shrink-0"
//                 />
//               ))}
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const ProductCard: React.FC<{
//   product: Product;
//   translate: MotionValue<number>;
//   className?: string;
// }> = ({ product, translate, className = '' }) => {
//   return (
//     <motion.div
//       style={{
//         x: translate,
//       }}
//       whileHover={{
//         y: -20,
//       }}
//       className={`group/product h-96 w-[30rem] relative flex-shrink-0 ${className}`}
//     >
//       <Link
//         href={product.link}
//         className="block group-hover/product:shadow-2xl"
//       >
//         <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#4d4d4d]/30 backdrop-blur-sm border border-[#a4acac] hover:border-[#FD5A1E] transition-colors duration-300">
//           <Image
//             src={product.thumbnail}
//             height={600}
//             width={600}
//             className="absolute inset-0 h-full w-full object-cover object-center"
//             alt={product.title}
//             quality={75}
//             placeholder="blur"
//             blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAIDAAAAAAAAAAAAAAABAgMABAURE//EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERAv/aAAwDAQACEQMRAD8Aloqk6gDFsT0Vep4AeE//2Q=="
//           />

//           {/* Overlay on hover */}
//           <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-70 bg-black pointer-events-none transition-opacity duration-300"></div>

//           {/* Title - Only visible on hover */}
//           <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-xl font-semibold transition-opacity duration-300">
//             {product.title}
//           </h2>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// // // Additional hover animations component
// // export const FloatingElement: React.FC<{
// //   children: React.ReactNode;
// //   delay?: number;
// // }> = ({ children, delay = 0 }) => {
// //   const y = useSpring(0, { stiffness: 200, damping: 50 });
  
// //   React.useEffect(() => {
// //     const interval = setInterval(() => {
// //       const newY = Math.sin(Date.now() / 2000 + delay) * 5;
// //       y.set(newY);
// //     }, 50);
    
// //     return () => clearInterval(interval);
// //   }, [y, delay]);
  
// //   return (
// //     <motion.div style={{ y }}>{children}</motion.div>
// //   );
// // };

// // // Export additional utilities if needed
// // export const HeroParallaxSection: React.FC<{
// //   className?: string;
// //   children?: React.ReactNode;
// // }> = ({ className = '', children }) => {
// //   return (
// //     <section className={`relative bg-[#000000] ${className}`}>
// //       {children}
// //     </section>
// //   );
// // };

// export default HeroParallax;