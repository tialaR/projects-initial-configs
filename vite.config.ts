import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
//@ts-ignore
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    eslint({
      cache: false,
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: ['node_modules', 'dist'],
    }),
  ],
  resolve: {
    alias: {
      '#hooks': path.resolve(__dirname, 'src/hooks'),
      '#components': path.resolve(__dirname, 'src/components'),
      '#pages': path.resolve(__dirname, 'src/pages'),
      '#styles': path.resolve(__dirname, 'src/styles'),
      '#utils': path.resolve(__dirname, 'src/utils'),
      '#assets': path.resolve(__dirname, 'src/assets'),
      '#config': path.resolve(__dirname, 'src/config'),
      '#layouts': path.resolve(__dirname, 'src/layouts'),
      '#routes': path.resolve(__dirname, 'src/routes'),
      '#services': path.resolve(__dirname, 'src/services')
    },
  },
});