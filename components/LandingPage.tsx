<<<<<<< HEAD
// 'use client';
  
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import ServiceAreaMapPreview from '@/components/previews/ServiceAreaMapPreview';
// import KoolMoreVendingShowcase from '@/components/machines/KoolMoreVendingShowcase';
// import ContactFormSection from '@/components/sections/ContactForm';

// // Define types for snack/beverage items
// interface ProductItem {
//   title: string;
//   image: string;
//   category: string;
// }


// const LandingPage = () => {
//   // State for animation control
//   const [, setIsVisible] = useState(false);
  
//   // Animation effect on component mount
//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Product items to display in the parallax grid

//   return (
//     <div className="flex flex-col min-h-screen bg-[#000000] text-white">
//       {/* Hero Section */}
//       {/* <section 
//         className="relative min-h-screen flex items-center justify-center overflow-hidden"
//         aria-labelledby="hero-heading"
//       >
//         {/* Background Overlay 
//         <div className="absolute inset-0 bg-[#000000]/60 z-10" aria-hidden="true"></div>
        
//         {/* Products Grid Background
//         <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 p-2 z-0">
//           {products.map((product, index) => {
//             // Calculate parallax offset based on index
//             const offset = Math.min(index % 6 + 1, 100);
            
//             return (
//               <div 
//                 key={index}
//                 className="relative aspect-[3/4] rounded-lg overflow-hidden transition-transform hover:scale-105"
//                 style={{ 
//                   transform: `translateY(${offset}px)`,
//                   transition: 'transform 0.3s ease-out',
//                 }}
//                 aria-hidden="true"
//               >
//                 {/* Fallback for images 
//                 <div className="absolute inset-0 bg-[#4d4d4d] flex items-center justify-center">
//                   <div className="text-[#A5ACAF] text-xs">
//                     {product.title}
//                   </div>
//                 </div>
                
//                 {/* Product image
//                 <div className="absolute inset-0">
//                   <Image 
//                     src={product.image} 
//                     alt={product.title}
//                     fill
//                     sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
//                     className="object-cover"
//                     onError={(e) => {
//                       // Fallback if image doesn't load
//                       e.currentTarget.style.display = 'none';
//                     }}
//                   />
//                 </div>

//                 {/* Category badge 
//                 <div className="absolute top-2 left-2 z-20">
//                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#FD5A1E] text-[#F5F5F5]">
//                     {product.category}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
        
//         {/* Hero Content - using motion for animation 
//         <motion.div 
//           className="relative z-20 text-center px-4 max-w-5xl"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <h1 
//             id="hero-heading"
//             className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 drop-shadow-lg"
//           >
//             Premium Workplace Vending <br /> 
//             <span className="text-[#FD5A1E]">Zero Cost to You</span>
//           </h1>
//           <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 drop-shadow-md max-w-3xl mx-auto">
//             Enhance your workplace with state-of-the-art vending machines offering 
//             50+ customizable snack and beverage options.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link
//               href="/vending-machines"
//               className="px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
//               aria-label="View our vending machines"
//             >
//               View Machines
//             </Link>
//             <Link
//               href="/contact"
//               className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#FD5A1E] hover:border-[#FD5A1E] transition-colors"
//               aria-label="Contact us about vending machines"
//             >
//               Contact Us
//             </Link>
//           </div>
//         </motion.div>
        
//         {/* Scroll indicator 
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
//           <svg className="w-6 h-6 text-[#F5F5F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//           </svg>
//         </div>
//       </section> */}

//       {/* Vending Machine Showcase Section */}
//       <KoolMoreVendingShowcase />
=======
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactFormSection from '@/components/sections/ContactForm';



