<template>
  <div>
    <div style="margin: 5px 0;margin-top: 20px;">
      <Input 
        v-model="diy_pointer_image" 
        icon="md-checkmark-circle" 
        placeholder="指针自定义背景" 
        style="width: 200px"
        @on-blur="pointerImageSubmitFunc"
        @on-click="pointerImageSubmitFunc"
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
      指针的自定义背景
    </span>

    <div style="margin: 5px 0;margin-top: 20px;">
     <InputNumber
      :max="0.8"
      :min='0.1'
      :step="0.01"
      v-model="pointer_rate"
      @on-change= "pointerRateSubmitFunc"
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
      范围: 0.1 ~ 0.5，指针图片大小
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
import { InputNumber, Input } from 'iview'
export default {
/*名称*/
  name: 'pointer-controller',

/*子组件*/
  components: {
    InputNumber, Input
  },

/*混入*/ 
  mixins: [],

/*生命周期*/
  created(){
    if(!this.pointerRateSubmitFuncDebounce) this.pointerRateSubmitFuncDebounce= debounce(function(){
      this.$store.commit('luckies/transferData', {
        val: this.pointer_rate,
        func: function(val){
          this.pointer_rate= val;
        }
      });
    }, 500, false);
  },
/*传参*/
  props: ['diyPointerImage', 'pointerRate'],

/*data*/
  data: function(){
    return {
      diy_pointer_image: this.diyPointerImage,
      pointer_rate: this.pointerRate
    }
  },

/*computed*/
  computed:{},

/*方法*/ 
  methods: {
    pointerImageSubmitFunc(){
      this.$store.commit('luckies/transferData', {
        val: this.diy_pointer_image,
        func: function(val){
          this.diy_pointer_image= val;
        }
      });
    },
    pointerRateSubmitFunc(){
      if(isNull(this.pointer_rate)) this.pointer_rate= 0.5;
      this.pointerRateSubmitFuncDebounce();
    }
  },
} 
</script>

<style scoped>
  
</style> 