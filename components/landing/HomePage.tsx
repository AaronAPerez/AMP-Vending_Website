'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

// Responsive components
import PageLayout from '../layout/PageLayout';
import Section from '../ui/sections/Section';
import ResponsiveHero from '../hero/ResponsiveHero';
import ResponsiveGrid from '../ui/grids/ResponsiveGrid';
import Card from '../ui/cards/Card';
import Text from '../ui/typography/Text';

// Homepage sections
import ProcessSection from '../sections/ProcessSection';
import FAQSection from '../sections/FAQSection';
import HomeContactSection from '../sections/HomeContactSection';
import ServiceAreaSection from '../sections/ServiceAreaSection';
import CTASection from '../sections/CTASection';
import ProductSection from '../sections/ProductSection';
import VendingMachineShowcase from '../sections/VendingMachineShowcase ';
import WorkplaceTransformSection from '../sections/WorkplaceTransformSection';


/**
 * HomePage Component
 * Main landing page for AMP Vending Machines website
 * Features visual distinction between sections with varying dark backgrounds
 */
const HomePage = () => {
  // State for tracking if we're on client-side for animations
  const [, setIsClient] = useState(false);

  // Effect to check if we're on client-side (for SSR compatibility)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
     <PageLayout>
      {/* Structured data scripts */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AMP Vending",
            "url": "https://www.ampvendingmachines.com",
            "logo": "https://www.ampvendingmachines.com/images/logo/AMP_logo.png",
            "description": "Premium vending machine solutions with zero-cost installation and maintenance-free operation for workplaces.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "4120 Dale Rd ste j8 1005",
              "addressLocality": "Modesto",
              "addressRegion": "CA",
              "postalCode": "95354",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+12094035450",
              "contactType": "customer service",
              "email": "ampdesignandconsulting@gmail.com"
            }
          })
        }}
      />

      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Premium Vending Solutions at Zero Cost",
            "description": "AMP Vending provides zero-cost, maintenance-free vending machines with 21.5\" touchscreen interfaces and 50+ customizable product options.",
            "url": "https://www.ampvendingmachines.com/",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.ampvendingmachines.com/"
            }
          })
        }}
      />



       <div className="flex flex-col min-h-screen overflow-hidden">
         {/* Hero Section - Premium Workplace Vending at Zero Cost */}
         <section
          id="hero"
          className="relative min-h-screen"
          aria-labelledby="hero-heading"
        >
      
    
<ResponsiveHero 
  title={
    <>
      Premium Vending Solutions at{' '}
      <span className="text-[#FD5A1E] hero-accent">Zero Cost</span>
    </>
  }
  subtitle="Enhance your workplace with state-of-the-art vending machines offering 50+ snack options and 20+ beverage options."
  primaryCta={{ text: "View Machines", href: "/vending-machines" }}
  secondaryCta={{ text: "Contact Us", href: "/contact" }}
