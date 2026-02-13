import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Use repo base only for production (GH Pages). Keep dev at root.
  base: mode === 'production' ? '/treasurer-reports/' : '/',
  plugins: [react()],
}))
