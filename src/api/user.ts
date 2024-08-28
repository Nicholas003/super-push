import http from '../axios/index'



export const login = (params:{code:string})=>http.get('/login',{params})

export const addPushInfo = (data:any)=>http.post('/addPushInfo',data)