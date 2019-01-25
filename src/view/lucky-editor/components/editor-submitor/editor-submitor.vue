<template>
  <div style="padding-top: 20px;">
    <i-collapse simple>
      
      <i-panel name="0">
          <span class="controller-title">
            奖品设置
          </span>
          <prize-controller
            slot="content"
            :array="lucky.prize_arr"
            style="margin: 5px 0 15px 100px;"
          ></prize-controller>
      </i-panel>

      <i-panel name="1">
          <span class="controller-title">
            概率设置
          </span>
          <prize-rate-controller
            :rateSecret="lucky.rate_secret"
            slot="content"
            style="margin: 5px 0 15px 100px;"
          ></prize-rate-controller>
      </i-panel>

      <!-- 转盘大小，背景图等设置 -->
      <i-panel name="2">
          <span class="controller-title">
            转盘设置
          </span>
          <prize-ground-controller 
            slot="content"
            :innerCircleRate="lucky.inner_circle_rate" 
            :widthRate="lucky.width_rate"
            :diyBackgroundImage="lucky.diy_background_image"
            :containerColorVal="lucky.container_color"
            style="margin: 5px 0 15px 100px;"
          ></prize-ground-controller>
      </i-panel>

      <!-- 指针大小，指针图片等设置 -->
      <i-panel name="3">
          <span class="controller-title">
            指针设置
          </span>
          <pointer-controller 
            slot="content"
            :pointerRate= "lucky.pointer_rate"
            :diyPointerImage="lucky.diy_pointer_image"
            style="margin: 5px 0 15px 100px;"
          ></pointer-controller>
      </i-panel>

      <i-panel name="4">
          <span class="controller-title">
            奖品图设置
          </span>
          <prize-image-controller
            slot="content" 
            :imageRadius="lucky.image_radius"
            :yPadVal="lucky.image_y_pad"
            :imageSize="lucky.image_size"
            style="margin: 5px 0 15px 100px;"
          ></prize-image-controller>
      </i-panel>

      <i-panel name="5">
          <span class="controller-title">
            奖品名设置
          </span>
          <prize-text-controller
            slot="content" 
            :textYPad="lucky.text_y_pad"
            :nameColor="lucky.name_color"
            :nameWeight="lucky.name_weight"
            :textNumRate="lucky.text_num_rate"
            style="margin: 5px 0 15px 100px;"
          ></prize-text-controller>
      </i-panel>

      <i-panel name="6">
          <span class="controller-title">
            区域描边
          </span>
          <stroke-controller
            slot="content" 
            :widthVal="lucky.stroke_width"
            :colorVal="lucky.stroke_color"
            style="margin: 5px 0 15px 100px;"
          ></stroke-controller>
      </i-panel>

    </i-collapse>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法

//子组件
import { Collapse, Panel } from 'iview'
import prizeController from './components/prize-controller/prize-controller.vue'
import prizeRateController from './components/prize-rate-controller/prize-rate-controller.vue'
import prizeGroundController from './components/prize-ground-controller/prize-ground-controller.vue'
import prizeImageController from './components/prize-image-controller/prize-image-controller.vue'
import prizeTextController from './components/prize-text-controller/prize-text-controller.vue'
import strokeController from './components/stroke-controller/stroke-controller.vue'
import pointerController from './components/pointer-controller/pointer-controller.vue'
export default {
  name: 'editor-submitor',
  
  components: {
    'i-collapse': Collapse, 'i-panel': Panel,
    prizeGroundController, prizeController, prizeRateController, prizeImageController, prizeTextController,
    strokeController, pointerController
  },

  mixins: [],
  
  props: ['lucky'],

  mounted(){
    console.log(this.lucky)
  },

  data: function(){
  	return {

  	}
  },
  
  methods: {
  
  },
}	
</script>

<style scoped>
.editor-submitor{
  display: flex;flex-wrap:wrap;justify-content: space-between;
  -webkit-user-select: none;
  user-select: none;  
}

.editor-submitor-bar{
  position: relative;
  padding: 10px;
  min-width: 49%;
  height: 100px;
  overflow: hidden;
  border: 1px dashed #aeaeae;
  margin: 5px 0;
  border-radius: 4px;
}

.editor-submitor-bar-running{
  border:none;
  color: #fff;
  background-color: #009688;
}

.editor-submitor-bar-btns{
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px; 
  width: 70px; 
  bottom: 5px;
  right: 5px;
}

.controller-title{
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 16px;
}
</style> 