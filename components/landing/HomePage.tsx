'use client';

import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { ResponsiveHero } from '../hero/ResponsiveHero';
import { ClientOnly } from '../ui/shared/ClientOnly';
import Section from '../ui/shared/Section';
import WorkplaceTransformSection from './WorkplaceTransformSection';
import VendingMachineShowcase from './VendingMachineShowcase';
import ProductSection from './ProductSection';
import ProcessSection from './ProcessSection';
import ServiceAreaSection from './ServiceAreaSection';
import FAQSection from './FAQSection';
import HomeContactSection from './HomeContactSection';
import CTASection from './CTASection';



const HomePage = () => {
  const [, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
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
            "description": "Professional vending machines with 21.5\" touchscreen technology and 50+ product options for Central California workplaces. Installation included.",
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
            "name": "Professional Vending Solutions | AMP Vending",
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


  
        {/* Hero Section - Optimized for LCP */}
        <Section
          id="hero"
          className="relative min-h-screen bg-black/90"
          aria-labelledby="hero-heading"
        >
          <ResponsiveHero
            title={
              <>
                Premium Vending Solutions
                <br />for <span className="text-[#FD5A1E] hero-accent">Modern Workplaces</span>
              </>
            }
            subtitle="Enhance your workplace with state-of-the-art vending machines featuring 21.5&quot; touchscreen technology, contactless payments, and 50+ customizable options."
          primaryCta={{ text: "View Machines", href: "/vending-machines" }}
          secondaryCta={{ text: "Contact Us", href: "/contact" }}
        />
        </Section>

        <ClientOnly>
          {/* Workplace Transformation */}
          <Section
            id="workplace-transformation"
            background="gradient"
            spacing="lg">
            <WorkplaceTransformSection />
          </Section>

          {/* Vending Machine Showcase */}
          <Section
            id="vending-machine-showcase"
            background="gradient"
            spacing="lg">
            <VendingMachineShowcase />
          </Section>

          {/* Product Selection */}
          <Section
            id="products"
            background="gradient"
            spacing="lg"
          >
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

          {/* Implementation Process */}
          <Section
            id="process"
            background="dark"
            spacing="lg"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
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

          {/* Service Area */}
          <Section
            id="service-area"
            background="gradient"
            spacing="lg"
          >
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

          {/* FAQ Section */}
          <Section
            id="faq"
            background="dark"
            spacing="lg"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
                <span className="text-[#FD5A1E] font-medium text-sm">Quick Answers</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
                Frequently <span className="text-[#FD5A1E]">Asked Questions</span>
              </h2>

              <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
                Everything you need to know about our professional vending solutions
              </p>
            </div>

            <FAQSection />
          </Section>

          {/* Contact Section */}
          <Section
            id="contact"
            background="gradient"
            spacing="lg"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
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

          {/* Final CTA */}
          <div className='bg-black/70'>
            <CTASection />
          </div>
        </ClientOnly>
  
    </>
  );
};

export default HomePage;
