import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import process from 'node:process'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd())
  const basePath = env.VITE_BASE_PATH||'/'
  return {
    base:basePath,
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
              src: basePath+'/icon.png',
              sizes: '192x192',
              type: 'image/png'
            }
          ]
        },
        registerType:'prompt',
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
