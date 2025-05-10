// 'use client';

// import React, { useState, useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';


// interface ProductCategory {
//   id: string;
//   name: string;
//   icon: React.ReactNode;
// }

// interface Product {
//   id: string;
//   name: string;
//   link: string;
//   thumbnail: string;
//   category: string;
//   featured?: boolean;
//   price: number;
//   profitMargin: number;
//   popularity: number;
// }

// const ProductSection = () => {
//   // Ref for scrolling container
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   // Categories for filtering products
//   const categories: ProductCategory[] = [
//     {
//       id: 'all',
//       name: 'All Products',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//         </svg>
//       )
//     },
//     {
//       id: 'snacks',
//       name: 'Snacks',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//         </svg>
//       )
//     },
//     {
//       id: 'beverages',
//       name: 'Beverages',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
//         </svg>
//       )
//     },
//     {
//       id: 'candy',
//       name: 'Candy',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
//         </svg>
//       )
//     },
//     {
//       id: 'healthy',
//       name: 'Healthy',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//         </svg>
//       )
//     },
//     {
//       id: 'energy',
//       name: 'Energy',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
//         </svg>
//       )
//     }
//   ];
  
//   // Products data for the showcase with updated image paths
//   const products: Product[] = [
//     {
//       id: 'lays-classic',
//       name: 'Lay\'s Classic Potato Chips',
//       link: '/product/lays-classic',
//       thumbnail: '/images/snacks/lays.jpg',
//       category: 'snacks',
//       featured: true,
//       price: 1.75,
//       profitMargin: 54.3,
//       popularity: 95
//     },
//     {
//       id: 'coca-cola',
//       name: 'Coca Cola',
//       link: '/product/coca-cola',
//       thumbnail: '/images/beverages/coke.jpg',
//       category: 'beverages',
//       featured: true,
//       price: 2.00,
//       profitMargin: 62.5,
//       popularity: 98
//     },
//     {
//       id: 'doritos-nacho',
//       name: 'Doritos Nacho Cheese',
//       link: '/product/doritos-nacho',
//       thumbnail: '/images/snacks/doritos.jpg',
//       category: 'snacks',
//       price: 1.75,
//       profitMargin: 53.1,
//       popularity: 92
//     },
//     {
//       id: 'water-just',
//       name: 'Just Water',
//       link: '/product/water-just',
//       thumbnail: '/images/beverages/justwater.jpg',
//       category: 'beverages',
//       price: 1.50,
//       profitMargin: 80.0,
//       popularity: 85
//     },
//     {
//       id: 'snickers',
//       name: 'Snickers Bar',
//       link: '/product/snickers',
//       thumbnail: '/images/snacks/snickers.jpg',
//       category: 'candy',
//       featured: true,
//       price: 1.75,
//       profitMargin: 60.0,
//       popularity: 90
//     },
//     {
//       id: 'monster-energy',
//       name: 'Monster Energy Original',
//       link: '/product/monster-energy',
//       thumbnail: '/images/beverages/monster.jpg',
//       category: 'energy',
//       price: 3.00,
//       profitMargin: 50.0,
//       popularity: 88
//     },
//     {
//       id: 'cheetos',
//       name: 'Cheetos Crunchy',
//       link: '/product/cheetos',
//       thumbnail: '/images/snacks/cheetos.jpg',
//       category: 'snacks',
//       featured: true,
//       price: 1.75,
//       profitMargin: 55.4,
//       popularity: 94
//     },
//     {
//       id: 'drpepper',
//       name: 'Dr Pepper',
//       link: '/product/drpepper',
//       thumbnail: '/images/beverages/drpepper.jpg',
//       category: 'beverages',
//       price: 2.00,
//       profitMargin: 48.0,
//       popularity: 85
//     },
//     {
//       id: 'red-bull',
//       name: 'Red Bull',
//       link: '/product/red-bull',
//       thumbnail: '/images/beverages/RedBull.jpg',
//       category: 'energy',
//       featured: true,
//       price: 3.25,
//       profitMargin: 44.6,
//       popularity: 91
//     },
//     {
//       id: 'mms',
//       name: 'M&M\'s Peanut',
//       link: '/product/mms',
//       thumbnail: '/images/snacks/mms.jpg',
//       category: 'candy',
//       price: 1.75,
//       profitMargin: 51.4,
//       popularity: 82
//     },
//     {
//       id: 'skittles',
//       name: 'Skittles Original',
//       link: '/product/skittles',
//       thumbnail: '/images/snacks/skittles.jpg',
//       category: 'candy',
//       price: 1.75,
//       profitMargin: 51.4,
//       popularity: 88
//     },
//     {
//       id: 'gatorade',
//       name: 'Gatorade Cool Blue',
//       link: '/product/gatorade',
//       thumbnail: '/images/beverages/gatorade.jpg',
//       category: 'beverages',
//       price: 2.25,
//       profitMargin: 55.6,
//       popularity: 82
//     }
//   ];
  
