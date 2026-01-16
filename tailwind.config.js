/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - centralized via CSS variables in globals.css
        'nextpixel-navy': 'var(--color-navy)',
        'nextpixel-teal': 'var(--color-teal)',
        'nextpixel-dark': 'var(--color-dark)',
        'nextpixel-cream': 'var(--color-cream)',
        'nextpixel-gray': 'var(--color-gray)',
        // Legacy aliases (for backward compatibility)
        'nextpixel-blue': 'var(--color-navy)',
        'nextpixel-turquoise': 'var(--color-teal)',
        'nextpixel-light': 'var(--color-cream)',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif']
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'spinner-blade': 'spinner-blade 1s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse': 'spin-reverse 20s linear infinite',
        'star-btn': 'star-btn calc(var(--duration)*1s) linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spinner-blade': {
          '0%': { opacity: '0.85' },
          '50%': { opacity: '0.25' },
          '100%': { opacity: '0.25' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
        'star-btn': {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
