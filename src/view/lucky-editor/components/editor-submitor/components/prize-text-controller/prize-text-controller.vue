<template>
  <div>
    <div style="margin: 5px 0;">
     <ColorPicker v-model="name_color" recommend
      @on-change="nameColorSubmitFunc" 
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
      奖品名称颜色
    </span>
    
    <div style="margin: 5px 0;margin-top: 20px;">
     <InputNumber
      :max="50"
      :min='-50'
      :step="0.5"
      v-model="text_y_pad"
      @on-change= "textYPadSubmitFunc"
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
      范围: -50 ~ 50，控制奖品名在Y轴上的位置
    </span>

    <div style="margin: 5px 0;margin-top: 20px;">
     <InputNumber
      :max="3"
      :min='1'
      :step="0.1"
      v-model="text_num_rate"
      @on-change= "textNumRateSubmitFunc"
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
      范围: 1 ~ 3，奖品名字压缩率
    </span>

    <div style="margin: 5px 0;margin-top: 20px;">
      <Select v-model="name_weight" style="width:100px" @on-change="nameWeightSubmitFunc">
        <Option v-for="item in FONT_WEIGHT_LIST" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
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
      奖品名称字重
    </span>
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
import { InputNumber, ColorPicker, Select, Option} from 'iview'
export default {
/*名称*/
  name: 'prize-text-controller',

/*子组件*/
  components: {
    InputNumber, ColorPicker, Select, Option,
  },

/*混入*/ 
  mixins: [],

/*生命周期*/
  created(){
    if(!this.textYPadSubmitFuncDebounce) this.textYPadSubmitFuncDebounce= debounce(function(){
      this.$store.commit('luckies/transferData', {
        val: this.text_y_pad,
        func: function(val){
          this.text_y_pad= val;
        }
      });
    }, 500, false);

    if(!this.textNumRateSubmitFuncDebounce) this.textNumRateSubmitFuncDebounce= debounce(function(){
      this.$store.commit('luckies/transferData', {
        val: this.text_num_rate,
        func: function(val){
          this.text_num_rate= val;
        }
      });
    }, 500, false);
  },
/*传参*/
  props: ['textYPad', 'nameColor', 'textNumRate', 'nameWeight'],

/*data*/
  data: function(){
    return {
      text_y_pad: this.textYPad,
      name_color: this.nameColor,
      text_num_rate: this.textNumRate,
      name_weight: this.nameWeight,
      FONT_WEIGHT_LIST: [
        {value: 'normal', label: "normal"},
        {value: 'bold', label: "bold"},
        {value: 'bolder', label: "bolder"},
        {value: 'lighter', label: "lighter"},
        {value: '100', label: "100"},
        {value: '200', label: "200"},
        {value: '300', label: "300"},
        {value: '400', label: "400"},
        {value: '500', label: "500"},
        {value: '600', label: "600"},
        {value: '700', label: "700"},
        {value: '800', label: "800"},
        {value: '900', label: "900"},
      ],
    }
  },

/*computed*/
  computed:{},
/*方法*/ 
  methods: {
    textYPadSubmitFunc: function(){
      if(!this.text_y_pad && this.text_y_pad!== 0) this.text_y_pad= 0;
      this.textYPadSubmitFuncDebounce();
    },
    textNumRateSubmitFunc: function(){
      if(!this.text_num_rate && this.text_num_rate!== 0) this.text_num_rate= 0;
      this.textNumRateSubmitFuncDebounce();
    },
    nameColorSubmitFunc(color){
      this.$store.commit('luckies/transferData', {
        val: this.name_color || 'rgb(0,0,0)',
        func: function(val){
          this.name_color= val;
        }
      });
    },
    nameWeightSubmitFunc(name){
      this.$store.commit('luckies/transferData', {
        val: this.name_weight || 'normal',
        func: function(val){
          this.name_weight= name;
        }
      });
    }
  },
} 
</script>

<style scoped>
  
</style> 