import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  reactStrictMode: true,
  
  // Add redirects configuration
  async redirects() {
    return [
      // Redirect HTTP to HTTPS with www
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
      // Redirect HTTPS non-www to HTTPS www
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
      // Handle any accidental double-www in the URL
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.www.ampvendingmachines.com',
          },
        ],
        destination: 'https://www.ampvendingmachines.com/:path*',
        permanent: true,
      }
    ];
  },
  
  // Custom headers to ensure proper HTTPS
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