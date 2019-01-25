<template>
  <div class="left-slider" 
  :style="{
    height: HEIGHT+ 'px',
    'min-width': LEFT_SLIDER_WIDTH+ 'px',
  }">
<!-- 侧边栏顶部按钮区 -->
    <div :style="{height: LEFT_SLIDER_FIRST_HEIGHT+ 'px'}">
      <i-icon type="md-eye" style="margin-right:10px;"
        @click="changeLeftSliderStatus(false)"
      />
      <i-icon type="ios-menu" style="margin-right:10px;"
        @click="changeLeftSliderStatus(true)"
      />
    </div>
    
    <div v-if="LEFT_SLIDER_WIDTH=== MENU_WIDTH" class="left-slider-menu-container"
    :style="{
      'max-height': HEIGHT- LEFT_SLIDER_FIRST_HEIGHT+ 'px',
    }">
        <div v-for="ele in MENU_LIST" @click="changeCurrentRoute(ele.path)">
          {{ ele.meta.title }}
        </div>
    </div>
  
    <virtual-phone 
      v-if="LEFT_SLIDER_WIDTH=== SHOW_WIDTH" 
      :style="{height: HEIGHT- LEFT_SLIDER_FIRST_HEIGHT+ 'px'}"
    ></virtual-phone>
  
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法
import { sizeMixin } from '@/mixin'
//子组件
import { Icon } from 'iview'
import virtualPhone from './components/virtual-phone/virtual-phone.vue'
export default {
  name: 'left-slider',
  components: {
    'i-icon': Icon,
    virtualPhone
  },
  mixins: [ sizeMixin ],
  props: [],
  created(){
    //初始化菜单栏列表
    console.log(this.$router.options.routes[0])
    this.MENU_LIST.push(...this.$router.options.routes[0].children.filter((ele) => {
      return !!ele.meta.show;
    }));
  },
  data: function(){
  	return {
      MENU_LIST: [],
      //侧边栏高度
      LEFT_SLIDER_FIRST_HEIGHT: 50,
      SHOW_WIDTH: 425,
      MENU_WIDTH: 240,
  	}
  },
  computed:{
    //侧边栏宽度
    LEFT_SLIDER_WIDTH(){
      return this.$store.getters.leftSliderStatus? 240: 425;
    }
  },
  methods: {
    changeLeftSliderStatus(bol){
      this.$store.commit('setLeftSliderStatus', bol);
    },
    changeCurrentRoute(path){
      this.$router.push(path);
    }
  },
}	
</script>

<style scoped>
.left-slider{
  z-index: 2;
  height: 100%;
  background-color: transparent;
  border-right: 1px solid #aeaeae;
  box-shadow: 3px 0px 10px #aeaeae;
  transition: all 0.2s ease-in;
  background-color: #fff;
}
/*侧边栏顶部按钮区*/
.left-slider>div:nth-child(1){
  border-bottom: 1px solid #aeaeae;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
}
.left-slider-menu-container, .left-slider-phone-container{
  overflow-y: auto;
}
.left-slider-menu-container::-webkit-scrollbar, .left-slider-phone-container::-webkit-scrollbar{
  width: 4px;
  background-color: #F5F5F5;
}
.left-slider-menu-container::-webkit-scrollbar-track, .left-slider-phone-container::-webkit-scrollbar{
  background-color: #F5F5F5; 
}
.left-slider-menu-container::-webkit-scrollbar-thumb, .left-slider-phone-container::-webkit-scrollbar{
  background-color: #aeaeae;
}

.left-slider-menu-container>div{
  display: flex;
  align-items: center;
  position: relative;
  height:45px;
  font-size:16px;
  text-align:left;
  padding-left:30px;
  cursor:pointer;
}
.left-slider-menu-container>div:hover{
  background-color: rgba(0,0,0,0.1)
}
.left-slider-menu-container>div:hover::after{
  content: '';
  position: absolute;
  right: 0;
  height: 40px;
  width: 3px;
  background-color: #000;
  animation:menu-selected-animation 0.2s forwards;
}
@keyframes menu-selected-animation{
  0%{
    transform: scaleY(0);
  }
  100%{
    transform: scaleY(1);
  }
}
</style> 