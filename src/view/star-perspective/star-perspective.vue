<template>
  <div class="container" 
    @touchend= "touchEnd"
  >
    <div class="rotator"></div>
    <div class="rotator"></div>
    <div class="rotator"></div>
    <div class="rotator"></div>
    <div class="rotator"></div>
    <div class="rotator"></div>
    <div class="rotator"></div>
    <div class="rotator"></div>
    <div class="rotator"></div>
    <div style="background-color:#000; z-index:1000; transform:scale(2);"></div>
  </div>
</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/
import Mock from 'mockjs'
/*<======|工具方法|======>*/

/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/
let touchX= null;
let timeout= null;
export default {
/*名称*/
  name: '',

/*子组件*/
  components: {},

/*混入*/ 
  mixins: [],

/*生命周期*/
  mounted(){
    this.init(this.$el);
  },
/*传参*/
  props: [],

/*data*/
  data: function(){
    return {
      //是否在拖动状态下
      manual: false,
      //方向
      direction: -1,
    }
  },

/*computed*/
  computed:{},

/*方法*/ 
  methods: {
    init(el){
      const arr= this.makeArr(el);
      //角度步进
      const step= 360/arr.length;
      //缩放倍数 perspective/第一个元素位置
      const rate= 4;
      //变速齿轮
      const gear= 4;

      const cb= this.animateFunc(arr, rate, step, gear);

      let deg= 0;
      let loop= () => {
        cb(deg);
        if(!this.manual) deg+= this.direction;
        requestAnimationFrame(loop);
      }
      loop();

      this.$el.addEventListener('touchmove', (e) => {
        this.manual= true;
        timeout= clearTimeout(timeout);
        let ev= e.changedTouches[0];
        if(touchX){
          this.computeDirection(ev.clientX, touchX);
          deg+= 10* this.direction;
        }
        touchX= ev.clientX;
      })
    },
    
    /**
     * @description: 准备对象数组，有可能存在不加入队列的子元素，故做成方法
     */
    makeArr(el){
      const children= [...el.querySelectorAll('.rotator')];
      return children.map(ele => {
        ele.style['background-color']= Mock.Random.rgba();
        return {
          el: ele,
          x: null,
          z: null,
        }
      });
    },

    /**
     * @description: 返回一个方法
     */
    animateFunc(arr, rate, step, gear){
      let zBegin= {
        index: null,
        val: null,
      };
      return function(deg){
        for(let i= 0; i< arr.length; i++){
          let x= Math.sin((2*Math.PI/360* (i* step+ deg/gear))% 360)* 50;
          let z= Math.cos((2*Math.PI/360* (i* step+ deg/gear))% 360)* 50;
          //记录zindex最大者
          if(zBegin.index=== null || z> zBegin.val){
            zBegin.index= i;
            zBegin.val= z;
          };
          arr[i].el.style.transform= `translate3d(${x* rate}px, 0, ${z}px)`;
          arr[i].z= z;
          arr[i].el.style.transform= `translate3d(${x* rate}px, 0, ${z}px)`;
        }
        for(let i= zBegin.index, j= 0; i< arr.length; i++, j++){
          let obj= arr[i%arr.length];
          obj.el.style['z-index']= 1000+ parseInt(obj.z);
        }
      }
    },

    computeDirection(nx, x){
      if(nx=== x) return;
      this.direction= (nx- x)/Math.abs(nx- x);
    },

    touchEnd(e){
      timeout= setTimeout(() => {
        this.manual= false;
      }, 1000);
    },
  },
} 
</script>

<style scoped>
.container{
  display: flex;
  perspective-origin: center;
  width: 100px;
  height: 100px;
  margin-top: 300px;
  margin-left: 300px;
  perspective: 200px;
  transform:translate3d(0,0,0);
}
.container>div{
  position: absolute;
  border: 1px solid #aeaeae;
  height: 100px;
  width: 100px;
}
</style> 