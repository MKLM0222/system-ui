import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/AppStore.js'
import menu from './modules/Menu.js'
import user from './modules/User.js'
import iframe from './modules/iframe'

const store = new vuex.Store({
   modules: {
     app: app,
     menu:menu,
     user:user,
     iframe:iframe
   }
})

export default store
