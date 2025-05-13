/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
 // output: 'export',
  compress: true,
  poweredByHeader: false,
  trailingSlash: true,
  assetPrefix: '/',
};

module.exports = nextConfig; 