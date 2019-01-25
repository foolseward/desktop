// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
//import iView from 'iview'
//import config from '@/config'
//import importDirective from '@/directive'
//import 'iview/dist/styles/iview.css'
import '@/index.css'
//import './index.less'
//import '@/assets/icons/iconfont.css'

Vue.config.productionTip = false
document.body.innerHTML= `<div id="app"></div>`;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created: function(){
  	//初始化页面最小高度
  	this.$store.commit('setMinHeight', window.innerHeight);
    //滚动事件会遍历滚动回调队列，组件共用一个滚动事件
    window.addEventListener('scroll', () => {
      let arr= this.$store.getters.scrollCbArr;
      for(let obj in arr){
        arr[obj].fn.call(arr[obj].vm);
      }  
    });
  }
})
