import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export const commonConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@back': resolve(__dirname, 'src/background'),
      '@content': resolve(__dirname, 'src/content'),
      '@popup': resolve(__dirname, 'src/popup'),
    },
  },
};
