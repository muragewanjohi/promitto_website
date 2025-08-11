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
          DEFAULT: '#172554',//'#172554', // 1E40AF
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
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.8)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.8)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.8)',
        'xl': '0 8px 16px rgba(0, 0, 0, 0.8)',
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.8)',
        },
        '.text-shadow-md': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.8)',
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.8)',
        },
        '.text-shadow-xl': {
          'text-shadow': '0 8px 16px rgba(0, 0, 0, 0.8)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 