/>
</section>
      
      {/* Smooth transition gradient */}
      <div 
        className="h-32 bg-gradient-to-b from-transparent to-[#000000] -mt-32 relative z-20"
        aria-hidden="true"
      />
      
      {/* Workplace Transformation Section */}
      <Section
        id="workplace-transform"
        title={
          <>
            Transform Your <span className="text-[#FD5A1E]">Workplace Experience</span>
          </>
        }
        subtitle="See how premium vending machines transform ordinary workplaces into modern, employee-focused environments."
        background="gradient"
      >
        <WorkplaceTransformSection renderHeading={false} />
      </Section>
      
      {/* Vending Machine Showcase */}
      <Section
        id="vending-machine-showcase"
        title={
          <>
            Our Premium <span className="text-[#FD5A1E]">Vending Machines</span>
          </>
        }
        subtitle="Discover our state-of-the-art vending machines with advanced features designed for modern workplaces."
        background="dark"
      >
        <VendingMachineShowcase />
      </Section>
      
      {/* Products Showcase */}
      <Section
        id="products-showcase" 
        background="gradient"
      >
        <ProductSection />
      </Section>
      
      {/* Process Section */}
      <Section
        id="process-section"
        title={
          <>
            Getting Started <span className="text-[#FD5A1E]">Is Simple</span>
          </>
        }
        subtitle="Our streamlined process makes it easy to upgrade your workplace with premium vending solutions."
        background="dark"
      >
        <ProcessSection />
      </Section>
      
      {/* Benefits Section */}
      <Section
        id="benefits-section"
        title={
          <>
            Benefits for <span className="text-[#FD5A1E]">Your Workplace</span>
          </>
        }
        subtitle="Discover how our zero-cost vending solutions enhance employee satisfaction and workplace productivity."
        background="gradient"
      >
        <ResponsiveGrid
          cols={{ xs: 1, sm: 1, md: 2, lg: 2 }}
          gap="gap-8"
        >
          <Card variant="default" padding="md">
            <Text variant="h4" color="accent" className="mb-3">Zero-Cost Installation</Text>
            <Text variant="body" color="muted">
              Premium vending machines installed at absolutely no cost to your business, with all maintenance handled by our team.
            </Text>
          </Card>
          
          <Card variant="default" padding="md">
            <Text variant="h4" color="accent" className="mb-3">21.5&quot; Touchscreen Interface</Text>
            <Text variant="body" color="muted">
              State-of-the-art interactive display with intuitive navigation for a premium user experience.
            </Text>
          </Card>
          
          <Card variant="default" padding="md">
            <Text variant="h4" color="accent" className="mb-3">Maintenance-Free Operation</Text>
            <Text variant="body" color="muted">
              We handle all servicing, repairs, and restocking, ensuring your machines are always operational and well-stocked.
            </Text>
          </Card>
          
          <Card variant="default" padding="md">
            <Text variant="h4" color="accent" className="mb-3">Customizable Product Options</Text>
            <Text variant="body" color="muted">
              Choose from 50+ refreshment options tailored to your employee and customer preferences.
            </Text>
          </Card>
        </ResponsiveGrid>
      </Section>
      
      {/* Service Area Section */}
      <Section
        id="service-area"
        title={
          <>
            Our <span className="text-[#FD5A1E]">Service Area</span>
          </>
        }
        subtitle="We provide vending solutions throughout Central California, with a focus on Modesto and surrounding areas."
        background="dark"
      >
        <ServiceAreaSection />
      </Section>
      
      {/* FAQ Section */}
      <Section
        id="faq-section"
        title={
          <>
            Frequently <span className="text-[#FD5A1E]">Asked Questions</span>
          </>
        }
        subtitle="Find answers to common questions about our zero-cost vending solutions."
        background="gradient"
      >
        <FAQSection />
      </Section>
      
      {/* Contact Section */}
      <Section
        id="contact-section"
        title={
          <>
            Get <span className="text-[#FD5A1E]">In Touch</span>
          </>
        }
        subtitle="Have questions about our vending solutions? We're here to help."
        background="dark"
      >
        <HomeContactSection />
      </Section>
      
      {/* CTA Section */}
      <CTASection />
    </div>
    </PageLayout>
  );
};

export default HomePage;
// 'use client';

// import React, { useState, useEffect } from 'react';
// import ProcessSection from '../sections/ProcessSection';
// import FAQSection from '../sections/FAQSection';
// import HomeContactSection from '../sections/HomeContactSection';
// import ServiceAreaSection from '../sections/ServiceAreaSection';
// import CTASection from '../sections/CTASection';
// import HeroParallax from '../hero/HeroParallax';
// import ProductSection from '../sections/ProductSection';
// import VendingMachineShowcase from '../sections/VendingMachineShowcase ';
// import Script from 'next/script';
// import Link from 'next/link';
// import WorkplaceTransformSection from '../sections/WorkplaceTransformSection';


// /**
//  * HomePage Component
//  * Main landing page for AMP Vending Machines website
//  * Features visual distinction between sections with varying dark backgrounds
//  */
// const HomePage = () => {
//   // State for tracking if we're on client-side for animations
//   const [isClient, setIsClient] = useState(false);

