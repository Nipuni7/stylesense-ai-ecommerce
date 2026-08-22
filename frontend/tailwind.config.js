/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F0F10",
          charcoal: "#1A1A1C",
          cream: "#F9F6F0",
          champagne: "#D4AF37",
          gold: "#C5A880",
          sand: "#EFECE6",
          muted: "#7A7A80",
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.2em',
      }
    },
  },
  plugins: [],
}