/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    colors: {
      'shade-1' : '#242424',
      'shade-2' : '#302F2F',
      'shade-3' : '#3E3C3B',
      'shade-4' : '#454545',
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
