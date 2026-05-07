/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1C2025",
        surface: "#1C2025",
        'surface-dim': "#171C20",
        'surface-container-lowest': "#141820",
        'surface-container-low': "#1E2530",
        'surface-container': "#222A35",
        'surface-container-high': "#2A3340",
        'surface-container-highest': "#333F4E",
        'surface-variant': "#2A3340",
        primary: {
          DEFAULT: "#22D4EF",
          light: "#7AE8F8",
        },
        secondary: {
          DEFAULT: "#A855F7",
          light: "#ddb7ff",
        },
        tertiary: {
          DEFAULT: "#EC4899",
          light: "#ffb0cd",
        },
        'on-surface': "#E4EEF2",
        'on-surface-variant': "#A8BFC8",
        'on-primary': "#002E38",
        onPrimaryContainer: "#003844",
        primaryContainer: "#22D4EF",
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
