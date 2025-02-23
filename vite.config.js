import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Required for Replit
    port: 3000, // Default Replit port
    strictPort: true, // Ensure it doesn't fall back to another port
    watch: {
      usePolling: true, // Helps with file changes in Replit
    },
    allowedHosts: ['.replit.dev'], // Allow Replit domains
  },
})
