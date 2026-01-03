import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'https://github.com/Udaniamasha/estate-agent-app',
  test: {
    globals: true,
    environment: 'happy-dom', 
    setupFiles: './src/setupTests.js',
    css: true,
  },
})