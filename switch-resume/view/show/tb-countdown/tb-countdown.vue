<template>
  <div style="padding:100px;" :class="[detail?'detail':'']">
    <div @click="detail=!detail">查看详情(click!)</div>
    <div @click="error_example=!error_example" class="ground">
      <div v-if="COUNT_DOWN_SECOND || COUNT_DOWN_SECOND=== 0" class="outer">
        <div>
          <tb-countdown-pro :val="COUNT_DOWN_DAY" :sign="'day'"></tb-countdown-pro>
          <div class="time-text">天</div>
        </div>
        <div class="maohao">:</div>
        <div>
          <tb-countdown-pro :val="COUNT_DOWN_HOUR" :sign="'hour'"></tb-countdown-pro>
          <div class="time-text">小时</div>
        </div>
        
        <div class="maohao">:</div>
        <div>
          <tb-countdown-pro :val="COUNT_DOWN_MINUTE" :sign="'min'"></tb-countdown-pro>
          <div class="time-text">分钟</div>
        </div>
        
        <div class="maohao">:</div>
        <div>
          <tb-countdown-pro :val="COUNT_DOWN_SECOND" :sign="'sec'" @count-down-by-sec="COUNT_DOWN_BY_SEC"></tb-countdown-pro>
          <div class="time-text">秒</div>
        </div>
        
      </div>
      <span @click="error_example=!error_example" v-show="error_example" style="position:absolute;top:0;">
        <tb-countdown-split :sign="'second'" :val="COUNT_DOWN_SECOND"></tb-countdown-split>
      </span>
      
    </div>
    <div class="detail-text">
      <span>tags: </span>
      <div style="padding-left:10px;">css动画</div>
      <div style="padding-left:10px;">line-gradient渐变</div>
      <div style="padding-left:10px;">perspecitive视点</div>
      <div style="padding-left:10px;">防抖动函数</div>
<!--       <div>
        <input ref="init_time" type="text" @blur="countDownInit">
      </div> -->
    </div>
    <div style="font-size: 16px; line-height: 1.6;">
      看到今年双11淘宝的倒计时，在不使用插件的情况下实现了一个<br>
      第一版（左上角）翻页采用的是单div，最后的效果，数字变化时容易出现残留， 数字抖动，而且在ios<br>
      浏览器上，数字残留更加严重，会与更新后的数字产生叠加<br><br>
      废弃第一版之后，转变了思路做了第二版，采用四个div轮转来完成动画，这样做的优点在于，数字赋<br>
      新值的时候，承载数字的div处于不可见状态，避免了抖动与残留，在切换叠加元素显示的时候，用opacity<br>
      代替z-index，性能更出色<br><br>
      第二种方案兼容性与性能都更好，但是相比较第一种方案只操纵一个div来说，操作四个div协同动画的js写起<br>
      来比较复杂，最后通过防抖动（debounce）函数解决。<br><br>
      相比较现成的倒计时插件，可能性能上还有差距，但是可定制性和自由度要高很多，体积也小许多。
    </div>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//工具方法
//混入
import { countDownMixin } from '@/mixin'
//子组件
import tbCountdownPro from './components/tb-countdown-pro.vue'
import tbCountdownSplit from './components/tb-countdown-split.vue'
export default {
  name: 'tb-countdown',
  components: {
  	tbCountdownPro,
    tbCountdownSplit
  },
  mixins: [ countDownMixin ],
  props: [],
  data: function(){
  	return {
  	  nameArr: [],
  	  second: 60,
      error_example: true,
      detail: true,
  	}
  },
  mounted(){
    this.COUNT_DOWN_INIT(new Date().getTime()+ 86400000);
  },
  methods: {
    countDownInit(){
      //当input无值或给的时间小于当前时间时，以当前时间戳启动时钟
      //当值大于当前时间时，以给定值启动倒计时
      let _val= parseInt(this.$refs.init_time.value);
      let _current= new Date().getTime();
      if(Number.isNaN(_val) || _val< _current){
        this.COUNT_DOWN_INIT(_current+ 86400000);
        return;
      }
      this.COUNT_DOWN_INIT(_val);
    }
  },
}	
</script>

<style scoped>
	
@media screen and (min-width: 700px) {
/*ignore*/
.ground{
  position: relative;
  width: 540px; 
  height: 335px; 
  background-image: url(./source/bg.jpg);
  overflow:hidden;
  transform-origin: bottom;
  transition: all 0.3s ease-in-out;
}
.detail{
  perspective: 200px;
}
.detail .ground{
  transform: translate3d(100px, 0, -50px) rotateX(10deg) rotateY(-10deg); 
}

.outer{
  display: flex;
  padding:0 100px;
  justify-content: space-around;
  margin-top:220px;
  align-items: center;
}

.outer div{
  display: flex;
  flex-direction: column;
}

.maohao{
  color:#fff;
  font-size: 24px;
  align-items: center;
  transform: translateY(-50%);
}

.time-text{
  color: #fff;
  font-size: 16px;
  line-height: 1.4;
  text-align: center;
}

.detail-text{
  font-size:16px;line-height:2;color:#fff;background-color:rgba(0,0,0,0.3);padding:20px;display:flex;flex-direction:column;position:absolute;top:400px;transition:all 0.3s ease-in-out;opacity:0;border-radius: 4px;
}

.detail .detail-text{
  top:200px;
  opacity: 1;
}
}
</style> 