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
  const basePath = '/' + (env.VITE_BASE_PATH||'')
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
          theme_color: '#ffffff',
          icons: [
            {
              "src": basePath+"start-img/manifest-icon-192.maskable.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": basePath+"start-img/manifest-icon-192.maskable.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": basePath+"start-img/manifest-icon-512.maskable.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": basePath+"start-img/manifest-icon-512.maskable.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "maskable"
            }
          ]
        },
        injectRegister:'script',
        workbox:{
          importScripts:['./service-worker.js']
        },
        // devOptions: {
        //   enabled: true
        //   /* other options */
        // }
      })
    ],
    define: {
      'process.env': {
          HTTP_URL:process.env.HTTP_URL||env.VITE_HTTP_URL
      },
  },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
