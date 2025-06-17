import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
   // Enable experimental features 
  experimental: {
    optimizePackageImports: ['lucide-react'],
      optimizeCss: true,
    optimizeServerReact: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },

  // Environment variables
  env: {
    CUSTOM_KEY: '',
  },

  // Headers configuration for CORS and security
  async headers() {
    return [
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
        // Apply security headers to all routes
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
        {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
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
      // Add any redirects here
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
      // {
      //   source: '/api/proxy/:path*',
      //   destination: 'https://external-api.com/:path*',
      // },
    ];
  },

  // Image optimization
  images: {
    // Configure image domains if using external images
    domains: [
      // 'example.com',
    ],
    // Configure image formats
     formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },


  // Standalone output for Docker deployment (optional)
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,

  // Enable React strict mode
  reactStrictMode: true,

  // Enable SWC minification
  // swcMinify: true,

  // Configure trailing slash behavior
  trailingSlash: false,

  // Configure compression
  compress: true,

  // Configure powered by header
  poweredByHeader: false,

  // Configure build directory
  distDir: '.next',

  // Configure TypeScript
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: false,
  },

  // Configure ESLint
  eslint: {
    // Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
};


module.exports = nextConfig;
// export default nextConfig;