<template>
    <div class=" w-full h-full flex flex-col justify-center  items-center">
        <!-- <iframe class="w-full flex-1" src="https://blog.800800.top/article/ac2c9c1cf59f8be9" frameborder="0"></iframe>
        <div class=" h-[100px]">

        </div> -->
        <div class="">
            <div v-for="(item, key) in urlParams" class="mb-2">
                <label for="first-name" class="block font-medium text-gray-900">First name</label>
                <div class="mt-2">
                    <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                        class="block border-none outline-solid w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-400" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


// title, body, data, icon, redirect_uri
const urlParams = ref({
    title: '',
    body: '',
    data: '',
    icon: '',
    redirect_uri: '',
})


</script>

<style scoped></style>