'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

/**
 * Individual breadcrumb item interface
 */
interface BreadcrumbItem {
  /** Display name for the breadcrumb */
  name: string;
  /** URL path for the breadcrumb */
  href: string;
  /** Optional position override (auto-calculated if not provided) */
  position?: number;
}

/**
 * BreadcrumbSchema component props
 */
interface BreadcrumbSchemaProps {
  /** Array of breadcrumb items, ordered from root to current page */
  items?: BreadcrumbItem[];
  /** Whether to auto-generate breadcrumbs from the current pathname */
  autoGenerate?: boolean;
  /** Base URL for the website */
  baseUrl?: string;
}

/**
 * Default breadcrumb mappings for auto-generation
 * Maps pathname segments to display names
 */
const BREADCRUMB_MAPPINGS: Record<string, string> = {
  'vending-machines': 'Vending Machines',
  'contact': 'Contact Us',
  'feedback': 'Feedback',
  'about': 'About Us',
  'proposal': 'Proposal',
  // Vending machine specific mappings
  'km-vmnt-50-b': 'Non-Refrigerated Snack Machine',
  'km-vmr-40-b': 'Standard Refrigerated Machine',
  'km-vmr-30-b': 'Compact Refrigerated Machine',
  'km-vmrt-50-b': 'Premium Refrigerated Machine',
} as const;

/**
 * BreadcrumbSchema Component
 * 
 * Generates JSON-LD structured data for breadcrumb navigation to help search engines
 * understand the site hierarchy and display breadcrumbs in search results.
 * 
 * Features:
 * - Auto-generates breadcrumbs from current pathname
 * - Manual breadcrumb override capability
 * - Proper schema.org BreadcrumbList formatting
 * - Handles dynamic routes (vending machine pages)
 * - Accessibility-compliant structure
 * 
 * @param props - Breadcrumb configuration
 */
export default function BreadcrumbSchema({
  items,
  autoGenerate = true,
  baseUrl = 'https://www.ampvendingmachines.com',
}: BreadcrumbSchemaProps) {
  const pathname = usePathname();

  /**
   * Auto-generate breadcrumb items from the current pathname
   */
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    // Always start with home
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' },
    ];

    // Skip if we're on the home page
    if (pathname === '/') {
      return breadcrumbs;
    }

    // Split pathname and filter out empty segments
    const pathSegments = pathname.split('/').filter(Boolean);
    let currentPath = '';

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Get display name from mappings or format the segment
      const displayName = BREADCRUMB_MAPPINGS[segment] || formatSegmentName(segment);
      
      breadcrumbs.push({
        name: displayName,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  /**
   * Format a URL segment into a readable display name
   */
  const formatSegmentName = (segment: string): string => {
    // Handle machine IDs (e.g., 'km-vmnt-50-b' -> 'KM-VMNT-50-B')
    if (segment.match(/^km-/i)) {
      return segment.toUpperCase();
    }

    // Handle general segments: kebab-case to Title Case
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  /**
   * Get the final breadcrumb items
   */
  const breadcrumbItems = items || (autoGenerate ? generateBreadcrumbs() : []);

  /**
   * Generate the JSON-LD structured data for breadcrumbs
   */
  const generateBreadcrumbJsonLd = () => {
    if (breadcrumbItems.length <= 1) {
      return null; // Don't generate schema for single item (home only)
    }

    const itemListElements = breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position || index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`,
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemListElements,
    };
  };

  const jsonLdData = generateBreadcrumbJsonLd();

  // Don't render anything if there's no valid breadcrumb data
  if (!jsonLdData) {
    return null;
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData),
        }}
      />
    </Head>
  );
}

/**
 * Utility function to create custom breadcrumb items
 */
export const createBreadcrumbItem = (
  name: string,
  href: string,
  position?: number
): BreadcrumbItem => ({
  name,
  href,
  position,
});

/**
 * Pre-configured breadcrumb schemas for common pages
 */

/**
 * Vending Machine Detail Page Breadcrumbs
 */
export const VendingMachineBreadcrumbs = ({
  machineName,
  machineId,
}: {
  machineName: string;
  machineId: string;
}) => (
  <BreadcrumbSchema
    items={[
      createBreadcrumbItem('Home', '/'),
      createBreadcrumbItem('Vending Machines', '/vending-machines'),
      createBreadcrumbItem(machineName, `/vending-machines/${machineId}`),
    ]}
  />
);

// export const AboutBreadcrumbs: React.FC = () => {
//   return (
//     <nav 
//       aria-label="Breadcrumb navigation for About page" 
//       className="sr-only" // Hidden visually but available to screen readers
//     >
//       <ol className="flex items-center space-x-2 text-sm">
//         <li>
//           <a 
//             href="/" 
//             className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors"
//             aria-label="Navigate to homepage"
//           >
//             Home
//           </a>
//         </li>
//         <li aria-hidden="true" className="text-[#4d4d4d]">/</li>
//         <li>
//           <span 
//             className="text-[#F5F5F5]" 
//             aria-current="page"
//             aria-label="Current page: About AMP Vending"
//           >
//             About
//           </span>
//         </li>
//       </ol>
//     </nav>
//   );
// };



/**
 * Contact Page Breadcrumbs
 */
export const ContactBreadcrumbs = () => (
  <BreadcrumbSchema
    items={[
      createBreadcrumbItem('Home', '/'),
      createBreadcrumbItem('Contact Us', '/contact'),
    ]}
  />
);

/**
 * Feedback Page Breadcrumbs
 */
export const FeedbackBreadcrumbs = () => (
  <BreadcrumbSchema
    items={[
      createBreadcrumbItem('Home', '/'),
      createBreadcrumbItem('Feedback', '/feedback'),
    ]}
  />
);

/**
 * Hook for getting breadcrumb data (useful for rendering visual breadcrumbs)
 */
export const useBreadcrumbs = (customItems?: BreadcrumbItem[]) => {
  const pathname = usePathname();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' },
    ];

    if (pathname === '/') {
      return breadcrumbs;
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    let currentPath = '';

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const displayName = BREADCRUMB_MAPPINGS[segment] || segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name: displayName,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  return customItems || generateBreadcrumbs();
};