<template>
  <div class="edit-area" >
    <div>
      <div class="edit-area-title">数据库源:</div>
      <Select v-model="select_id" style="width:240px" @on-change="selectPrizeFromDB">
          <Option v-for="(item, index) in prizeList" :value="index" :key="item.id">{{ item.title }}</Option>
      </Select>
    </div>
    <div>
      <div class="edit-area-title">id:</div>
      <Input v-model="prize.id" placeholder="数据库中的奖品id" style="width:240px;" :disabled="true"/>
    </div>
    <div>
      <div class="edit-area-title">描述:</div>
      <Input v-model="prize.name" placeholder="奖品描述第一行" style="width:240px;"/>
    </div>
    <div>
      <div class="edit-area-title">描述补充:</div>
      <Input v-model="prize.name_suffix" placeholder="奖品描述第二行" style="width:240px;"/>
    </div>
    <div>
      <div class="edit-area-title">图片地址:</div>
      <Input v-model="prize.image" placeholder="图片地址" style="width:240px;"/>
    </div>
    <slot></slot>
  </div>
</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/

/*<======|工具方法|======>*/
import { deepCopy } from '@/libs/tools'
/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/
import { Input, Select, Option } from 'iview'
export default {
/*名称*/
  name: 'prize-controller-edit',

/*子组件*/
  components: {
    Input, Select, Option
  },

/*混入*/ 
  mixins: [],

/*生命周期*/
  created(){
    this.select_id= this.prizeList.findIndex(ele => {
      return ele.id== this.prize.id;
    })
  },
/*传参*/
  props: ['prize'],

/*data*/
  data: function(){
    return {
      select_id: 0,
    }
  },

/*computed*/
  computed:{
    prizeList(){
      return this.$store.getters['luckies/prizesFromDB']
    }
  },

/*方法*/ 
  methods: {
    selectPrizeFromDB(index){
      let source= this.prizeList[index];
      let obj={
        id: source.id,
        image: source.img_url,
        name: source.title,
        name_suffix: '',
        showInLog: source.show,
      }
      Object.assign(this.prize, obj);
    },
  },
} 
</script>

<style scoped>
.edit-area>div{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.edit-area-title{
  width: 100px;
  margin-right: 10px;
  text-align: right;
} 
</style> 