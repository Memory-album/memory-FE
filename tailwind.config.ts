import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        ripple: 'ripple 0.5s cubic-bezier(0.7, 0, 0.3, 1)',
        particles: 'particles-out 0.6s cubic-bezier(0.7, 0, 0.3, 1) forwards',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(5)' },
        },
        'particles-out': {
          '50%': { transform: 'translateY(0.8em) scale(1)' },
          '100%': { transform: 'translateY(1em) scale(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
