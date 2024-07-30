import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  // build: {
  //   assetsDir: 'assets', // Directory where assets will be placed in the production build
  // },
})


