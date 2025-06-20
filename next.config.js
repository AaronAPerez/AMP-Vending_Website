/**
 * Performance-Optimized Next.js Configuration
 * 
 * Build Process Documentation:
 * 1. Implements aggressive bundle splitting for better caching
 * 2. Configures tree shaking and dead code elimination
 * 3. Optimizes vendor chunk splitting to reduce main bundle size
 * 4. Implements dynamic imports and code splitting strategies
 * 5. Configures production optimizations for minimal bundle sizes
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Core Configuration */
  reactStrictMode: true,

  // Configure TypeScript build behavior
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configure ESLint behavior during build
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['pages', 'components', 'lib', 'src', 'app'],
  },

  // Compiler optimizations for production
  compiler: {
    // Remove console.log statements in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // Remove React properties in production
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { 
      properties: ['^data-testid$', '^data-test-.*$'] 
    } : false,
    
    // Remove debugging code
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for performance
  experimental: {
    // Optimize package imports for better tree shaking
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
      'react-hook-form',
      'zod',
    ],
    
    // Enable CSS optimization
    optimizeCss: true,
    
    // Optimize server-side React
    optimizeServerReact: true,
    
    // Enable modern compilation
    esmExternals: true,
    
    // Optimize fonts
    optimizeFonts: true,
    
    // Enable SWC plugins for better optimization
    swcPlugins: [],
  },

  // Webpack configuration for build optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle splitting for client-side code
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: -30,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Add fallbacks for Node.js modules (prevents build errors)
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Environment variables available to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || '',
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV,
  },

  // Configure output behavior
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  distDir: '.next',

  // Image optimization configuration
  images: {
    // Configure allowed domains for external images
    remotePatterns: [
      // Add any external domains you need
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
    ],
    // Configure supported formats
    formats: ['image/webp', 'image/avif'],
    // Configure device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimization
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // HTTP headers configuration
  async headers() {
    return [
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
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // API route headers
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
            value: '86400',
          },
        ],
      },
      {
        // Static asset caching
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Image caching
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects configuration
  async redirects() {
    return [
      // Add any permanent redirects here
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites configuration for API proxying
  async rewrites() {
    return [
      // Add any rewrites here
      // {
      //   source: '/api/external/:path*',
      //   destination: 'https://external-api.com/:path*',
      // },
    ];
  },

  // Configure build behavior
  async generateBuildId() {
    // Use git commit hash as build ID for better caching
    if (process.env.VERCEL_GIT_COMMIT_SHA) {
      return process.env.VERCEL_GIT_COMMIT_SHA;
    }
    // Fallback to default
    return null;
  },

  // Page extensions configuration
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Build-specific optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundles
  
  // Configure which files should be treated as pages
  excludeDefaultMomentLocales: true,
};

module.exports = nextConfig;