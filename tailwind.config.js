/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f4f1ea', // slightly yellow/gray paper color
          dark: '#e6dfd1'
        },
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#333333'
        }
      },
      fontFamily: {
        headline: ['"Playfair Display"', 'serif'],
        body: ['"Merriweather"', 'serif'],
      }
    },
  },
  plugins: [],
}

