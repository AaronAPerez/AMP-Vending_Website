import type { Metadata, Viewport } from "next";
import "./globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google';

import ResizableNavbar from "@/components/layout/ResizableNavbar";
import Footer from "@/components/layout/Footer";
import FeedbackWidget from "@/components/feedback/FeedbackWidget";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// ✅ NEW: Separate viewport export (required in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FD5A1E' },
    { media: '(prefers-color-scheme: dark)', color: '#FD5A1E' }
  ]
}

// ✅ UPDATED: Removed viewport from metadata (moved above)
export const metadata: Metadata = {
  title: "AMP Vending Machine Website",
  description: "Premium vending machine solutions for workplaces",
  other: {
    'referrer': 'same-origin',
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