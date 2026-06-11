/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        sans: ['Cairo', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: {
            50: '#f0efff', 100: '#e4e2ff', 200: '#ccc8fe', 300: '#a9a3fd',
            400: '#8075fa', 500: '#5a4af5', 600: '#4630eb', 700: '#3820d0',
            800: '#2f1ea9', 900: '#281d84', 950: '#180f57',
          },
          teal: {
            50: '#edfffe', 100: '#c2fffe', 200: '#85fffd', 300: '#39f8fc',
            400: '#00e1f0', 500: '#00bcd4', 600: '#0094b0', 700: '#00748e',
            800: '#075c72', 900: '#0b4c60', 950: '#003040',
          },
          green: { 500: '#22c55e', 600: '#16a34a' },
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2d1b9e 0%, #1a56db 50%, #0694a2 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, #3730a3 0%, #0ea5e9 60%, #06b6d4 100%)',
        'hero-radial':
          'radial-gradient(ellipse at top left, rgba(67,56,202,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(6,182,212,0.12) 0%, transparent 60%)',
      },
      boxShadow: {
        brand: '0 4px 32px rgba(67, 56, 202, 0.18)',
        'brand-hover': '0 8px 48px rgba(67, 56, 202, 0.28)',
        card: '0 2px 20px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 40px rgba(67,56,202,0.13)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
