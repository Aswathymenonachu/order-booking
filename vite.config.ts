import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,                // 👈 add this line
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'], // 👈 make sure this path is correct
  },
})
