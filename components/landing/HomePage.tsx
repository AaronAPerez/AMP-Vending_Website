'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

// Layout components
import PageLayout from '../layout/PageLayout';
import Section from '../ui/layout/Section';

// Hero section
import HeroSection from '../sections/HeroSection';

// Homepage sections
import WorkplaceTransformSection from '../sections/WorkplaceTransformSection';
import VendingMachineShowcase from '../sections/VendingMachineShowcase ';
import ProductSection from '../sections/ProductSection';
import ProcessSection from '../sections/ProcessSection';
import ServiceAreaSection from '../sections/ServiceAreaSection';
import FAQSection from '../sections/FAQSection';
import HomeContactSection from '../sections/HomeContactSection';
import CTASection from '../sections/CTASection';
import ResponsiveHero from '../hero/ResponsiveHero';

/**
 * HomePage Component
 * 
 * Professional landing page for AMP Vending Machines website with:
 * - Focus on advanced technology and service benefits
 * - Enhanced visual hierarchy and flow
 * - Improved section transitions and animations
 * - SEO-optimized structured data
 * - Better accessibility and performance
 */
const HomePage = () => {
  // State for tracking client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Effect to check if we're on client-side (for SSR compatibility)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <PageLayout>
      {/* Enhanced Structured Data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "AMP Vending",
            "url": "https://www.ampvendingmachines.com",
            "logo": "https://www.ampvendingmachines.com/images/logo/AMP_logo.png",
            "description": "Advanced vending machine solutions with 21.5-inch touchscreen technology and comprehensive service packages for workplaces in Central California.",
            "areaServed": "Central California",
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
              "email": "ampdesignandconsulting@gmail.com",
              "areaServed": "US-CA",
              "availableLanguage": "English"
            },
            "openingHours": [
              "Mo-Fr 08:00-20:00",
              "Sa-Su 08:00-20:00"
            ],
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 37.6390972,
              "longitude": -120.9968782
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
            "name": "Advanced Vending Solutions | AMP Vending",
            "description": "Transform your workplace with advanced vending machines featuring 21.5\" touchscreen interfaces, contactless payments, and 50+ customizable product options.",
            "url": "https://www.ampvendingmachines.com/",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.ampvendingmachines.com/"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.ampvendingmachines.com/"
              }]
            }
          })
        }}
      />

      {/* Main Content Flow */}
      <main className="flex flex-col min-h-screen overflow-hidden">

        {/* Hero Section - Advanced Workplace Vending Solutions */}
        <section
          id="hero"
          className="relative min-h-screen"
          aria-labelledby="hero-heading"
        >
          <ResponsiveHero
            title={
              <>
                Advanced Vending Solutions
                <br />for <span className="text-[#FD5A1E] hero-accent">Modern Workplaces</span>
              </>
            }
            subtitle="Enhance your workplace with state-of-the-art vending machines featuring 21.5\ touchscreen technology, contactless payments, and 50+ customizable options."
            primaryCta={{ text: "View Machines", href: "/vending-machines" }}
            secondaryCta={{ text: "Contact Us", href: "/contact" }}
          />
        </section>

        {/* Workplace Transformation - Technology Focus */}
        <Section
          id="workplace-transformation"
          className='py-20 md:py-32 lg:py-40'
          background="gradient"
          spacing="lg">
          <WorkplaceTransformSection />
        </Section>

        {/* Vending Machine Showcase - Clean presentation */}
        <Section
          id="vending-machines"
          background="dark"
          spacing="lg"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
            Advanced <span className="text-[#FD5A1E]">Vending Machines</span>
          </h2>

          <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
            State-of-the-art machines with 21.5" touchscreen interfaces and smart technology
          </p>


          <VendingMachineShowcase />
        </Section>

        {/* Product Selection - Simplified */}
        <Section
          id="products"
          background="gradient"
          spacing="lg"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#FD5A1E] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">50+ Options</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Customizable <span className="text-[#FD5A1E]">Product Selection</span>
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Tailored refreshment options to match your workplace preferences
            </p>
          </div>

          <ProductSection />
        </Section>

        {/* Implementation Process - Streamlined */}
        <Section
          id="process"
          background="dark"
          spacing="lg"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#FD5A1E] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">Simple Process</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Getting Started <span className="text-[#FD5A1E]">Is Simple</span>
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Four easy steps to transform your workplace
            </p>
          </div>

          <ProcessSection />
        </Section>

        {/* Service Area - Concise */}
        <Section
          id="service-area"
          background="gradient"
          spacing="lg"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#FD5A1E] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">Central California</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Our <span className="text-[#FD5A1E]">Service Area</span>
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Professional installation and support throughout the Central Valley
            </p>
          </div>

          <ServiceAreaSection />
        </Section>

        {/* FAQ Section - Essential questions only */}
        <Section
          id="faq"
          background="dark"
          spacing="lg"
        >


          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#FD5A1E] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">Quick Answers</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Frequently <span className="text-[#FD5A1E]">Asked Questions</span>
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Everything you need to know about our advanced vending solutions
            </p>
          </div>

          <FAQSection />
        </Section>

        {/* Contact Section - Direct and clear */}
        <Section
          id="contact"
          background="gradient"
          spacing="lg"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#FD5A1E] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">Get Started</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Ready to <span className="text-[#FD5A1E]">Upgrade</span> Your Workplace?
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Contact us today for your consultation
            </p>
          </div>

          <HomeContactSection />
        </Section>

        {/* Final CTA - Strong close */}
        <CTASection />
      </main>
    </PageLayout >
  );
};

export default HomePage;