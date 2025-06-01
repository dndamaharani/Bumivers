import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [react()],
  base: './', // penting untuk path relatif saat build
  server: {
    open: true,
    port: 5173
  }
})