/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove edge runtime if it's causing issues
  // runtime: 'edge', // Comment this out or remove it
  
  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Image optimization configuration
  images: {
    // Add your image domains here
    domains: ['ampvendingmachines.com', 'www.ampvendingmachines.com'],
    
    // Modern image formats
    formats: ['image/webp', 'image/avif'],
    
    // Device sizes for responsive images
    deviceSizes: [640, 768, 1024, 1280, 1600],
    
    // Image sizes for optimization
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Enable dangerous use of SVG (if needed)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers configuration
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets for a year
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache CSS and JS files
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for common URL patterns
  async redirects() {
    return [
      // Redirect common variations
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/machines',
        destination: '/vending-machines',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/vending-machines',
        permanent: true,
      },
      // Add more redirects as needed
    ];
  },

  // Webpack configuration to handle missing source maps
  webpack: (config: {
      module: {
        rules: {
          test: RegExp; enforce: string; use: {
            loader: string; options: {
              filterSourceMappingUrl: (
                // runtime: 'edge', // Comment this out or remove it
                // Experimental features
                url // runtime: 'edge', // Comment this out or remove it
                  : any, resourcePath: any) => boolean;
            };
          };
        }[];
      };
    }, { dev, isServer }: any) => {
    // Don't modify devtool in development - let Next.js handle it
    // Only suppress source map warnings for external libraries
    
    if (dev && !isServer) {
      // Filter out source map warnings for problematic libraries
      const originalWarn = console.warn;
      console.warn = (message, ...args) => {
        // Suppress specific source map warnings
        if (
          typeof message === 'string' && 
          (message.includes('source-map-loader') || 
           message.includes('rsuite') ||
           message.includes('.css.map'))
        ) {
          return;
        }
        originalWarn(message, ...args);
      };
    }

    // Handle missing source maps without affecting performance
    if (!dev) {
      // Only apply source map handling in production
      config.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: {
          loader: 'source-map-loader',
          options: {
            filterSourceMappingUrl: (url: any, resourcePath: string | string[]) => {
              // Skip source maps for problematic libraries in production
              if (resourcePath.includes('rsuite') || 
                  resourcePath.includes('node_modules')) {
                return false;
              }
              return true;
            },
          },
        },
      });
    }

    return config;
  },

  // TypeScript configuration
  typescript: {
    // Enable type checking during build
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Enable ESLint during build
    ignoreDuringBuilds: false,
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Output configuration
  output: 'standalone', // For Docker deployments

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Power to handle large bundles
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;