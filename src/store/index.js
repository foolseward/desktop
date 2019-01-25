import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import luckies from './module/luckies'

Vue.use(Vuex)

const store= new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    luckies
  }
});

export default store
