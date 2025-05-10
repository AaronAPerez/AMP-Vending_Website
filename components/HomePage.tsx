'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroParallax from './hero/HeroParallax';
import WorkplaceTransformSection from './sections/WorkplaceTransformSection';
import ShowcaseLensEffect from './ShowcaseLensEffect';
import ProductSection from './sections/ProductSection';
import ProcessSection from './ProcessSection';
import FAQSection from './sections/FAQSection';
import ContactForm from './sections/ContactForm';
import ServiceAreaMapPreview from './previews/ServiceAreaMapPreview';
import ServiceAreaSection from './sections/ServiceAreaSection';
import HomeContactSection from './sections/HomeContactSection';

/**
 * HomePage Component
 * Main landing page for AMP Vending Machines website
 * Features visual distinction between sections with varying dark backgrounds
 */
const HomePage = () => {
  // State for tracking if we're on client-side for animations
  const [isClient, setIsClient] = useState(false);
  
  // Effect to check if we're on client-side (for SSR compatibility)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section - Premium Workplace Vending at Zero Cost */}
      <section 
        id="hero"
        className="relative min-h-screen bg-black"
        aria-labelledby="hero-heading"
      >
        {/* Dynamic parallax background with product images */}
        <HeroParallax />
        
        {/* Overlay gradient to ensure content readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/70 to-[#000000] z-10" 
             aria-hidden="true"></div>
      </section>

      {/* Smooth transition gradient */}
      <div className="h-32 bg-gradient-to-b from-transparent to-[#000000] -mt-32 relative z-20"
           aria-hidden="true"></div>

      {/* Workplace Transformation Section - Before/After Comparison */}
      <section 
        id="workplace-transform"
        className="relative py-16 bg-gradient-to-b from-[#000000] to-[#111111] overflow-hidden"
        aria-labelledby="transform-heading"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H20V20H0V0Z' fill='none' stroke='%23A5ACAF' stroke-width='0.2'/%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
        
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-radial-gradient-dark opacity-30" aria-hidden="true"></div>
        
        <div className="relative z-10">
          <WorkplaceTransformSection />
        </div>
      </section>

      {/* Vending Machine Showcase - Premium Solutions */}
      <section 
        id="vending-machine-showcase"
        className="relative py-16 bg-[#0a0a0a]"
        aria-labelledby="showcase-heading"
      >
        {/* Subtle diagonal pattern background */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0H30L0 30V60Z' fill='%23FD5A1E' fill-opacity='0.1'/%3E%3Cpath d='M60 60L0 0H30L60 30V60Z' fill='%23FD5A1E' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
        
        <div className="relative z-10">
          <ShowcaseLensEffect />
        </div>
      </section>

      {/* Products Showcase - 50+ Premium Products */}
      <section 
        id="products-showcase" 
        className="relative py-16 bg-gradient-to-r from-[#111111] via-black to-[#111111]"
        aria-labelledby="products-heading"
      >
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23FD5A1E' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
        
        <div className="relative z-10">
          <ProductSection />
        </div>
      </section>

      {/* Process Section - Getting Started Is Simple */}
      <section
        id="process-section"
        className="relative py-16 bg-[#0d0d0d]"
        aria-labelledby="process-heading"
      >
        {/* Subtle stepped gradient background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#111111] opacity-60"></div>
        </div>
        
        <div className="relative z-10">
          <ProcessSection />
        </div>
      </section>

      {/* Service Area Section */}
<section
  id="service-area"
  className="relative py-16 bg-gradient-to-br from-[#0a0a0a] to-[#151515]"
  aria-labelledby="service-area-heading"
>
  {/* Subtle pattern background */}
  <div className="absolute inset-0 opacity-5" aria-hidden="true">
    <div 
      className="absolute inset-0" 
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30m-15 0a15 15 0 1 0 30 0a15 15 0 1 0 -30 0' stroke='%23A5ACAF' stroke-opacity='0.2' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}
    ></div>
  </div>
  
  <div className="relative z-10">
    <ServiceAreaSection />
  </div>
</section>

      {/* FAQ Section - Frequently Asked Questions */}
      <section
        id="faq-section"
        className="relative py-16 bg-gradient-to-b from-[#111111] to-[#0a0a0a]"
        aria-labelledby="faq-heading"
      >
        {/* Subtle wave pattern background */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10C25 18 25 2 50 10C75 18 75 2 100 10V20H0V10Z' fill='%23A5ACAF' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 20px'
            }}
          ></div>
        </div>
        
        <div className="relative z-10">
          <FAQSection />
        </div>
      </section>

      {/* Contact Section - Get In Touch */}
      <section
        id="contact-section"
        className="relative py-16 bg-gradient-to-br from-[#000000] via-[#050505] to-[#0d0d0d]"
        aria-labelledby="contact-heading"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L40 0L40 40L0 40L0 0Z' fill='none' stroke='%23A5ACAF' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>
        
        {/* Subtle radial gradient overlay for orange accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FD5A1E]/5 to-transparent opacity-30" aria-hidden="true"></div>
        
        <div className="relative z-10">
          {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
            <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
              Get In Touch
            </span>
            <h2 
              id="contact-heading"
              className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
            >
              Contact AMP Vending
            </h2>
            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Have questions about our vending solutions? We&apos;re here to help. Fill out the form below and our team will get back to you soon.
            </p>
          </div> */}
          <HomeContactSection/>
        </div>
      </section>

      {/* CTA Section - Premium Refreshments, Zero Hassle */}
      <section 
        id="cta-section"
        className="py-16 bg-[#FD5A1E]"
        aria-labelledby="cta-heading"
      >
        {/* Subtle pattern overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 
            id="cta-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Premium Refreshments, Zero Hassle
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join leading workplaces enjoying state-of-the-art vending with no costs and no maintenance worries.
          </p>
          
          {/* CTA Buttons with enhanced accessibility */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-white text-black font-medium rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:shadow-white/30 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FD5A1E]"
              aria-label="Schedule a free consultation"
            >
              <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 w-full h-full bg-white blur-md transform scale-110"></span>
              </span>
              <span className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300">
                Get Started
              </span>
            </Link>
            
            <Link
              href="/vending-machines"
              className="group relative px-8 py-4 border-2 border-white text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FD5A1E]"
              aria-label="View our vending machines"
            >
              <span className="absolute inset-0 w-full h-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-30"></span>
              <span className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300">
                View Machines
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};


