import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react";
import { Inter } from 'next/font/google';
import Script from 'next/script';
import WebVitalsReporter from '@/components/analytics/WebVitalsReporter';
import ResizableNavbar from "@/components/layout/ResizableNavbar";
import Footer from "@/components/layout/Footer";
import FeedbackWidget from "@/components/feedback/FeedbackWidget";
import { generateMetadata as generateSEOMetadata, generateLocalBusinessSchema } from '@/lib/seo/generateMetadata';
import { GA_TRACKING_ID } from '@/lib/analytics/googleAnalytics';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Generate metadata using the fixed function
export const metadata: Metadata = generateSEOMetadata({
  title: 'AMP Vending - Premium Workplace Vending Solutions',
  description: 'Professional vending machine solutions with 21.5" touchscreen technology, contactless payments, and comprehensive service packages for Central California workplaces.',
  canonical: '/',
  keywords: [
    'vending machines California',
    'workplace vending solutions',
    'professional vending service',
    'Central Valley vending'
  ]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Local Business Structured Data */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateLocalBusinessSchema()
          }}
        />

        {/* Google Analytics 4 - Only load if GA_TRACKING_ID exists */}
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                    send_page_view: true,
                    // Enhanced ecommerce for vending machine business
                    custom_map: {
                      'custom_parameter_1': 'business_type'
                    },
                    // Set business type
                    business_type: 'vending_services'
                  });
                  
                  // Track initial page load
                  gtag('event', 'page_view', {
                    page_title: document.title,
                    page_location: window.location.href,
                    content_group1: 'AMP Vending',
                    content_group2: 'Homepage'
                  });
                `,
              }}
            />
          </>
        )}

        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>

      <body
        className={`${inter.variable} antialiased`}
      >
        {/* Skip to main content link for accessibility */}
        <a href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-orange-600 focus:text-white"
        >
          Skip to main content
        </a>

        <div className="">
          <ResizableNavbar />
        </div>

        <main id="main" className="mt-4">
          <StyledComponentsRegistry>
            {children}
            <SpeedInsights />
            <Analytics />
            <WebVitalsReporter />
          </StyledComponentsRegistry>
        </main>

        <FeedbackWidget />
        <Footer />
      </body>
    </html>
  );
}