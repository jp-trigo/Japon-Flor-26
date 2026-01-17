/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ea2a33",
        "primary-soft": "#fff0f2",
        "primary-light": "#fce8e9",
        "background-light": "#f8f6f6",
        "background-dark": "#181111",
        "surface-light": "#ffffff",
        "surface-dark": "#261a1a",
        "text-main": "#1f1515",
        "text-sub": "#886364",
        "text-muted": "#886364",
        "sakura-pink": "#ffeef0",
        "sakura-dark": "#ffb7c5",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "1rem", 
        "lg": "1.5rem", 
        "xl": "2rem", 
        "2xl": "2.5rem", 
        "full": "9999px"
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(234, 42, 51, 0.08)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'glow': '0 0 20px rgba(234, 42, 51, 0.15)',
      }
    },
  },
  plugins: [],
}
