/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
/*
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VITE_BASE_NAME || '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['date-fns'],
  },
});
*/
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_NAME || '/',
    plugins: [react()],
    optimizeDeps: {
      exclude: ['date-fns'],
    },
  };
});
