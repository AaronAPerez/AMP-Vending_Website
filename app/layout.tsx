
import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google';

import ResizableNavbar from "@/components/layout/ResizableNavbar";
import Footer from "@/components/layout/Footer";
import FeedbackWidget from "@/components/feedback/FeedbackWidget";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

/**
 * Enhanced Metadata for Better SEO Performance
 * Addresses Lighthouse SEO recommendations
 */
export const metadata: Metadata = {
  title: "AMP Vending Machine Website",
  description: "Premium vending machine solutions for workplaces with professional installation, touchscreen technology, and comprehensive maintenance service in Central California",
  keywords: "vending machines, commercial vending, office vending, touchscreen vending machines, Central California, Modesto, professional installation",
  authors: [{ name: "AMP Vending" }],
  creator: "AMP Vending",
  publisher: "AMP Vending",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ampvendingmachines.com',
    siteName: 'AMP Vending',
    title: 'Premium Commercial Vending Solutions | AMP Vending',
    description: 'Professional vending machine solutions with touchscreen technology and complete maintenance service for businesses in Central California',
    images: [
      {
        url: 'https://www.ampvendingmachines.com/images/logo/AMP_logo.png',
        width: 1200,
        height: 630,
        alt: 'AMP Vending - Premium Commercial Vending Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Commercial Vending Solutions | AMP Vending',
    description: 'Professional vending machine solutions with touchscreen technology and complete maintenance service',
    images: ['https://www.ampvendingmachines.com/images/logo/AMP_logo.png'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
  },
  other: {
    'referrer': 'same-origin',
  },
  // Enhanced viewport for better mobile experience
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

/**
 * RootLayout Component - Enhanced for Lighthouse Performance & Accessibility
 * 
 * Accessibility Improvements:
 * - Fixed skip link focus and visibility issues
 * - Enhanced focus management and keyboard navigation
 * - Improved semantic structure with proper landmarks
 * - Better screen reader support
 * 
 * Performance Optimizations:
 * - Optimized font loading
 * - Enhanced meta tags for SEO
 * - Better document structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://vercel.live" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body 
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Enhanced Skip Link - Addresses Lighthouse Accessibility Issues */}
        <a 
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-0 focus:left-0 focus:p-4 focus:bg-orange-600 focus:text-white focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600 focus:text-lg focus:font-semibold focus:rounded-br-lg focus:shadow-lg focus:transition-all focus:duration-200"
          tabIndex={0}
        >
          Skip to main content
        </a>
        
        {/* Secondary Skip Link for Navigation */}
        <a 
          href="#navigation"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-0 focus:left-40 focus:p-4 focus:bg-blue-600 focus:text-white focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 focus:text-lg focus:font-semibold focus:rounded-br-lg focus:shadow-lg focus:transition-all focus:duration-200"
          tabIndex={0}
        >
          Skip to navigation
        </a>

        {/* Header with Enhanced Accessibility */}
        <header role="banner" aria-label="Site header">
          <div id="navigation">
            <ResizableNavbar />
          </div>
        </header>
        
        {/* Main Content with Proper Focus Management */}
        <main 
          id="main" 
          className="mt-4" 
          tabIndex={-1}
          role="main"
          aria-label="Main content"
        >
          <StyledComponentsRegistry>
            {children}
             <SpeedInsights />
            <Analytics />
          </StyledComponentsRegistry>
        </main>
        
        {/* Complementary Content */}
        <aside role="complementary" aria-label="Feedback widget">
          <FeedbackWidget />
        </aside>
        
        {/* Footer */}
        <footer role="contentinfo" aria-label="Site footer">
          <Footer />
        </footer>

        {/* Enhanced Focus Management Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced focus management for accessibility
              (function() {
                // Track if user is navigating with keyboard
                let isUsingKeyboard = false;
                
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'Tab') {
                    isUsingKeyboard = true;
                    document.body.classList.add('keyboard-navigation');
                  }
                });
                
                document.addEventListener('mousedown', function() {
                  isUsingKeyboard = false;
                  document.body.classList.remove('keyboard-navigation');
                });
                
                // Handle skip link activation
                document.addEventListener('DOMContentLoaded', function() {
                  const skipLinks = document.querySelectorAll('a[href^="#"]');
                  skipLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                      const target = document.querySelector(this.getAttribute('href'));
                      if (target) {
                        e.preventDefault();
                        target.focus();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    });
                  });
                });
                
                // Announce page changes for screen readers
                let lastUrl = location.href;
                new MutationObserver(() => {
                  const url = location.href;
                  if (url !== lastUrl) {
                    lastUrl = url;
                    const title = document.title;
                    const announcement = document.createElement('div');
                    announcement.setAttribute('aria-live', 'polite');
                    announcement.setAttribute('aria-atomic', 'true');
                    announcement.style.position = 'absolute';
                    announcement.style.left = '-10000px';
                    announcement.textContent = 'Page changed to: ' + title;
                    document.body.appendChild(announcement);
                    setTimeout(() => document.body.removeChild(announcement), 1000);
                  }
                }).observe(document, { subtree: true, childList: true });
              })();
            `,
          }}
        />

        {/* Reduced Motion Support */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Respect user's motion preferences
              if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
                document.documentElement.style.setProperty('--transition-duration', '0.01ms');
              }
            `,
          }}
        />

        {/* Performance monitoring for development */}
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Performance monitoring in development
                window.addEventListener('load', function() {
                  if ('performance' in window) {
                    setTimeout(() => {
                      const navigation = performance.getEntriesByType('navigation')[0];
                      const paint = performance.getEntriesByType('paint');
                      
                      console.group('Performance Metrics');
                      console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
                      console.log('Page Load Complete:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                      paint.forEach(entry => {
                        console.log(entry.name + ':', entry.startTime, 'ms');
                      });
                      console.groupEnd();
                    }, 0);
                  }
                });
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}