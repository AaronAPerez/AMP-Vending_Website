/**
 * SEO Data Configuration for AMP Vending Website
 * 
 * This file contains all SEO-related constants, metadata configurations,
 * and utility functions for optimizing search engine visibility and
 * social media sharing across the AMP Vending website.
 * 
 * Features:
 * - Centralized SEO constants and configurations
 * - Dynamic metadata generation for different page types
 * - Open Graph and Twitter Card optimizations
 * - Structured data (JSON-LD) configurations
 * - Local business SEO optimization
 * - Accessibility-compliant meta descriptions
 */

import type { Metadata } from 'next';
import type { MachineData } from '../data/vendingMachineData';

/**
 * Core SEO Constants for AMP Vending
 * These values are used throughout the application for consistent SEO implementation
 */
export const SEO_CONSTANTS = {
  // Website Identity
  SITE_NAME: 'AMP Vending',
  SITE_TITLE: 'AMP Vending | Premium Vending Solutions for Workplaces',
  SITE_DESCRIPTION: 'AMP Vending provides maintenance-free vending machines with 21.5" touchscreen interfaces and 50+ customizable product options for workplaces in Central California.',
  
  // URLs and Domains
  BASE_URL: 'https://www.ampvendingmachines.com',
  DOMAIN: 'ampvendingmachines.com',
  
  // Business Information
  BUSINESS_NAME: 'AMP Vending Solutions',
  BUSINESS_LEGAL_NAME: 'AMP Design and Consulting LLC',
  
  // Contact Information
  PHONE: '+12094035450',
  PHONE_DISPLAY: '(209) 403-5450',
  EMAIL: 'ampdesignandconsulting@gmail.com',
  CONTACT_PERSON: 'Andrew Perez',
  
  // Location Information
  ADDRESS: {
    STREET: '4120 Dale Rd ste j8 1005',
    CITY: 'Modesto',
    STATE: 'CA',
    ZIP: '95354',
    COUNTRY: 'US',
    COORDINATES: {
      LAT: 37.6390972,
      LNG: -120.9968782,
    },
  },
  
  // Service Area
  SERVICE_AREA: 'Central California',
  PRIMARY_CITIES: [
    'Modesto', 'Stockton', 'Turlock', 'Manteca', 'Tracy', 
    'Merced', 'Riverbank', 'Oakdale', 'Ceres', 'Patterson'
  ],
  
  // Social Media & Branding
  LOGO_URL: '/images/logo/AMP_logo.png',
  LOGO_FULL_URL: 'https://www.ampvendingmachines.com/images/logo/AMP_logo.png',
  FAVICON_URL: '/favicon.ico',
  
  // Default Images for Social Sharing
  DEFAULT_OG_IMAGE: '/images/og/homepage.jpg',
  DEFAULT_OG_IMAGE_FULL: 'https://www.ampvendingmachines.com/images/og/homepage.jpg',
  OG_IMAGE_WIDTH: 1200,
  OG_IMAGE_HEIGHT: 630,
  
  // Industry Keywords
  PRIMARY_KEYWORDS: [
    'vending machines',
    'premium vending',
    'workplace vending',
    'touchscreen vending',
    'maintenance-free vending',
    'employee satisfaction',
    'custom vending solutions',
    'Modesto vending machines',
    'Central California vending',
  ],
  
  // Business Hours
  BUSINESS_HOURS: {
    WEEKDAYS: 'Monday - Friday: 8AM - 8PM',
    WEEKENDS: 'Saturday - Sunday: 8AM - 8PM',
    TIMEZONE: 'PST',
  },
  
  // Service Features
  KEY_FEATURES: [
    'Installation and maintenance',
    '21.5" HD touchscreen interfaces',
    'Tap-to-pay technology',
    '50+ customizable product options',
    'Real-time inventory monitoring',
    '24/7 customer support',
    'Employee and customer satisfaction boost',
  ],
} as const;

/**
 * Schema.org structured data types for different business contexts
 */
export const SCHEMA_TYPES = {
  ORGANIZATION: 'Organization',
  LOCAL_BUSINESS: 'LocalBusiness',
  PRODUCT: 'Product',
  SERVICE: 'Service',
  CONTACT_POINT: 'ContactPoint',
  POSTAL_ADDRESS: 'PostalAddress',
  PLACE: 'Place',
  BREADCRUMB_LIST: 'BreadcrumbList',
  WEBPAGE: 'WebPage',
  WEBSITE: 'WebSite',
  COLLECTION_PAGE: 'CollectionPage',
} as const;

