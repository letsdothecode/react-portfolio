/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4a90e2',
          dark: '#1f64b8'
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
