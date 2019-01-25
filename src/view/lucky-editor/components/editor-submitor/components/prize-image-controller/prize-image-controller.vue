<template>
  <div>
    <div style="margin: 5px 0;">
     <i-switch v-model="image_radius" @on-change="radiusSubmitFunc"/>
    </div>
    <span 
      style="line-height: 2;
      width: 50%;
      padding:5px 10px;
      border-radius: 0 4px 4px 0; 
      background-color:rgba(0,0,0,0.1);
      padding-left: 10px;
      border-left: 3px solid #aeaeae;
    ">
      控制奖品图形状
    </span>
    
    <div style="margin: 5px 0;margin-top: 20px;">
     <InputNumber
      :max="50"
      :min='-50'
      :step="0.5"
      v-model="image_y_pad"
      @on-change= "imageYPadSubmitFunc"
     >
     </InputNumber>
    </div>
    <span 
      style="line-height: 2;
      width: 50%;
      padding:5px 10px;
      border-radius: 0 4px 4px 0; 
      background-color:rgba(0,0,0,0.1);
      padding-left: 10px;
      border-left: 3px solid #aeaeae;
    ">
      范围: -50 ~ 50，控制奖品图片在Y轴上的位置
    </span>

    <div style="margin: 5px 0;margin-top: 20px;">
     <InputNumber
      :max="100"
      :min='1'
      :step="0.5"
      v-model="image_size"
      @on-change= "imageSizeSubmitFunc"
     >
     </InputNumber>
    </div>
    <span 
      style="line-height: 2;
      width: 50%;
      padding:5px 10px;
      border-radius: 0 4px 4px 0; 
      background-color:rgba(0,0,0,0.1);
      padding-left: 10px;
      border-left: 3px solid #aeaeae;
    ">
      范围: 1 ~ 100，控制奖品图片的大小
    </span>
  </div>
</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/

/*<======|工具方法|======>*/
import { debounce, isNull } from '@/libs/tools'
/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/
import { InputNumber, Switch } from 'iview'
export default {
/*名称*/
  name: 'prize-image-controller',

/*子组件*/
  components: {
    InputNumber, 'i-switch': Switch
  },

/*混入*/ 
  mixins: [],

/*生命周期*/
  created(){
    if(!this.imageYPadSubmitFuncDebounce) this.imageYPadSubmitFuncDebounce= debounce(function(){
      this.$store.commit('luckies/transferData', {
        val: this.image_y_pad,
        func: function(val){
          this.image_y_pad= val;
        }
      });
    }, 500, false);

    if(!this.imageSizeSubmitFuncDebounce) this.imageSizeSubmitFuncDebounce= debounce(function(){
      this.$store.commit('luckies/transferData', {
        val: this.image_size,
        func: function(val){
          this.image_size= val;
        }
      });
    }, 500, false);
  },
/*传参*/
  props: ['yPadVal', 'imageRadius', 'imageSize'],

/*data*/
  data: function(){
    return {
      image_y_pad: this.yPadVal || 0,
      image_radius: this.imageRadius || false,
      image_size: this.imageSize,
    }
  },

/*computed*/
  computed:{},

/*方法*/ 
  methods: {
    imageYPadSubmitFunc: function(){
      if(isNull(this.image_y_pad)) this.image_y_pad= 1;
      this.imageYPadSubmitFuncDebounce();
    },
    imageSizeSubmitFunc: function(){
      if(isNull(this.image_size)) this.image_size= 50;
      this.imageSizeSubmitFuncDebounce();
    },
    radiusSubmitFunc(bol){
      this.$store.commit('luckies/transferData', {
        val: this.image_radius,
        func: function(val){
          this.image_radius= val;
        }
      });
    },
  },
} 
</script>

<style scoped>
  
</style> 