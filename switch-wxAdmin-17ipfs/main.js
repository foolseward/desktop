// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
//import config from '@/config'
//import importDirective from '@/directive'
import 'iview/dist/styles/iview.css'
import '@/index.css'
//import './index.less'
//import '@/assets/icons/iconfont.css'
import VueLazyLoad from 'vue-lazyload'
import axios from '@/libs/api.form'

window.Vue= Vue;

Vue.use(VueLazyLoad,{
  throttleWait: 100,
})

Vue.config.productionTip = false

let WS_INIT= (url) => {
  window._WS= new WebSocket( url? url: "ws://118.25.222.233:22340");

  _WS.initWsHeader= (val) => {
    console.log(val);
    store.commit('wsKey', val);
  };

  _WS.onmessage = (evt) => { 
    let params= JSON.parse(evt.data);
    _WS[params.func](params.val);
  };

  _WS.onerror= () => {
    WS_INIT("ws://127.0.0.1:22340");
  }
}
WS_INIT();

document.body.innerHTML= `<div id="app"></div>`;

Date.prototype.format = function(fmt) {
  var o = {
      "M+" : this.getMonth() + 1,
      "d+" : this.getDate(),
      "h+" : this.getHours(),
      "m+" : this.getMinutes(),
      "s+" : this.getSeconds(),
      "q+" : Math.floor((this.getMonth() + 3) / 3),
      "S" : this.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

axios.get({
  url: '/init'
}).then( res => {
  if(res.state){
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      created: function(){
        //初始化页面最小高度
        this.$store.commit('setMinHeight', window.innerHeight);
        this.$store.commit('init', res.data);
        alert('当前使用的是17ipfs后台')
      }
    })
  }
});