//   // State for filtering products
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
//   // Filtered products based on selected category
//   const filteredProducts = selectedCategory === 'all' 
//     ? products 
//     : products.filter(product => product.category === selectedCategory);
  
  
//   // Animation with scroll
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"]
//   });
  
//   // Transform values for parallax effect
//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
//   const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
//   const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
//   const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  
//   // State for hovered product
//   const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  
//   return (
//     <div 
//       ref={containerRef} 
//       className="relative w-full bg-[#000000]"
//       aria-labelledby="product-parallax-title"
//     >
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//           <defs>
//             <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
//               <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid-pattern)" />
//         </svg>
//       </div>
      
//       {/* Hero Section */}
//       {/* <motion.div 
//         style={{ scale, opacity }}
//         className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden"
//       > */}
//         {/* <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FD5A1E]/10 to-[#000000] z-0"></div>
        
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
//           <h1 
//             id="product-parallax-title"
//             className="text-5xl md:text-7xl font-bold text-[#F5F5F5] mb-6"
//           >
//             Premium <span className="text-[#FD5A1E]">Vending</span> Products
//           </h1>
//           <p className="text-xl md:text-2xl text-[#A5ACAF] max-w-3xl mx-auto mb-10">
//             Explore our curated selection of snacks and beverages perfectly suited for your workplace vending machine.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link 
//               href="/contact" 
//               className="bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-[#F5F5F5] py-3 px-8 rounded-lg font-medium transition-colors shadow-lg"
//             >
//               Get Started
//             </Link>
//             <Link 
//               href="#products" 
//               className="bg-[#4d4d4d] hover:bg-[#4d4d4d]/80 text-[#F5F5F5] py-3 px-8 rounded-lg font-medium transition-colors border border-[#A5ACAF]"
//             >
//               Browse Products
//             </Link>
//           </div>
//         </div>
//          */}
//         {/* Floating Product Images for Hero Background */}
//         {/* <div className="absolute inset-0 w-full h-full overflow-hidden">
//           {featuredProducts.map((product, index) => {
//             // Calculate random positions that don't overlap too much
//             const randomPosition = getRandomPosition(index, featuredProducts.length);
//             const motionY = [y, y2, y3, y4, y][index % 5]; // Cycle through different motion values
            
//             return (
//               <motion.div
//                 key={product.id}
//                 style={{ 
//                   x: randomPosition.x,
//                   y: motionY,
//                   rotate: randomPosition.rotate
//                 }}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: index * 0.2, duration: 0.8 }}
//                 className="absolute"
//               >
//                 <div 
//                   className={`bg-[#4d4d4d] rounded-xl shadow-xl overflow-hidden transform ${
//                     index % 2 === 0 ? 'rotate-3' : '-rotate-3'
//                   } border border-[#a4acac]`}
//                   style={{ width: `${120 + (index % 3) * 20}px` }}
//                 >
//                   {/* Product image
//                   <div className="aspect-w-1 aspect-h-1 relative h-24">
//                     <Image 
//                       src={product.thumbnail}
//                       alt={product.name}
//                       fill
//                       sizes="(max-width: 768px) 100vw, 120px"
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="p-2 text-center">
//                     <div className="text-xs font-medium truncate text-[#F5F5F5]">{product.name}</div>
//                     <div className="text-xs text-[#FD5A1E]">${product.price.toFixed(2)}</div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </motion.div> */}
      
//       {/* Products Section */}
//       <section 
//         id="products" 
//         className="py-16 container mx-auto px-4 sm:px-6 lg:px-8"
//       >
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//             Our Premium Selection
//           </h2>
//           <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
//             Choose from our wide range of popular snacks and beverages, carefully selected for maximum customer satisfaction and profit margin.
//           </p>
//         </div>
        
