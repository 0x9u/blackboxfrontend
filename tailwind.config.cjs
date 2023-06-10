/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    colors: {
      'shade-1': '#242424',
      'shade-2': '#302F2F',
      'shade-3': '#3E3C3B',
      'shade-4': '#454545',
      'shade-5': '#3AB5DB',
      'white': '#FFFFFF',
      'black': '#000000',
      'green': '#28a745',
      'gray': '#A9A9A9',
      'red': '#D22B2B',
    },
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif'],
    },
    extend: {
      animation: {
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
      },
      keyframes: {
        'shake': {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)'
          }
        }
      }
    },
  },
  plugins: [],
}
