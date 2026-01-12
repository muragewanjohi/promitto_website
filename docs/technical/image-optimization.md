# Image Optimization Guide

## Current Optimizations Implemented

### 1. Next.js Image Optimization Configuration
- Enabled image optimization (removed `unoptimized: true`)
- Configured Supabase storage domain in `remotePatterns`
- Reduced device sizes to speed up processing: `[640, 750, 828, 1080, 1200, 1920]`
- Set minimum cache TTL to 1 year
- Using modern formats: AVIF and WebP

### 2. Hero Slider (NewHero Component)
- Only loads first image with `priority`
- Lazy loads other images
- Preloads next image before transition
- Only renders visible + next image (not all 5)
- Quality: 90 for first image, 75 for others

### 3. Property Cards
- First 3 cards use `priority={true}`
- Remaining cards use `loading="lazy"`
- Quality: 85 for priority, 75 for lazy
- Proper `sizes` attribute for responsive loading

### 4. Featured Media
- All images use `loading="lazy"`
- Quality set to 75
- Proper `sizes` attribute

### 5. Gallery & Other Components
- Lazy loading enabled
- Proper sizes attributes
- Quality optimized

## Performance Issues & Solutions

### Current Issue: Slow Image Processing (28-48 seconds)
The main bottleneck is Next.js Image Optimization processing Supabase images on-demand. Each request:
1. Goes to Next.js server
2. Fetches from Supabase
3. Processes/optimizes the image
4. Serves it

### Recommended Solutions (if issues persist)

#### Option 1: Use Supabase CDN Directly (Fastest)
If Supabase storage has a CDN, consider using images directly without Next.js optimization:

```typescript
// In next.config.js, add loader for Supabase
images: {
  loader: 'custom',
  loaderFile: './src/lib/supabase-image-loader.ts',
}
```

Create `src/lib/supabase-image-loader.ts`:
```typescript
export default function supabaseLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If it's a Supabase URL, use it directly with query params if Supabase supports it
  // Otherwise, use Next.js optimization
  if (src.includes('supabase.co')) {
    // Supabase storage URLs can be used directly
    // You can add width/quality params if Supabase supports them
    return src;
  }
  // Fallback to Next.js optimization for other images
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}
```

#### Option 2: Pre-optimize Images on Upload
When uploading images to Supabase, create multiple sizes:
- Thumbnail: 300px
- Medium: 800px
- Large: 1920px

Then use the appropriate size based on `sizes` attribute.

#### Option 3: Use a CDN Service
Consider using:
- Cloudinary
- Imgix
- ImageKit

These services provide fast image optimization with CDN delivery.

#### Option 4: Reduce Quality Further
For below-the-fold images, reduce quality to 60-65:

```typescript
<Image
  src={src}
  quality={60} // Lower quality = faster processing
  loading="lazy"
/>
```

## Best Practices Applied

1. ✅ Only prioritize above-the-fold images
2. ✅ Use lazy loading for below-the-fold content
3. ✅ Proper `sizes` attributes for responsive images
4. ✅ Reduced device sizes to speed up processing
5. ✅ Quality optimization (85-90 for priority, 75 for lazy)
6. ✅ Preloading next hero image
7. ✅ Conditional rendering (only render visible + next images)

## Monitoring Performance

1. Use Chrome DevTools Network tab to monitor load times
2. Use Lighthouse to measure LCP (Largest Contentful Paint)
3. Monitor Core Web Vitals in production
4. Check Next.js Image Optimization API response times

## Expected Improvements

With current optimizations:
- First hero image loads immediately (priority)
- Other images lazy load as user scrolls
- Reduced processing overhead (fewer device sizes)
- Better caching (1 year TTL)
- Smaller file sizes (AVIF/WebP format)

If 28-48 second delays persist, consider implementing Option 1 (Supabase CDN direct) or Option 3 (CDN service).
