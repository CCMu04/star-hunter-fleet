/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-bg': '#0A0E17',
        'card-bg': '#131A2B',
        'space-blue': '#4A9EFF',
        'engine-orange': '#FF6B35',
        'energy-green': '#00D68F',
        'space-gold': '#FFD700',
        'alert-red': '#FF4757',
        'text-primary': '#E8ECF1',
        'text-secondary': '#8892A4',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}