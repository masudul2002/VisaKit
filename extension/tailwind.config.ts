import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './options.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
