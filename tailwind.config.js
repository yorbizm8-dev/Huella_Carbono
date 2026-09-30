/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px -20px rgba(16,185,129,0.35)',
        glow: '0 0 40px -6px rgba(16,185,129,0.65)',
        'glow-lg': '0 0 80px -10px rgba(16,185,129,0.7)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        ring: {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        ring: 'ring 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
