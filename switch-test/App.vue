<template>
  <div id="app">
  	<keep-alive include="star">
  		<router-view/>
  	</keep-alive>
<!-- loading层 -->
    <div v-if="interceptorStatus" class="interceptor delay-show">
      <!-- <div class="interceptor-loading interceptor-roller">  -->
      <div class="interceptor-loading">
        <svg :style="{'background-image': 'url('+ logo+')'}">
            <circle grey stroke="#fff" fill="none"></circle>
            <circle blue fill="none" stroke="#21A8B6"></circle>
        </svg>
        <div>数据加载中</div>
        <!-- <div class="loading-icon" :style="{'background-image': 'url('+ logo+')'}"></div> -->
      </div>
    </div>
<!-- alert层 -->
    <div v-show="alertStatus.msg" class="interceptor" alerter @click="closeAlert()">
      <div :class="['alert-outer', alertStatus.type=== 'error'? 'alert-outer-wrong':'alert-outer-right']">
        <div class="alert-type-icon">
          <i v-show="alertStatus.type=== 'success'" class="iconfont icon-duihao1"></i>
          <i v-show="alertStatus.type=== 'error'" class="iconfont icon-point"></i>
        </div>
        <div class="alert-msg-outer">
          <div class="alert-msg">
            {{ alertStatus.msg  }}
          </div>
        </div>
        <div class="alert-close">
          / close
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs'
import logo from '@/assets/logo.png'
import { alertMixin } from '@/mixin'
export default {
  mixins:[alertMixin],
  name: 'App',
  data () {
    return {
      logo: logo,
    }
  },
  computed:{
    interceptorStatus: function(){
      return this.$store.getters.interceptorStatus;
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.interceptor{
  display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;width:100%;height:100%;
  font-size:28px;
  z-index:1001;
}
.interceptor-loading{
  display: flex;
  flex-direction: column;
  position:relative;
  width:240px;
  padding:20px 0;
  color:#fff;
  transform: translateY(-50%);
  border-radius: 10px;
  background-color: rgba(0,0,0,0.6);
}
.interceptor-ring{
  top:10%;
  width: 10px;
  height:10px;
  border-radius:50%;
  position: relative;
  /*box-shadow: -30px 20px 0 -5px #fff, 0 20px 0 0 #fff, 30px 20px 0 5px #fff;*/
  animation: load-effect 1s infinite linear;
}
@keyframes load-effect{
  0%{
    box-shadow: -30px 20px 0 -5px #fff, 0 20px 0 0 #fff, 30px 20px 0 5px #fff;
  }
  25%{
    box-shadow: -30px 20px 0 0 #fff, 0 20px 0 -5px #fff, 30px 20px 0 0 #fff;
  }
  50%{
    box-shadow: -30px 20px 0 5px #fff, 0 20px 0 0 #fff, 30px 20px 0 -5px #fff;
  }
  75%{
    box-shadow: -30px 20px 0 0 #fff, 0 20px 0 5px #fff, 30px 20px 0 0 #fff;
  }
  100%{
    box-shadow: -30px 20px 0 -5px #fff, 0 20px 0 0 #fff, 30px 20px 0 5px #fff;
  }
}
.interceptor-ring:before{
  width:200px;
  content: '加载中';
  color: #fff;
  position: absolute;
  transform: translateX(-50%) translateY(-100%);
}
.interceptor-roller{
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  animation: roller-effect 4s infinite linear;
}
@keyframes roller-effect{
  0%{
    transform: rotateZ(0deg);
  }
  8%,25%{
    transform: rotateZ(90deg);
  }
  33%,50%{
    transform: rotateZ(180deg);
  }
  58%,75%{
    transform: rotateZ(270deg);
  }
  83%,100%{
    transform: rotateZ(360deg);
  }
}
.delay-show{
  animation: delay-effect 4s forwards linear;
}
@keyframes delay-effect{
  0%,33%{
    filter:opacity(0);
  }
  34%,100%{
    filter:opacity(1);
  }
}
.alert-outer{
  background-color: #fff;
  min-height: 200px;
  width: 500px;
  transform: translateY(-50%);
  border-radius: 4px;
  box-shadow: 2px 2px 5px #e4e4e4;
  border: 1px solid #e0e0e0;
}
.alert-outer-right{
  border-left: 15px solid #68b185;
}
.alert-outer-wrong{
  border-left: 15px solid #cb6168;
}
.alert-type-icon{
  position: absolute;
  width: 64px;
  height: 64px;
  line-height: 64px;
  border-radius: 32px;
  transform: translateX(-40px) translateY(50%);
}
.alert-outer-right .alert-type-icon{
  background-color: #68b185;
}
.alert-outer-wrong .alert-type-icon{
  background-color: #cb6168;
}
.alert-type-icon .iconfont{
  color: #fff;
  font-size: 64px;
}
.alert-msg-outer{
  display: flex;
  justify-content: center;
  align-items: center;
  padding:12px 48px 48px 48px;
  min-height: 200px;
  width: 100%;
}
.alert-msg{
  text-align: justify;
  font-size: 32px;
  line-height: 1.5;
}
.alert-close{
  color:#a0a0a0;position:absolute;right:10px;bottom:0;height:48px;line-height: 48px;
}
.interceptor svg{
  width:240px;
  height:144px;
  background-repeat: no-repeat;
  background-size:120px 120px;
  background-position:center;
}
.interceptor circle{
  r:54px;
  cx:120px;
  cy:72px;
  stroke-width: 10px;
}
circle[blue]{
  r:54px;
  stroke-width: 12px;
  stroke-dasharray: 339px;
  stroke-dashoffset: 339px; 
  animation:circle 2.5s infinite;
  transform-origin: center;
}
@keyframes circle{
  0%{
    transform: rotateZ(0);
    stroke-dashoffset: 339px;
    animation-timing-function:ease-in-out;
  }
  50%{
    stroke-dashoffset: 0;
    transform: rotateZ(180deg);
    animation-timing-function:ease-in-out;
  }
  100%{
    stroke-dashoffset: -339px;
    transform: rotateZ(360deg);
    animation-timing-function:ease-in-out;
  }
/*  50%{
    stroke-dashoffset: 339px;
    animation-timing-function:ease-in;
  }*/
/*  51%,100%{
    stroke-dashoffset: 113px;
    animation-timing-function:ease-in;
  }*/
}
</style>