import { login } from '@/api/user'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('@/views/home.vue')
    },
    
  ]
})


router.beforeEach((to, from, next) => {

  // console.log(to.query.code)
  if(to.query.code){
    login({code:to.query.code as string}).then(res=>{
      console.log(res)
      const {setToken,setUser} = useUserStore()
      setUser(res.data.userInfo)
      setToken(res.data.token)
      next({query:{}})
    })
  }else{
    next()
  }
  // next()

  // if(to.query)

  
})

export default router
