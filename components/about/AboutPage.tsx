// 'use client';

// import React from 'react';
// import { Metadata } from 'next';
// import Script from 'next/script';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { SEO_CONSTANTS, generateBreadcrumbStructuredData } from '@/lib/data/seoData';
// import { AboutBreadcrumbs } from '@/components/seo/BreadcrumbSchema';

// /**
//  * About Page Component
//  * 
//  * Comprehensive about page showcasing AMP Vending's story, values, 
//  * team expertise, and commitment to quality service. Designed to build
//  * trust and credibility with potential clients while optimizing for SEO.
//  */

// // SEO Metadata for the About page
// export const metadata: Metadata = {
//   title: 'About AMP Vending | Professional Vending Solutions in Central California',
//   description: 'Learn about AMP Vending\'s commitment to providing premium workplace vending solutions. Serving Central California with professional installation, maintenance, and 24/7 support since our founding.',
//   keywords: 'about AMP Vending, vending machine company, Central California vending, professional vending services, workplace solutions, Modesto vending',
//   alternates: {
//     canonical: `${SEO_CONSTANTS.BASE_URL}/about`,
//   },
//   openGraph: {
//     title: 'About AMP Vending - Your Trusted Vending Partner',
//     description: 'Professional vending solutions with a commitment to excellence. Serving workplaces across Central California with premium machines and comprehensive service.',
//     url: `${SEO_CONSTANTS.BASE_URL}/about`,
//     siteName: SEO_CONSTANTS.SITE_NAME,
//     images: [{
//       url: `${SEO_CONSTANTS.BASE_URL}/images/about/team-photo.jpg`,
//       width: 1200,
//       height: 630,
//       alt: 'AMP Vending team providing professional service',
//     }],
//     locale: 'en_US',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'About AMP Vending - Professional Vending Solutions',
//     description: 'Learn about our commitment to excellence in workplace vending solutions across Central California.',
//     images: [`${SEO_CONSTANTS.BASE_URL}/images/about/team-photo.jpg`],
//   },
// };

// /**
//  * Company Stats Interface
//  */
// export interface CompanyStat {
//   value: string;
//   label: string;
//   description: string;
//   icon: React.ReactNode;
// }

// /**
//  * Company Value Interface
//  */
// export interface CompanyValue {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   benefits: string[];
// }


// const AboutPage = () => {
 
//   return (
//     <>
//       {/* Structured Data for About Page */}
//       <Script
//         id="about-page-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "AboutPage",
//             "name": "About AMP Vending",
//             "description": "Learn about AMP Vending's commitment to providing premium workplace vending solutions in Central California.",
//             "url": `${SEO_CONSTANTS.BASE_URL}/about`,
//             "mainEntityOfPage": {
//               "@type": "WebPage",
//               "@id": `${SEO_CONSTANTS.BASE_URL}/about`
//             },
//             "about": {
//               "@type": "Organization",
//               "name": SEO_CONSTANTS.BUSINESS_NAME,
//               "description": "Professional vending machine solutions for workplaces",
//               "foundingDate": "2019",
//               "founders": [
//                 {
//                   "@type": "Person",
//                   "name": "Andrew Perez",
//                   "jobTitle": "Founder & CEO"
//                 }
//               ],
//               "areaServed": {
//                 "@type": "Place",
//                 "name": "Central California"
//               },
//               "specialty": [
//                 "Workplace vending solutions",
//                 "Touchscreen vending machines",
//                 "Professional installation",
//                 "Maintenance services"
//               ]
//             }
//           })
//         }}
//       />

//       {/* Breadcrumbs Structured Data */}
//       <Script
//         id="about-breadcrumbs-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(
//             generateBreadcrumbStructuredData([
//               { name: 'Home', url: '/' },
//               { name: 'About', url: '/about' }
//             ])
//           )
//         }}
//       />

