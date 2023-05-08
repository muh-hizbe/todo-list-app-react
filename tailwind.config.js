/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16abf8',
        secondary: '#111111',
        coby: '#E5E5E5',
        main: '#F4F4F4',
      },
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        overlayHide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -30%) scale(0.50)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentHide: {
          from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: 0, transform: 'translate(-50%, -30%) scale(0.50)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayHide: 'overlayHide 150ms cubic-bezier(1, 0.3, 1, 0.16)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentHide: 'contentHide 150ms cubic-bezier(1, 0.3, 1, 0.16)',
      },
    },
  },
  plugins: [],
}

