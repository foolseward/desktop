<template>
  <div v-laza @click="user.name=!user.name">
    <slot-child :user="user" v-show="user.name">
      <template slot-scope="slotProp">
        {{ slotProp }}
      </template>
    </slot-child>
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
import slotChild from './comps/slot-child.vue'

Vue.directive('laza', {
  bind: function(){console.log('bind')},
  update: function(){console.log('update')},
  componentUpdated: function(){console.log('componentUpdated')},
})
export default {
/*名称*/
  name: '',

/*子组件*/
  components: {slotChild},

/*混入*/ 
  mixins: [],

/*生命周期*/

/*传参*/
  props: [],

/*data*/
  data: function(){
    return {
      user:{
        name: true,
      }
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