//   // Effect to check if we're on client-side (for SSR compatibility)
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return (
//     <>
//       {/* Structured data scripts */}
//       <Script
//         id="organization-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Organization",
//             "name": "AMP Vending",
//             "url": "https://www.ampvendingmachines.com",
//             "logo": "https://www.ampvendingmachines.com/images/logo/AMP_logo.png",
//             "description": "Premium vending machine solutions with zero-cost installation and maintenance-free operation for workplaces.",
//             "address": {
//               "@type": "PostalAddress",
//               "streetAddress": "4120 Dale Rd ste j8 1005",
//               "addressLocality": "Modesto",
//               "addressRegion": "CA",
//               "postalCode": "95354",
//               "addressCountry": "US"
//             },
//             "contactPoint": {
//               "@type": "ContactPoint",
//               "telephone": "+12094035450",
//               "contactType": "customer service",
//               "email": "ampdesignandconsulting@gmail.com"
//             }
//           })
//         }}
//       />

//       <Script
//         id="webpage-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "WebPage",
//             "name": "Premium Vending Solutions at Zero Cost",
//             "description": "AMP Vending provides zero-cost, maintenance-free vending machines with 21.5\" touchscreen interfaces and 50+ customizable product options.",
//             "url": "https://www.ampvendingmachines.com/",
//             "mainEntityOfPage": {
//               "@type": "WebPage",
//               "@id": "https://www.ampvendingmachines.com/"
//             }
//           })
//         }}
//       />

//       <div className="flex flex-col min-h-screen overflow-hidden">
//         {/* Hero Section - Premium Workplace Vending at Zero Cost */}
//         <section
//           id="hero"
//           className="relative min-h-screen"
//           aria-labelledby="hero-heading"
//         >
//           {/* Use HeroParallax as the background but disable its content rendering */}
//           <HeroParallax renderHeading={false} renderContent={false} />

//           {/* Custom hero content with single H1 heading */}
//           <div className="absolute inset-0 z-30 flex items-center justify-center">
//             <div className="text-center px-4 max-w-5xl">
//               <h1
//                 id="hero-heading"
//                 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 drop-shadow-lg"
//               >
//                 Premium Vending Solutions<br></br>
//                 <span className="text-[#FD5A1E]">at Zero Cost</span>
//               </h1>
//               <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 drop-shadow-lg max-w-3xl mx-auto">
//                 Enhance your workplace with state-of-the-art vending machines offering
//                 50+ snack options and 20+ beverage options.
//               </p>
//               <div className="flex flex-wrap justify-center gap-4">
//                 <Link
//                   href="/vending-machines"
//                   className="px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
//                   aria-label="View our vending machines"
//                 >
//                   View Machines
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#FD5A1E] hover:border-[#FD5A1E] transition-colors"
//                   aria-label="Contact us about vending machines"
//                 >
//                   Contact Us
//                 </Link>
//               </div>

//               {/* Scroll indicator */}
//               <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
//                 <svg className="w-6 h-6 text-[#F5F5F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Smooth transition gradient */}
//         <div className="h-32 bg-gradient-to-b from-transparent to-[#000000] -mt-32 relative z-20"
//           aria-hidden="true"></div>

//         {/* Workplace Transformation Section - Before/After Comparison */}
//         <section
//           id="workplace-transform"
//           className="relative py-16 bg-gradient-to-b from-[#000000] to-[#111111] overflow-hidden"
//           aria-labelledby="transform-heading"
//         >
//           {/* Background styling */}
//           <div className="absolute inset-0 opacity-5" aria-hidden="true">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H20V20H0V0Z' fill='none' stroke='%23A5ACAF' stroke-width='0.2'/%3E%3C/svg%3E")`,
//                 backgroundSize: '20px 20px'
//               }}
//             ></div>
//           </div>
//           <div className="absolute inset-0 bg-radial-gradient-dark opacity-30" aria-hidden="true"></div>

//           <div className="relative text-center z-10">
//             <h2
//               id="transform-heading"
//               className="text-3xl md:text-4xl font-bold text-[#F5F5F5] text-center mb-6"
//             >
//               Transform Your <span className="text-[#FD5A1E]">Workplace Experience</span>
//             </h2>
//             <p className="text-lg md:text-1xl text-[#F5F5F5] drop-shadow-lg max-w-3xl mx-auto">
//               See how our premium vending solutions transform ordinary workplaces into modern refreshment centers that boost environment satisfaction.
//             </p>
//             <WorkplaceTransformSection renderHeading={false} />
//           </div>
//         </section>

//         {/* Vending Machine Showcase - Premium Solutions */}
//         <section
//           id="vending-machine-showcase"
//           className="relative py-16 bg-[#0a0a0a]"
//           aria-labelledby="showcase-heading"
//         >
//           {/* Subtle diagonal pattern background */}
//           <div className="absolute inset-0 opacity-5" aria-hidden="true">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0H30L0 30V60Z' fill='%23FD5A1E' fill-opacity='0.1'/%3E%3Cpath d='M60 60L0 0H30L60 30V60Z' fill='%23FD5A1E' fill-opacity='0.1'/%3E%3C/svg%3E")`,
//                 backgroundSize: '60px 60px'
//               }}
//             ></div>
//           </div>
//           <div className="relative text-center z-10">
//             {/* Section H2 Heading */}
//             <h2
//               id="showcase-heading"
//               className="text-3xl md:text-4xl font-bold text-[#F5F5F5] text-center mb-8"
//             >
//               Our Premium <span className="text-[#FD5A1E]">Vending Machines</span>
//             </h2>
//              <p className="text-lg md:text-1xl text-[#F5F5F5] drop-shadow-lg max-w-3xl mx-auto">
//                Explore our range of state-of-the-art vending machines featuring advanced technology and customizable options for your workplace needs.
//             </p>
//             <VendingMachineShowcase renderHeading={false} />
//           </div>
//         </section>

//         {/* Products Showcase - 50+ Premium Products */}
//         <section
//           id="products-showcase"
//           className="relative py-16 bg-gradient-to-r from-[#111111] via-black to-[#111111]"
//           aria-labelledby="products-heading"
//         >
//           {/* Subtle dot pattern background */}
//           <div className="absolute inset-0 opacity-5" aria-hidden="true">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23FD5A1E' fill-opacity='0.4'/%3E%3C/svg%3E")`,
//                 backgroundSize: '20px 20px'
//               }}
//             ></div>
//           </div>

//           <div className="relative text-center z-10">
//             {/* Section H2 Heading */}
//             <h2
//               id="products-heading"
//               className="text-3xl md:text-4xl font-bold text-[#F5F5F5] text-center mb-8"
//             >
//               Customizable <span className="text-[#FD5A1E]">Product Selection</span>
//             </h2>
//              <p className="text-lg md:text-1xl text-[#F5F5F5] drop-shadow-lg max-w-3xl mx-auto">
//             Customizable selection of snacks and beverages to meet your workplace needs
//             </p>
//             <ProductSection />
//           </div>
//         </section>

//         {/* Process Section - Getting Started Is Simple */}
//         <section
//           id="process-section"
//           className="relative py-16 bg-[#0d0d0d]"
//           aria-labelledby="process-heading"
//         >
//           {/* Subtle stepped gradient background */}
//           <div className="absolute inset-0" aria-hidden="true">
//             <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#111111] opacity-60"></div>
//           </div>

//           <div className="relative text-center z-10">
//             {/* Section H2 Heading */}
//             <h2
//               id="process-heading"
//               className="text-3xl md:text-4xl font-bold text-[#F5F5F5] text-center mb-8"
//             >
//               Getting Started <span className="text-[#FD5A1E]">Is Simple</span>
//             </h2> 
//             <p className="text-lg md:text-1xl text-[#F5F5F5] drop-shadow-lg max-w-3xl mx-auto">
//                 Our streamlined process gets your vending machines up and running with minimal effort.
//             </p>

//             <ProcessSection />
//           </div>
//         </section>

//         {/* Benefits Section */}
//         {/* <section
//           id="benefits-section"
//           className="relative py-16 bg-gradient-to-br from-[#121212] to-[#0a0a0a]"
//           aria-labelledby="benefits-heading"
//         >
//           <div className="relative z-10">
//             {/* Section H2 Heading 
//             <h2
//               id="benefits-heading"
//               className="text-3xl md:text-4xl font-bold text-[#F5F5F5] text-center mb-8"
//             >
//               Benefits for Your Workplace
//             </h2>
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="max-w-4xl mx-auto">
//                 <div className="grid md:grid-cols-2 gap-8">
//                   {/* H3 headings for benefits 
//                   <div className="bg-[#4d4d4d]/20 p-6 rounded-lg border border-[#a4acac]">
//                     <h3 className="text-xl font-bold text-[#FD5A1E] mb-3">Zero-Cost Installation</h3>
//                     <p className="text-[#A5ACAF]">Premium vending machines installed at absolutely no cost to your business, with all maintenance handled by our team.</p>
//                   </div>

//                   <div className="bg-[#4d4d4d]/20 p-6 rounded-lg border border-[#a4acac]">
//                     <h3 className="text-xl font-bold text-[#FD5A1E] mb-3">21.5" Touchscreen Interface</h3>
//                     <p className="text-[#A5ACAF]">State-of-the-art interactive display with intuitive navigation for a premium user experience.</p>
//                   </div>

//                   <div className="bg-[#4d4d4d]/20 p-6 rounded-lg border border-[#a4acac]">
//                     <h3 className="text-xl font-bold text-[#FD5A1E] mb-3">Maintenance-Free Operation</h3>
//                     <p className="text-[#A5ACAF]">We handle all servicing, repairs, and restocking, ensuring your machines are always operational and well-stocked.</p>
//                   </div>

//                   <div className="bg-[#4d4d4d]/20 p-6 rounded-lg border border-[#a4acac]">
//                     <h3 className="text-xl font-bold text-[#FD5A1E] mb-3">Customizable Product Options</h3>
//                     <p className="text-[#A5ACAF]">Choose from 50+ refreshment options tailored to your employee and customer preferences.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section> */}

//         {/* Service Area Section */}
//         <section
//           id="service-area"
//           className="relative py-16 bg-gradient-to-br from-[#121212] to-[#0a0a0a]"
//           aria-labelledby="service-area-heading"
//         >
//           {/* Subtle pattern background */}
//           <div className="absolute inset-0 opacity-5" aria-hidden="true">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30m-15 0a15 15 0 1 0 30 0a15 15 0 1 0 -30 0' stroke='%23A5ACAF' stroke-opacity='0.2' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
//                 backgroundSize: '60px 60px'
//               }}
//             ></div>
//           </div>

//           <div className="relative z-10 text-center">
//             {/* Section H2 Heading */}
//             <h2
//               id="service-area-heading"
//               className="text-3xl md:text-4xl font-bold text-[#F5F5F5] text-center mb-8"
//             >
//               Our <span className="text-[#FD5A1E]">Service Area</span>
//             </h2>
//              <p className="text-lg md:text-1xl text-[#F5F5F5] drop-shadow-lg max-w-3xl mx-auto">
//               AMP Vending provides premium vending solutions throughout Central California. Our service area includes Modesto and surrounding communities.
//             </p>
//             <ServiceAreaSection />
//           </div>
//         </section>

//         {/* FAQ Section - Frequently Asked Questions */}
//         <section
//           id="faq-section"
//           className="relative py-16 bg-gradient-to-b from-[#111111] to-[#0a0a0a]"
//           aria-labelledby="faq-heading"
//         >
//           {/* Subtle wave pattern background */}
//           {/* <div className="absolute inset-0 opacity-5" aria-hidden="true">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10C25 18 25 2 50 10C75 18 75 2 100 10V20H0V10Z' fill='%23A5ACAF' fill-opacity='0.1'/%3E%3C/svg%3E")`,
//                 backgroundSize: '100px 20px'
//               }}
//             ></div>
//           </div> */}

//           <div className="relative text-center z-10">
//             {/* Section H2 Heading */}
//             <h2
//               id="faq-heading"
//               className="text-3xl md:text-4xl font-bold text-[#F5F5F5] text-center mb-8"
//             >
//               Frequently <span className="text-[#FD5A1E]">Asked Questions</span>
//             </h2>
//              <p className="text-lg md:text-1xl text-[#F5F5F5] drop-shadow-lg max-w-3xl mx-auto">
//               Find answers to common questions about our premium vending solutions.
//             </p>
//             <FAQSection />
//           </div>
//         </section>

//         {/* Contact Section - Get In Touch */}
//         <section
//           id="contact-section"
//           className="relative py-16 bg-gradient-to-br from-[#000000] via-[#050505] to-[#0d0d0d]"
//           aria-labelledby="contact-heading"
//         >
//           {/* Subtle grid pattern background */}
//           <div className="absolute inset-0 opacity-10" aria-hidden="true">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L40 0L40 40L0 40L0 0Z' fill='none' stroke='%23A5ACAF' stroke-width='0.5'/%3E%3C/svg%3E")`,
//                 backgroundSize: '40px 40px'
//               }}
//             >
//             </div>
//           </div>

//           {/* Subtle radial gradient overlay for orange accent */}
//           <div className="absolute inset-0 bg-gradient-to-b from-[#FD5A1E]/5 to-transparent opacity-30" aria-hidden="true"></div>
          
          
//           {/* Section H2 Heading */}
//           <h2
//             id="contact-heading"
//             className="relative z-10 text-3xl md:text-4xl font-bold text-[#F5F5F5] text-center mb-8"
//           >
//             Get <span className="text-[#FD5A1E]">In Touch</span>
//           </h2>
//                <p className="text-lg md:text-1xl text-[#F5F5F5] drop-shadow-lg max-w-3xl mx-auto text-center">
//                 Have questions about our vending solutions? We&apos;re here to help. 
//             Fill out the form below and our team will get back to you soon.
//             </p>
//           <HomeContactSection />
//         </section>

//         {/* CTA Section - Premium Refreshments, Zero Hassle */}
//         <CTASection />
//       </div>
//     </>
//   );
// };

// export default HomePage;