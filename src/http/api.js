//请求接口汇总模块，聚合模块API
//将所有接口统一起来便于维护
//如果项目很大可以将url独立成文件，接口分成不同的模块

import * as login from './modules/login'
import * as user from './modules/user'
import * as menu from './modules/menu'
import * as dict from './modules/dict'
import * as dept from './modules/dept'
//单独导出

export default {
   login,
   user,
   menu,
   dict,
   dept
}
