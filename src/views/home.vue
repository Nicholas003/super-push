<template>
    <div class="">

        {{ userInfo }}
        <div class="login" @click="login">
            登录
        </div>

        <div class="login" @click="pushPermission">
            获取通知权限
        </div>

        <div @click="showP">
            显示弹出
        </div>

        <!-- <iframe src="https://blog.csdn.net/chinagaobo/article/details/129689352" frameborder="0"></iframe> -->

    </div>
</template>

<script setup lang="ts">
import { addPushInfo } from '@/api/user';
import { useUserStore } from '@/stores/user';
import { requestNotificationPermission, subscribeToPushNotifications } from '@/utils'

const { userInfo } = useUserStore()

const showP = () => {
    window.deferredPrompt.prompt()
}

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt')
    // e.preventDefault();
    window.deferredPrompt = e;
    console.log(e)
    // e.prompt()
    e.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
            console.log('addDesktop-pwa用户安装了PWA——可打印---不显示按钮')
            pwaIconShow.value = false
        } else {
            console.log('用户拒绝安装PWA--可打印')
        }
        // window.deferredPrompt = null
    })
})

const login = () => {


    window.location.href = `https://github.com/login/oauth/authorize?client_id=&redirect_uri=${window.location.origin}`


}

const pushPermission = () => {

    requestNotificationPermission().then(() => {
        return subscribeToPushNotifications()
    }).then(res => {
        console.log('3', res)
        addPushInfo(res)
    })

}

</script>

<style scoped></style>