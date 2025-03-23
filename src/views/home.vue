<template>
    <div class="w-full h-full flex opacity-100 ">
        <div
            class="flex w-full sm:w-1/2 h-full items-center justify-center flex-col @dark:bg-[#303030] sm:border-solid border-0 border-[#888] border-r text-[#000000de] @dark:text-[#ffffffde]">
            <div class="w-[300px] h-[300px] relative rounded-full">
                <img src="/logo.png" class="w-full h-full" alt="">
            </div>
            <div class="flex flex-col items-center transition-all"
                :class="{ '!opacity-0 pointer-events-none': loading }">
                <div class="mt-[20px] text-[14px]">
                    PUSHKEY: {{ baseInfo.pushKey }}
                </div>
                <div @click="pushPermission()"
                    :class="{ 'pointer-events-none': isLoading, 'bg-green-500': pushState === 'granted', 'bg-red-500': pushState === 'denied', 'bg-blue-500': pushState === 'default' }"
                    class="cursor-pointer w-[100px] h-[100px] flex items-center justify-center  rounded-full mt-[30px]  text-white shadow-xl">
                    {{ isLoading ? '加载中...' : text[pushState] }}
                </div>
                <div v-if="error" class="mt-[20px]">
                    <div>
                        获取通知权限出错
                    </div>
                    <div>
                        {{ error }}
                    </div>
                </div>
                <div class=" block sm:hidden mt-[20px] cursor-pointer outline-none" @click="handleOpen">
                    查看推送历史
                </div>
                <div class="mt-[20px]" @click="doc">
                    查看文档
                </div>
            </div>

        </div>
        <!-- translate-y-full -->
        <!-- :class="{ 'translate-y-0': false }" -->
        <div :class="{ '!translate-y-0': showHistory }"
            class="@dark:bg-[#303030] backdrop-blur-sm text-[#000000de] @dark:text-[#ffffffde] bg-[#ffffffde]  border-t sm:rounded-none sm:shadow-none rounded-tr-xl shadow-2xl  rounded-tl-xl z-20 sm:relative sm:translate-y-0 sm:h-full flex flex-col absolute bottom-0 w-full h-2/3  flex-1  translate-y-full  transition-all">
            <div
                class=" px-[20px] border-solid border-b border-0 border-[#888] h-[44px] flex justify-between items-center">
                <div class=" text-[18px] font-bold " @click="getHistoryList()">
                    推送历史
                </div>
                <div class="sm:hidden block cursor-pointer" @click="closeHistory">
                    关闭
                </div>
            </div>
            <div class=" flex-1 overflow-auto mt-[10px] mx-[20px] flex flex-col">
                <div class="border-b mb-[10px]" v-for="item in historyList">
                    {{ item }}
                </div>
                <div v-if="!historyList.length" class="flex m-auto">
                    暂无数据
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { bus, requestNotificationPermission, subscribeToPushNotifications, useSwitch } from '@/utils'
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import { useAsyncState, useFetch } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import Fingerprint2 from 'fingerprintjs2';
import { useRouter } from 'vue-router'

const router = useRouter()

const doc = () => {
    router.push('/doc')
}
// 

const [showHistory, openHistory, closeHistory] = useSwitch(false)

const handleOpen = () => {
    getHistoryList()
    openHistory()
}

const { state: baseInfo, isLoading: loading } = useAsyncState(() => {

    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 500)
    }).then(() => {
        return Fingerprint2.getPromise({ excludes: { userAgent: true, pixelRatio: true, screenResolution: true, availableScreenResolution: true, plugins: true, touchSupport: true, hasLiedBrowser: true, hasLiedOs: true } }).then(components => {
            console.log('Fingerprint2', components)
            const values = components.map(component => component.value); // 配置的值的数组
            const murmur = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
            console.log(murmur)
            return murmur
        })
    }).then(visitorId => {
        return fetch(
            `/api/env/publicKey?token=${visitorId}`
        )
            .then(res => res.json())
            .then(res => ({ ...res.data, token: visitorId }))
    })
}, { publicKey: '', pushKey: '', token: '', subscription: true })


localforage.setDriver([localforage.WEBSQL, localforage.INDEXEDDB])

const { state: historyList, execute: getHistoryList } = useAsyncState(() => {
    return localforage.getItem('pushList').then((list: any) => list || [])
}, [])

bus.on('push', (data) => {
    getHistoryList()
    alert('收到新的推送！')
})


const pushState = (() => {
    if ('Notification' in window) {
        return ref<NotificationPermission>(Notification.permission)
    }
    return ref<NotificationPermission>('denied')
})()

const text = computed<Record<NotificationPermission, string>>(() => {
    return {
        default: '开启推送',
        granted: '已开启',
        denied: '已拒绝'
    }
})

navigator?.permissions?.query({ name: 'notifications' })
    .then((permissionStatus) => {
        permissionStatus.onchange = () => {
            pushState.value = Notification.permission
        }
    })

const { execute: pushPermission, error, isLoading } = useAsyncState(() => {
    return subscribeToPushNotifications(baseInfo.value?.publicKey!).then(res => {
        pushState.value = Notification.permission
        return fetch(
            `/api/subscribe`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: `${baseInfo.value?.token}`,
                    subscription: res
                })
            }
        ).then(res => res.json())
    })
}, {}, { immediate: false })


</script>

<style scoped></style>