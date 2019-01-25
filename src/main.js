import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '@/index.css'

import { throttle } from '@/libs/tools'

Vue.config.productionTip = false

// let WS_PROTO= function(conn){
//   this.conn= conn;
  
// }

// let WS_INIT= (url) => {
//   window._WS= new WebSocket( url? url: "ws://118.25.222.233:22340");

//   _WS.initWsHeader= (val) => {
//     console.log(val);
//     store.commit('wsKey', val);
//   };

//   _WS.onmessage = (evt) => { 
//     let params= JSON.parse(evt.data);
//     _WS[params.func](params.val);
//   };

//   _WS.onerror= () => {
//     WS_INIT("ws://127.0.0.1:22340");
//   }
// }
// WS_INIT();
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "http://at.alicdn.com/t/font_906783_qg5k5a3zfe.css";
document.getElementsByTagName("head")[0].appendChild(link);
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
