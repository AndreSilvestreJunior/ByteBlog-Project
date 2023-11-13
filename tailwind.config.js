/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,js,ts,jsx,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          from: { transform: 'translateY(-120%)' },
          to: { transform: 'translateY(0)' },
        },
        slideOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(120%)' },
        },
        likeAnimation: {
          '0%': {
            opacity: 0,
            transform: 'scale(0)',
          },
          '15%': {
            opacity: 0.9,
            transform: 'scale(1.2)',
          },
          '30%': {
            transform: 'scale(0.95)',
          },
          '45%, 80%': {
            opacity: 0.9,
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        slideIn: 'slideIn 1.5s ease-out',
        slideOut: 'slideOut 1.5s ease-in',
        likeAnimation: 'likeAnimation 1.3s ease-in-out',
      },
    },
  },
  plugins: [],
}
