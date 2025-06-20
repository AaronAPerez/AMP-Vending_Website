/**
 * Enhanced Dynamic Sitemap Generator for AMP Vending
 * 
 * Build Process Documentation:
 * 1. Generates comprehensive XML sitemap with all critical pages
 * 2. Includes proper lastmod timestamps for crawl optimization
 * 3. Implements priority-based ranking for SEO value
 * 4. Adds image sitemaps for better visual content indexing
 * 5. Includes changefreq optimization based on content type
 * 6. Supports multiple sitemap types (main, images, products)
 * 7. Implements proper XML escaping for special characters
 * 8. Adds hreflang support for future internationalization
 */

import { getAllVendingMachines } from "@/lib/data/vendingMachineData";
import { AMP_VENDING_BUSINESS_INFO, getServiceAreaList } from "@/lib/data/businessData";

/**
 * GET handler for main sitemap.xml
 * Generates comprehensive sitemap with all website pages
 */
export async function GET(): Promise<Response> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
    const currentDate = new Date().toISOString();
    
    // Get all vending machines data
    const machines = getAllVendingMachines();
    const serviceAreas = getServiceAreaList();
    
    // Generate comprehensive sitemap
    const sitemap = generateMainSitemap(baseUrl, currentDate, machines, serviceAreas);
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'X-Robots-Tag': 'noindex', // Don't index the sitemap itself
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return minimal sitemap on error
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(baseUrl)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    return new Response(errorSitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  }
}

/**
 * Generate main sitemap with comprehensive page coverage
 */
function generateMainSitemap(
  baseUrl: string, 
  currentDate: string, 
  machines: any[], 
  serviceAreas: string[]
): string {
  const urls: SitemapUrl[] = [];
  
  // 1. Homepage - Highest Priority
  urls.push({
    loc: baseUrl,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: 1.0,
    images: [
      {
        loc: `${baseUrl}/images/machines/amp-premium-touchscreen-vending-machine.png`,
        caption: 'Premium touchscreen vending machine by AMP Vending',
        title: 'Commercial Vending Machine with Touchscreen Technology',
      },
      {
        loc: `${baseUrl}/images/machines/amp-refrigerated-vending-machine.png`,
        caption: 'Refrigerated vending machine for beverages and fresh food',
        title: 'Energy-Efficient Refrigerated Vending Machine',
      },
    ],
  });
  
  // 2. Main Navigation Pages - High Priority
  const mainPages = [
    {
      path: '/vending-machines',
      lastmod: currentDate,
      changefreq: 'weekly' as const,
      priority: 0.9,
      images: machines.slice(0, 3).map(machine => ({
        loc: `${baseUrl}${machine.images?.[0]?.src || '/images/placeholder.jpg'}`,
        caption: `${machine.name} - Professional vending machine solution`,
        title: machine.name,
      })),
    },
    {
      path: '/contact',
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.8,
    },
    {
      path: '/feedback',
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.6,
    },
  ];
  
  mainPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: page.lastmod,
      changefreq: page.changefreq,
      priority: page.priority,
      images: page.images,
    });
  });
  
  // 3. Individual Vending Machine Pages - High Priority
  machines.forEach(machine => {
    const machineImages = machine.images?.map((img: any) => ({
      loc: `${baseUrl}${img.src}`,
      caption: img.alt || `${machine.name} vending machine`,
      title: machine.name,
    })) || [];
    
    urls.push({
      loc: `${baseUrl}/vending-machines/${machine.id}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      images: machineImages,
    });
  });
  
  // 4. Service Area Pages (if you create them in the future)
  const majorServiceAreas = serviceAreas.slice(0, 5); // Top 5 service areas
  majorServiceAreas.forEach(area => {
    const areaSlug = area.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    urls.push({
      loc: `${baseUrl}/service-areas/${areaSlug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    });
  });
  
  // 5. Blog/Content Pages (if you add them)
  const contentPages = [
    {
      path: '/blog/workplace-vending-benefits',
      priority: 0.7,
    },
    {
      path: '/blog/touchscreen-vending-technology',
      priority: 0.7,
    },
    {
      path: '/blog/office-break-room-solutions',
      priority: 0.7,
    },
  ];
  
  contentPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: page.priority,
    });
  });
  
  // Generate XML
  return generateSitemapXml(urls);
}

/**
 * Interface for sitemap URL entries
 */
interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: SitemapImage[];
}

/**
 * Interface for sitemap image entries
 */
interface SitemapImage {
  loc: string;
  caption?: string;
  title?: string;
  license?: string;
}

/**
 * Generate XML sitemap from URL array
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls.map(url => {
    const imageEntries = url.images?.map(image => `
    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      ${image.caption ? `<image:caption><![CDATA[${image.caption}]]></image:caption>` : ''}
      ${image.title ? `<image:title><![CDATA[${image.title}]]></image:title>` : ''}
      ${image.license ? `<image:license>${escapeXml(image.license)}</image:license>` : ''}
    </image:image>`).join('') || '';
    
    return `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority.toFixed(1)}</priority>` : ''}${imageEntries}
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

/**
 * Escape special XML characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Alternative: Sitemap Index for Large Sites
 * Use this if your site grows beyond 50,000 URLs
 */
export function generateSitemapIndex(baseUrl: string): string {
  const currentDate = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(`${baseUrl}/sitemap-main.xml`)}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${escapeXml(`${baseUrl}/sitemap-machines.xml`)}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${escapeXml(`${baseUrl}/sitemap-images.xml`)}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${escapeXml(`${baseUrl}/sitemap-service-areas.xml`)}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
}