//       <div className="bg-[#000000] min-h-screen">
//         {/* Breadcrumb Navigation */}
//         <div className="bg-[#000000]/50 border-b border-[#4d4d4d] pt-20">
//           <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-[#A5ACAF]">
//             <Link href="/" className="hover:text-[#FD5A1E] transition-colors">Home</Link>
//             <span className="mx-2">/</span>
//             <span className="text-[#F5F5F5]">About</span>
//           </div>
//           <AboutBreadcrumbs />
//         </div>

//         {/* Hero Section */}
//         <section className="relative py-16 overflow-hidden" aria-labelledby="about-hero-heading">
//           {/* Background Elements */}
//           <div className="absolute inset-0 opacity-10" aria-hidden="true">
//             <div className="absolute inset-0">
//               <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
//                 <defs>
//                   <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                     <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
//                   </pattern>
//                 </defs>
//                 <rect width="100%" height="100%" fill="url(#about-grid)" />
//               </svg>
//             </div>
//           </div>

//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#FD5A1E]/20 to-transparent rounded-full blur-3xl" aria-hidden="true"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#FD5A1E]/10 to-transparent rounded-full blur-3xl" aria-hidden="true"></div>

//           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <span className="inline-block px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-6">
//                   About AMP Vending
//                 </span>
//                 <h1 
//                   id="about-hero-heading"
//                   className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-6 leading-tight"
//                 >
//                   Premium Vending Solutions for{' '}
//                   <span className="text-[#FD5A1E]">Modern Workplaces</span>
//                 </h1>
//                 <p className="text-xl text-[#A5ACAF] mb-8 leading-relaxed">
//                   Founded with a mission to enhance workplace satisfaction through innovative vending technology, 
//                   AMP Vending has become Central California's trusted partner for premium vending solutions.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Link
//                     href="/contact"
//                     className="px-6 py-3 bg-[#FD5A1E] text-[#000000] font-medium rounded-full hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
//                     aria-label="Contact AMP Vending for consultation"
//                   >
//                     Schedule Consultation
//                   </Link>
//                   <Link
//                     href="/vending-machines"
//                     className="px-6 py-3 bg-transparent border border-[#A5ACAF] text-[#F5F5F5] font-medium rounded-full hover:bg-[#4d4d4d] hover:border-[#FD5A1E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A5ACAF] focus:ring-offset-2 focus:ring-offset-black"
//                     aria-label="View our vending machine collection"
//                   >
//                     View Our Machines
//                   </Link>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="relative"
//               >
//                 <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                   <Image
//                     src="/images/machines/amp-vending-machines.jpg"
//                     alt="AMP Vending premium machines showcasing modern workplace solutions"
//                     width={600}
//                     height={400}
//                     className="w-full h-auto object-cover"
//                     priority
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                   <div className="absolute bottom-6 left-6 right-6">
//                     <p className="text-white font-medium text-lg mb-2">Serving Central California</p>
//                     <p className="text-white/80 text-sm">Premium vending solutions for modern workplaces</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

    



//         {/* Call to Action */}
//         <section className="py-16" aria-labelledby="cta-heading">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               className="text-center bg-gradient-to-r from-[#FD5A1E]/10 to-transparent rounded-2xl p-12 border border-[#FD5A1E]/30"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 id="cta-heading" className="text-3xl font-bold text-[#F5F5F5] mb-4">
//                 Ready to Transform Your Workplace?
//               </h2>
//               <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto mb-8">
//                 Experience the difference that premium vending technology and professional service can make. 
//                 Contact us today for a consultation.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   href="/contact"
//                   className="px-8 py-4 bg-[#FD5A1E] text-[#000000] font-medium rounded-full hover:bg-[#FD5A1E]/90 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
//                   aria-label="Contact AMP Vending for consultation"
//                 >
//                   Schedule Your Consultation
//                 </Link>
//                 <Link
//                   href="/vending-machines"
//                   className="px-8 py-4 bg-transparent border border-[#A5ACAF] text-[#F5F5F5] font-medium rounded-full hover:bg-[#4d4d4d] hover:border-[#FD5A1E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A5ACAF] focus:ring-offset-2 focus:ring-offset-black"
//                   aria-label="Explore our vending machine options"
//                 >
//                   Explore Our Solutions
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default AboutPage;