//         {/* Category Filters */}
//         <div className="flex justify-center mb-12 overflow-x-auto py-2">
//           <div className="inline-flex p-1 bg-[#000000] rounded-full shadow-inner border border-[#a4acac]">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   selectedCategory === category.id
//                     ? 'bg-[#FD5A1E] text-[#F5F5F5] shadow-md'
//                     : 'text-[#A5ACAF] hover:text-[#F5F5F5] hover:bg-[#4d4d4d]/40'
//                 }`}
//                 aria-pressed={selectedCategory === category.id}
//               >
//                 <span className="mr-2">{category.icon}</span>
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         {/* Product Grid with Parallax Effects */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredProducts.map((product, index) => {
//             // Different motion values based on column position for staggered effect
//             const column = index % 4;
//             const yOffset = [y, y2, y3, y4][column];
            
//             return (
//               <motion.div
//                 key={product.id}
//                 style={{ y: yOffset }}
//                 className="relative"
//                 onMouseEnter={() => setHoveredProduct(product.id)}
//                 onMouseLeave={() => setHoveredProduct(null)}
//               >
//                 <Link 
//                   href={product.link}
//                   className={`block bg-[#4d4d4d] rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-[#a4acac] ${
//                     hoveredProduct === product.id ? 'shadow-xl transform -translate-y-1 border-[#FD5A1E]' : ''
//                   }`}
//                 >
//                   {/* Product image */}
//                   <div className="aspect-w-1 aspect-h-1 relative h-48">
//                     <Image 
//                       src={product.thumbnail}
//                       alt={product.name}
//                       fill
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                       className="object-cover"
//                     />
                    
//                     {/* Category badge */}
//                     <div className="absolute top-2 left-2">
//                       <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryStyle(product.category)}`}>
//                         {getCategoryName(product.category)}
//                       </span>
//                     </div>
                    
//                     {/* Profit indicator (visible on hover) */}
//                     <div className={`absolute bottom-2 right-2 transition-opacity duration-300 ${
//                       hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
//                     }`}>
//                       <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#000000] text-[#FD5A1E] border border-[#FD5A1E]/50">
//                         {product.profitMargin.toFixed(1)}% Margin
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="p-4">
//                     <h3 className="text-lg font-medium text-[#F5F5F5] mb-1">{product.name}</h3>
                    
//                     <div className="flex justify-between items-center">
//                       <div className="text-xl font-bold text-[#FD5A1E]">${product.price.toFixed(2)}</div>
                      
//                       <div className="flex items-center">
//                         <div className="text-sm text-[#A5ACAF] mr-1">Popularity:</div>
//                         <div className="flex">
//                           {/* Popularity stars (up to 5) */}
//                           {Array.from({ length: 5 }).map((_, i) => (
//                             <svg 
//                               key={i} 
//                               xmlns="http://www.w3.org/2000/svg" 
//                               className={`h-4 w-4 ${
//                                 i < Math.round(product.popularity / 20) ? 'text-[#FD5A1E]' : 'text-[#4d4d4d]'
//                               }`} 
//                               viewBox="0 0 20 20" 
//                               fill="currentColor"
//                             >
//                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                             </svg>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             );
//           })}
//         </div>
//       </section>
      
//       {/* Call to Action Section */}
//       {/* <section className="py-16 bg-gradient-to-r from-[#000000] to-[#4d4d4d] text-[#F5F5F5] border-t border-[#a4acac]">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to Stock Your Vending Machine?</h2>
//           <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto mb-8">
//             Get started with a zero-cost vending solution featuring these premium products. Earn passive income while providing convenience for your customers.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link 
//               href="/proposal" 
//               className="bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-[#F5F5F5] py-3 px-8 rounded-lg font-medium shadow-lg transition-colors"
//             >
//               View Proposal
//             </Link>
//             <Link 
//               href="/contact" 
//               className="bg-transparent hover:bg-[#4d4d4d] border border-[#A5ACAF] text-[#F5F5F5] py-3 px-8 rounded-lg font-medium transition-colors"
//             >
//               Contact Us
//             </Link>
//           </div>
//         </div>
//       </section> */}
//     </div>
//   );
// };

// // Helper function to get random position for floating products

// // Helper function to get human-readable category name
// const getCategoryName = (categoryId: string): string => {
//   switch(categoryId) {
//     case 'snacks': return 'Snacks';
//     case 'beverages': return 'Beverages';
//     case 'candy': return 'Candy';
//     case 'healthy': return 'Healthy';
//     case 'energy': return 'Energy';
//     default: return categoryId;
//   }
// };

// // Helper function to get category style classes
// const getCategoryStyle = (categoryId: string): string => {
//   switch(categoryId) {
//     case 'snacks': return 'bg-[#000000] text-[#FD5A1E] border border-[#FD5A1E]/50';
//     case 'beverages': return 'bg-[#000000] text-[#F5F5F5] border border-[#A5ACAF]';
//     case 'candy': return 'bg-[#000000] text-[#FD5A1E] border border-[#FD5A1E]/50';
//     case 'healthy': return 'bg-[#000000] text-[#F5F5F5] border border-[#A5ACAF]';
//     case 'energy': return 'bg-[#000000] text-[#FD5A1E] border border-[#FD5A1E]/50';
//     default: return 'bg-[#000000] text-[#A5ACAF] border border-[#A5ACAF]';
//   }
// };

// export default ProductSection;