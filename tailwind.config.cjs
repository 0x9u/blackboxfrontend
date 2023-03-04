/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    colors: {
      'shade-1' : '#302F2F',
      'shade-2' : '#3E3C3B',
      'shade-3' : '#454545',
      'shade-4' : '#4B4C4C',
      'shade-5' : '#3AB5DB',
      'white' : '#FFFFFF',
      'black' : '#000000',
    },
    fontFamily : {
      sans : ['IBM Plex Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
