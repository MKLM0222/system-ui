export default {
  state: {
    menuTree:[],//菜单树
    navTree:[],//导航树
  },
  getters: {

  },
  mutations: {
    setNavTree(state,navTree) {//设置导航菜单树
      state.navTree = navTree;
    }
  },
  actions: {

  }
}
