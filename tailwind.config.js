/** @type {import('tailwindcss').Config} */
const scrollbarHide = require('tailwind-scrollbar-hide');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [scrollbarHide],
  
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'rarity-legendary': '0 0 15px 5px rgba(251, 191, 36, 0.7)',
        'rarity-epic': '0 0 12px 4px rgba(236, 72, 153, 0.6)',
        'rarity-rare': '0 0 10px 3px rgba(139, 92, 246, 0.5)',
        'rarity-uncommon': '0 0 8px 2px rgba(59, 130, 246, 0.4)',
        'rarity-common': '0 0 5px 1px rgba(156, 163, 175, 0.3)',
      },
      backgroundImage: {
        'crate-gradient': 'linear-gradient(45deg, #1f2937, #111827)',
      },
      minWidth: {
        '16': '4rem',
        '24': '6rem',
      },
    },
  },
  plugins: [],
};