const LandingPage = () => {
  // State for animation control
  const [, setIsVisible] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Product items to display in the parallax grid

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white">
      {/* Hero Section */}
      {/* <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background Overlay 
        <div className="absolute inset-0 bg-[#000000]/60 z-10" aria-hidden="true"></div>
        
        {/* Products Grid Background 
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 p-2 z-0">
          {products.map((product, index) => {
            // Calculate parallax offset based on index
            const offset = Math.min(index % 6 + 1, 100);
            
            return (
              <div 
                key={index}
                className="relative aspect-[3/4] rounded-lg overflow-hidden transition-transform hover:scale-105"
                style={{ 
                  transform: `translateY(${offset}px)`,
                  transition: 'transform 0.3s ease-out',
                }}
                aria-hidden="true"
              >
                {/* Fallback for images 
                <div className="absolute inset-0 bg-[#4d4d4d] flex items-center justify-center">
                  <div className="text-[#A5ACAF] text-xs">
                    {product.title}
                  </div>
                </div>
                
                {/* Product image 
                <div className="absolute inset-0">
                  <Image 
                    src={product.image} 
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
                    className="object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Category badge 
                <div className="absolute top-2 left-2 z-20">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#FD5A1E] text-[#F5F5F5]">
                    {product.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Hero Content - using motion for animation 
        <motion.div 
          className="relative z-20 text-center px-4 max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 drop-shadow-lg"
          >
            Premium Workplace Vending <br /> 
            <span className="text-[#FD5A1E]">Zero Cost to You</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 drop-shadow-md max-w-3xl mx-auto">
            Enhance your workplace with state-of-the-art vending machines offering 
            50+ customizable snack and beverage options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/vending-machines"
              className="px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
              aria-label="View our vending machines"
            >
              View Machines
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#FD5A1E] hover:border-[#FD5A1E] transition-colors"
              aria-label="Contact us about vending machines"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll indicator *
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-[#F5F5F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section> */}



      {/* Key Benefits Section */}
      {/* <section 
        className="py-16 bg-[#000000]"
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              id="benefits-heading"
              className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
            >
              Premium Vending, Zero Hassle
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Our vending machines bring convenience and satisfaction to your workplace without any of the traditional headaches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 
            <motion.div 
              className="bg-[#4d4d4d] rounded-xl p-8 border border-[#a4acac] hover:border-[#FD5A1E] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Zero Cost Installation</h3>
              <p className="text-[#A5ACAF]">
                Our vending machines are installed completely free of charge. No upfront costs, no monthly fees, and no hidden charges.
              </p>
            </motion.div>

            {/* Benefit 2 
            <motion.div 
              className="bg-[#4d4d4d] rounded-xl p-8 border border-[#a4acac] hover:border-[#FD5A1E] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Maintenance-Free Operation</h3>
              <p className="text-[#A5ACAF]">
                We handle all servicing, restocking, and repairs. Your team never has to worry about the machines - we take care of everything.
              </p>
            </motion.div>

            {/* Benefit 3 
            <motion.div 
              className="bg-[#4d4d4d] rounded-xl p-8 border border-[#a4acac] hover:border-[#FD5A1E] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#FD5A1E]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">Latest Technology</h3>
              <p className="text-[#A5ACAF]">
                Featuring 21.5&quot; HD touchscreens and modern payment options including credit card, mobile pay, and tap-to-pay functionality.
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Vending Machine Showcase Section */}
      {/* <KoolMoreVendingShowcase /> */}
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c


//       {/* Products Showcase Section */}
//       <section id="products-showcase" className="py-16 bg-[#4d4d4d]/20" >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
//               Product Selection
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//               50+ Premium Products
//             </h2>
//             <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//               Customizable selection of snacks and beverages to meet your workplace needs
//             </p>
//           </div>

//           {/* Category Tabs */}
//           <div className="flex flex-wrap justify-center gap-3 mb-8">
//             {['All Products', 'Popular Snacks', 'Beverages', 'Healthy Options', 'Energy Drinks'].map((category, index) => (
//               <button
//                 key={index}
//                 className={`px-4 py-2 rounded-full text-sm font-medium ${index === 0
//                   ? 'bg-[#FD5A1E] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#000000]'
//                   : 'bg-[#000000] text-[#F5F5F5] hover:bg-[#FD5A1E]/10 border border-[#a4acac]'
//                   } transition-colors`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {/* Products Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {/* Product cards - these would be dynamically generated */}
//             {[
//               { name: 'Coca-Cola', category: 'beverages', image: '/images/products/coke.jpg', popular: true },
//               { name: 'Doritos Nacho Cheese', category: 'snacks', image: '/images/products/doritos.jpg', popular: true },
//               { name: 'Monster Energy', category: 'energy', image: '/images/products/monster.jpg', popular: true },
//               { name: 'Lays Classic', category: 'snacks', image: '/images/products/lays.jpg', popular: true },
//               { name: 'Snickers', category: 'snacks', image: '/images/products/snickers.jpg', popular: true },
//               { name: 'Just Water', category: 'beverages', image: '/images/products/justwater.jpg', healthy: true },
//               { name: 'Pop Tarts', category: 'snacks', image: '/images/products/poptarts.jpg', popular: true },
//               { name: 'Red Bull', category: 'energy', image: '/images/products/redbull.jpg', popular: true },
//               { name: 'M&Ms', category: 'snacks', image: '/images/products/mms.jpg', popular: true },
//               { name: 'Diet Coke', category: 'beverages', image: '/images/products/dietcoke.jpg', healthy: true }
//             ].map((product, index) => (
//               <div key={index} className="bg-[#000000] rounded-lg overflow-hidden border border-[#a4acac] hover:border-[#FD5A1E] transition-all hover:scale-105 group">
//                 <div className="h-36 relative overflow-hidden">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                   {product.popular && (
//                     <div className="absolute top-2 right-2 bg-[#FD5A1E] text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
//                       Popular
//                     </div>
//                   )}
//                   {product.healthy && (
//                     <div className="absolute top-2 right-2 bg-green-500 text-[#F5F5F5] text-xs px-2 py-1 rounded-full">
//                       Healthy
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-3">
//                   <h3 className="text-[#F5F5F5] font-medium text-sm">{product.name}</h3>
//                   <p className="text-[#A5ACAF] text-xs capitalize">{product.category}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Product Rotation Banner */}
//           <div className="mt-10 bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-lg p-4 text-center">
//             <div className="flex items-center justify-center space-x-2 text-[#F5F5F5]">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span>Product selection can be customized based on your workplace preferences and regularly updated based on feedback.</span>
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="mt-10 text-center">
//             <Link
//               href="/contact"
//               className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
//             >
//               Customize Your Selection
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Process Section */}
//       <section
//         className="py-16 bg-black"
//         aria-labelledby="process-heading"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2
//               id="process-heading"
//               className="text-3xl md:text-4xl font-bold text-white mb-4"
//             >
//               Getting Started Is Simple
//             </h2>
//             <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//               Our streamlined process gets your vending machines up and running with minimal effort.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-8">
//             {/* Step 1 */}
//             <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
//               <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">1</div>
//               <h3 className="text-xl font-bold text-white mt-2 mb-3">Request a Consultation</h3>
//               <p className="text-[#A5ACAF]">Schedule a quick call to discuss your workplace needs and machine options.</p>
//             </div>

