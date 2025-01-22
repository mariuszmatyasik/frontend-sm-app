import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    open: true,
    port: 3001,
  },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
})
