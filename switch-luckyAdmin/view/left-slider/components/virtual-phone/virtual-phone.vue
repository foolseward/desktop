<template>
  <div class="virtual-phone-container">
<!-- 按钮区 -->
    <div style="display: flex; justify-content: flex-end; width:300px;padding: 10px 0 5px 0;">
      
      <Button type="success" size="small"
        @click="saveToServer"
      >保存</Button>
      
      <Button type="primary" size="small" style="margin-left:5px;"
        @click="restoreByServer"
      >重置</Button>

    </div>

<!-- 展示区 -->
    <div style="display: flex; justify-content: center; align-items: flex-start;">
      <svg :width="width_rate*　375" viewBox="0 0 300 300">

        <defs>
          <clipPath id="RECT_CLIP_SVG">
            <circle id="rect1" :cx="0.5* image_size" :cy="0.5* image_size" :r="0.5* image_size"/>
          </clipPath>
          
          <!-- 自定义背景 -->
          <image 
            v-if="diy_background_image"
            id="diy_background_image" 
            :xlink:href="staticPath+ diy_background_image" 
            x="0" y="0" width="300" height="300"/>

          <image 
            v-if="diy_container_image"
            id="diy_container_image" 
            :xlink:href="staticPath+ diy_container_image" 
            x="0" y="0" width="300" height="300"/>

          <image 
            v-if="diy_pointer_image"
            id="diy_pointer_image" 
            :xlink:href="staticPath+ diy_pointer_image" 
            x="0" y="0" width="300" height="300"/>
        </defs>
        
        <!-- 打底圆 -->
        <circle v-if="!diy_container_image" cx="150" cy="150" r="150" :fill="container_color"/>
        <circle v-if="!diy_background_image" cx="150" cy="150" :r="circleRadius" fill="transparent"/>
        
        <!-- 自定义背景 -->
        <use v-if="diy_container_image" xlink:href="#diy_container_image"/>

        <use :transform="'scale('+ diyBgScaleRate+')'" transform-origin="150 150" v-if="diy_background_image" xlink:href="#diy_background_image"/>

        <template>
          <g v-for="(prize, index) in prize_arr" :key="index">
            <path v-if="!diy_background_image" :d="
            '\nM '+ 150+ ' '+ circleRadiusPad+ ' \n'+
            'A '+ circleRadius+ ' '+ circleRadius+ ', 0, 0, 1 '+ endX+ ' '+ endY+ ' '+
            '\nL '+ 150+ ' '+ 150+ ' Z'" 
            fill="transparent" 
            :transform="'rotate('+ (index* rotate- rotatePlus)+ ', '+ 150+ ', '+ 150+ ')'"
            :stroke="stroke_color" 
            :stroke-width="stroke_width"
            />
            
            <defs>
              <image
                v-if="prize.image"
                :id="'prize_image'+ index"
                :xlink:href="prize.image"
                :width="image_size" 
                :height="image_size" 
              />
            </defs>
            
            <use 
              :xlink:href="'#prize_image'+ index"
              :x="textX+ textLength- 0.5* image_size" :y="textY+ 10+ image_y_pad"
              :transform="'rotate('+ (index* rotate)+ ', '+ 150+ ', '+ 150+ ')'"
              :style="{'clip-path': image_radius?'url(#RECT_CLIP_SVG)':''}"
            />

            <text :x="textX+ textLength" :y="textY+　text_y_pad" :fill="name_color" 
            :transform="'rotate('+ (index* rotate)+ ', '+ 150+ ', '+ 150+ ')'"
            :font-weight="name_weight"
            :style="{
            'font-size': textSize,
            'text-anchor': 'middle'}"
            >
              {{ prize.name }}
            </text>

            <text v-if="prize.name_suffix" :x="textX+ textLength" :y="textY+ textSize+ text_y_pad" 
            :transform="'rotate('+ (index* rotate)+ ', '+ 150+ ', '+ 150+ ')'"
            :fill="name_color"
            :font-weight="name_weight"
            :style="{
            'font-size': textSize,
            'text-anchor': 'middle'}"
            >
              {{ prize.name_suffix }}
            </text>
          </g>
        </template>
        
        <use 
          :transform="'scale('+ pointer_rate+')'" 
          transform-origin="150 150" 
          v-if="diy_pointer_image" 
          xlink:href="#diy_pointer_image"/>
      </svg>
    </div>
  </div>
</template>

<script>
/**
 * virtual-phone的数据是深拷贝数据，只能通过lucky-editor中的提交改变
 */

//环境配置
import { staticPath } from '@/config'
//静态资源

//引用外部插件