/**
 * Base structured data for AMP Vending organization
 * Used across multiple pages for consistent business information
 */
export const BASE_ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': SCHEMA_TYPES.LOCAL_BUSINESS,
  name: SEO_CONSTANTS.BUSINESS_NAME,
  legalName: SEO_CONSTANTS.BUSINESS_LEGAL_NAME,
  url: SEO_CONSTANTS.BASE_URL,
  logo: SEO_CONSTANTS.LOGO_FULL_URL,
  image: SEO_CONSTANTS.DEFAULT_OG_IMAGE_FULL,
  description: SEO_CONSTANTS.SITE_DESCRIPTION,
  telephone: SEO_CONSTANTS.PHONE,
  email: SEO_CONSTANTS.EMAIL,
  priceRange: 'Free installation and maintenance',
  areaServed: {
    '@type': SCHEMA_TYPES.PLACE,
    name: SEO_CONSTANTS.SERVICE_AREA,
    geo: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LAT,
        longitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LNG,
      },
      geoRadius: '50 miles',
    },
  },
  address: {
    '@type': SCHEMA_TYPES.POSTAL_ADDRESS,
    streetAddress: SEO_CONSTANTS.ADDRESS.STREET,
    addressLocality: SEO_CONSTANTS.ADDRESS.CITY,
    addressRegion: SEO_CONSTANTS.ADDRESS.STATE,
    postalCode: SEO_CONSTANTS.ADDRESS.ZIP,
    addressCountry: SEO_CONSTANTS.ADDRESS.COUNTRY,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LAT,
    longitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LNG,
  },
  contactPoint: {
    '@type': SCHEMA_TYPES.CONTACT_POINT,
    telephone: SEO_CONSTANTS.PHONE,
    contactType: 'customer service',
    email: SEO_CONSTANTS.EMAIL,
    areaServed: SEO_CONSTANTS.ADDRESS.COUNTRY,
    availableLanguage: 'English',
  },
  openingHours: [
    'Mo-Fr 08:00-20:00',
    'Sa-Su 08:00-20:00',
  ],
  paymentAccepted: 'Free consultation and installation',
  currenciesAccepted: 'USD',
} as const;

/**
 * Page-specific metadata configurations
 * Each page type has optimized metadata for better SEO performance
 */
