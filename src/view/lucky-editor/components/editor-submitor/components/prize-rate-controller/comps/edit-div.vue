<template>
  <div class="edit-div">
    <div @click="changeInEdit" v-show="!inEdit">{{rate}}%</div>
    <div v-show="inEdit">
      <div class="input-outer" style="position:relative;">
        <input ref="editDivInput" type="text" :value="rate">
      </div>
      <Button type="success" size="small" style="margin-left:5px;"
        @click="submitVal"
      >确定</Button>
      <Button type="error" size="small" style="margin-left:5px;"
        @click="changeInEdit"
      >取消</Button>
    </div>
  </div>
</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/

/*<======|工具方法|======>*/

/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/
import { Button } from 'iview'
export default {
/*名称*/
  name: '',

/*子组件*/
  components: {
    Button
  },

/*混入*/ 
  mixins: [],

/*生命周期*/

/*传参*/
  props: ['rate', 'inx', 'cb'],

/*data*/
  data: function(){
    return {
      inEdit: false,
    }
  },

/*computed*/
  computed:{},

/*方法*/ 
  methods: {
    submitVal(){
      let val= parseFloat(this.$refs.editDivInput.value);
      if(val.toString() == "NaN") return;
      if(val> 100) return;
      this.cb.call(null, this.inx, val);
      this.changeInEdit();
    },
    changeInEdit(){
      this.inEdit= !this.inEdit;
      if(this.inEdit){
        this.$nextTick(() => {
          this.$refs.editDivInput.focus();
        })
      }
    },
  },
} 
</script>

<style scoped>
.edit-div{

}
.edit-div input{
  width: 100px;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  padding-right: 20px;
  text-align: center;
}
.edit-div .input-outer:after{
  content: '%';
  position: absolute;
  right: 2px;
}
.edit-div>div:nth-child(2){
  display: flex;
  height: 20px;
}
</style> 