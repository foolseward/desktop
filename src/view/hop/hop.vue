<template>
  <div>
    <base-comp>
      <h2 slot="slot1">BaseComponent slot</h2>
      <p>default slot</p>
    </base-comp>
    <with-comp>
      <h2 slot="slot1">EnhancedComponent slot</h2>
      <p>default slot</p>
    </with-comp>
  </div>
</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/

/*<======|工具方法|======>*/

/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/
import baseComp from './comps/base-comp.vue'
import withConsole from './hoc'
export default {
/*名称*/
  name: '',

/*子组件*/
  components: {
    withComp: withConsole(baseComp), baseComp
  },

/*混入*/ 
  mixins: [],

/*生命周期*/
  beforeRouteEnter(to, from, next){
    console.warn(`主题：${to.meta.description}`);
    next();
  },
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
    handleCustClick(){
      console.log('emit');
    },
  },
} 
</script>

<style scoped>
  
</style> 