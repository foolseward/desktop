<template>
  <div>
    <div class="bar" v-for="(ele, index) in arr" :key="index">
      <div class="title" :title="ele.title">{{ ele.title }}</div>
      <edit-div :rate="ele.rate" :inx="index" :cb="submitVal"></edit-div>
    </div>
  </div>
</template>

<script>
/*<======|环境配置|======>*/
import { SUCCESS, NULL_PRIZE } from '@/config'
/*<======|静态资源|======>*/

/*<======|引用插件|======>*/

/*<======|工具方法|======>*/

/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/
import editDiv from './comps/edit-div.vue'
export default {
/*名称*/
  name: '',

/*子组件*/
  components: {
    editDiv
  },

/*混入*/ 
  mixins: [],

/*生命周期*/
  mounted(){
    const source= this.$store.getters['luckies/current']().prize_arr;
    const target= this.arr;
    //空奖奖品要放到数组末尾
    let index_null= -1;
    for(let i= 0; i< source.length; i++){
      let bool= target.find(ele => ele.id=== source[i].id);
      if(!bool) target.push(
        Object.assign({
          title: source[i].name+ (source[i].name_suffix? source[i].name_suffix: ''),
          //如果是设置的默认空奖，则中奖率默认设置为百分百
          rate: source[i].id== NULL_PRIZE? 100: 0,
        }, source[i])
      );
      //记录空奖id
      if(source[i].id=== NULL_PRIZE) index_null= i;
    }
    if(index_null> -1){
      let cache= Object.assign({}, target[target.length- 1]);
      Object.assign(target[target.length- 1], target[index_null]);
      Object.assign(target[index_null], cache);
    }
  },
/*传参*/
  props: [],

/*data*/
  data: function(){
    return {
      arr: [],
    }
  },

/*computed*/
  computed:{},

/*方法*/ 
  methods: {
    submitVal(index, val){
      console.log(index, val);
      this.arr[index].rate= val;
    }
  },
} 
</script>

<style scoped>
.bar{
  display: flex;
  align-items: center;
  font-size: 14px;
  display: flex;
  height: 40px;
  padding: 5px;
}
.title{
  cursor: pointer;
  width: 120px;
  word-break:keep-all;/* 不换行 */
  white-space:nowrap;/* 不换行 */
  overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow:ellipsis;
}
</style> 