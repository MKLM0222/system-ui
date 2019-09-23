/*为了统一可以管理和集中控制数据模拟接口，我们对mock模块进行了封装，可以方便的
定制模拟接口的统一开关和个体开关。*/

import Mock from 'mockjs'
import * as login from './modules/login'
import * as user from './modules/user'
import * as menu from './modules/menu'

//开启、关闭业务模块拦截，通过调用fnCreate方法[isOpen参数]设置，
//开启，关闭[业务模块中年某个请求]拦截，通过函数返回对象中的[isOpen属性设置]

fnCreate(login,true)
fnCreate(user,true)
fnCreate(menu,true)

function fnCreate (mod,isOpen = true) {
  if(isOpen) {
    for(var key in mod) {
       ((res) => {
         if(res.isOpen !== false) {
           Mock.mock(new RegExp(res.url),res.type,(opts) => {
             opts['data'] = opts.body?JSON.parse(opts.body) : null
             delete opts.body
             console.log('\n')
             console.log('$cmock拦截，请求:','color:blue',opts)
             console.log('$cmock拦截，响应:','color:blue',res.data)
             return res.data
           })
         }
       })(mod[key]() || { })
    }
  }
}
