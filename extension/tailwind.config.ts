import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './options.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': '48px',
        'hero': '40px',
        'h1': '32px',
        'h2': '28px',
        'h3': '24px',
        'h4': '20px',
        'body-lg': '18px',
        'body': '16px',
        'sm': '14px',
        'caption': '12px',
      },
    },
  },
  plugins: [],
};

export default config;
