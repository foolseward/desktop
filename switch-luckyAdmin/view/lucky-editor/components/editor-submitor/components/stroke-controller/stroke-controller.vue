<template>
  <div>
    <div>
      <div style="margin: 5px 0;">
       <ColorPicker v-model="color_val" recommend alpha
        @on-change="colorSubmitFunc" 
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
        描边颜色
      </span>
    </div>

    <div>
      <div style="margin: 5px 0;margin-top:20px;">
       <InputNumber
        :max="10"
        :min='0'
        :step="0.1"
        v-model="width_val"
        @on-change= "widthSubmitFunc"
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
        范围: 0 ~ 10，控制分区描边的宽度
      </span>
    </div>

  </div>

</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/

/*<======|工具方法|======>*/
import { debounce } from '@/libs/tools'
/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/
import { InputNumber, ColorPicker, Button } from 'iview'
export default {
/*名称*/
  name: 'stroke-controller',

/*子组件*/
  components: {
    InputNumber, ColorPicker, 'i-button': Button,
  },

/*混入*/ 
  mixins: [],

/*生命周期*/
  created(){
    if(!this.submitFuncDebounce) this.submitFuncDebounce= debounce(function(){
      this.$store.commit('luckies/transferData', {
        val: this.width_val,
        func: function(val){
          this.stroke_width= val;
        }
      });
    }, 500, false);
  },
/*传参*/
  props: ['widthVal', 'colorVal'],

/*data*/
  data: function(){
    return {
      width_val: this.widthVal,
      color_val: this.colorVal || "rgba(0,0,0,1)",
    }
  },

/*computed*/
  computed:{},

/*方法*/ 
  methods: {
    widthSubmitFunc(){
      if(!this.val) this.val= 1;
      this.submitFuncDebounce();
    },
    colorSubmitFunc(color){
      this.$store.commit('luckies/transferData', {
        val: this.color_val,
        func: function(val){
          this.stroke_color= val;
        }
      });
    }
  },
} 
</script>

<style scoped>
  
</style> 