import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      cache: false,
      include: [
        'src/**/*.{ts,tsx,js,jsx}',
      ],
      exclude: [
        'node_modules',
        'dist',
      ],
    }),
  ],
});
