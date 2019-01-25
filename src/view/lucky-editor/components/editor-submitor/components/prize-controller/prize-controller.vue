<template>
  <div>
<!-- 编辑区 -->
    <prize-controller-edit 
      v-if="showState"
      :prize="prizeInEdit"
    >
      <div>
        <Button type="success" size="small"
          @click="submitPrize"
        >提交</Button>
        <Button type="error" size="small" style="margin-left: 10px;"
          @click="notSubmitPrize"
        >取消</Button>
      </div>
    </prize-controller-edit>

<!-- 展示区 -->
    <div v-show="!showState">
      
      <div style="display: flex;">
        <div class="show-btn" @click="addPrize" style="margin-right: 20px;">
          <Icon type="md-add"/>
        </div>

        <div class="show-btn" @click="addPrize" title="复用已有奖品设置">
          <Icon type="md-copy"/>
<!--           <div style="position:absolute; border:1px solid #aeaeae; transform: translateX(120%);">
            123
          </div> -->
        </div>
      </div>

      <div>
        <draggable class="draglist" v-model="array" :options="{group:'people'}" @start="dragStart" @end="dragEnd">
          <transition-group>
            
            <div 
              class="list-complete-item" 
              v-for="(ele, index) in array" 
              :key="index" 
            >
              <div style="display:flex;justify-content:center;align-items:center;width:60px;height:60px;border-radius:30px;box-shadow:1px 1px 10px #aeaeae;">
                <img :src=" ele.image? (staticPath+ ele.image): DEFAULT_PRIZE " :data-index="index" style="width:30px;height:30px;">
              </div>
              
              <div style="display: flex; flex-direction: column; font-size: 16px; margin-left:20px; padding: 5px 0;width:200px;">
                <div style="height:25px;line-height:25px;overflow:hidden;text-overflow:ellipsis;">
                  {{ ele.name }}
                </div>
                <div style="height:25px;line-height:25px;overflow:hidden;text-overflow:ellipsis;">
                  {{ ele.name_suffix }}
                </div>
              </div>

              <div style="display: flex; font-size: 16px; margin-left:20px; padding: 5px 0;align-items:center;">
                <div>
                  <Icon type="md-create"
                    :data-index="index"
                    @click="changeShowStateToEdit" 
                  />
                </div>
                <div>
                  <Icon style="font-size:18px;margin-left:10px" type="md-trash"
                    :data-index="index"
                    @click="deletePrize"
                  />
                </div>
              </div>

            </div>

          </transition-group>
        </draggable>
      </div>
    </div>

  </div>
</template>

<script>
/**
 * 奖品数组编辑区
 */
  

//环境配置
import { staticPath } from '@/config'
//静态资源
import default_prize from '@/assets/default_prize.jpg'
//引用外部插件
import draggable from 'vuedraggable'
//混入与工具方法
import { alertMixin } from '@/mixin'
import { deepCopy } from '@/libs/tools'
//子组件
import { Icon, Input, Button } from 'iview'
import prizeControllerEdit from './comps/prize-controller-edit.vue'
export default {
  name: 'prize-controller',
  
  mixins: [alertMixin],

  components: {
    Icon, Input, Button,
    draggable,
    prizeControllerEdit,
  },
  
  props: ['array'],

  data: function(){
  	return {
      staticPath: staticPath,
      //默认奖品图片
      DEFAULT_PRIZE: default_prize,

      //正在编辑的奖品的下表
      indexInEdit: null,
      //正在编辑的奖品信息
      prizeInEdit: {
        id: null,
        name: null,
        name_suffix: null,
        image: null,
      },

      //商品信息快照，用来回滚数据，是json字符串
      photoOfPrize:"",

      //当前区域处于编辑还是展示状态
      showState: false,
  	}
  },
  
  methods: {
    //添加一个产品区域，并不提交给virtual-phone
    addPrize(){
      if(this.array.length>= 12){
        this.callAlert({
          type: 'error',
          msg: '最多支持12个奖品区域',
        });
        return;
      }
      let newPrize= {
        id: null,
        name: 'test',
        name_suffix: 'test',
        image: null,
      }
      if(this.array.length=== 0) this.$Message.info({content: '奖品数量小于等于1时，左侧不做显示', duration: 5});
      //这里不需要手动给array添加新元素，因为这个array是vuex中的引用，在提交transferData时，在vuex中会自动添加
      //this.array.push(newPrize);
      this.$store.commit('luckies/transferData', {
        val: newPrize,
        func: function(val){
          this.prize_arr.push(val)
        } 
      })
    },

    changeShowStateToEdit($event){
      let index= parseInt($event.target.getAttribute("data-index"));
      this.indexInEdit= index;
      //生成数据回滚快照
      this.photoOfPrize= JSON.stringify(this.array[index]);
      Object.assign(this.prizeInEdit, this.array[index]);
      this.showState= true;
    },

    submitPrize(){
      let newObj= deepCopy(this.prizeInEdit);
      this.$store.commit('luckies/transferData', {
        val:{
          ele: newObj,
          index: this.indexInEdit
        },
        func: function(val){
          Object.assign(this.prize_arr[val.index], newObj);
        }
      })
      this.showState= false;
    },

    //取消
    notSubmitPrize(){
      Object.assign(this.array[this.indexInEdit], JSON.parse(this.photoOfPrize));
      this.showState= false;
    },

    //删除奖品
    deletePrize($event){
      let index= parseInt($event.target.getAttribute("data-index"));
      this.$store.commit('luckies/transferData', {
        val: index,
        func: function(val){
          this.prize_arr.splice(index, 1);
        } 
      });
    },
    dragStart(){

    },
    dragEnd(){

    },
  },
}	
</script>

<style scoped>
.draglist{

}
.list-complete-item{
  display: flex;
  margin-bottom: 10px;
}
.list-complete-item img{
  height: 60px;
  width: 60px;
}
.show-btn{
  position: relative;
  display:flex;
  align-items:center; 
  justify-content:center;
  box-shadow:1px 1px 10px #aeaeae;
  width:40px;
  height:40px;
  border-radius:20px;
  margin-bottom: 10px; 
  font-size:24px;
}
</style> 