//             {/* Step 2 */}
//             <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
//               <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">2</div>
//               <h3 className="text-xl font-bold text-white mt-2 mb-3">Site Assessment</h3>
//               <p className="text-[#A5ACAF]">We`&apos;ll visit your location to identify the optimal placement for your machines.</p>
//             </div>

//             {/* Step 3 */}
//             <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
//               <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">3</div>
//               <h3 className="text-xl font-bold text-white mt-2 mb-3">Installation</h3>
//               <p className="text-[#A5ACAF]">Our team handles the complete setup with zero disruption to your workplace.</p>
//             </div>

//             {/* Step 4 */}
//             <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
//               <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">4</div>
//               <h3 className="text-xl font-bold text-white mt-2 mb-3">Ongoing Support</h3>
//               <p className="text-[#A5ACAF]">We handle all maintenance and restocking automatically. You simply enjoy the convenience.</p>
//             </div>
//           </div>

//           <div className="text-center mt-12">
//             <Link
//               href="/contact"
//               className="px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-full shadow-lg hover:bg-[#FD5A1E]/90 transition-colors"
//             >
//               Schedule Your Consultation
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Comparison Section */}
//       <section
//         className="py-16 bg-black"
//         aria-labelledby="comparison-heading"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2
//               id="comparison-heading"
//               className="text-3xl md:text-4xl font-bold text-white mb-4"
//             >
//               Why Choose AMP Vending
//             </h2>
//             <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//               The difference is clear when you compare our solution to alternatives.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Traditional Vending */}
//             <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-white">Traditional Vending</h3>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </div>
//               <ul className="space-y-3">
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">High upfront cost to purchase machines</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">You handle maintenance and repairs</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">Staff time required for restocking</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">Limited payment options</span>
//                 </li>
//               </ul>
//             </div>

//             {/* Food Delivery */}
//             <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-white">Food Delivery</h3>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
//               <ul className="space-y-3">
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">Variable wait times for delivery</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">High delivery fees and minimums</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">Not available 24/7</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">Disrupts workflow with deliveries</span>
//                 </li>
//               </ul>
//             </div>

