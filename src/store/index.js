import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/AppStore.js'
import menu from './modules/Menu.js'
import user from './modules/User.js'

const store = new vuex.Store({
   modules: {
     app: app,
     menu:menu,
     user:user
   }
})

export default store
