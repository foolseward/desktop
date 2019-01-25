<template>
  <div class="outer">
    <div class="inner" style="">
      <div class="header">
        <div style="position:absolute;bottom:0;left:0;padding:0 10px;">项目管理</div>
        <div style="position:absolute;bottom:0;right:0;padding:0 10px;">
         <div @click="changeContainer" style="cursor: pointer;">+</div>
        </div>
      </div>
      <div class="container">
        <div v-if="containerState">
          <main-projector v-for="ele in projectors" v-bind="ele" :key="ele.prefix"></main-projector>
        </div>
        <div v-if="!containerState">
          <main-editor @change-container-state="changeContainer"></main-editor>
        </div>
      </div>
    </div>    
  </div>
</template>
<script>
//混入
import { heightMixin } from '@/mixin'

//组件
import mainProjector from './components/main-projector/main-projector'
import mainEditor from './components/main-editor/main-editor'
export default {
  mixins:[ heightMixin ],
  components: {
    mainProjector,
    mainEditor,
  },
  data(){
    return {
      containerState: true,
      projectors: {},
    }
  },
  created(){
    this.projectors= Object.assign({}, this.$store.getters.entities);
  },
  computed:{
    timestamp:function(){
      return this.$store.getters.timestamp;
    },
  },
  watch:{
    timestamp(){
      console.log('timestamp')
      this.projectors= Object.assign({}, this.$store.getters.entities);
    }
  },
  methods: {
    changeContainer(){
      this.containerState= !this.containerState;
    }
  }
}
</script>

<style scoped>
.outer {
  position: relative;
}

.inner {
  width: 1200px;
  height: 100%;
  padding:20px 100px 0 100px;
}

.inner .header {
  font-size: 24px;
  position: relative; 
  height: 100px;
  border-bottom: 1px solid #aeaeae;
}

.inner .container {
  position: relative;
  max-height:780px;
  min-height: 780px;
  padding-right: 10px;
  overflow-y: auto; 
}
.container::-webkit-scrollbar {
  width: 10px;
  background-color: #F5F5F5;
}
.container::-webkit-scrollbar-track {
    background-color: #F5F5F5;
}
.container::-webkit-scrollbar-thumb {
    background-color: #aeaeae;  
}
</style>