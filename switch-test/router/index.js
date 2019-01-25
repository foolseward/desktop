import Vue from 'vue'
import Router from 'vue-router'

import routes from './routers'
import store from '@/store'
//import iView from 'iview'
import { getToken, canTurnTo } from '@/libs/util'

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'star'
const REGISTE_PAGE_NAME = 'registe'
const FORGET_PAGE_NAME = 'forget'
const SHARE_PAGE_NAME = 'detail'
const PAGE_404= 'error_404'

/**
 * [查看to.name是否是需要登录才能进入的页面]
 * @param  {[String]} toName [to.name]
 * @return {[Boolean]}        [description]
 */
var notNeedLogin= function(toName){
  return toName=== LOGIN_PAGE_NAME || toName=== REGISTE_PAGE_NAME || toName=== FORGET_PAGE_NAME || toName=== SHARE_PAGE_NAME || toName=== PAGE_404 
}

// router.beforeEach((to, from, next) => {
//   //iView.LoadingBar.start()
//   const token = getToken()
//   console.log(token, to.name)
//   if (!token && !notNeedLogin(to.name)) {
//     // 未登录且要跳转的页面不是登录页
//     console.warn('router interceptor: 未登录且要跳转的页面不是登录页');
//     next({
//       name: LOGIN_PAGE_NAME // 跳转到登录页
//     })
//   } else if (!token && notNeedLogin(to.name)) {
//     console.warn('router interceptor: 未登陆且要跳转的页面是登录页');
//     // 未登陆且要跳转的页面是登录页
//     next() // 跳转
//   } else if (token && to.name === LOGIN_PAGE_NAME) {
//     console.warn('router interceptor: 已登录且要跳转的页面是登录页');
//     next({
//       name: 'home' // 跳转到home页
//     })
//   } else {
//     // store.dispatch('getUserInfo').then(user => {
//     //   // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
//     //   if (canTurnTo(to.name, user.access, routes)) next() // 有权限，可访问
//     //   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
//     // })
//     // next({
//     //   name: LOGIN_PAGE_NAME // 跳转到登录页
//     // });
//     next();
//   }
// })

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router