//             {/* AMP Vending */}
//             <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-xl p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-white">AMP Vending</h3>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <ul className="space-y-3">
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-white">Complete maintenance & service included</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-white">Automatic restocking - never empty</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-white">Advanced payment options (card, mobile, cash)</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-white">Available 24/7 for employee convenience</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="mt-10 text-center">
//             <Link
//               href="/proposal"
//               className="px-6 py-3 bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-[#F5F5F5] font-medium rounded-full inline-flex items-center transition-colors"
//             >
//               See Our Complete Solution
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </section>

<<<<<<< HEAD
//         {/* Service Area Map Preview */}
//         <section id="service-area-preview" className="py-16 bg-[#000000]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Service Area Map Preview Component */}
//             <div className="order-2 md:order-1">
//               <ServiceAreaMapPreview className="shadow-lg" />
//             </div>
=======
      {/* Service Area Map Preview */}
      {/* <section id="service-area-preview" className="py-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Service Area Map Preview Component 
            <div className="order-2 md:order-1">
              <ServiceAreaMapPreview className="shadow-lg" />
            </div>
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c

//             <div className="order-1 md:order-2">
//               <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
//                 Service Coverage
//               </span>
//               <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
//                 Serving Central California
//               </h2>
//               <p className="text-[#A5ACAF] mb-6">
//                 AMP Vending provides premium vending services throughout Modesto, Stockton, Merced, and surrounding areas in Central California.
//               </p>

<<<<<<< HEAD
//               {/* Service areas list */}
//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-start">
//                   <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">Modesto metropolitan area</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">Stockton and surrounding communities</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">Merced and Turlock regions</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-[#A5ACAF]">
//                     Tracy, Manteca, and Lodi areas
//                   </span>
//                 </li>
//               </ul>
//               {/* Call to action */}
//               <Link
//                 href="/service-areas"
//                 className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
//               >
//                 Check Your Location
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section >
=======
              {/* Service areas list 
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">Modesto metropolitan area</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">Stockton and surrounding communities</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">Merced and Turlock regions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#FD5A1E] mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#A5ACAF]">
                    Tracy, Manteca, and Lodi areas
                  </span>
                </li>
              </ul>
              {/* Call to action 
              <Link
                href="/service-areas"
                className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
              >
                Check Your Location
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section > */}
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c

//       {/* FAQ Section */}
//       <section
//         className="py-16 bg-gradient-to-b from-black to-[#4d4d4d]/20"
//         aria-labelledby="faq-heading"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2
//               id="faq-heading"
//               className="text-3xl md:text-4xl font-bold text-white mb-4"
//             >
//               Frequently Asked Questions
//             </h2>
//             <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
//               Common questions about our vending solutions.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             {/* FAQ Item 1 */}
//             <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
//               <h3 className="text-lg font-bold text-white mb-2">How can you offer machines at zero cost?</h3>
//               <p className="text-[#A5ACAF]">
//                 Our business model allows us to provide premium machines at no cost to qualified locations that meet our minimum traffic requirements.
//               </p>
//             </div>

//             {/* FAQ Item 2 */}
//             <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
//               <h3 className="text-lg font-bold text-white mb-2">What types of products are available?</h3>
//               <p className="text-[#A5ACAF]">
//                 We offer a wide selection of premium snacks, beverages, and healthy options. Our team customizes the selection based on your workplace preferences.
//               </p>
//             </div>

//             {/* FAQ Item 3 */}
//             <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
//               <h3 className="text-lg font-bold text-white mb-2">How often are machines restocked?</h3>
//               <p className="text-[#A5ACAF]">
//                 We monitor inventory levels remotely and typically restock weekly, though high-traffic locations may receive more frequent service.
//               </p>
//             </div>

//             {/* FAQ Item 4 */}
//             <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
//               <h3 className="text-lg font-bold text-white mb-2">What payment methods are accepted?</h3>
//               <p className="text-[#A5ACAF]">
//                 Our machines accept multiple payment options including credit/debit cards, mobile payments (Apple Pay, Google Pay), as well as traditional cash and coins.
//               </p>
//             </div>
//           </div>

//           <div className="text-center mt-8">
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

