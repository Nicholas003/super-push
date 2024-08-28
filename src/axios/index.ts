import { useUserStore } from "@/stores/user";
import axios from "axios";
// import process from "node:process";


// console.log()

const instance = axios.create({
    baseURL:process.env.HTTP_URL
})

instance.interceptors.request.use((config)=>{

    config.headers.token = useUserStore().token

    return config

},(config)=>{

    return Promise.reject(config)

})

instance.interceptors.response.use((res)=>{

    return res.data

},(res)=>{

    return Promise.reject(res)

})

export default instance