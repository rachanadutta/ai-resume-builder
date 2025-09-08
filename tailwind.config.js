/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.9 },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        fadeIn: 'fadeIn 1.2s ease-out forwards',
        pulseSlow: 'pulseSlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
