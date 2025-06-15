// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import Script from 'next/script';
// import BusinessCardControls from '@/components/business-card/BusinessCardControls';
// import BusinessCardTheme from '@/components/business-card/BusinessCardTheme';
// import { getThemeFromStorage, saveThemeToStorage, getThemeDisplayName } from '@/lib/business-card-utils';
// import BusinessCardSelector from '@/components/business-card/BusinessCardSelector';
// import BusinessCardInstructions from '@/components/business-card/BusinessCardInstructions';

// /**
//  * Business Card Page Component with Complete Theme Support
//  * 
//  * Displays Andrew Perez's business card with both WhiteSmoke and Dark theme options
//  * Includes comprehensive print/download functionality and professional printing instructions
//  * Features persistent theme selection and URL parameter support
//  */
// const BusinessCardPage: React.FC = () => {
//   const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');
//   const [isLoaded, setIsLoaded] = useState<boolean>(false);

//   /**
//    * Initialize theme from storage or URL parameters
//    */
//   useEffect(() => {
//     const initialTheme = getThemeFromStorage();
//     setSelectedTheme(initialTheme);
//     setIsLoaded(true);
//   }, []);

//   /**
//    * Handle theme change from selector component
//    */
//   const handleThemeChange = (theme: 'light' | 'dark'): void => {
//     setSelectedTheme(theme);
//     saveThemeToStorage(theme);
    
//     // Update URL parameter without page refresh
//     const url = new URL(window.location.href);
//     url.searchParams.set('theme', theme);
//     window.history.replaceState({}, '', url.toString());
//   };

//   // Don't render until theme is loaded to prevent flash
//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FD5A1E] mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading business card...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* SEO and Structured Data */}
//       <Script
//         id="business-card-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "WebPage",
//             "name": `AMP Vending Business Card - Andrew Perez (${getThemeDisplayName(selectedTheme)})`,
//             "description": `Professional business card for Andrew Perez, President of AMP Design and Consulting LLC. Available in ${getThemeDisplayName(selectedTheme)} theme. Download or print for networking and business use.`,
//             "url": `https://www.ampvendingmachines.com/business-card?theme=${selectedTheme}`,
//             "mainEntity": {
//               "@type": "Person",
//               "name": "Andrew Perez",
//               "jobTitle": "President",
//               "affiliation": {
//                 "@type": "Organization",
//                 "name": "AMP Design and Consulting LLC",
//                 "url": "https://www.ampvendingmachines.com"
//               },
//               "contactPoint": {
//                 "@type": "ContactPoint",
//                 "telephone": "+12094035450",
//                 "email": "ampdesignandconsulting@gmail.com",
//                 "contactType": "customer service"
//               },
//               "address": {
//                 "@type": "PostalAddress",
//                 "streetAddress": "4120 Dale Rd Ste J8 1005",
//                 "addressLocality": "Modesto",
//                 "addressRegion": "CA",
//                 "postalCode": "95354",
//                 "addressCountry": "US"
//               }
//             }
//           })
//         }}
//       />

//       <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-50 to-gray-100">
//         {/* Page Header */}
//         <header className="bg-black/90 py-12">
//           <div className="max-w-7xl mx-auto px-4 text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               {/* Breadcrumb Navigation */}
//               <nav className="mb-6" aria-label="Breadcrumb">
//                 <ol className="flex items-center justify-start text-sm text-[#A5ACAF] space-x-2">
//                   <li>
//                     <Link
//                       href="/"
//                       className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
//                       aria-label="Go to homepage"
//                     >
//                       Home
//                     </Link>
//                   </li>
//                   <li aria-hidden="true">/</li>
//                   <li className="text-[#F5F5F5] font-medium" aria-current="page">
//                     Business Card
//                   </li>
//                 </ol>
//               </nav>

//               <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//                 AMP Vending <span className="text-[#FD5A1E]">Business Card</span>
//               </h1>
//               <p className="text-lg text-[#A5ACAF] max-w-2xl mx-auto mb-6">
//                 Professional business card for Andrew Perez, President of AMP Design and Consulting LLC.
//                 Choose your preferred style and print or download for networking and professional use.
//               </p>

//               {/* Current Theme Info */}
//               <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full">
//                 <span className="text-[#FD5A1E] font-medium text-sm">
//                   Current: {getThemeDisplayName(selectedTheme)} • Switch themes below
//                 </span>
//               </div>
//             </motion.div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="py-12 bg-black/95">
//           <div className="max-w-4xl mx-auto px-4">
//             <motion.div
//               className="flex flex-col items-center gap-8"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               {/* Theme Selector */}
//               <BusinessCardSelector
//                 onThemeChange={handleThemeChange}
//                 currentTheme={selectedTheme}
//               />

//               {/* Business Card Component with Theme */}
//               <motion.div
//                 key={selectedTheme} // Force re-render on theme change
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="flex justify-center"
//               >
//                 <BusinessCardTheme theme={selectedTheme} />
//               </motion.div>

