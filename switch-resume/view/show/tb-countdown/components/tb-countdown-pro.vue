<!-- 
转动部分采用双div贴合，4个div轮转的形式，不必来回赋值，赋值操作也发生在opacity为0的时候，不闪动
 -->
<template>
<div style="background-color:#fff;">
  <!-- <div :class="['pro-container', sign?'':'pro-suffix']" @click="test"> -->
   <div class="pro-container" @click="test"> 
    <div :class="ARR[0]">
      <div>{{ ARR[0].val>= 10? ARR[0].val:('0'+ ARR[0].val) }}</div>
    </div>
    <div :class="ARR[1]">
      <div>{{ ARR[1].val>= 10? ARR[1].val:('0'+ ARR[1].val) }}</div>
    </div>
    <div :class="ARR[2]">
      <div>{{ ARR[2].val>= 10? ARR[2].val:('0'+ ARR[2].val) }}</div>
    </div>
    <div :class="ARR[3]">
      <div>{{ ARR[3].val>= 10? ARR[3].val:('0'+ ARR[3].val) }}</div>
    </div>
  </div>
</div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法
import { debounce, throttle } from '@/libs/tools'
//子组件
export default {
  name: 'tb-countdown-pro',
  
  mixins: [],
  props: [
    'sign', //判断是否是秒，秒为驱动项，为整个组件提供定时器
    'val',
  ],
  mounted(){
    this.SYMBOL= this.stepLimit- this.val;
    if(this.sign=== 'sec') setInterval(this.test, 1000);
    if(this.sign!=='sec' && !this.throttle) this.debounce= debounce(this.test.bind(this), 2000, true);
  },
  data: function(){
  	return {
      SYMBOL: 0,
      ARR: [
        {
          'val': this.val,
          'count-base': true,
          'static-top': true,
          'action-top': false,
          'static-bottom': false,
          'action-bottom': false,
          'reverse': false,
        }, 
        {
          'val': this.val+ 1,
          'count-base': true,
          'static-top': false,
          'action-top': true,
          'static-bottom': false,
          'action-bottom': false,
          'reverse': false,
        }, 
        {
          'val': this.val,
          'count-base': true,
          'static-top': false,
          'action-top': false,
          'static-bottom': false,
          'action-bottom': true,
          'reverse': true,
        },
        {
          'val': this.val+ 1,
          'count-base': true,
          'static-top': false,
          'action-top': false,
          'static-bottom': true,
          'action-bottom': false,
          'reverse': true,
        },
        {

        }
      ]
    }
  },
  computed:{
    stepLimit(){
      if(this.sign=== 'sec' || this.sign=== 'min') return 59;
      if(this.sign=== 'hour') return 23;
      if(this.sign=== 'day') return 30;
    },
  },
  watch:{
    val: function(nval, oval){
      if(this.sign!== 'sec'){
        this.debounce();
      }
    }
  },
  methods: {
    test(){
      if(this.SYMBOL>= this.stepLimit+ 1) this.SYMBOL= 0;
      this.SYMBOL+= 1;
      for(let i=3; i>= 0; i--){
        Object.assign(this.ARR[i+ 1], this.ARR[i]);
        this.ARR[i+ 1].val=this.ARR[i+ 1].val- 1;
        if(this.ARR[i+ 1].val< 0){
          this.ARR[i+ 1].val= this.stepLimit;
        };
      }
      Object.assign(this.ARR[0], this.ARR[4]);
      if(this.sign=== 'sec' && this.SYMBOL=== this.stepLimit+ 1) this.$emit("count-down-by-sec");
    },
  },
}	
</script>

<style scoped>
@media screen and (min-width: 700px) {
/*ignore*/
  .pro-container{
    position:relative;width:62px;height:62px;perspective : 124px;
    background-color: #fff;
    font-size: 36px;
    margin-bottom: 10px;
  }
  /*这里的伪类选择器无效，查看原因*/
  .pro-contaier::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border: 1px solid #e4e4e4;
    background-color: #fff;
  }
  .pro-container div{
    width:62px;
  }

  .count-base{
    position: absolute;
    height: 31px;
    line-height: 62px;
    text-align: center;
    overflow: hidden;
    transform-origin: bottom;
    background-color: #fff;
    border: 1px solid #e4e4e4;
  }

  .count-base div{
    position: relative;
    height: 31px;
  }

  .action-top{
    border-bottom: none;
    background-image:linear-gradient(to bottom , #fff , #aeaeae);
    animation: action-top 1s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }
  .action-top div{
    animation: action-top-div 1s;
    animation-fill-mode: forwards;
    animation-timing-function: step-end;
  }

  .action-bottom{
    animation: action-bottom 1s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }
  
  .static-top{
    z-index: 1;
    border-bottom: none;
  }

  .static-bottom{
    z-index: 2;
    transform:rotateX(-180deg);
/*    animation: static-bottom 1s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;*/
  }
  .static-bottom div{
    animation: static-bottom-div 1s;
    animation-fill-mode: forwards;
    animation-timing-function: step-end;
  }

  .reverse div, .static-bottom div{
    transform-origin: bottom;
    transform: rotateX(180deg);
  }
  
  @keyframes action-top{
    0%{
      z-index: 10;
      transform:rotateX(0);
    }
    89%,100%{
      z-index: 5;
      transform:rotateX(-180deg);
    }
  }

  @keyframes action-top-div{
    50%{
      opacity: 1;
    }
    51%{
      opacity: 0;
    }
    89%,100%{
      opacity: 0;
    }
  }
  /*折页阴影*/
  @keyframes action-bottom{
    0%{
      z-index: 5;
      background-image:linear-gradient(to bottom , #fff , #aeaeae);
      transform:rotateX(0);
    }

    89%,100%{
      z-index: 10;
      transform:rotateX(-180deg);
    }
  }
  /*底部阴影*/
  @keyframes static-bottom{
    90%{
      background-image:linear-gradient(to bottom , #fff , #ddd);
    }
    100%{
      background-image:linear-gradient(to top , #fff , #aeaeae);
    }
  }
  /*防止数字叠加*/
  @keyframes static-bottom-div{
    50%, 100%{
      opacity: 0;
    }
  }
}
</style> 