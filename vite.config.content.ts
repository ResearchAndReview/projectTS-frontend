import { resolve } from 'path';
import { defineConfig } from 'vite';
import { commonConfig } from './vite.common';

export default defineConfig({
  ...commonConfig,
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/pages/content/index.tsx'),
      },
      output: {
        entryFileNames: '[name]/index.js',
      },
    },
  },
});
