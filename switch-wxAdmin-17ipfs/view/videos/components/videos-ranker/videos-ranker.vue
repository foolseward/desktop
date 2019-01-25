<template>
  <div style="margin: 20px 100px;width: 800px">
    <draggable class="draglist" v-model="arr" @start="dragStart" @end="dragEnd">
      <transition-group>
        <div
          @click="clearDrag(index)" 
          :class="['drag-outer', 
                    'drag-'+ (!belong || ele.belong=== belong?'belong':'not-belong'),
                    index=== index_of_ele_on_drag?'in-drag': '', 
                  ]" 
          v-for="(ele, index) in arr" 
          :key="index">
          {{ ele.name }}
        </div>
      </transition-group>
    </draggable>
    <div style="position: fixed;top: 500px;left:800px;width: 50px; height: 50px; border-radius: 25px; box-shadow: 0px 0px 10px #aeaeae; text-align: center;padding-top: 15px;"
      @click="change"
    >返回</div>
  </div>
</template>

<script>
/*<======|环境配置|======>*/

/*<======|静态资源|======>*/

/*<======|引用插件|======>*/
import draggable from 'vuedraggable'
/*<======|工具方法|======>*/
import axios from '@/libs/api.form.js'
/*<======|  混入  |======>*/

/*<======| 子组件 |======>*/

export default {
/*名称*/
  name: 'videos-ranker',

/*子组件*/
  components: {
    draggable,
  },

/*混入*/ 
  mixins: [],

/*生命周期*/
  mounted(){
    axios.get({
      url:'/videos/rank'
    }).then(res => {
      this.arr.push(...res.data);
    });
  },
/*传参*/
  props: ['belong', 'videos'],

/*data*/
  data: function(){
    return {
      arr: [],
      index_of_ele_on_drag: null,
    }
  },

/*computed*/
  computed:{},

/*watch*/


/*方法*/ 
  methods: {
    dragStart({to, from, oldIndex}){
      this.index_of_ele_on_drag= oldIndex;
    },
    dragEnd({to, from, oldIndex, newIndex}){
      this.index_of_ele_on_drag= newIndex;
      axios.post({
        url: '/videos/change/rank',
        data: {
          oldIndex: oldIndex,
          newIndex: newIndex,
        }
      }).then(res => {

      });
    },
    clearDrag(index){
      if(this.index_of_ele_on_drag=== index){
        this.index_of_ele_on_drag= null;
      }
    },
    change(){
      this.$emit('change-container-state', 'projector')
    }
  },
} 
</script>

<style scoped>
.drag-outer{
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 500px;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 0 50px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-out;
  border: 1px dashed #aeaeae;
}
.in-drag{
  color:#fff;
  background-color: #0e5f57;
  box-shadow: 3px 3px 5px #888;
  border: none;
}
.drag-not-belong{
  display: none;
}
</style> 