// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
//import config from '@/config'
//import importDirective from '@/directive'
import 'iview/dist/styles/iview.css'
import { Message, Button } from 'iview'
import '@/index.css'
//import './index.less'
//import '@/assets/icons/iconfont.css'
import { throttle } from '@/libs/tools'

Vue.prototype.$Message= Message;
Vue.component('i-button', Button);
Vue.config.productionTip = false;
document.body.innerHTML= `<div id="app"></div>`;
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created: function(){
  	//初始化页面最小高度
  	this.$store.commit('setSize', {height: window.innerHeight, width: window.innerWidth});
  	window.addEventListener('resize', throttle(()=> {
  	  this.$store.commit('setSize', {height: window.innerHeight, width: window.innerWidth});
  	}, 200));
  },
  mounted(){
    //滚动事件会遍历滚动回调队列，组件共用一个滚动事件
    window.addEventListener('scroll', throttle(() => {
      let arr= this.$store.getters.scrollCbArr;
      for(let obj in arr){
        arr[obj].cb();
      }  
    }, 100));
  }
})