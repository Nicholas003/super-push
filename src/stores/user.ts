import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
    
    const userInfo =  ref({});

    const token = ref('');

    const setUser = (info)=>{
        userInfo.value = info
    }

    const setToken = (t)=>{
        token.value = t
    }

    return { userInfo, token, setUser, setToken }
  
})
