import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      '*.ngrok-free.app',
      '0180-122-161-49-62.ngrok-free.app'
    ]
  }
})
