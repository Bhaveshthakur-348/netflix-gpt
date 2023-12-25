/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: ['group-hover'],
      transform: ['group-hover'],
    },
  },
  plugins: [],
}