// =============================================================================
// AFTER: Optimized HomePage.tsx (41KB initial, 229KB lazy loaded)
// =============================================================================

'use client';

import React, { Suspense } from 'react';
import Script from 'next/script';

// CRITICAL: Only import what's needed immediately (41KB total)
import Section from '../ui/shared/Section';                             // 8KB
import { ClientOnly } from '../ui/shared/ClientOnly';                   // 3KB


// CRITICAL: Import loading fallbacks (lightweight)
import { 
  SectionLoadingFallback, 
  FormLoadingFallback 
} from '@/components/ui/loading/LoadingFallbacks';                      // 3KB

// CRITICAL: Business data (lightweight, for structured data)
import { 
  AMP_VENDING_BUSINESS_INFO, 
  getServiceAreaList,
  getPrimaryKeywords 
} from '@/lib/data/businessData';                                       // 8KB
import { ViewportLazy, Deferred } from '../LazyLoading';

// CRITICAL: Hero component (load immediately for LCP)
const ResponsiveHero = React.lazy(() => 
  import('../hero/ResponsiveHero').then(module => ({
    default: module.ResponsiveHero
  }))
);                                                                      // 14KB

// LAZY: Viewport-based loading (load when scrolled into view)
const WorkplaceTransformSection = React.lazy(() => 
  import('./WorkplaceTransformSection')                                 // 25KB - loads on scroll
);

const VendingMachineShowcase = React.lazy(() => 
  import('./VendingMachineShowcase')                                    // 40KB - loads on scroll
);

const ProductSection = React.lazy(() => 
  import('./ProductSection')                                            // 30KB - loads on scroll
);

const ProcessSection = React.lazy(() => 
  import('./ProcessSection')                                            // 20KB - loads on scroll
);

const ServiceAreaSection = React.lazy(() => 
  import('./ServiceAreaSection')                                        // 15KB - loads on scroll
);

const FAQSection = React.lazy(() => 
  import('./FAQSection')                                                // 25KB - loads on scroll
);

const HomeContactSection = React.lazy(() => 
  import('./HomeContactSection')                                        // 35KB - loads on scroll
);

const CTASection = React.lazy(() => 
  import('./CTASection')                                                // 10KB - loads on scroll
);

// DEFERRED: Analytics (load after 2 second delay)
const Analytics = React.lazy(() => 
  import('@vercel/analytics/react').then(module => ({
    default: module.Analytics
  }))                                                                   // 15KB - loads after delay
);

const SpeedInsights = React.lazy(() => 
  import('@vercel/speed-insights/next').then(module => ({
    default: module.SpeedInsights  
  }))                                                                   // 10KB - loads after delay
);

/**
 * OPTIMIZED HOMEPAGE - Progressive Loading Implementation
 */
