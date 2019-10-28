/*为了统一可以管理和集中控制数据模拟接口，我们对mock模块进行了封装，可以方便的
定制模拟接口的统一开关和个体开关。*/

import Mock from 'mockjs'
import * as login from './modules/login'
import * as user from './modules/user'
import * as menu from './modules/menu'
import * as dept from './modules/dept'
import * as dict from './modules/dict'
import * as log  from './modules/log'
import * as role from './modules/role'

//开启、关闭业务模块拦截，通过调用fnCreate方法[isOpen参数]设置，
//开启，关闭[业务模块中年某个请求]拦截，通过函数返回对象中的[isOpen属性设置]

let openMock = true

fnCreate(login,openMock)
fnCreate(user,openMock)
fnCreate(dept,openMock)
fnCreate(menu,openMock)
fnCreate(role,openMock)
fnCreate(dict,openMock)
fnCreate(log,openMock)

function fnCreate (mod,isOpen = true) {
  if(isOpen) {
    for(var key in mod) {
       ((res) => {
         if(res.isOpen !== false) {
          let baseUrl = 'http://localhost:8088/'
          let url = baseUrl + res.url
           Mock.mock(new RegExp(url),res.type,(opts) => {
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
