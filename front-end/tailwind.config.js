/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        orbitron: ['Orbitron', 'sans-serif'],
        ebgaramond: ['"EB Garamond"', 'serif'],
        lobster: ['"Lobster Two"', 'cursive'],
        museo: ['"MuseoModerno"', 'sans-serif'],
        jura: ['"Jura"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
