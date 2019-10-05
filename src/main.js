// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui"
//import 'element-ui/lib/theme-chalk/index.css'
import '@/theme/theme-4b5f6e/index.css'
import api from './http/index'
import i18n from './i18n'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI);//引入element
Vue.use(api);//引入axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
