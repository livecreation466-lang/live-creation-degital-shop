/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07070c',
        ink2: '#0c0c14',
        gold: '#d4af37',
        gold2: '#f5d98a',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 40px -10px rgba(212,175,55,0.5)',
      },
    },
  },
  plugins: [],
};