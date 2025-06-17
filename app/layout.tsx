import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google';
import ResizableNavbar from "@/components/layout/ResizableNavbar";
import Footer from "@/components/layout/Footer";
import FeedbackWidget from "@/components/feedback/FeedbackWidget";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap', // Critical for LCP
  preload: true,
  fallback: ['system-ui', 'arial'], // Fallback fonts
});


/**
 * Enhanced Metadata Configuration for AMP Vending
 * 
 * Build Process Documentation:
 * - Viewport configuration moved to separate viewport.ts file (Next.js 14+ requirement)
 * - Enhanced SEO metadata for better search engine visibility
 * - Optimized for local business and vending machine keywords
 * - Structured for maximum search engine crawlability
 */
export const metadata: Metadata = {
  // Primary SEO metadata
  title: {
    template: '%s | AMP Vending - Premium Workplace Vending Solutions',
    default: 'AMP Vending - Premium Workplace Vending Solutions | Central California'
  },
  description: 'Professional vending machine solutions with 21.5" touchscreen technology, contactless payments, and complete maintenance service for businesses in Central California. Zero-cost installation and premium workplace refreshment options.',
  
  // Enhanced keywords for local SEO
  keywords: [
    'commercial vending machines',
    'office vending machines',
    'workplace vending solutions',
    'vending machine service Modesto CA',
    'touchscreen vending machines',
    'refrigerated vending machines',
    'snack vending machines',
    'employee refreshment solutions',
    'Central California vending service',
    'professional vending installation'
  ],
  
  // Author and creator information
  authors: [{ name: 'AMP Vending' }],
  creator: 'AMP Vending',
  publisher: 'AMP Vending',
  
  // Canonical URL and alternates
  metadataBase: new URL('https://www.ampvendingmachines.com'),
  alternates: {
    canonical: '/',
  },
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ampvendingmachines.com',
    siteName: 'AMP Vending',
    title: 'AMP Vending - Premium Workplace Vending Solutions',
    description: 'Professional vending machine solutions with advanced touchscreen technology and complete maintenance service for businesses in Central California.',
    images: [
      {
        url: '/images/logo/AMP_logo.png',
        width: 1200,
        height: 630,
        alt: 'AMP Vending - Professional Vending Machine Solutions',
      }
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'AMP Vending - Premium Workplace Vending Solutions',
    description: 'Professional vending machine solutions with advanced touchscreen technology for Central California businesses.',
    images: ['/images/logo/AMP_logo.png'],
    creator: '@ampvending', // Add your Twitter handle if available
  },
  
  // Additional metadata for SEO
  category: 'Business Services',
  classification: 'Vending Machine Services',
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Additional verification and configuration
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  
  // Enhanced other metadata
  other: {
    'referrer': 'same-origin',
    'format-detection': 'telephone=yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'AMP Vending',
    'application-name': 'AMP Vending',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#000000',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          <ResizableNavbar/>
        </div>
        
        <main id="main" className="mt-4">
          <StyledComponentsRegistry>
            {children}
             <SpeedInsights />
            <Analytics />
        </StyledComponentsRegistry>
        </main>
        
        <FeedbackWidget/>
        <Footer/>
      </body>
    </html>
  );
}