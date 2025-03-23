<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { registerSW } from 'virtual:pwa-register'
import { bus } from './utils'
import { useDark } from '@vueuse/core'
import { KeepAlive, Transition } from 'vue'

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("onNeedRefresh")
    alert("应用更新啦！")
    updateSW()
  },
  onOfflineReady() {
    // alert("onOfflineReady")
  },
})

navigator?.serviceWorker?.addEventListener('message', (event) => {
  console.log(event)

  bus.emit('push', event.data)
})

const isDark = useDark({
  onChanged(dark: boolean) {
    const color = dark ? '#303030' : '#ffffff'
    document.querySelector("meta[name='theme-color']")?.setAttribute("content", color)
  },
})


</script>

<template>
  <div class="fixed top-0 left-0 bottom-0 right-0 sm:p-[30px]">
    <div class="w-full h-full sm:rounded-xl overflow-hidden shadow-2xl">
      <RouterView translate="yes" #default="{ Component }">
        <Transition name="fade" mode="out-in">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
