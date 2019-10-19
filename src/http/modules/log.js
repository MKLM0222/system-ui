import axios from "../axios"

export const findPage = (data) =>{
   return axios({
       url:'/log/findPage',
       method:'post',
       data
   })
}
