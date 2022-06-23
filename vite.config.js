import { defineConfig } from 'vite'

export default defineConfig({
  base: "/space-shooter/",
  build: {
    chunkSizeWarningLimit: 1500
  } 
})