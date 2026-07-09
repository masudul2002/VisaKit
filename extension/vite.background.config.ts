import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false, // Keep UI and Content scripts built in previous steps
    lib: {
      entry: resolve(__dirname, 'src/background/background.ts'),
      name: 'VisaKitBackground',
      formats: ['iife'],
      fileName: () => 'src/background/background.js',
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
});
