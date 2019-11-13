<template>
  <div class="container">
     <div>
       <div>
         <p class="not-found-title"></p>
         <el-carousel :interval="3000" height="450px" class="carousel">
            <el-carousel-item class="carousel-item-intro">
              <h2>项目介绍</h2>
              <ul>
                <li>基于Vue Element Vuex axios的快速开发平台的前端部分</li>
                <li></li>
                <li></li>
              </ul>
            </el-carousel-item>
            <el-carousel-item class="carousel-item-func">
              <h2>功能介绍</h2>
              <ul>
                <li>登录注册:系统用户登录</li>
                <li>用户管理：新建用户，修改用户，删除用户，查询用户</li>
                <li>机构管理：新建机构，修改机构，删除机构，查询机构</li>
                <li>角色管理：新建角色，修改角色，删除角色，查询角色</li>
                <li>菜单管理：新建菜单，修改菜单，删除菜单，查询菜单</li>
                <li>系统日志：记录用户操作日志，查看系统执行日志记录</li>
                <li>数据监控：定制Druid信息，提供简洁有效的SQL监控</li>
                <li>主题切换：支持主题切换，自定主题颜色，一键换肤</li>
                <li>...</li>
              </ul>
            </el-carousel-item>
            <el-carousel-item class="carousel-item-env">
                <h2>开发环境</h2>
                <ul>
                  <li>IDE:VS Code</li>
                  <li>Webpack:webpack 3.6.x</li>
                  <li>Node:Node 10.16.x</li>
                  <li>NPM: 6.9.x</li>
                </ul>
                <h2>技术选型</h2>
                <ul>
                  <li>前端框架 Vue.js2.x</li>
                  <li>页面组件 Element 2.x</li>
                  <li>状态管理 Vuex 3.x</li>
                  <li>后台交互 axios 0.18.x</li>
                </ul>
            </el-carousel-item>
         </el-carousel>
       </div>
     </div>
  </div>
</template>

<script>
export default {
   name:"intro"
}
</script>

<style lang="scss">
   .carousel {
     padding-left:20px;
     padding-right:20px;
     margin-right:20px;
     h2{
       color:#475669;
       font-size:22px;
       opacity:1.75;
       line-height:100px;
       margin:0;
     }
     ul{
       color:#475669;
       font-size:15px;
       opacity:1.75;
       line-height:40px;
       margin:0;
       padding-left:0;
     }
   }
   .carousel-item-intro{
      background-color:#19aaaf73;
      h2{
        color:#fff;
        font-size:22px;
        opacity:1.75;
        line-height:80px;
        margin:0;
      }
      ul{
        color:#fff;
        font-size:15px;
        opacity:1.75;
        line-height:65px;
        margin:0;
        list-style:none;
        padding-left:0;
        li{
          text-align:center;
        }
      }
   }
   .carousel-item-func{
     background-color:#19aaaf73;
      h2{
        color:#fff;
        font-size:22px;
        opacity:1.75;
        line-height:60px;
        margin:0;
      }
      ul{
        color:#fff;
        font-size:15px;
        opacity:1.75;
        line-height:40px;
        margin:0;
        list-style:none;
        padding-left:0;
        li{
          text-align:center;
        }
      }
   }
   .carousel-item-env{
     background-color:#19aaaf73;
      h2{
        color:#fff;
        font-size:22px;
        opacity:1.75;
        line-height:80px;
        margin:0;
      }
      ul{
        color:#fff;
        font-size:15px;
        opacity:1.75;
        line-height:30px;
        margin:0;
        list-style:none;
      }
   }
</style>
