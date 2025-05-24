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
