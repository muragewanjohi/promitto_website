/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',//'#1E88E5', // Black Pearl
        },
        secondary: {
          DEFAULT: '#F59E0B', // Buttercup #
        },
        gray: {
          DEFAULT: '#7c7c88', // Jumbo
        },
        accent: {
          DEFAULT: '#8c6404', // Chelsea Gem
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 