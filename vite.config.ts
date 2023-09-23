import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://douglassantos45.github.io/elo-group-challenge/',
  plugins: [react()],
});
