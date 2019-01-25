import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import entity from './module/entity'
import videos from './module/videos'

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
    entity,
    videos
  }
});

export default store
