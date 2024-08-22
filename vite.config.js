import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: "https://gonzalo991.github.io/Digital-Mirage-Frontend/",
})
