import type { NextConfig } from "next";

/**
 * Next.js Configuration with Lighthouse Performance Optimizations
 * 
 * Build Process Documentation:
 * 1. Enhanced image optimization with WebP/AVIF support
 * 2. Improved caching strategies for static assets
 * 3. Bundle optimization with code splitting
 * 4. Security headers for best practices compliance
 * 5. Performance monitoring and optimization features
 */
const nextConfig: NextConfig = {
  // Performance Optimizations
  compiler: {
    // Remove console statements in production for smaller bundles
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for enhanced performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'my-value',
  },

  // Enhanced headers configuration for performance and security
  async headers() {
    return [
      {
        // Static asset caching - Critical for Lighthouse performance score
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Image caching optimization
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      {
        // Font caching
        source: '/_next/static/media/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Apply headers to API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' 
              ? '*' 
              : 'https://www.ampvendingmachines.com',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400', // 24 hours
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Enhanced security headers for all routes - Addresses Lighthouse Best Practices
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Content Security Policy for enhanced security
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://vitals.vercel-analytics.com https://vercel.live",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Redirects configuration
  async redirects() {
    return [
      // SEO-friendly redirects for old machine URLs
      {
        source: '/machines/:slug',
        destination: '/vending-machines/:slug',
        permanent: true,
      },
      // Trailing slash consistency
      {
        source: '/vending-machines/',
        destination: '/vending-machines',
        permanent: true,
      },
    ];
  },

  // Rewrites configuration
  async rewrites() {
    return [
      // API proxy for external services if needed
      // {
      //   source: '/api/proxy/:path*',
      //   destination: 'https://external-api.com/:path*',
      // },
    ];
  },

  // Enhanced image optimization - Critical for Lighthouse performance
  images: {
    // Configure image domains for external images
    domains: [
      // Add domains if using external images
    ],
    // Modern image formats for better compression
    formats: ['image/webp', 'image/avif'],
    // Responsive breakpoints optimized for vending machine website
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Extended cache time for better performance
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Enable image optimization for better Core Web Vitals
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack optimization for bundle size reduction
  webpack: (config, { isServer, dev }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Enhanced code splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Vendor chunk for third-party libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // Common chunk for shared components
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
          // Separate chunks for large libraries
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 15,
          },
        },
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // SVG handling optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // TypeScript configuration
  typescript: {
    // Type checking during build (recommended to keep true)
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // ESLint during builds (recommended to keep false for faster builds)
    ignoreDuringBuilds: false,
  },

  // Powered by header removal for security
  poweredByHeader: false,

  // Generate ETags for better caching
  generateEtags: true,
};

module.exports = nextConfig;