
/**
 * GET handler for Google-compliant robots.txt
 * Fixes all syntax errors and warnings identified in Google Search Console
 */
export async function GET(): Promise<Response> {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
    
    const robotsContent = generateGoogleCompliantRobots(isProduction, baseUrl);
    
    return new Response(robotsContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    
    // Minimal fallback
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
    const fallbackRobots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;
    
    return new Response(fallbackRobots, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  }
}

/**
 * Generate Google-compliant robots.txt content
 * Fixes all identified syntax errors and warnings
 */
function generateGoogleCompliantRobots(isProduction: boolean, baseUrl: string): string {
  if (!isProduction) {
    // Development environment - simple blocking
    return `# AMP Vending - Development Environment
User-agent: *
Disallow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  }

  // Production environment - Google-compliant syntax
  return `# AMP Vending - Premium Workplace Vending Solutions
# Website: ${baseUrl}
# Contact: ampdesignandconsulting@gmail.com
# Phone: (209) 403-5450

# ============================================================================
# GOOGLE AND MAJOR SEARCH ENGINES - Full Access
# ============================================================================

User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Googlebot-Video
Allow: /

User-agent: Bingbot
Allow: /
Crawl-delay: 2

User-agent: DuckDuckBot
Allow: /

User-agent: YandexBot
Allow: /

# ============================================================================
# SOCIAL MEDIA CRAWLERS - Full Access
# ============================================================================

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: TelegramBot
Allow: /

User-agent: SlackBot
Allow: /

# ============================================================================
# SEO TOOLS - Controlled Access
# ============================================================================

User-agent: AhrefsBot
Allow: /
Crawl-delay: 30

User-agent: SemrushBot
Allow: /
Crawl-delay: 30

User-agent: MJ12bot
Allow: /
Crawl-delay: 30

User-agent: DotBot
Allow: /
Crawl-delay: 30

# ============================================================================
# AI CRAWLERS - Blocked
# ============================================================================

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

User-agent: Bard
Disallow: /

User-agent: PerplexityBot
Disallow: /

# ============================================================================
# PROBLEMATIC CRAWLERS - Blocked
# ============================================================================

User-agent: SiteAuditBot
Disallow: /

User-agent: SeekportBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: MegaIndex
Disallow: /

# ============================================================================
# DEFAULT RULES FOR ALL OTHER CRAWLERS
# ============================================================================

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/
Disallow: /.well-known/
Disallow: /temp/
Disallow: /backup/
Disallow: /logs/
Disallow: /cache/
Disallow: /.env
Disallow: /.git/
Disallow: /node_modules/

# ============================================================================
# SITEMAPS
# ============================================================================

Sitemap: ${baseUrl}/sitemap.xml
`;
}

/**
 * Common robots.txt syntax errors that Google flags:
 * 
 * 1. ❌ Comments within User-agent blocks
 *    Fix: Move comments outside user-agent blocks
 * 
 * 2. ❌ Unsupported directives (Request-rate, Visit-time, Host)
 *    Fix: Remove these directives (Google ignores them)
 * 
 * 3. ❌ Multiple User-agent lines without rules between them
 *    Fix: Group related user-agents properly
 * 
 * 4. ❌ Invalid Disallow patterns with query parameters
 *    Fix: Use proper pattern syntax
 * 
 * 5. ❌ Extra whitespace or special characters
 *    Fix: Clean formatting with proper line endings
 * 
 * 6. ❌ Mixing Allow/Disallow for same User-agent without proper grouping
 *    Fix: Group all rules for each user-agent together
 */