<template>
  <div class="editor-contaier" :style="{height: HEIGHT+ 'px'}">
    
    <div class="editor-contaier-header">
      <div>{{ lucky.title }}</div>
    </div>
    
    <div ref="contaier" class="editor-contaier-contaier" 
      :style="{height: HEIGHT- 70+ 'px', overflow: IN_SCROLL_STATE?'auto': 'hidden'}"
    >
    
      <editor-submitor :lucky="lucky"></editor-submitor>
    
    </div>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法
import { sizeMixin } from '@/mixin'
import { isNull, debounce } from '@/libs/tools'
//子组件
import editorSubmitor from './components/editor-submitor/editor-submitor.vue'
export default {
  name: 'lucky-editor',
  
  components: {
    editorSubmitor
  },

  mixins: [ sizeMixin ],

  created(){
    let prefix= this.$route.params.prefix;
    let luckies= this.$store.getters['luckies/luckies'];
    if(isNull(luckies)){
      this.$router.push('/');
    } else {
      Object.assign(this.lucky, luckies[prefix]);
      this.$store.commit('setLeftSliderStatus', false);
    }
  },

  mounted(){
    this.$refs.contaier.addEventListener('wheel', this.wheelFunc)
  },

  beforeDestroy(){
    this.$store.commit('setLeftSliderStatus', true);
  },

  props: [],
  data: function(){
  	return {
      lucky: {},
      IN_SCROLL_STATE: false,
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
.editor-contaier{
  overflow:hidden;
  padding: 20px 30px;
  width: 75%;
}

.editor-contaier-header{
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  border-bottom: 1px solid #aeaeae;
  cursor: pointer;
}

.editor-contaier-contaier{
  overflow: hidden;
} 

.editor-contaier-contaier::-webkit-scrollbar{
  width: 4px;
  background-color: #F5F5F5;
}
.editor-contaier-contaier::-webkit-scrollbar-track{
  background-color: #F5F5F5; 
}
.editor-contaier-contaier::-webkit-scrollbar-thumb{
  background-color: #aeaeae;	
}
</style> 