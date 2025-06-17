import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental optimizations for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true,
    optimizeServerReact: true,
  },

  // Enhanced webpack configuration for performance optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Enhanced code splitting for client-side bundles
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 240000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
          // Separate framer-motion (large library)
          motion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'motion',
            chunks: 'all',
            priority: 15,
          },
          // Separate lucide-react icons
          icons: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'icons',
            chunks: 'all',
            priority: 12,
          },
        },
      };

      // Enhanced minification for production
      if (config.mode === 'production') {
        config.optimization.minimize = true;
        
        // Find existing TerserPlugin and enhance it
        const TerserPlugin = require('terser-webpack-plugin');
        
        config.optimization.minimizer = config.optimization.minimizer || [];
        
        // Add enhanced Terser configuration
        config.optimization.minimizer.push(
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.warn'],
                passes: 2, // Multiple compression passes
              },
              mangle: {
                safari10: true, // Fix Safari 10 issues
              },
              format: {
                comments: false, // Remove all comments
              },
            },
            extractComments: false, // Don't create separate license file
          })
        );
      }
    }
    
    return config;
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Remove React DevTools in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Note: swcMinify is deprecated in Next.js 14+ (enabled by default)
  // swcMinify: true, // Removed - this is now the default behavior

  // Environment variables
  env: {
    CUSTOM_KEY: '',
  },

  // Enhanced headers configuration for performance and security
  async headers() {
    return [
      {
        // Optimize caching for static assets
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Optimize caching for images
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Optimize API route caching
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=3600',
          },
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
        // Security headers for all routes
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
        ],
      },
    ];
  },

  // Redirects configuration
  async redirects() {
    return [
      // Add any redirects here
      // Example:
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites configuration
  async rewrites() {
    return [
      // Add any rewrites here
      // Example:
      // {
      //   source: '/api/proxy/:path*',
      //   destination: 'https://external-api.com/:path*',
      // },
    ];
  },

  // Enhanced image optimization
  images: {
    // Configure image domains if using external images
    domains: [
      // Add external domains here if needed
      // 'example.com',
    ],
    // Configure modern image formats for better performance
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    // Enable image optimization
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Standalone output for Docker deployment (optional)
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,

  // Enable React strict mode for better development
  reactStrictMode: true,

  // Configure trailing slash behavior
  trailingSlash: false,

  // Enable compression
  compress: true,

  // Remove powered by header for security
  poweredByHeader: false,

  // Configure build directory
  distDir: '.next',

  // TypeScript configuration
  typescript: {
    // Set to true only if you want to ignore TypeScript errors during build
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Set to true only if you want to ignore ESLint errors during build
    ignoreDuringBuilds: false,
  },

  // Performance optimizations
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Generate source maps for better debugging (disable in production for performance)
  productionBrowserSourceMaps: process.env.NODE_ENV !== 'production',
};

export default nextConfig;