//混入与工具方法
import axios from '@/libs/api.form.js'
import { deepCopy, isNull } from '@/libs/tools'
import { alertMixin } from '@/mixin'
//子组件
import { Button } from 'iview'
export default {
  name: 'virtual-phone',
  
  components: {
    Button,
  },

  mixins: [alertMixin],

  props: [],

  created(){
    this.restore();
  },

  activated(){
    this.restore();
  },

  data: function(){
  	return {
      type: 1,
      title: null,
      diy_background_image: null,
      container_color: 'transparent',
      diy_container_image: null,
      pointer_rate: 1,
      diy_pointer_image: null,
      color_arr: [],
      text_num_rate: 1.5,
      name_color: 'rgb(0,0,0)',
      name_weight: 'normal',
      inner_circle_rate: 0.5, 
      image_size: 50,
      image_radius: true,
      stroke_color: null,
      stroke_width: 0,
      text_y_pad: 0,
      image_y_pad: 0,
      width_rate: 1,
      prize_arr: [],
      //概率字符串
      rate_secret: '',
  	}
  },
  
  watch: {
    transfer: function(){
      let data= this.$store.getters['luckies/transferData'];
      data.func.call(this, data.val);
    },
    prefix: {
      handler:function(){
        console.log(this.$store.getters['luckies/luckies'])
        this.restore();
      },
      Immediate: true, 
    },
  },

  computed:{
    //监视数据变动
    transfer: function(){
      return this.$store.getters['luckies/transfer'];
    },
    prefix: function(){
      return this.$store.getters['luckies/prefix'];
    },
    staticPath: function(){
      return staticPath;
    },
    outerWidth: function(){
      return 300
    },
    rotate: function(){
      let length= this.prize_arr.length;
      return 360/(length=== 0? 1: length);
    },
    rotatePlus: function(){
      let length= this.prize_arr.length;
      return this.rotate/2;
    },
    diyBgScaleRate: function(){
      return this.inner_circle_rate* 2;
    },
    circleRadius: function(){
      return this.inner_circle_rate* this.outerWidth;
    },
    circleRadiusPad: function(){
      return this.outerWidth/2- this.circleRadius;
    },
    arcLength: function(){
      return this.rotate* Math.PI/ 180;
    },
    endX: function(){
      return this.outerWidth/2+ Math.sin(this.arcLength)* this.circleRadius;
    },
    endY: function(){
      return this.outerWidth/2- Math.cos(this.arcLength)* this.circleRadius;
    },
    textSize: function(){
      return this.circleRadius/(this.text_num_rate* this.prize_arr.length);
    },
    textX: function(){
      return this.outerWidth/2- Math.sin(this.arcLength/2)* this.circleRadius;
    },
    textY: function(){
      return this.textSize+ this.circleRadius- Math.cos(this.arcLength/2)* this.circleRadius;
    },
    textLength: function(){
      return Math.sin(this.arcLength/2)* this.circleRadius;
    },
  },

  methods: {
    /**
     * [用vuex中的数据重置数据，vuex中的数据可能是服务器数据加工后的结果]
     * @return {[type]} [description]
     */
    restore(){
      console.log(1)
      let prefix= this.$route.params.prefix;
      if(prefix) this.$store.commit('luckies/prefix', this.$route.params.prefix);
      let luckies= this.$store.getters['luckies/luckies'];
      if(!isNull(luckies)){
        Object.assign(this._data, JSON.parse(JSON.stringify(luckies[prefix])));
        this.$store.commit('setLeftSliderStatus', false);
      }
    },

    /**
     * [用服务器的数据重置virtual-phone与vuex中的对应项目]
     */
    restoreByServer(){
      let prefix= this.$route.params.prefix;
      if(isNull(prefix)) return;
      axios.get({
        url:'/restore/'+ prefix,
      }).then(res => {
        if(res.state){
          let pure= deepCopy(res.data);
          Object.assign(this._data, res.data);
          this.$store.commit('luckies/transferData', {
            val: pure,
            func: function(val){
              //上面已经重置了virtual-phone的数据了，这个方法只需要给vuex执行就行了
              if(this._isVue) return;
              //处理val中的引用属性
              this.prize_arr.splice(0);
              this.prize_arr.push(
                ...val.prize_arr.map(ele => {
                  return deepCopy(ele);
                })
              );
              //删掉val中的引用类型属性，其余属性可以直接assign
              delete val.prize_arr;
              Object.assign(this, val);
            }
          })
          this.callAlert({
            type: 'error',
            msg: '数据已重置'
          })
        } else {
          alert(res.msg || '服务器数据错误');
        }
      }).catch(err => {
        console.warn(err);
      })
    },

    /**
     * [修改服务器上的数据]
     */
    saveToServer(){
      axios.post({
        url: '/update/project',
        data: Object.assign(this._data, {prefix: this.prefix}),
      }).then(res => {
        if(res.state){
          this.callAlert({
            type: 'error',
            msg: '保存成功'
          })
        } else {
          this.callAlert({
            type: 'error',
            msg: '保存失败'
          })
        }
      })
    },
  },
}	
</script>

<style scoped>
.virtual-phone-container{
  display:flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.virtual-phone-container::-webkit-scrollbar{
  width: 4px;
  background-color: #F5F5F5;
}
.virtual-phone-container::-webkit-scrollbar-track{
  background-color: #F5F5F5; 
}
.virtual-phone-container::-webkit-scrollbar-thumb{
  background-color: #aeaeae;
}

.virtual-phone-btns{
  width: 300px;
}

.virtual-phone-container>div:nth-child(2){
  position: relative;
  transform: scale(0.8);
  transform-origin: top;
  height:637px;
  border: 1px solid #aeaeae;
  box-shadow: 3px 3px 10px #aeaeae;
  border-radius: 4px;
  animation: virtual-phone 0.2s forwards; 
  animation-timing-function: ease-in;
}

@keyframes virtual-phone{
  0%{
    width: 0;
  }
  100%{
    width: 375px;
  }
}
</style> 