import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'concentrate-guatemala-outlet-assessed.trycloudflare.com',
      'web.themotohub.shop',
      'cloud.appwrite.io', // Add Appwrite cloud endpoint
      'localhost'
    ],
    cors: {
      origin: ['https://cloud.appwrite.io'], // Allow Appwrite cloud endpoint
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
    }
  }
});
