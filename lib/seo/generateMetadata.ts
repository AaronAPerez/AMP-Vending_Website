import { Metadata } from 'next';

// Define the site metadata with correct types
export const siteMetadata = {
  title: {
    template: '%s | AMP Vending - Premium Workplace Vending Solutions',
    default: 'AMP Vending - Premium Workplace Vending Solutions',
  },
  description: 'Professional vending machine solutions with 21.5" touchscreen technology, contactless payments, and comprehensive service packages for Central California workplaces.',
  keywords: [
    'vending machines California',
    'workplace vending solutions',
    'touchscreen vending machines',
    'professional vending service',
    'Modesto vending machines',
    'Central Valley vending',
    'contactless payment vending',
    'office break room solutions'
  ],
  authors: [{ name: 'AMP Vending' }],
  creator: 'AMP Vending',
  publisher: 'AMP Vending',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website' as const,
    locale: 'en_US',
    url: 'https://www.ampvendingmachines.com',
    siteName: 'AMP Vending',
    title: 'Professional Vending Solutions | AMP Vending',
    description: 'Transform your workplace with advanced vending machines featuring 21.5" touchscreen interfaces, contactless payments, and 50+ customizable product options.',
    images: [
      {
        url: '/images/og/default-og-image.png',
        width: 1200,
        height: 630,
        alt: 'AMP Vending - Professional Workplace Vending Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Professional Vending Solutions | AMP Vending',
    description: 'Transform your workplace with advanced vending machines featuring touchscreen technology and contactless payments.',
    images: ['/images/og/default-og-image.png'],
  },
  // Fixed robots configuration with correct Next.js types
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
} as const;

// Interface for generateMetadata function props
interface GenerateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  ogType?: 'website' | 'article' | 'product';
}

/**
 * Generate dynamic metadata for pages with SEO optimization
 * 
 * @param props - Metadata generation options
 * @returns Metadata object for Next.js
 */
export function generateMetadata({
  title,
  description = siteMetadata.description,
  keywords = [],
  canonical,
  ogImage = '/images/og/default-og-image.png',
  noIndex = false,
  ogType = 'website'
}: GenerateMetadataProps = {}): Metadata {
  // Generate full title with template
  const fullTitle = title 
    ? `${title} | AMP Vending - Premium Workplace Vending Solutions`
    : siteMetadata.title.default;

  // Combine default keywords with page-specific keywords
  const allKeywords = [...siteMetadata.keywords, ...keywords];

  // Create base metadata object
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: siteMetadata.authors,
    creator: siteMetadata.creator,
    publisher: siteMetadata.publisher,
    formatDetection: siteMetadata.formatDetection,
    
    // OpenGraph metadata
    openGraph: {
      type: ogType,
      locale: siteMetadata.openGraph.locale,
      url: canonical ? `https://www.ampvendingmachines.com${canonical}` : siteMetadata.openGraph.url,
      siteName: siteMetadata.openGraph.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteMetadata.openGraph.title,
        },
      ],
    },
    
    // Twitter metadata
    twitter: {
      card: siteMetadata.twitter.card,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    
    // Verification codes
    verification: siteMetadata.verification,
  };

  // Add canonical URL if provided
  if (canonical) {
    metadata.alternates = {
      canonical: `https://www.ampvendingmachines.com${canonical}`
    };
  }

  // Handle robots directive - Fixed with correct Next.js types
  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    };
  } else {
    metadata.robots = siteMetadata.robots;
  }

  return metadata;
}

/**
 * Generate metadata specifically for machine detail pages
 * 
 * @param machineId - Vending machine ID
 * @param machineName - Vending machine name
 * @param description - Machine description
 * @returns Metadata object optimized for product pages
 */
export function generateMachineMetadata(
  machineId: string,
  machineName: string,
  description: string
): Metadata {
  return generateMetadata({
    title: `${machineName} - Professional Vending Machine`,
    description: `${description} Professional installation and maintenance included. Contact AMP Vending for your ${machineName} installation in Central California.`,
    keywords: [
      `${machineName} vending machine`,
      `${machineId} specifications`,
      'professional vending installation',
      'Central California vending machines',
      'touchscreen vending technology'
    ],
    canonical: `/vending-machines/${machineId}`,
    ogType: 'product',
    ogImage: `/images/machines/${machineId}-og.jpg`
  });
}

/**
 * Generate metadata for category/collection pages
 * 
 * @param category - Page category
 * @param itemCount - Number of items in collection
 * @returns Metadata object optimized for collection pages
 */
export function generateCollectionMetadata(
  category: string,
  itemCount: number = 0
): Metadata {
  const categoryTitles: Record<string, string> = {
    'vending-machines': 'Professional Vending Machines',
    'refrigerated': 'Refrigerated Vending Machines',
    'non-refrigerated': 'Snack Vending Machines',
    'contact': 'Contact AMP Vending',
    'feedback': 'Customer Feedback'
  };

  const categoryDescriptions: Record<string, string> = {
    'vending-machines': `Explore our collection of ${itemCount} professional vending machines with touchscreen technology, contactless payments, and complete service packages.`,
    'refrigerated': `Browse ${itemCount} refrigerated vending machines perfect for beverages and fresh food items with professional installation included.`,
    'non-refrigerated': `Discover ${itemCount} snack vending machines featuring advanced technology and customizable product selections for your workplace.`,
    'contact': 'Get in touch with AMP Vending for professional vending machine consultation and installation in Central California.',
    'feedback': 'Share your experience with AMP Vending services and help us improve our vending solutions for workplaces.'
  };

  return generateMetadata({
    title: categoryTitles[category] || 'AMP Vending Services',
    description: categoryDescriptions[category] || siteMetadata.description,
    keywords: [
      `${category} California`,
      `professional ${category}`,
      `Central Valley ${category}`,
      'workplace solutions'
    ],
    canonical: `/${category}`,
  });
}

/**
 * Generate JSON-LD structured data for local business
 * 
 * @returns JSON-LD structured data string
 */
export function generateLocalBusinessSchema(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AMP Vending",
    "description": siteMetadata.description,
    "url": "https://www.ampvendingmachines.com",
    "logo": "https://www.ampvendingmachines.com/images/logo/AMP_logo.png",
    "image": "https://www.ampvendingmachines.com/images/og/default-og-image.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4120 Dale Rd ste j8 1005",
      "addressLocality": "Modesto",
      "addressRegion": "CA",
      "postalCode": "95354",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.6390972",
      "longitude": "-120.9968782"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-209-403-5450",
      "contactType": "customer service",
      "email": "ampdesignandconsulting@gmail.com",
      "areaServed": "Central California",
      "availableLanguage": "English"
    },
    "openingHours": [
      "Mo-Fr 08:00-20:00",
      "Sa-Su 08:00-20:00"
    ],
    "priceRange": "$$",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "37.6390972",
        "longitude": "-120.9968782"
      },
      "geoRadius": "100000"
    },
    "serviceType": "Vending Machine Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Vending Machine Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Vending Machine Installation",
            "description": "Complete vending machine installation with touchscreen technology and contactless payments"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Vending Machine Maintenance",
            "description": "Comprehensive maintenance and restocking services for vending machines"
          }
        }
      ]
    }
  };

  return JSON.stringify(schema);
}

// Export types for use in other components
export type { GenerateMetadataProps };