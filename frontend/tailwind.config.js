/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(215, 100%, 97%)',
          100: 'hsl(215, 100%, 93%)',
          200: 'hsl(215, 100%, 86%)',
          300: 'hsl(215, 100%, 75%)',
          400: 'hsl(215, 95%, 60%)',
          500: 'hsl(215, 91%, 50%)',
          600: 'hsl(215, 87%, 45%)',
          700: 'hsl(215, 82%, 40%)',
          800: 'hsl(215, 77%, 35%)',
          900: 'hsl(215, 72%, 30%)',
        },
        secondary: {
          50: 'hsl(270, 100%, 98%)',
          100: 'hsl(270, 100%, 95%)',
          200: 'hsl(270, 100%, 90%)',
          300: 'hsl(270, 100%, 82%)',
          400: 'hsl(270, 95%, 72%)',
          500: 'hsl(270, 91%, 64%)',
          600: 'hsl(270, 87%, 56%)',
          700: 'hsl(270, 82%, 48%)',
          800: 'hsl(270, 77%, 40%)',
          900: 'hsl(270, 72%, 32%)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}