//               {/* Theme Description */}
//               <motion.div
//                 className="text-center max-w-md"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 <p className="text-gray-300 text-sm">
//                   <strong className="text-[#FD5A1E]">{getThemeDisplayName(selectedTheme)}:</strong>{' '}
//                   {selectedTheme === 'light'
//                     ? "Clean, modern design perfect for traditional business environments and professional networking"
//                     : "Sophisticated design with premium feel, ideal for creative industries and modern business contexts"
//                   }
//                 </p>
//               </motion.div>

//               {/* Print/Download Controls with Theme Support */}
//               <BusinessCardControls theme={selectedTheme} />

//               {/* Instructions Panel */}
//               <BusinessCardInstructions />

//               {/* Additional Information */}
//               <motion.section
//                 className="w-full max-w-2xl bg-white rounded-lg p-6 shadow-md border border-gray-200"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.6 }}
//                 aria-labelledby="contact-info-heading"
//               >
//                 <h2 id="contact-info-heading" className="text-lg font-semibold text-gray-800 mb-4 text-center">
//                   Contact Information
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
//                   <div>
//                     <strong>Andrew Perez</strong><br />
//                     President<br />
//                     AMP Design and Consulting LLC
//                   </div>
//                   <div>
//                     <strong>Business Hours:</strong><br />
//                     Monday - Friday: 8AM - 8PM<br />
//                     Saturday - Sunday: 8AM - 8PM
//                   </div>
//                   <div>
//                     <strong>Phone:</strong> 
//                     <a 
//                       href="tel:+12094035450" 
//                       className="text-[#FD5A1E] hover:underline ml-1 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-1 rounded"
//                     >
//                       (209) 403-5450
//                     </a><br />
//                     <strong>Email:</strong> 
//                     <a 
//                       href="mailto:ampdesignandconsulting@gmail.com" 
//                       className="text-[#FD5A1E] hover:underline ml-1 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-1 rounded"
//                     >
//                       ampdesignandconsulting@gmail.com
//                     </a>
//                   </div>
//                   <div>
//                     <strong>Address:</strong><br />
//                     4120 Dale Rd Ste J8 1005<br />
//                     Modesto, CA 95354<br />
//                     <strong>Website:</strong> 
//                     <a 
//                       href="https://www.ampvendingmachines.com" 
//                       className="text-[#FD5A1E] hover:underline ml-1 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-1 rounded"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       www.ampvendingmachines.com
//                     </a>
//                   </div>
//                 </div>

//                 {/* Theme Benefits */}
//                 <div className="mt-6 pt-4 border-t border-gray-200">
//                   <h3 className="font-semibold text-gray-800 mb-2">Why Choose {getThemeDisplayName(selectedTheme)}?</h3>
//                   <ul className="text-sm text-gray-600 space-y-1">
//                     {selectedTheme === 'light' ? (
//                       <>
//                         <li>• Excellent readability in all lighting conditions</li>
//                         <li>• Professional appearance for corporate environments</li>
//                         <li>• Cost-effective printing on any paper type</li>
//                         <li>• Timeless design that never goes out of style</li>
//                       </>
//                     ) : (
//                       <>
//                         <li>• Modern, sophisticated appearance</li>
//                         <li>• Perfect for creative and tech industries</li>
//                         <li>• Premium feel that stands out from standard cards</li>
//                         <li>• Eye-catching design for memorable networking</li>
//                       </>
//                     )}
//                   </ul>
//                 </div>
//               </motion.section>

//               {/* Theme Switching Tip */}
//               <motion.div
//                 className="text-center bg-[#FD5A1E]/5 rounded-lg p-4 border border-[#FD5A1E]/20"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 0.7 }}
//               >
//                 <p className="text-sm text-gray-600">
//                   <strong className="text-[#FD5A1E]">💡 Pro Tip:</strong> You can switch between themes at any time above. 
//                   Your preference will be saved for future visits. Both themes print beautifully!
//                 </p>
//               </motion.div>

//               {/* Back to Website Link */}
//               <motion.div
//                 className="mt-8 text-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 0.8 }}
//               >
//                 <Link
//                   href="/"
//                   className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-full hover:bg-[#E5511A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2"
//                   aria-label="Return to AMP Vending homepage"
//                 >
//                   <svg
//                     className="w-5 h-5 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     aria-hidden="true"
//                   >
//                     <path 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round" 
//                       strokeWidth={2} 
//                       d="M10 19l-7-7m0 0l7-7m-7 7h18" 
//                     />
//                   </svg>
//                   Back to AMP Vending Website
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </div>
//         </main>

//         {/* Footer Note */}
//         <footer className="bg-black/90 py-8 border-t-2 border-gray-200">
//           <div className="max-w-4xl mx-auto px-4 text-center">
//             <p className="text-gray-300 text-sm mb-2">
//               This business card is part of AMP Vending's professional materials.
//               For vending machine services and consultations, visit our main website or contact Andrew directly.
//             </p>
//             <p className="text-gray-400 text-xs">
//               Current theme: {getThemeDisplayName(selectedTheme)} • 
//               Last updated: {new Date().toLocaleDateString()} • 
//               Optimized for print and digital use
//             </p>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default BusinessCardPage;