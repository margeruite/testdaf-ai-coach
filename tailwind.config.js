/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Petrol & Türkis Theme
        'primary-petrol': '#006A6B',
        'primary-turquoise': '#40E0D0',
        'primary-teal': '#008B8B',
        
        // Accent Colors
        'accent-coral': '#FF6B6B',
        'accent-mint': '#98FB98',
        'accent-gold': '#FFD700',
        
        // Neutral Colors
        'gray-50': '#F8FEFE',
        'gray-100': '#E6F7F7',
        'gray-200': '#CCEDED',
        'gray-800': '#1A3A3A',
        'gray-900': '#0D2626',
        
        // Semantic aliases
        'petrol': '#006A6B',
        'turquoise': '#40E0D0',
        'coral': '#FF6B6B',
        'mint': '#98FB98',
        'gold': '#FFD700',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #006A6B 0%, #40E0D0 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #E0F7F7 0%, #B8F0F0 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}