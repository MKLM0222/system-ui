import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login"
import Home from "@/views/Home"
import NotFound from "@/views/404"
import Intro from "@/views/Intro"
import User from "@/views/Sys/User"
import Menu from "@/views/Sys/Menu"
import Dept from '@/views/Sys/Dept'
import Druid from '@/views/Druid/Druid'
import api from '@/http/api'
import store from '@/store'
import { isURL } from '@/utils/validate'
import { getIFrameUrl } from '@/utils/iframe'

Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children:[
        {path:"",component:Intro,name:"系统介绍"}
        /*{path:"/sys/user",component:User,name:"用户管理"},
        {path:'/dept',component:Dept,name:'机构管理'},
        {path:"/menu",component:Menu,name:"菜单管理"}*/
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})



router.beforeEach((to,from,next) => {
  //登录界面登录成功之后，会把用户信息保存在会话
  //存在时间为会话生命周期，页面关闭就失效。
  let userName = sessionStorage.getItem('user');
  if(to.path=="/login") {
    //如果访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(userName) {
      next({path:"/"})
    }else{
      next()
    }
  }else {
    //访问非登录界面，且用户会话信息不存在，表示未登录，则跳转到登录界面
    if(!userName) {
      next({path:"/login"})
    }else{
      addDynamicMenuAndRoutes(userName,to,from)
      next()
    }
  }

  //加载动态菜单和路由
  function addDynamicMenuAndRoutes(userName,to,from) {
    //保存ifrmaeUrl到store,供IFrame组件读取展示
    store.commit('setIFrameUrl',to.path)
    if(store.state.app.menuRouteLoaded) {
      console.log('动态菜单和路由已经存在')
      return
    }
     api.menu.findNavTree({'userName':userName})
     .then((res) => {

      //添加动态路由
      let dynamicRoutes = addDynamicRoutes(res.data)
      router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
      router.addRoutes(router.options.routes);
      store.commit('setNavTree',res.data)//加载成功之后存入store页面菜单组件从store取出数据渲染菜单
      store.commit('menuRouteLoaded',true)//保存菜单树
    })
    .then(res => {
      api.user.findPermissions({'name':userName}).then(res => {
          //保存用户权限标识集合
          store.commit('setPerms',res.data)
      })
    })
   .catch(function(err){
      alert(err)
   })
  }

  //添加动态菜单路由
  function addDynamicRoutes(menuList = [],routes=[]) {
    var temp=[]
    for(var i=0;i<menuList.length;i++){
      if(menuList[i].children && menuList[i].children.length >= 1) {
        temp=temp.concat(menuList[i].children)
      }else if(menuList[i].url && /\S/.test(menuList[i].url)) {
        menuList[i].url = menuList[i].url.replace(/^\//,'')
        //创建路由配置
        var route = {
           path:menuList[i].url,
           component:null,
           name:menuList[i].name
        }
        //url以http[s]://开头，通过iframe展示
        let path = getIFrameUrl(menuList[i].url)
        if(path){
          route['path'] = path
          route['component'] = resolve => require([`@/views/Iframe/Iframe`],resolve)
        }else {
          try {
            //根据菜单URL动态加载vue组件，这里要求vue组件必须按照url路径存储
            //如url=”sys/user“，则组件路径应该是"@/views/sys/user.vue",否则组件加载不到
            let array = menuList[i].url.split("/")
            let url = array[0].substring(0,1).toUpperCase()+array[0].substring(1)+"/"+array[1].substring(0,1).toUpperCase()+array[1].substring(1)
            route['component']=resolve => require([`@/views/${url}`],resolve)
          } catch(e) {}
        }
        routes.push(route)
      }
    }
    if(temp.length >=1) {
      addDynamicRoutes(temp,routes)
    } else {
      console.log(routes)
    }
    return routes
 }
})

export default router
