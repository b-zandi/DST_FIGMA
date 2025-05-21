import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["304b049c-01c2-4dc1-994c-043468c3df29-00-1q3nvdgyy6r9.riker.replit.dev"]
  }
})