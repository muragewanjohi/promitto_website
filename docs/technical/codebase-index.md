# Codebase Index

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page component
│   ├── layout.tsx         # Root layout component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── Services.tsx      # Services showcase
│   ├── ConstructionFinancing.tsx # Financing section
│   ├── FeaturedProperties.tsx # Property listings
│   ├── PropertyCard.tsx  # Individual property card
│   ├── WhyChooseUs.tsx   # Value proposition section
│   └── Footer.tsx        # Site footer
└── public/               # Static assets
    ├── images/          # Image assets
    ├── logo.png        # Company logo
    └── hero-house.jpg  # Hero background image
```

## Component Overview

### Layout Components
1. **Header.tsx** (2.4KB)
   - Navigation menu
   - Logo display
   - Authentication links
   - Mobile responsive design

2. **Footer.tsx** (7.9KB)
   - Site navigation links
   - Contact information
   - Social media links
   - Legal information

### Page Sections
1. **Hero.tsx** (1.6KB)
   - Full-screen background image
   - Main call-to-action
   - Gradient overlay
   - Responsive text layout

2. **Services.tsx** (3.6KB)
   - Three-column service showcase
   - Icon-based service cards
   - Hover effects
   - Learn more links

3. **ConstructionFinancing.tsx** (3.3KB)
   - Financing benefits grid
   - Call-to-action section
   - Loan type information
   - Application button

4. **FeaturedProperties.tsx** (2.2KB)
   - Property grid layout
   - Property filtering
   - Responsive card design

5. **PropertyCard.tsx** (2.3KB)
   - Individual property display
   - Image gallery
   - Property details
   - Contact buttons

6. **WhyChooseUs.tsx** (3.2KB)
   - Value proposition section
   - Feature highlights
   - Testimonials
   - Trust indicators

### App Structure
1. **page.tsx**
   - Home page layout
   - Component composition
   - Section ordering

2. **layout.tsx**
   - Root layout
   - Meta tags
   - Global providers

3. **globals.css**
   - Tailwind imports
   - Custom styles
   - Animation definitions

## Configuration Files
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS setup
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS plugins

## Dependencies
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- PostCSS
- Autoprefixer

## Development Tools
- ESLint
- Prettier
- TypeScript
- Tailwind CSS

## File Sizes and Complexity
1. Largest Components:
   - Footer.tsx (7.9KB)
   - Services.tsx (3.6KB)
   - ConstructionFinancing.tsx (3.3KB)

2. Smallest Components:
   - Hero.tsx (1.6KB)
   - PropertyCard.tsx (2.3KB)
   - FeaturedProperties.tsx (2.2KB)

## Notes
- All components use TypeScript
- Styling is done with Tailwind CSS
- Components are modular and reusable
- Follows responsive design principles
- Implements proper accessibility standards
- Uses semantic HTML elements
- Follows the established color scheme:
  - Primary: #1E40AF (blue)
  - Secondary: #F59E0B (orange)
  - Hover: #D97706 (dark orange) 