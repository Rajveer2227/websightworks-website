import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Disable production source maps to prevent exposing source code structure
    sourcemap: false,
    // Minification and optimization settings
    minify: 'esbuild',
    chunkSizeWarningLimit: 1500,
  },
  // Strip console.log and debugger statements from production bundle
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
});
