import { axios } from '@/utils/request'


const wxLogin=(data)=>axios.post('/login/wxLogin',data)
export{wxLogin}