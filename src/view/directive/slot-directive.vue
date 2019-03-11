<template>
  <div>
    <span v-lazy>sdfsdf</span>
  </div>
</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/
import Vue from 'vue'
/*<======|工具方法|======>*/

/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/
Vue.directive('lazy', {
  bind: function(){},
  update: function(){},
  inserted:function(el, binding, vnode){
    console.log(vnode.elm.parentNode)
  }
})
export default {
/*名称*/
  name: '',

/*子组件*/
  components: {},

/*混入*/ 
  mixins: [],

/*生命周期*/

/*传参*/
  props: [],

/*data*/
  data: function(){
    return {

    }
  },

/*computed*/
  computed:{},

/*方法*/ 
  methods: {
  
  },
} 
</script>

<style scoped>
  
</style> 