export default HomePage;
// 'use client';

// import React, { useState, useEffect } from 'react';
// import ShowcaseLensEffect from '@/components/ShowcaseLensEffect';
// import Link from 'next/link';
// import HeroParallax from './hero/HeroParallax';
// import WorkplaceTransformSection from './sections/WorkplaceTransformSection';
// import ProductSection from './sections/ProductSection';
// import ProcessSection from './ProcessSection';
// import FAQSection from './sections/FAQSection';
// import ContactForm from './sections/ContactForm';
// import PremiumVendingShowcase from './sections/PremiumVendingShowcase';



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
//     <div className="flex flex-col min-h-screen overflow-hidden">
//       {/* Hero Section with gradient background */}
    
//       <section id="hero"
//         className="relative min-h-screen bg-black"
//         aria-labelledby="hero-heading">
//         <HeroParallax /> 
//     {/* Overlay gradient to ensure content readability */}
//     <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/70 to-[#000000] z-10"></div>
//       </section>

//       {/* Transition element */}
//       <div className="h-32 bg-gradient-to-b from-transparent to-[#000000] -mt-32 relative z-20"></div>

//   <section id="workplace-transform">

//   <WorkplaceTransformSection/>
//   </section>


//       {/* Vending Machine Showcase */}
//       <section id="vending-machine-showcase"
//         className="bg-[#000000] py-16">
//         <ShowcaseLensEffect />
//       </section>


//       {/* <section id="premium-refrigerated-vending-machine-showcase"
//         className="bg-[#000000] py-16">
//           <PremiumVendingShowcase />
//       </section> */}


//       {/* Products Showcase */}
//       <section id="products-showcase" className="bg-gradient-to-b from-black to-[#4d4d4d]/20">
//         <ProductSection />
//       </section>


//       {/* Process Section with subtle dark gray background */}
//       <section
//         className="bg-black py-16"
//         aria-labelledby="process-heading"
//       >
//         <ProcessSection />
//       </section>

   

//       <section
//         className="bg-gradient-to-b from-black to-[#4d4d4d]/20"
//         aria-labelledby="faq-heading"
//       >
//         <FAQSection/>
//         </section>



//         <section
//         className="py-16 bg-black"
//         aria-labelledby="contact-heading"
//       >
//          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
//             Get In Touch
//           </span>
//           <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
//             Contact AMP Vending
//           </h1>
//           <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
//             Have questions about our vending solutions? We&apos;re here to help. Fill out the form below and our team will get back to you soon.
//           </p>
//         </div>
//         <ContactForm/>
//         </section>


      
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
      

//     </div>
//   );
// };

// export default HomePage;