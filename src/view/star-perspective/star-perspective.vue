<template>
  <div class="container" style="display:flex;perspective-origin: center center;">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </div>
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
.container{
  width: 100px;
  height: 100px;
  margin-top: 200px;
  margin-left: 200px;
  perspective: 100px;
}
.container>div{
  position: absolute;
  border: 1px solid #aeaeae;
  height: 100px;
  width: 100px;
}
</style> 