<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { registerSW } from 'virtual:pwa-register'


const updateSW = registerSW({
  onNeedRefresh() {

  },
  onOfflineReady() {

  },
})


const c = () => {
  updateSW()
}

const login = () => {

  window.location.href = `https://github.com/login/oauth/authorize?client_id=Ov23liWi7ycK7kssllDs&redirect_uri=${window.location.href}`

}



const setTopBar = () => {
  document.querySelector("meta[name=theme-color]")?.setAttribute('content', "rgb(12,34,200)")
}

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
