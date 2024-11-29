/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loading: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        loading: 'loading 7s linear forwards',
      },
      colors: {
        primary: "#3490dc",
        secondary: '#ffed4a',
        danger: '#e3342f',
      }

    },
  },
  plugins: [],
}