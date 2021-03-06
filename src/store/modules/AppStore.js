export default {
  state: {
    appName:"System-UI", //应用名称
    themeColor: "545c64",//主题颜色
    oldThemeColor: '#545c64',//上一次主题颜色
    collapse: false ,//导航栏收缩状态
    menuRouteLoaded:false //菜单和路由是否已经加载
  },
  getters: {
    collapse(state) {
      return collapse;
    }
  },
  mutations: {
    collapse(state) {// 改变收缩状态
        state.collapse = !state.collapse;
    },
    themeColor(state,themeColor) {
      state.themeColor = themeColor;
    },
    oldThemeColor(state,oldThemeColor) {
      state.oldThemeColor = oldThemeColor;
    },
    menuRouteLoaded(state,menuRouteLoaded) {
      state.menuRouteLoaded = menuRouteLoaded
    }
  },
  actions: {
     //改变主题颜色
     onThemeChange({commit,state},data){
       commit('themeColor',data.themeColor)
       commit('oldThemeColor',data.oldThemeColor)
     }
  }
}
