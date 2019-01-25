<template>
  <div class="totalcontainer"> 
    <div class="laya-please layer-1"></div>
    <div class="laya-please layer-2"></div>
    
    <div class="container1">
      <div class="laya-please layer-3"></div>
      <div class="laya-please layer-4"></div>
      <div class="laya-please layer-5"></div>
      <div class="laya-please layer-6"></div>
    </div>
    
    <div class="container2">
      <div class="laya-please layer-7"></div>
      <div class="laya-please layer-8"></div>
    </div>

    <div class="interceptor">
      <div class="login-ground" style=""
      @keyup.enter="loginFunc"
      >
        <Input v-model="username" prefix="ios-contact" placeholder="用户名" style="width: auto;"></Input>
        <Input v-model="password" type="password" prefix="ios-eye" placeholder="密码" style="width: auto;margin-top:10px;"></Input>
        <i-button type="dashed" style="margin-top:10px;background-color:transparent;color:#fff;"
        @click="loginFunc"
        >登录</i-button>
      </div>
    </div>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法
import { alertMixin } from '@/mixin'
//子组件
import { Input, Icon, Button } from 'iview'
export default {
  name: 'login-page',
  components: {
    Input, 'i-button': Button,
  },
  mixins: [ alertMixin ],
  props: [],
  mounted(){
    const elems = document.querySelectorAll('.laya-please');
    const layer2 = document.querySelector('.layer-2');
    const layer3 = document.querySelector('.layer-3');
    const layer4 = document.querySelector('.layer-4');
    const layer5 = document.querySelector('.layer-5');
    const layer6 = document.querySelector('.layer-6');
    const layer7 = document.querySelector('.layer-7');
    const layer8 = document.querySelector('.layer-8');

    setTimeout(function () {
        elems.forEach(function (elem, index) {
            elem.style.animation = "none";
        });
    }, 1500);

    let mousemoveFunc= function(e){
      if (!e.currentTarget.dataset.triggered) {
          elems.forEach(function (elem, index) {
              if (elem.getAttribute('style')) {
                  elem.style.transition = "all .5s ease-in-out";
                  elem.style.transform = "none";
              }
          });
      }
      e.currentTarget.dataset.triggered = true;
      
      let width = window.innerWidth / 2;
      let mouseMoved2 = ((width - e.pageX) / 70);
      let mouseMoved3 = ((width - e.pageX) / 55);
      let mouseMoved4 = ((width - e.pageX) / 40);
      let mouseMoved5 = ((width - e.pageX) / 25);
      let mouseMoved6 = ((width - e.pageX) / 10);
      let mouseMoved7 = ((width - e.pageX) / 5);

      layer3.style.transform = "translateX(" + mouseMoved2 + "px)";
      layer4.style.transform = "translateX(" + mouseMoved3 + "px)";
      layer5.style.transform = "translateX(" + mouseMoved4 + "px)";
      layer6.style.transform = "translateX(" + mouseMoved5 + "px)";
      layer7.style.transform = "translateX(" + mouseMoved6 + "px)";
      layer8.style.transform = "translateX(" + mouseMoved7 + "px)";
    };
    this.mousemoveFunc= mousemoveFunc;

    let mouseleaveFunc= function(){
      elems.forEach(function (elem) {
          elem.style.transition = "all .5s ease-in-out";
          elem.style.transform = "none";
      });
    }
    this.mouseleaveFunc= mouseleaveFunc;

    let mouseenterFunc= function(){
      elems.forEach(function (elem, index) {
          setTimeout(function () {
              elem.style.transition = "none";
          }, 500);
      });
    }
    this.mouseenterFunc= mouseenterFunc;

    this.$el.addEventListener('mouseenter', this.mouseenterFunc);

    this.$el.addEventListener('mousemove', this.mousemoveFunc);

    this.$el.addEventListener('mouseleave', this.mouseleaveFunc);
  },
  beforeDestroy(){
    this.$el.removeEventListener('mousemove', this.mousemoveFunc);
    this.$el.removeEventListener('mouseleave', this.mouseleaveFunc);
    this.$el.removeEventListener('mouseenter', this.mouseenterFunc);
  },
  data: function(){
  	return {
      username: null,
      password: null,
  	}
  },
  methods: {
    loginFunc(){
      if(this.username && this.password){
        this.$emit('login-func');
      }
    }
  },
}	
</script>

<style scoped>
.totalcontainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.container1 {
  transform: scaleX(1.11);
}
.container2 {
  transform: scaleX(1.25);
}
.layer-1 {
  height: 100vh;
  width: 100%;
  background-color: #fed8c1;
}

.layer-2 {
  background: url("./source/lay2.svg")
    no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.layer-3 {
  background: url("./source/lay3.svg")
    no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
}
.layer-4 {
  background: url("./source/lay4.svg")
    no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
}
.layer-5 {
  background: url("./source/lay5.svg")
    no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.55s
    both;
}
.layer-6 {
  background: url("./source/lay6.svg")
    no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.75s
    both;
}
.layer-7 {
  background: url("./source/lay7.svg")
    no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.85s
    both;
}
.layer-8 {
  background: url("./source/lay8.svg")
    no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.9s both;
}
.laya-please {
  position: absolute;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0px;
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

.login-ground{
  display:flex;
  flex-direction: column;
  padding:30px 50px;
  border-radius:4px;
  transition: all 0.3s ease-in-out;
}

.login-ground:hover{
  box-shadow:5px 5px 5px #bd6a47;
  background-color:rgba(0,0,0,0.5);
}
</style> 