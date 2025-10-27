/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.{vue,js,ts,jsx,tsx,md}",
    "./docs/.vitepress/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
        ai: '#8b5cf6',
        fintech: '#f97316',
        hardware: '#10b981',
        healthcare: '#ec4899',
        official: '#0ea5e9',
        community: '#f59e0b'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
