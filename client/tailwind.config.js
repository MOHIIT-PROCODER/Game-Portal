/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        heading: ['Nunito', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#040406',
          secondary: '#08090f',
          surface: '#0c0d14',
          card: '#0c0d14',
          input: '#040406',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a48eff',
          tertiary: '#bdbfce',
          muted: '#bdbfce',
          inverse: '#e5e6ee',
        },
        border: {
          DEFAULT: '#000000',
        },
        accent: {
          DEFAULT: '#a48eff',
          secondary: '#00d2fc',
          glow: 'rgba(164, 142, 255, 0.4)',
        },
        success: '#10b981',
        danger: '#ef4444',
      },
      borderRadius: {
        'xs': '10px',
        'sm': '14px',
        'md': '18px',
        'lg': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.5)',
        'lg': '0 8px 32px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 15px rgba(164, 142, 255, 0.4)',
      },
      spacing: {
        'sidebar': '240px',
        'sidebar-collapsed': '80px',
        'header': '70px',
        'mobile-navbar': '60px',
      }
    },
  },
  plugins: [],
}
