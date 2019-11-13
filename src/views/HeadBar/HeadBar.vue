<template>
   <div class="container" :style="{'background':themeColor}" :class="$store.state.app.collapse?'menu-bar-collapse-width':'menu-bar-width'">
       <!--导航菜单隐藏显示切换-->
       <span class="hamburger-container">
         <Hamburger :onClick="onCollapse" :isActive="$store.state.app.collapse"></Hamburger>
       </span>
       <!--导航菜单-->
       <span class="nav-bar">
         <el-menu :default-active="activeIndex" class="el-menu-demo"
              :style="{'background-color':themeColor}" text-color="#fff"
             active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
            <el-menu-item index="1" @click="$router.push('/')"><i class="fa fa-home fa-lg"></i> {{$t("common.home")}}</el-menu-item>
            <el-menu-item index="2">{{$t("common.doc")}}</el-menu-item>
            <el-menu-item index="3">{{$t("common.msgCenter")}}</el-menu-item>
           </el-menu>
       </span>
       <span class="tool-bar">
         <!--主题切换-->
         <ThemePicker class="theme-picker" @onThemeChange="onThemeChange"></ThemePicker>
         <!--语言切换-->
         <langSelector class="lang-selector"></langSelector>
         <!--用户信息-->
         <el-dropdown class="user-info-dropdown" trigger="hover">
          <span class="el-dropdown-link">
            <img :src="this.userAvatar" alt=""/>
            {{userName}}
          </span>
          <el-dropdown-menu slot="dropdown">
             <el-dropdown-item>{{$t("common.myMsg")}}</el-dropdown-item>
             <el-dropdown-item>{{$t("common.config")}}</el-dropdown-item>
             <el-dropdown-item divided @click.native="logout">{{$t("common.logout")}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
       </span>
   </div>
</template>

<script>
import mock from "@/mock/index.js"
import ThemePicker from "@/components/ThemePicker"
import LangSelector from "@/components/LangSelector"
import Hamburger from '@/components/Hamburger'
import { mapState }from 'vuex'
export default {
  components: {
     ThemePicker,
     LangSelector,
     Hamburger
  },
  data() {
     return {
        isCollapse:false,
        userName:"luna",
        userAvatar:"http://tupian.qqw21.com/article/UploadPic/2019-8/20198816503664815.jpeg",
        activeIndex:"1"
    }
  },
  methods:{
     selectNavBar(key,keyPath) {
      console.log(key,keyPath)
    },
    //语言切换
    handleCommand:function(command){
        let lang = command === ""? "zh" : command
        this.$i18n.locale = lang
        document.getElementById("language").innerHTML=lang=="zh"?"中文":"English"
     },
    logout:function() {
      var _this = this;
      this.$confirm("确认退出吗？","提示",{
        type:"warning"
      })
      .then(()=>{
         sessionStorage.removeItem("user");
         this.$router.push("/login");
      })
      .catch(()=>{})
    },
    //折叠导航栏
    onCollapse:function() {
      this.$store.commit('collapse')
    },
    //切换主题
    onThemeChange:function(themeColor,oldThemeColor) {
      this.$store.dispatch('onThemeChange',{themeColor,oldThemeColor})
    }
  },
  computed:{
     ...mapState({
       themeColor:state => state.app.themeColor,
       collapse:state => state.app.collapse
     })
  },
  mounted() {
    this.sysName="System-UI";
    var user = sessionStorage.getItem("user");
    if(user) {
      this.userName = user;
      this.userAvatar=require("@/assets/logo.png")
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  left: 200px;
  right: 0px;
  height: 60px;
  line-height: 60px;
  .hamburger-container {
    width: 40px;
    float: left;
    cursor: pointer;
    border-color: rgba(111, 123, 131, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
    border-right-width: 1px;
    border-right-style: solid;
    color: white;
    background: #4b5f6e;
  }
  .nav-bar {
    margin-left: auto;
    float: left;
    .el-menu {
      background: #4b5f6e;
    }
  }
  .tool-bar {
    float: right;
    .theme-picker {
      padding-right: 10px;
    }
    .lang-selector {
      padding-right: 10px;
      font-size: 15px;
      color: #fff;
      cursor: pointer;
    }
    .user-info-dropdown {
      font-size: 20px;
      padding-right: 20px;
      color: #fff;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
}
 .menu-bar-width {
    left:200px;
  }
  .menu-bar-collapse-width {
    left: 65px;
  }
</style>
