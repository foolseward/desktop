<template>
  <div class="project-manager-contaier" :style="{height: HEIGHT+ 'px'}">
    
    <div class="project-manager-contaier-header">
      <!-- 项目管理 -->
      <div>{{ ROUTE_TITLE }}</div>
      <div style="width: 30px;text-align: center;"
        @click="IN_CREATE= true"
      >
        <Icon type="md-add"/>
      </div>
    </div>
    
    <div ref="contaier" class="project-manager-contaier-contaier" 
      :style="{height: HEIGHT- 70+ 'px', overflow: IN_SCROLL_STATE?'auto': 'hidden'}"
    >
      
      <manager-add 
        v-show="IN_CREATE"
        @close-create-state="IN_CREATE= false"
      ></manager-add>

      <manager-show v-show="!IN_CREATE"></manager-show>

    </div>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法
import { sizeMixin } from '@/mixin'
import { debounce } from '@/libs/tools'

//子组件
import { Icon } from 'iview'
import managerShow from './components/manager-show.vue'
import managerAdd from './components/manager-add.vue'
export default {
  name: 'project-manager',
  
  components: {
     managerShow, managerAdd,

     Icon,
  },
  
  mixins: [ sizeMixin ],
  
  props: [],

  mounted(){
    this.ROUTE_TITLE= this.$route.meta.title;
    this.$refs.contaier.addEventListener('wheel', this.wheelFunc)
  },
  
  data: function(){
  	return {
      ROUTE_TITLE: null,
      IN_SCROLL_STATE: false,
      //当前是否是添加项目界面
      IN_CREATE: false,
  	}
  },
  
  methods: {
    wheelFunc(){
      this.IN_SCROLL_STATE= true;
      this.resetScrollStateFunc.bind(this)();
    },
    resetScrollStateFunc: debounce(function(){
      this.IN_SCROLL_STATE= false;
    }, 1000, false)
  },
}	
</script>

<style scoped>
.project-manager-contaier{
  overflow:hidden;
  padding: 20px;
  width: 75%;
}

.project-manager-contaier-header{
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  border-bottom: 1px solid #aeaeae;
  cursor: pointer;
}

.project-manager-contaier-contaier{
  overflow: hidden;
} 

.project-manager-contaier-contaier::-webkit-scrollbar{
  width: 4px;
  background-color: #F5F5F5;
}
.project-manager-contaier-contaier::-webkit-scrollbar-track{
  background-color: #F5F5F5; 
}
.project-manager-contaier-contaier::-webkit-scrollbar-thumb{
  background-color: #aeaeae;
}
</style> 