import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base debe coincidir con el nombre del repositorio en GitHub Pages
// (https://<usuario>.github.io/S7-React-Componentes-Funcionales/)
export default defineConfig({
  base: '/S7-React-Componentes-Funcionales/',
  plugins: [react()],
})
