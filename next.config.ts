/** @type {import('next').NextConfig} */
const nextConfig = {
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