<template>
  <div>
    <div style="margin: 5px 0;">
     <ColorPicker v-model="container_color" recommend alpha
      @on-change="containerColorSubmitFunc" 
     />
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
      转盘背景色
    </span>

    <div style="margin: 5px 0;margin-top: 20px;">
      <Input 
        v-model="diy_background_image" 
        icon="md-checkmark-circle" 
        placeholder="转盘自定义背景" 
        style="width: 200px"
        @on-blur="imageSubmitFunc"
        @on-click="imageSubmitFunc"
      />
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
      转盘的自定义背景
    </span>

    <div style="margin: 5px 0;margin-top: 20px;">
     <InputNumber
      :max="1"
      :min='0.3'
      :step="0.05"
      v-model="width_rate"
      @on-change= "rateSubmitFunc"
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
      范围: 0.3 ~ 1，控制转盘整体大小
    </span>

    <div style="margin: 5px 0;margin-top: 20px;">
     <InputNumber
      :max="0.5"
      :min='0'
      :step="0.01"
      v-model="inner_circle_rate"
      @on-change= "innerRateSubmitFunc"
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
      范围: 0 ~ 0.5，控制转盘内经及自定义背景大小
    </span>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法
import { debounce } from '@/libs/tools'
//子组件
import { InputNumber, Input, ColorPicker } from 'iview'
export default {
  name: 'prize-ground-controller',
  
  mixins: [],
  
  components: {
    InputNumber, Input, ColorPicker
  },

  props: ['widthRate', 'innerCircleRate', 'diyBackgroundImage', 'containerColorVal'],

  created(){
    if(!this.submitFuncDebounce) this.submitFuncDebounce= debounce(function(){
      this.$store.commit('luckies/transferData', {
        val: this.width_rate,
        func: function(val){
          this.width_rate= val;
        }
      });
    }, 500, false);

    if(!this.innerSubmitFuncDebounce) this.innerSubmitFuncDebounce= debounce(function(){
      this.$store.commit('luckies/transferData', {
        val: this.inner_circle_rate,
        func: function(val){
          this.inner_circle_rate= val;
        }
      });
    }, 500, false);
  },

  data: function(){
  	return {
      width_rate: this.widthRate,
      diy_background_image: this.diyBackgroundImage,
      inner_circle_rate: this.innerCircleRate,
      container_color: this.containerColorVal,
  	}
  },

  methods: {
    rateSubmitFunc: function(){
      if(!this.width_rate) this.width_rate= 1;
      this.submitFuncDebounce();
    },
    innerRateSubmitFunc: function(){
      if(!this.inner_circle_rate) this.inner_circle_rate= 0.5;
      this.innerSubmitFuncDebounce();
    },
    imageSubmitFunc(){
      this.$store.commit('luckies/transferData', {
        val: this.diy_background_image,
        func: function(val){
          this.diy_background_image= val;
        }
      });
    },
    containerColorSubmitFunc(){
      this.$store.commit('luckies/transferData', {
        val: this.container_color || 'rgba(0,0,0,0)',
        func: function(val){
          this.container_color= val;
        }
      });
    }
  },
}	
</script>

<style scoped>
	
</style> 