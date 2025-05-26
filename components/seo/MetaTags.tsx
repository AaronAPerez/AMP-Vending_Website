'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

/**
 * Core meta tag configuration interface
 */
interface BaseMetaData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Open Graph specific meta data
 */
interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
  locale?: string;
}

/**
 * Twitter Card specific meta data
 */
interface TwitterCardData {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  creator?: string;
  site?: string;
}

/**
 * Business/Organization specific structured data
 */
interface BusinessData {
  name?: string;
  type?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  telephone?: string;
  email?: string;
  url?: string;
  logo?: string;
  priceRange?: string;
  areaServed?: string;
}

/**
 * Complete meta tags configuration
 */
interface MetaTagsProps {
  meta: BaseMetaData;
  openGraph?: OpenGraphData;
  twitter?: TwitterCardData;
  business?: BusinessData;
  jsonLd?: Record<string, any>; // Custom JSON-LD structured data
}

/**
 * SEO Constants for AMP Vending
 */
const SEO_CONSTANTS = {
  SITE_NAME: 'AMP Vending',
  BASE_URL: 'https://www.ampvendingmachines.com',
  DEFAULT_IMAGE: '/images/logo/AMP_logo.png',
  DEFAULT_LOCALE: 'en_US',
  TWITTER_HANDLE: '@ampvending', // Update with actual handle
  BUSINESS_INFO: {
    name: 'AMP Vending',
    type: 'LocalBusiness',
    address: {
      streetAddress: '4120 Dale Rd ste j8 1005',
      addressLocality: 'Modesto',
      addressRegion: 'CA',
      postalCode: '95354',
      addressCountry: 'US',
    },
    telephone: '+12094035450',
    email: 'ampdesignandconsulting@gmail.com',
    url: 'https://www.ampvendingmachines.com',
    logo: 'https://www.ampvendingmachines.com/images/logo/AMP_logo.png',
    priceRange: 'Free installation',
    areaServed: 'Central California',
  },
} as const;

/**
 * MetaTags Component
 * 
 * Comprehensive SEO meta tags component that handles:
 * - Basic HTML meta tags
 * - Open Graph meta tags for social sharing
 * - Twitter Card meta tags
 * - JSON-LD structured data
 * - Canonical URLs and robots directives
 * 
 * @param props - Meta tag configuration
 */
export default function MetaTags({
  meta,
  openGraph,
  twitter,
  business,
  jsonLd,
}: MetaTagsProps) {
  const pathname = usePathname();
  
  // Generate canonical URL from current pathname
  const canonicalUrl = `${SEO_CONSTANTS.BASE_URL}${pathname}`;
  const finalCanonical = meta.canonical || canonicalUrl;
  
  // Merge with default Open Graph data
  const ogData: OpenGraphData = {
    type: 'website',
    siteName: SEO_CONSTANTS.SITE_NAME,
    locale: SEO_CONSTANTS.DEFAULT_LOCALE,
    title: meta.title,
    description: meta.description,
    image: SEO_CONSTANTS.DEFAULT_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
    ...openGraph,
  };

  // Merge with default Twitter Card data
  const twitterData: TwitterCardData = {
    card: 'summary_large_image',
    site: SEO_CONSTANTS.TWITTER_HANDLE,
    title: meta.title,
    description: meta.description,
    image: ogData.image,
    imageAlt: ogData.imageAlt || meta.title,
    ...twitter,
  };

  // Merge with default business data
  const businessData: BusinessData = {
    ...SEO_CONSTANTS.BUSINESS_INFO,
    ...business,
  };

  // Generate robots directive
  const robotsContent = [
    meta.noindex ? 'noindex' : 'index',
    meta.nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  // Generate JSON-LD structured data
  const generateJsonLd = () => {
    const baseStructuredData = {
      '@context': 'https://schema.org',
      '@type': businessData.type || 'LocalBusiness',
      name: businessData.name,
      url: businessData.url,
      logo: businessData.logo,
      description: meta.description,
      telephone: businessData.telephone,
      email: businessData.email,
      priceRange: businessData.priceRange,
      areaServed: businessData.areaServed,
      address: {
        '@type': 'PostalAddress',
        ...businessData.address,
      },
    };

    // Merge with custom JSON-LD if provided
    return jsonLd ? { ...baseStructuredData, ...jsonLd } : baseStructuredData;
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogData.type} />
      <meta property="og:title" content={ogData.title} />
      <meta property="og:description" content={ogData.description} />
      <meta property="og:image" content={ogData.image} />
      {ogData.imageAlt && <meta property="og:image:alt" content={ogData.imageAlt} />}
      {ogData.imageWidth && <meta property="og:image:width" content={ogData.imageWidth.toString()} />}
      {ogData.imageHeight && <meta property="og:image:height" content={ogData.imageHeight.toString()} />}
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:site_name" content={ogData.siteName} />
      <meta property="og:locale" content={ogData.locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterData.card} />
      {twitterData.site && <meta name="twitter:site" content={twitterData.site} />}
      {twitterData.creator && <meta name="twitter:creator" content={twitterData.creator} />}
      <meta name="twitter:title" content={twitterData.title} />
      <meta name="twitter:description" content={twitterData.description} />
      <meta name="twitter:image" content={twitterData.image} />
      {twitterData.imageAlt && <meta name="twitter:image:alt" content={twitterData.imageAlt} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content={SEO_CONSTANTS.SITE_NAME} />
      <meta name="publisher" content={SEO_CONSTANTS.SITE_NAME} />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Modesto, California" />
      <meta name="geo.position" content="37.6390972;-120.9968782" />
      <meta name="ICBM" content="37.6390972, -120.9968782" />
      
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd()),
        }}
      />
    </Head>
  );
}

