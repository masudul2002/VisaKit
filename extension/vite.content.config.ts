import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false, // Keep the UI files built by the main build step
    lib: {
      entry: resolve(__dirname, 'src/content/index.ts'),
      name: 'VisaKitContent',
      formats: ['iife'],
      fileName: () => 'src/content/index.js',
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
});
