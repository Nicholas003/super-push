import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import process from 'node:process'
import { createHtmlPlugin } from 'vite-plugin-html'
import UnoCSS from 'unocss/vite'
import { appleDeviceSpecsForLaunchImages } from 'pwa-asset-generator'
import { cloudflare } from "@cloudflare/vite-plugin"
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const basePath = '/' + (env.VITE_BASE_PATH || '')
  return {
    base: basePath,
    server: {
      port: 3889,

    },
    plugins: [
      vue(),
      vueJsx(),

      // vueDevTools(),
      UnoCSS(),
      VitePWA({
        manifest: {
          name: 'SuperPush',
          short_name: 'SuperPush',
          description: 'SuperPush',
          theme_color: '#ffffff',
          display: 'fullscreen',
          background_color: "#303030",
          orientation: 'portrait',
          icons: [
            {
              "src": basePath + "start-img/manifest-icon-192.maskable.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": basePath + "start-img/manifest-icon-192.maskable.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": basePath + "start-img/manifest-icon-512.maskable.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": basePath + "start-img/manifest-icon-512.maskable.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "maskable"
            }
          ]
        },
        injectRegister: 'script',
        workbox: {
          importScripts: ['./service-worker.js']
        },
        devOptions: {
          enabled: true
          /* other options */
        }
      }),
      cloudflare(),
      createHtmlPlugin({
        inject: {
          data: {
            appleDeviceSpecsForLaunchImages
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