/**
 * Pre-configured MetaTags for common AMP Vending pages
 */
export const VendingMachineMetaTags = ({
  machineName,
  machineModel,
  description,
  image,
  machineId,
}: {
  machineName: string;
  machineModel: string;
  description: string;
  image?: string;
  machineId: string;
}) => {
  return (
    <MetaTags
      meta={{
        title: `${machineName} | Zero-Cost Installation | AMP Vending`,
        description: `${description} Features 21.5" touchscreen, tap-to-pay technology, and maintenance-free operation.`,
        keywords: `vending machine, ${machineModel}, zero cost, touchscreen, workplace vending, ${machineName}`,
        canonical: `/vending-machines/${machineId}`,
      }}
      openGraph={{
        type: 'product',
        title: `${machineName} - Premium Vending Solution`,
        description: `Zero-cost ${machineName} with advanced technology. ${description}`,
        image: image || SEO_CONSTANTS.DEFAULT_IMAGE,
        imageAlt: `${machineName} ${machineModel} vending machine`,
      }}
      jsonLd={{
        '@type': 'Product',
        name: `${machineName} Vending Machine`,
        model: machineModel,
        description: description,
        brand: {
          '@type': 'Brand',
          name: 'AMP Vending',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          description: 'Zero-cost installation and maintenance-free operation',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'AMP Vending',
        },
      }}
    />
  );
};

/**
 * Contact Page MetaTags
 */
export const ContactMetaTags = () => (
  <MetaTags
    meta={{
      title: 'Contact AMP Vending | Zero-Cost Vending Machine Installation',
      description: 'Contact AMP Vending for free consultation on premium vending machines. Zero-cost installation, maintenance-free operation, and 24/7 support.',
      keywords: 'contact vending machine company, free consultation, zero cost installation, Modesto vending',
      canonical: '/contact',
    }}
    openGraph={{
      title: 'Contact AMP Vending - Free Consultation',
      description: 'Get in touch for zero-cost vending machine installation. Premium solutions with maintenance-free operation.',
    }}
    jsonLd={{
      '@type': 'ContactPage',
      name: 'AMP Vending Contact Page',
      description: 'Contact AMP Vending for premium vending machine solutions',
    }}
  />
);

/**
 * Home Page MetaTags
 */
export const HomeMetaTags = () => (
  <MetaTags
    meta={{
      title: 'AMP Vending | Zero-Cost Premium Vending Solutions for Workplaces | Modesto, CA',
      description: 'AMP Vending provides zero-cost, maintenance-free vending machines with 21.5" touchscreen interfaces and 50+ customizable product options for workplaces.',
      keywords: 'vending machines, zero-cost vending, workplace vending, touchscreen vending, Modesto vending, employee satisfaction',
    }}
    openGraph={{
      title: 'Premium Vending Solutions at Zero Cost | AMP Vending',
      description: 'Enhance your workplace with advanced vending technology featuring touchscreen interfaces and 50+ customizable options.',
    }}
    jsonLd={{
      '@type': 'WebSite',
      name: 'AMP Vending',
      description: 'Premium vending machine solutions with zero-cost installation',
      url: SEO_CONSTANTS.BASE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SEO_CONSTANTS.BASE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }}
  />
);