export const PAGE_METADATA = {
  /**
   * Homepage metadata configuration
   */
  HOME: {
    title: SEO_CONSTANTS.SITE_TITLE,
    description: SEO_CONSTANTS.SITE_DESCRIPTION,
    keywords: SEO_CONSTANTS.PRIMARY_KEYWORDS.join(', '),
    alternates: {
      canonical: SEO_CONSTANTS.BASE_URL,
    },
    openGraph: {
      title: 'Premium Vending Solutions at premium | AMP Vending',
      description: 'Enhance your workplace with advanced vending technology featuring 21.5" touchscreen interfaces and 50+ customizable product options.',
      url: SEO_CONSTANTS.BASE_URL,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: SEO_CONSTANTS.DEFAULT_OG_IMAGE_FULL,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'AMP Vending premium workplace vending machines',
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Premium Vending Solutions at premium | AMP Vending',
      description: 'Premium vending machines with touchscreen technology for enhanced workplace satisfaction.',
      images: [SEO_CONSTANTS.DEFAULT_OG_IMAGE_FULL],
    },
  } satisfies Metadata,

  /**
   * Vending machines collection page metadata
   */
  VENDING_MACHINES: {
    title: 'Premium Vending Machines | Touchscreen Technology | AMP Vending',
    description: 'Explore our premium vending machines featuring 21.5" touchscreen interfaces, tap-to-pay technology, and customizable product selections. Premium installation.',
    keywords: 'premium vending machines, touchscreen vending, workplace vending solutions, Premium vending machines, Modesto',
    alternates: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/vending-machines`,
    },
    openGraph: {
      title: 'Premium Vending Machines | AMP Vending',
      description: 'Premium premium vending solutions with touchscreen technology and 50+ customizable product options.',
      url: `${SEO_CONSTANTS.BASE_URL}/vending-machines`,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: `${SEO_CONSTANTS.BASE_URL}/images/og/vending-machines.jpg`,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'AMP Premium Vending Machines Collection',
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Premium Vending Machines | AMP Vending',
      description: 'Premium premium vending solutions with touchscreen technology',
      images: [`${SEO_CONSTANTS.BASE_URL}/images/og/vending-machines.jpg`],
    },
  } satisfies Metadata,

  /**
   * Contact page metadata configuration
   */
  CONTACT: {
    title: 'Contact AMP Vending | Premium Vending Machine Installation',
    description: 'Contact AMP Vending for free consultation on premium vending machines. Premium installation, maintenance-free operation, and 24/7 support in Central California.',
    keywords: 'contact vending machine company, free consultation, premium installation, Modesto vending, Central California',
    alternates: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/contact`,
    },
    openGraph: {
      title: 'Contact AMP Vending - Free Consultation',
      description: 'Get in touch for premium vending machine installation and premium workplace solutions.',
      url: `${SEO_CONSTANTS.BASE_URL}/contact`,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: `${SEO_CONSTANTS.BASE_URL}/images/og/contact.jpg`,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'Contact AMP Vending for workplace solutions',
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact AMP Vending - Free Consultation',
      description: 'Premium vending machine installation and maintenance-free operation',
      images: [`${SEO_CONSTANTS.BASE_URL}/images/og/contact.jpg`],
    },
  } satisfies Metadata,

  /**
   * Feedback page metadata configuration
   */
  FEEDBACK: {
    title: 'Share Your Feedback | AMP Vending Customer Experience',
    description: 'Share your experience with AMP Vending machines and services. Your feedback helps us improve our Premium vending solutions for workplaces.',
    keywords: 'vending machine feedback, customer experience, AMP Vending reviews, workplace satisfaction',
    alternates: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/feedback`,
    },
    openGraph: {
      title: 'Share Your Feedback with AMP Vending',
      description: 'Your feedback helps us improve our Premium vending machine services.',
      url: `${SEO_CONSTANTS.BASE_URL}/feedback`,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: `${SEO_CONSTANTS.BASE_URL}/images/og/feedback.jpg`,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'AMP Vending Customer Feedback',
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Share Your Feedback | AMP Vending',
      description: 'Help us improve our vending machine services',
      images: [`${SEO_CONSTANTS.BASE_URL}/images/og/feedback.jpg`],
    },
  } satisfies Metadata,
} as const;

/**
 * Generate dynamic metadata for individual vending machine pages
 * Creates SEO-optimized content for each machine with structured data
 * 
 * @param machine - The vending machine data object
 * @returns Complete metadata configuration for the machine page
 */
export function generateMachineMetadata(machine: MachineData): Metadata {
  const machineTitle = `${machine.name} | Premium Installation | AMP Vending`;
  const machineDescription = `${machine.shortDescription} Features 21.5" touchscreen, tap-to-pay technology, and maintenance-free operation for enhanced workplace satisfaction.`;
  const machineUrl = `${SEO_CONSTANTS.BASE_URL}/vending-machines/${machine.id}`;
  const machineImageUrl = `${SEO_CONSTANTS.BASE_URL}${machine.images[0].src}`;

  return {
    title: machineTitle,
    description: machineDescription,
    keywords: [
      machine.name.toLowerCase(),
      machine.model.toLowerCase(),
      'premium vending machine',
      'touchscreen vending',
      'workplace vending solution',
      'maintenance-free vending',
      ...SEO_CONSTANTS.PRIMARY_KEYWORDS,
    ].join(', '),
    alternates: {
      canonical: machineUrl,
    },
    openGraph: {
      title: `${machine.name} - Premium Vending Solution`,
      description: `Premium ${machine.name} with advanced technology. ${machine.shortDescription}`,
      url: machineUrl,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: machineImageUrl,
        width: 800,
        height: 600,
        alt: `${machine.name} ${machine.model} vending machine`,
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: machineTitle,
      description: machineDescription,
      images: [machineImageUrl],
    },
  };
}

/**
 * Generate structured data (JSON-LD) for individual vending machines
 * Creates rich product information for search engines
 * 
 * @param machine - The vending machine data object
 * @returns JSON-LD structured data object
 */
