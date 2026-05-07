/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#131313",
        surface: "#131313",
        'surface-dim': "#131313",
        'surface-container-lowest': "#0e0e0e",
        'surface-container-low': "#1b1b1b",
        'surface-container': "#1f1f1f",
        'surface-container-high': "#2a2a2a",
        'surface-container-highest': "#353535",
        'surface-variant': "#353535",
        primary: {
          DEFAULT: "#06B6D4",
          light: "#4cd7f6",
        },
        secondary: {
          DEFAULT: "#A855F7",
          light: "#ddb7ff",
        },
        tertiary: {
          DEFAULT: "#EC4899",
          light: "#ffb0cd",
        },
        'on-surface': "#e2e2e2",
        'on-surface-variant': "#bcc9cd",
        'on-primary': "#003640",
        onPrimaryContainer: "#00424f",
        primaryContainer: "#06b6d4",
        'on-secondary': "#490080",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
