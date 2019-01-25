<template>
  <div style="width:100%;">
    <div style="display:flex; background-color:#f5f5f5;">
      <left-slider></left-slider>
      <mainer></mainer>
    </div>
    <div v-if="loginStatus" class="interceptor login-page">
      <login-page @login-func="loginStatus=!loginStatus"></login-page>
    </div>
<!-- loading层 -->
    <div v-if="interceptorStatus" class="interceptor delay-show">
      <!-- <div class="interceptor-loading interceptor-roller">  -->
      <div class="interceptor-loading">
        <svg class="svg" loading :style="{'background-image': 'url('+ logo+')'}">
            <!-- <circle loading grey stroke="#fff" fill="transparent"></circle> -->
            <circle class="circle" loading blue stroke="#21A8B6" fill="transparent"></circle>
        </svg>
        <div class="loading-text" style="text-align:center;">loading</div>
        <!-- <div class="loading-icon" :style="{'background-image': 'url('+ logo+')'}"></div> -->
      </div>
    </div>
<!-- alert层 -->
    <div v-show="alertStatus.msg" class="interceptor" alerter @click="closeAlert()">
      <div :class="['alert-outer', alertStatus.type=== 'error'? 'alert-outer-wrong':'alert-outer-right']">
        <div class="alert-type-icon">
          <img :src="logo" alt="">
        </div>
        <div class="alert-msg-outer">
          <div v-if="alertStatus.html" v-html="alertStatus.html"></div>
          <div v-else class="alert-msg">
            {{ alertStatus.msg  }}
          </div>
        </div>
        <div class="alert-close">
          CLOSE.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import { alertMixin, sizeMixin } from '@/mixin'
import loginPage from '@/view/login-page/login-page.vue'
import leftSlider from '@/view/left-slider/left-slider.vue'
import mainer from '@/view/mainer/mainer.vue'
export default {
  components: {
    loginPage, leftSlider, mainer
  },
  mixins: [alertMixin, sizeMixin],
  name: 'App',
  data () {
    return {
      logo: logo,
      loginStatus: true,
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
  font-size:14px;
  z-index:1001;
}
.interceptor-loading{
  display: flex;
  flex-direction: column;
  position:relative;
  width:120px;
  padding:20px 0;
  color:#fff;
  transform: translateY(-50%);
  border-radius: 10px;
  background-color: rgba(0,0,0,0.6);
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
  color:#fff;
  background-color: rgba(51, 59, 70, 0.85);
  min-height: 100px;
  width: 420px;
  transform: translateY(-50%);
}
.alert-outer-right{
  border-left: 6px solid #848484;
}
.alert-outer-wrong{
  border-left: 6px solid #848484;
}
.alert-type-icon{
  position: absolute;
  padding: 6px;
  line-height: 0;
  border-radius: 50%;
/*  width: 64px;
  height: 64px;
  line-height: 64px;
  border-radius: 32px;*/
  transform: translateX(-46px) translateY(30%);
}
.alert-type-icon img{
  width: 74px;
  height: 74px;
  border-radius: 37px;
}
.alert-outer-right .alert-type-icon{
  background-color: #848484;
}
.alert-outer-wrong .alert-type-icon{
  background-color: #848484;
}
.alert-msg-outer{
  display: flex;
  justify-content: center;
  align-items: center;
  padding:12px 48px 60px 36px;
  min-height: 180px;
  width: 100%;
}
.alert-msg{
  text-align: justify;
  font-size: 16px;
  line-height: 1.5;
}
.alert-close{
  color:#848484;position:absolute;right:10px;bottom:-10px;height:60px;line-height: 60px;font-size: 18px;cursor: pointer;
}
.svg{
  width:120px;
  height:72px;
  background-repeat: no-repeat;
  background-size:60px 60px;
  background-position:center;
}
.circle{
  r:30px;
  cx:60px;
  cy:36px;
  stroke-width: 4px;
  stroke-dasharray: 188.5px;
  stroke-dashoffset: 188.5px; 
  animation:circle 2.5s infinite;
  transform-origin: center;
}
@keyframes circle{
  0%{
    transform: rotateZ(0);
    stroke-dashoffset: 188.5px;
    animation-timing-function:cubic-bezier(.5,0,.5,1);
  }
  50%{
    stroke-dashoffset: 0;
    transform: rotateZ(180deg);
    animation-timing-function:cubic-bezier(.5,0,.5,1);
  }
  100%{
    stroke-dashoffset: -188.5px;
    transform: rotateZ(360deg);
    animation-timing-function:cubic-bezier(.5,0,.5,1);
  }
}


</style>