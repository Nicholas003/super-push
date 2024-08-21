import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      VitePWA({
        manifest: {
          name: 'Vue 3 + Vite',
          short_name: 'Vite + Vue 3',
          description: 'Vite + Vue 3 + Vue Router + TypeScript + Tailwind CSS',
          icons: [
            {
              src: '/icon.png',
              sizes: '192x192',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
