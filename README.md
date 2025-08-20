# Promitto - Property Management Website

A modern, responsive property management website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Clean, minimalist design
- Responsive layout for all devices
- Property search with filters
- Featured properties showcase
- Why Choose Us section
- Contact information
- Social media integration

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React 18

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/promitto.git
cd promitto
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   
   # Email Configuration (if using Resend)
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
promitto/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── FeaturedProperties.tsx
│       ├── PropertyCard.tsx
│       ├── WhyChooseUs.tsx
│       └── Footer.tsx
├── public/
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the following environment variables in your Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `RESEND_API_KEY`: Your Resend API key (if using email functionality)

4. Deploy your application

### Environment Variables

Make sure to set these environment variables in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (starts with `https://`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key
- `RESEND_API_KEY`: Your Resend API key for email functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 