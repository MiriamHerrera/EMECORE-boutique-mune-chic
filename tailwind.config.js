/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fde3ec',
          dark: '#fac5d8',
          50: '#fff5f8',
          100: '#fde3ec',
          200: '#fac5d8',
          300: '#f7a7c4',
          400: '#f489b0',
          500: '#f16b9c',
          600: '#c15680',
          700: '#914064',
          800: '#612b48',
          900: '#30152c'
        },
        secondary: {
          DEFAULT: '#b57c21',
          dark: '#8c5f19',
          50: '#fdf8f0',
          100: '#f9e8cc',
          200: '#f2d199',
          300: '#ebba66',
          400: '#e4a333',
          500: '#b57c21',
          600: '#8c5f19',
          700: '#634311',
          800: '#3a2709',
          900: '#110b02'
        },
        dark: '#000'
      },
      fontFamily: {
        higuen: ['Higuen Elegant Serif', 'serif']
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      maxWidth: {
        '7xl': '1200px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ]
}; 