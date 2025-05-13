import type { Metadata } from "next";
import "./globals.css";
import '../styles/globals.css';
import GlobalStyles from "@/GlobalStyles";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google';
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import 'rsuite/dist/rsuite-no-reset.min.css';
import ResizableNavbar from "@/components/layout/ResizableNavbar";
import FeedbackWidget from "@/components/FeedbackWidget";





export const metadata: Metadata = {
  // Homepage
  title: "AMP Vending | Zero-Cost Premium Vending Solutions for Workplaces | Modesto, CA",
  description: "AMP Vending provides zero-cost, maintenance-free vending machines with 21.5\" touchscreen interfaces and 50+ customizable product options for workplaces.",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.ampvendingmachines.com/",
    title: "AMP Vending | Premium Vending Solutions",
    description: "Zero-cost, maintenance-free vending machines with 50+ customizable options",
    siteName: "AMP Vending",
    images: [
      {
        url: "https://www.ampvendingmachines.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AMP Vending Machine Solutions"
      }
    ]
  }
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Business information 
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "AMP Vending",
      "image": "https://www.ampvendingmachines.com/images/logo/AMP_logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4120 Dale Rd ste j8 1005",
        "addressLocality": "Modesto",
        "addressRegion": "CA",
        "postalCode": "95354",
        "addressCountry": "US"
      },
      "telephone": "+12094035450",
      "email": "ampdesignandconsulting@gmail.com",
      "url": "https://www.ampvendingmachines.com",
      "priceRange": "Free installation",
      "description": "Premium vending machine solutions with zero-cost installation and maintenance-free operation for workplaces.",
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 37.6390972,
          "longitude": -120.9968782
        },
        "geoRadius": "50 mi"
      }
    }),
  }}
/>

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: 'cover',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <body className={`${inter.variable} 'antialiased'`}>
        <GlobalStyles />
        {/* Toaster component */}
        <Toaster
          position="top-right"
        />
        {/* Skip to main content link for accessibility */}
        <a href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-orange-600 focus:text-white"
        >
          Skip to main content
        </a>
        <ResizableNavbar />
        <main className="min-h-screen" id="main">
          {/* <AuthProvider> */}
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
          {/* </AuthProvider> */}
          <Analytics />
        </main>
        <Footer />
        <FeedbackWidget />
      </body>
    </html>
  );
}