<<<<<<< HEAD
//       {/* Contact Form Section */}
//       <section
//         className="py-16"
//         aria-labelledby="contact-heading"
//       >
//               <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
//               Get In Touch
//             </span>
//             <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//               Contact AMP Vending
//             </h1>
//             <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
//               Have questions about our vending solutions? We&apos;re here to help. Fill out the form below and our team will get back to you soon.
//             </p>
//           </div>
//         <ContactFormSection/>
//         {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-black rounded-xl shadow-xl overflow-hidden md:flex">
//             <div className="md:w-1/2 p-8 md:p-12">
//               <h2
//                 id="contact-heading"
//                 className="text-2xl md:text-3xl font-bold text-white mb-4"
//               >
//                 Ready to Enhance Your Workplace?
//               </h2>
//               <p className="text-[#A5ACAF] mb-6">
//                 Fill out the form and our team will get back to you within 24 hours to discuss your vending needs.
//               </p>
=======
      {/* Contact Form Section */}
      <section
        className="py-16"
        aria-labelledby="contact-heading"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Contact AMP Vending
          </h1>
          <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
            Have questions about our vending solutions? We&apos;re here to help. Fill out the form below and our team will get back to you soon.
          </p>
        </div>
        <ContactFormSection />
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-xl shadow-xl overflow-hidden md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2
                id="contact-heading"
                className="text-2xl md:text-3xl font-bold text-white mb-4"
              >
                Ready to Enhance Your Workplace?
              </h2>
              <p className="text-[#A5ACAF] mb-6">
                Fill out the form and our team will get back to you within 24 hours to discuss your vending needs.
              </p>
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c

            
//               <form className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
//                     placeholder="Your name"
//                     aria-required="true"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
//                     placeholder="you@company.com"
//                     aria-required="true"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="company" className="block text-white text-sm font-medium mb-1">
//                     Company Name
//                   </label>
//                   <input
//                     type="text"
//                     id="company"
//                     className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
//                     placeholder="Your company"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-white text-sm font-medium mb-1">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={4}
//                     className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white"
//                     placeholder="Tell us about your location and needs"
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full md:w-auto px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-lg hover:bg-[#FD5A1E]/90 transition-colors"
//                 >
//                   Request Information
//                 </button>
//               </form>
//             </div>

//             <div className="md:w-1/2 bg-gradient-to-br from-[#FD5A1E]/20 to-black relative p-8 md:p-12 flex flex-col justify-center">
//               <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-6 w-6 text-[#FD5A1E] mr-3">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-white font-medium">Phone</p>
//                     <a href="tel:+12094035450" className="text-[#A5ACAF] hover:text-[#FD5A1E]">(209) 403-5450</a>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-6 w-6 text-[#FD5A1E] mr-3">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-white font-medium">Email</p>
//                     <a href="mailto:ampdesignandconsulting@gmail.com" className="text-[#A5ACAF] hover:text-[#FD5A1E]">ampdesignandconsulting@gmail.com</a>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-6 w-6 text-[#FD5A1E] mr-3">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-white font-medium">Location</p>
//                     <p className="text-[#A5ACAF]">Modesto, CA 95354</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
//                 <p className="text-[#A5ACAF]">
//                   Monday - Friday: 9AM - 5PM<br />
//                   Saturday - Sunday: Closed
//                 </p>
//                 <p className="text-[#FD5A1E] mt-2">24/7 Customer Support Available</p>
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </section>

<<<<<<< HEAD
//       {/* CTA Section */}
//       <section className="py-16 bg-[#FD5A1E] text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Premium Refreshments, Zero Hassle
//           </h2>
//           <p className="text-xl max-w-3xl mx-auto mb-8">
//             Join leading workplaces enjoying state-of-the-art vending with no costs and no maintenance worries.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link
//               href="/contact"
//               className="px-8 py-4 bg-white text-black font-medium rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
//             >
//               Get Started
//             </Link>
//             <Link
//               href="/proposal"
//               className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-black transition-colors"
//             >
//               View Proposal
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
=======
      {/* CTA Section */}
      <section className="py-16 bg-[#FD5A1E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium Refreshments, Zero Hassle
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join leading workplaces enjoying state-of-the-art vending with no costs and no maintenance worries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black font-medium rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
            >
              Get Started
            </Link>
            {/* <Link
              href="/proposal"
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-black transition-colors"
            >
              View Proposal
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c

// export default LandingPage;