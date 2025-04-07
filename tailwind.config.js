/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'nextpixel-blue': '#0A2463', // Dark blue
        'nextpixel-turquoise': '#1CEFFF', // Turquoise
        'nextpixel-light': '#F2F7FF',
        'nextpixel-dark': '#0F172A',
        'nextpixel-gray': '#64748B'
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}
