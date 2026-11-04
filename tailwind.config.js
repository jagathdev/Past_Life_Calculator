/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#17152F',
        'deep-purple': '#29204D',
        'gold': '#6868f9',
        'light-purple': '#A99BE8',
        'off-white': '#FAF8F2',
        'brand': '#6868f9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
        lora: ['Lora', 'Georgia', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulseSlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', textShadow: '0 0 8px rgba(214,168,79,0.4)' },
          '50%': { opacity: '.8', textShadow: '0 0 16px rgba(214,168,79,0.8)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.6' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}
