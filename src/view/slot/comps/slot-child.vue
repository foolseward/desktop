<template>
  <span :nd="user.fir" @click="user.fir+=1">
    <slot :user="user">
      {{ user.sec }}
    </slot>
  </span>
</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/

/*<======|工具方法|======>*/

/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/

export default {
/*名称*/
  name: '',

/*子组件*/
  components: {},

/*混入*/ 
  mixins: [],

/*生命周期*/

/*传参*/
  props: ['user'],

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