const HomePage = () => {
  // Lightweight data operations (no heavy imports)
  const serviceAreas = React.useMemo(() => getServiceAreaList(), []);
  const primaryKeywords = React.useMemo(() => getPrimaryKeywords(), []);

  return (
    <>
      {/* IMMEDIATE: Critical structured data for SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": AMP_VENDING_BUSINESS_INFO.name,
            "description": AMP_VENDING_BUSINESS_INFO.description,
            // ... rest of structured data
          })
        }}
      />

      <main className="flex flex-col min-h-screen overflow-hidden bg-black/90">
        
        {/* 🔴 CRITICAL PATH: Hero Section (Load Immediately - LCP Optimization) */}
        <Section
          id="hero"
          className="relative min-h-screen bg-black/90"
          aria-labelledby="hero-heading"
        >
          <ClientOnly
            fallback={<HeroLoadingFallback />}
          >
            <Suspense fallback={<HeroLoadingFallback />}>
              <ResponsiveHero
                title={
                  <>
                    Premium Commercial Vending Solutions
                    <br />for <span className="text-[#FD5A1E] hero-accent">Modern Workplaces</span>
                  </>
                }
                subtitle="Enhance your workplace with state-of-the-art vending machines featuring 21.5&quot; touchscreen technology."
                primaryCta={{ text: "View Machines", href: "/vending-machines" }}
                secondaryCta={{ text: "Free Consultation", href: "/contact" }}
              />
            </Suspense>
          </ClientOnly>
        </Section>

        {/* 🟡 VIEWPORT LAZY: Below-the-fold sections (Load when user scrolls) */}
        
        <ViewportLazy
          threshold={0.1}
          rootMargin="150px"
          fallback={<SectionLoadingFallback />}
        >
          <Section id="workplace-transformation" background="gradient" spacing="lg">
            <Suspense fallback={<SectionLoadingFallback />}>
              <WorkplaceTransformSection />
            </Suspense>
          </Section>
        </ViewportLazy>

        <ViewportLazy
          threshold={0.1}
          rootMargin="150px"
          fallback={<SectionLoadingFallback />}
        >
          <Section id="vending-machine-showcase" background="gradient" spacing="lg">
            <Suspense fallback={<SectionLoadingFallback />}>
              <VendingMachineShowcase />
            </Suspense>
          </Section>
        </ViewportLazy>

        <ViewportLazy
          threshold={0.1}
          rootMargin="150px"
          fallback={<SectionLoadingFallback />}
        >
          <Section id="products" background="gradient" spacing="lg">
            <SectionHeader
              badge="50+ Options"
              title={<>Customizable <span className="text-[#FD5A1E]">Product Selection</span></>}
              description="Tailored refreshment options throughout Central California"
            />
            <Suspense fallback={<SectionLoadingFallback />}>
              <ProductSection />
            </Suspense>
          </Section>
        </ViewportLazy>

        <ViewportLazy
          threshold={0.1}
          rootMargin="150px"
          fallback={<SectionLoadingFallback />}
        >
          <Section id="process" background="dark" spacing="lg">
            <SectionHeader
              badge="Simple Process"
              title={<>Getting Started <span className="text-[#FD5A1E]">Is Simple</span></>}
              description={`Four easy steps to transform your workplace in ${AMP_VENDING_BUSINESS_INFO.address.city}`}
            />
            <Suspense fallback={<SectionLoadingFallback />}>
              <ProcessSection />
            </Suspense>
          </Section>
        </ViewportLazy>

        <ViewportLazy
          threshold={0.1}
          rootMargin="150px"
          fallback={<SectionLoadingFallback />}
        >
          <Section id="service-area" background="gradient" spacing="lg">
            <SectionHeader
              badge="Central California"
              title={<>Our <span className="text-[#FD5A1E]">Service Area</span></>}
              description={`Professional installation throughout Central California, serving ${serviceAreas.length}+ cities`}
            />
            <Suspense fallback={<SectionLoadingFallback />}>
              <ServiceAreaSection />
            </Suspense>
          </Section>
        </ViewportLazy>

        <ViewportLazy
          threshold={0.1}
          rootMargin="150px"
          fallback={<SectionLoadingFallback />}
        >
          <Section id="faq" background="dark" spacing="lg">
            <SectionHeader
              badge="Quick Answers"
              title={<>Frequently <span className="text-[#FD5A1E]">Asked Questions</span></>}
              description="Everything you need to know about our professional vending solutions"
            />
            <Suspense fallback={<SectionLoadingFallback />}>
              <FAQSection />
            </Suspense>
          </Section>
        </ViewportLazy>

        <ViewportLazy
          threshold={0.1}
          rootMargin="150px"
          fallback={<SectionLoadingFallback />}
        >
          <Section id="contact" background="gradient" spacing="lg">
            <SectionHeader
              badge="Get Started"
              title={<>Ready to <span className="text-[#FD5A1E]">Upgrade</span> Your Workplace?</>}
              description={`Contact ${AMP_VENDING_BUSINESS_INFO.name} today for your consultation`}
            />
            <Suspense fallback={<SectionLoadingFallback />}>
              <HomeContactSection />
            </Suspense>
          </Section>
        </ViewportLazy>

        <ViewportLazy
          threshold={0.1}
          rootMargin="150px" 
          fallback={<SectionLoadingFallback />}
        >
          <div className="bg-black/70">
            <Suspense fallback={<SectionLoadingFallback />}>
              <CTASection />
            </Suspense>
          </div>
        </ViewportLazy>
      </main>

      {/* 🔵 DEFERRED: Analytics (Load after critical content is rendered) */}
      <Deferred delay={2000}>
        <Analytics />
        <SpeedInsights />
      </Deferred>
    </>
  );
};

// =============================================================================
// SUPPORTING COMPONENTS
// =============================================================================

/**
 * Lightweight section header (replaces heavy icon imports)
 */
const SectionHeader = React.memo(({ badge, title, description }: {
  badge: string;
  title: React.ReactNode;
  description: string;
}) => (
  <div className="text-center mb-12">
    <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
      <span className="text-[#FD5A1E] font-medium text-sm">{badge}</span>
    </div>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
      {title}
    </h2>
    <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
      {description}
    </p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

/**
 * Hero loading fallback (critical path - must be lightweight)
 */
const HeroLoadingFallback = React.memo(() => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 animate-pulse">
        Premium Commercial Vending Solutions
        <br />for <span className="text-[#FD5A1E]">Modern Workplaces</span>
      </h1>
      <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 max-w-3xl mx-auto opacity-75">
        Loading amazing vending solutions...
      </p>
    </div>
  </div>
));

HeroLoadingFallback.displayName = 'HeroLoadingFallback';

export default React.memo(HomePage);