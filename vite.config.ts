import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/haru-gallery/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/\/node_modules\/recharts[/\\]/.test(id) || /\/node_modules\/d3[^-]/.test(id)) {
            return 'recharts';
          }
          if (/\/node_modules\/(react|react-dom|scheduler)[/\\]/.test(id)) {
            return 'react';
          }
        },
      },
    },
  },
})
