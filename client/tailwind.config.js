/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#0d0e1a',
          secondary: '#13152b',
          surface: '#1a1d35',
          card: '#1e2140',
          input: '#13152b',
          deep: '#080912',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a78bfa',
          tertiary: '#8b8fad',
          muted: '#6b6f8a',
          inverse: '#d4d6f0',
          accent: '#c4b5fd',
        },
        border: {
          DEFAULT: '#2a2d4a',
          subtle: '#1f2238',
          accent: '#7c3aed',
        },
        accent: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          lighter: '#c4b5fd',
          cyan: '#06b6d4',
          pink: '#ec4899',
          orange: '#f97316',
          glow: 'rgba(124, 58, 237, 0.35)',
          'glow-cyan': 'rgba(6, 182, 212, 0.25)',
        },
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
      },
      borderRadius: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.5)',
        'lg': '0 8px 32px rgba(0, 0, 0, 0.7)',
        'xl': '0 20px 60px rgba(0, 0, 0, 0.8)',
        'glow': '0 0 20px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.15)',
        'glow-sm': '0 0 10px rgba(124, 58, 237, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      spacing: {
        'sidebar': '248px',
        'sidebar-collapsed': '72px',
        'header': '68px',
        'mobile-navbar': '60px',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.25s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.7), 0 0 60px rgba(124, 58, 237, 0.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
    },
  },
  plugins: [],
}
