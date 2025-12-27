/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          pink: '#FFB6C1',
          lightPink: '#FFE4E1',
          lavender: '#E6E6FA',
          rose: '#FFC0CB',
          blush: '#FFF0F5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

