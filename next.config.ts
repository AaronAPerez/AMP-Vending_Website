import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Simplified config to debug
  experimental: {
    optimizeCss: true,
  },
  
  // Remove complex webpack configurations temporarily
  webpack: (config) => {
    // Minimal webpack config
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;