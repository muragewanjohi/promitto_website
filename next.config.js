/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
 
  compress: true,
  poweredByHeader: false,
  trailingSlash: true,
  assetPrefix: '/',
  
  // Disable static generation for API routes that require environment variables
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
};

module.exports = nextConfig; 