<template>
    <div class=" w-full h-full flex flex-col justify-center  items-center">

        <div class="w-[300px] @dark:text-[#ffffffde] text-gray-900">
            <label class="block font-medium ">API请求的地址</label>
            <textarea :value="apiUrl" rows="3"
                class="block my-2 border-none outline-solid w-full rounded-md box-border @dark:bg-[#303030] @dark:text-[#ffffffde] px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-400" />
            <div v-for="(item, key) in urlParams" class="mb-2">
                <label class="block font-medium ">{{ key }}</label>
                <div class="mt-2">
                    <input type="text" v-model="urlParams[key]"
                        class="block border-none outline-solid w-full box-border rounded-md @dark:bg-[#303030] @dark:text-[#ffffffde] px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-400" />
                </div>
            </div>
            <div class="text-[15px] text-red-5">
                以上参数GET或POST均请求 POST 时需要在请求头中添加 Content-Type: application/json
            </div>
            <div class="flex justify-between mt-4">
                <button @click="$router.back()"
                    class="px-4 py-2 cursor-pointer text-sm bg-gray-4 text-white rounded-full shadow-sm outline-none border-none">返回</button>
                <button @click="copyUrl"
                    class="px-4 py-2 cursor-pointer  text-sm bg-gray-4 text-white rounded-full shadow-sm outline-none border-none">复制URL</button>
                <button @click="start"
                    class="px-4 py-2 cursor-pointer  text-sm bg-cyan-500 text-white rounded-full shadow-sm outline-none border-none">试一下</button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const query = useRoute().query;

const copyUrl = () => {
    navigator.clipboard.writeText(apiUrl.value)
    alert("已复制")
}

// title, body, data, icon, redirect_uri
const urlParams = ref({
    title: 'hello',
    body: 'world',
    data: 'hello-world',
    icon: 'https://wp-cdn.4ce.cn/v2/L5Hcdwr.png',
    redirect_uri: '',
})


const apiUrl = computed(() => {
    return `${window.location.origin}/api/push/${query.pushKey}?${new URLSearchParams(urlParams.value).toString()}`
})

const start = () => {
    // window.open(apiUrl.value)
    fetch(apiUrl.value, { method: "POST" }).then(res => {
        return res.json()
    }).then(res => {
        alert(JSON.stringify(res))
    })
}

</script>

<style scoped></style>