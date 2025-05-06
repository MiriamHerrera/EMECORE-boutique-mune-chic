/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fde3ec',
          dark: '#fac5d8'
        },
        secondary: {
          DEFAULT: '#b57c21',
          dark: '#8c5f19'
        },
        dark: '#000'
      },
      fontFamily: {
        'higuen': ['Higuen Elegant Serif', 'serif']
      },
      maxWidth: {
        '7xl': '1200px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}; 