import Vue from 'vue'
import Router from 'vue-router'

import routes from './routers'
import store from '@/store'
// //import iView from 'iview'
// import { getToken, canTurnTo } from '@/libs/util'

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log(to)
  next();
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router