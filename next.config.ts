import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  reactStrictMode: true,
  
  // Add redirects configuration
  async redirects() {
    return [
      // Redirect non-www to www (handles both http and https)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'ampvendingmachines.com',
          },
        ],
        destination: 'https://www.ampvendingmachines.com/:path*',
        permanent: true,
      },
    ];
  },
  
  // Add custom headers to ensure proper HTTPS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
    ];
  }
};

export default nextConfig;