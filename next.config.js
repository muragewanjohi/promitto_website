/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Enable image optimization for better performance
    unoptimized: false,
    // Allow images from Supabase storage and other sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
    // Use modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Reduce device sizes to avoid processing huge images - this speeds up optimization
    // Removed 1920 to prevent requesting very large images
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache time for optimized images (1 year)
    minimumCacheTTL: 31536000,
    // Reduce default quality to speed up processing (can be overridden per image)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
 
  compress: true,
  poweredByHeader: false,
  trailingSlash: true,
  assetPrefix: '/',
  
  // Prevent Next.js barrel optimization from breaking lucide-react icon imports in dev.
  transpilePackages: ['lucide-react'],

  experimental: {},
};

module.exports = nextConfig; 