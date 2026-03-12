import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f4f1ea',
          dark: '#e6dfd1'
        },
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#333333'
        },
        newspaper: '#1a1a1a'
      },
      fontFamily: {
        headline: ['"Playfair Display"', 'serif'],
        body: ['"Merriweather"', 'serif'],
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
