import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api/blogs': 'http://localhost:3003',
      '/api/users': 'http://localhost:3003',
      '/api/login': 'http://localhost:3003',
    },
  },
})
