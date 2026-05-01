/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0A0E17',
        'bg-card': '#131A2B',
        'primary': '#4A9EFF',
        'accent': '#FF6B35',
        'success': '#00D68F',
        'warning': '#FFD700',
        'danger': '#FF4757',
        'text-primary': '#E8ECF1',
        'text-secondary': '#8892A4',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}