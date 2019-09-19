//请求接口汇总模块，聚合模块API
//将所有接口统一起来便于维护
//如果项目很大可以将url独立成文件，接口分成不同的模块

import axios from './axios'
//单独导出
export const login = () => {
  return axios({
      url:'/login',
      method:'get'
  })
}

export const getUser = () => {
  return axios({
      url:'/user',
      method:'get'
  })
}

export const getMenu = data => {
    return axios({
      url:'/menu',
      method:'post',
      data
    })
}

export default {
   login,
   getUser,
   getMenu
}
