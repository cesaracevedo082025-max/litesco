/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './views/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          950: '#0F172A',
          900: '#1E3A8A',
          800: '#1E40AF',
          700: '#3B82F6',
          100: '#DBEAFE',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'pan-zoom-slow': 'pan-zoom 30s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pan-zoom': {
          '0%': { transform: 'scale(1) translate(0%, 0%)' },
          '100%': { transform: 'scale(1.25) translate(-3%, -2%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}
