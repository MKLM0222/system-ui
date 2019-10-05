import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login"
import Home from "@/views/Home"
import NotFound from "@/views/404"
import Intro from "@/views/Intro"
import User from "@/views/SysMng/User"
import Menu from "@/views/SysMng/Menu"

Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children:[
        {path:"",component:Intro,name:"系统介绍"},
        {path:"//sys/user",component:User,name:"用户管理"},
        {path:"/menu",component:Menu,name:"菜单管理"}
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
  let user = sessionStorage.getItem('user');
  if(to.path=="/login") {
    //如果访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(user) {
      next({path:"/"})
    }else{
      next()
    }
  }else {
    //访问非登录界面，且用户会话信息不存在，表示未登录，则跳转到登录界面
    if(!user) {
      next({path:"/login"})
    }else{
      next()
    }
  }
})

export default router