export function generateMachineStructuredData(machine: MachineData) {
  return {
    '@context': 'https://schema.org',
    '@type': SCHEMA_TYPES.PRODUCT,
    name: `${machine.name} Vending Machine`,
    model: machine.model,
    description: machine.description,
    image: `${SEO_CONSTANTS.BASE_URL}${machine.images[0].src}`,
    brand: {
      '@type': 'Brand',
      name: SEO_CONSTANTS.SITE_NAME,
      logo: SEO_CONSTANTS.LOGO_FULL_URL,
    },
    manufacturer: {
      '@type': SCHEMA_TYPES.ORGANIZATION,
      name: SEO_CONSTANTS.BUSINESS_NAME,
      url: SEO_CONSTANTS.BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Premium installation and maintenance-free operation',
      seller: {
        '@type': SCHEMA_TYPES.ORGANIZATION,
        name: SEO_CONSTANTS.BUSINESS_NAME,
      },
    },
    features: machine.features.map(feature => feature.title),
    category: machine.category === 'refrigerated' ? 'Refrigerated Vending Machine' : 'Snack Vending Machine',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Installation Cost',
        value: 'premium',
      },
      {
        '@type': 'PropertyValue',
        name: 'Maintenance',
        value: 'Maintenance-Free',
      },
      {
        '@type': 'PropertyValue',
        name: 'Screen Size',
        value: '21.5 inches',
      },
      {
        '@type': 'PropertyValue',
        name: 'Payment Options',
        value: 'Touchscreen, Tap-to-Pay, Cash, Credit Cards',
      },
    ],
  };
}

/**
 * Generate breadcrumb structured data for any page
 * Helps search engines understand site hierarchy
 * 
 * @param breadcrumbs - Array of breadcrumb items with name and url
 * @returns JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': SCHEMA_TYPES.BREADCRUMB_LIST,
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url.startsWith('http') 
        ? breadcrumb.url 
        : `${SEO_CONSTANTS.BASE_URL}${breadcrumb.url}`,
    })),
  };
}

/**
 * Generate website search action structured data
 * Enables search box in Google search results
 */
export const WEBSITE_SEARCH_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': SCHEMA_TYPES.WEBSITE,
  name: SEO_CONSTANTS.SITE_NAME,
  url: SEO_CONSTANTS.BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SEO_CONSTANTS.BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as const;

/**
 * Local business operating hours in schema.org format
 */
export const OPERATING_HOURS_SCHEMA = [
  'Mo-Fr 08:00-20:00',
  'Sa-Su 08:00-20:00',
] as const;

/**
 * Service area geographic coverage
 */
export const SERVICE_AREA_SCHEMA = {
  '@type': SCHEMA_TYPES.PLACE,
  name: SEO_CONSTANTS.SERVICE_AREA,
  geo: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LAT,
      longitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LNG,
    },
    geoRadius: '50 miles',
  },
  containedInPlace: {
    '@type': SCHEMA_TYPES.PLACE,
    name: 'California, United States',
  },
} as const;

/**
 * Default robots meta content for different page types
 */
export const ROBOTS_CONFIG = {
  INDEX_FOLLOW: 'index, follow',
  NOINDEX_NOFOLLOW: 'noindex, nofollow',
  INDEX_NOFOLLOW: 'index, nofollow',
  NOINDEX_FOLLOW: 'noindex, follow',
} as const;

/**
 * Export all SEO-related utilities and configurations
 * This ensures consistent SEO implementation across the application
 */
// export {
//   generateMachineMetadata,
//   generateMachineStructuredData,
//   generateBreadcrumbStructuredData,
// };

/**
 * Type definitions for SEO-related data structures
 */
export type SEOMetadata = Metadata;
export type StructuredData = Record<string, unknown>;
export type BreadcrumbItem = { name: string; url: string };

/**
 * Default export containing all SEO constants and utilities
 * Use this for importing all SEO-related functionality
 */
// export default {
//   SEO_CONSTANTS,
//   SCHEMA_TYPES,
//   BASE_ORGANIZATION_SCHEMA,
//   PAGE_METADATA,
//   WEBSITE_SEARCH_SCHEMA,
//   SERVICE_AREA_SCHEMA,
//   OPERATING_HOURS_SCHEMA,
//   ROBOTS_CONFIG,
//   generateMachineMetadata,
//   generateMachineStructuredData,
//   generateBreadcrumbStructuredData,
// };