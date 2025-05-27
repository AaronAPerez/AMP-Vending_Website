
/**
 * Dynamic Robots.txt Route Handler
 * 
 * Generates robots.txt file dynamically for AMP Vending website
 * following SEO best practices and Next.js App Router conventions.
 * 
 * Features:
 * - Environment-aware configuration (production vs development)
 * - Proper sitemap references
 * - Crawl delay optimization
 * - Security through selective blocking
 * - Performance optimization directives
 */

/**
 * GET handler for robots.txt
 * Returns robots.txt content as plain text with proper headers
 */
export async function GET(): Promise<Response> {
  // Get environment and base URL
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
  
  // Generate robots.txt content based on environment
  const robotsContent = generateRobotsContent(isProduction, baseUrl);
  
  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  });
}

/**
 * Generate robots.txt content
 * @param isProduction - Whether the app is running in production
 * @param baseUrl - Base URL of the website
 * @returns Formatted robots.txt content
 */
function generateRobotsContent(isProduction: boolean, baseUrl: string): string {
  if (!isProduction) {
    // Development/staging environment - block all crawlers
    return `# AMP Vending - Development Environment
# This is a development/staging site - blocking all crawlers

User-agent: *
Disallow: /

# Block common development paths
Disallow: /_next/
Disallow: /api/
Disallow: /.env
Disallow: /node_modules/

# Development sitemap (if needed)
# Sitemap: ${baseUrl}/sitemap.xml
`;
  }

  // Production environment - allow crawling with optimizations
  return `# AMP Vending - Premium Workplace Vending Solutions
# Website: ${baseUrl}
# Contact: ampdesignandconsulting@gmail.com

# Allow all search engines to crawl public content
User-agent: *
Allow: /

# Block sensitive or non-public directories
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /.well-known/
Disallow: /private/
Disallow: /temp/
Disallow: /backup/

# Block common non-content files
Disallow: /*.json$
Disallow: /*.xml$ 
Disallow: /*.txt$
Disallow: /*.log$

# Block query parameters that don't affect content
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /*?source=*
Disallow: /*?campaign=*

# Allow specific important files
Allow: /sitemap.xml
Allow: /robots.txt
Allow: /manifest.json
Allow: /favicon.ico

# Optimize crawling for different search engines

# Google - Allow aggressive crawling for business-critical pages
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing - Standard crawling
User-agent: Bingbot
Allow: /
Crawl-delay: 2

# Allow social media crawlers for better sharing
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# Block resource-intensive crawlers during business hours
User-agent: AhrefsBot
Crawl-delay: 30

User-agent: SemrushBot
Crawl-delay: 30

User-agent: MJ12bot
Crawl-delay: 30

# Block potentially problematic crawlers
User-agent: SiteAuditBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

# Block AI training crawlers (optional - remove if you want AI to learn from your content)
User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Additional sitemaps (if you create them)
# Sitemap: ${baseUrl}/sitemap-products.xml
# Sitemap: ${baseUrl}/sitemap-machines.xml
# Sitemap: ${baseUrl}/sitemap-images.xml

# Host directive (helps with domain consolidation)
Host: ${baseUrl.replace('https://', '')}

# Last updated
# Generated: ${new Date().toISOString()}
`;
}

/**
 * Alternative: Static robots.txt using Next.js MetadataRoute.robots
 * 
 * You can also create a robots.ts file in the app directory for static robots.txt:
 * 
 * export default function robots(): MetadataRoute.Robots {
 *   const isProduction = process.env.NODE_ENV === 'production';
 *   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
 * 
 *   if (!isProduction) {
 *     return {
 *       rules: {
 *         userAgent: '*',
 *         disallow: '/',
 *       },
 *     };
 *   }
 * 
 *   return {
 *     rules: [
 *       {
 *         userAgent: '*',
 *         allow: '/',
 *         disallow: ['/api/', '/_next/', '/admin/'],
 *       },
 *       {
 *         userAgent: 'AhrefsBot',
 *         crawlDelay: 30,
 *       },
 *       {
 *         userAgent: 'SemrushBot',
 *         crawlDelay: 30,
 *       },
 *     ],
 *     sitemap: `${baseUrl}/sitemap.xml`,
 *     host: baseUrl,
 *   };
 * }
 */