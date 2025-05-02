import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this is set to the correct base path
  build: {
    outDir: 'dist', // Ensure the build output directory is 'dist'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
  // server: {
  //   proxy: {
  //     '/api': 'http://lunarlink-api.hallowedvisions.com', // Assuming your API is hosted separately
  //   },
  // },
})
