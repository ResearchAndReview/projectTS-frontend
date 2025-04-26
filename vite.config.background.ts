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
        background: resolve(__dirname, 'src/background/index.ts'),
      },
      output: {
        entryFileNames: '[name]/index.js',
      },
    },
  },
});
