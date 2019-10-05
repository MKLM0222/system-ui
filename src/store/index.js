import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/AppStore.js'
import menu from './modules/Menu.js'

const store = new vuex.Store({
   modules: {
     app: app,
     menu:menu
   }
})

export default store
