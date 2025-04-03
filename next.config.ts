/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
    devIndicators: false,
  },



  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-image-source.com', // Replace with your image source
        port: '',
        pathname: '/path/to/images/**', // Adjust the path as needed
      },
    ],
  },
};
module.exports = nextConfig;