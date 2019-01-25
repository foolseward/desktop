<template>
  <div class="left">
    <div class="outer">
      <draggable class="draglist" v-model="myArray" :options="{group:'people'}" @start="dragStart" @end="dragEnd">
        <transition-group :name="!drag? 'list-complete' : null" :css="true">
          <div 
            class="list-complete-item" 
            v-for="(ele, index) in myArray" 
            :key="index" 
          >
            <img :src="staticPath+ ele.url" :data-index="index" @click="changeCurrent" style="width:100%;"
              :class="{'selected':current=== index}"
            >
          </div>
        </transition-group>
      </draggable>
<!--       <div class="btns">
        <div>添加</div>
        <div>分割</div>
      </div> -->
    </div>
  </div>
</template>
<script>
//组件
import draggable from 'vuedraggable'

import axios from '@/libs/api.form'
import { apiPath, staticPath } from '@/config'
export default {
  name: 'edit-left',
  components: {
    draggable,
  },
  created(){
    let prefix= this.$route.query.prefix;
    this.$store.commit('prefix', prefix);
    this.myArray.push(...this.$store.getters.current.pics);
  },
  data(){
    return {
      drag: true,
      apiPath: apiPath,
      staticPath: staticPath,
      myArray: [],
    }
  },
  computed:{
    timestamp:function(){
      return this.$store.getters.timestamp;
    },
    current(){
      return this.$store.getters.currentPicNum;
    },
  },
  watch:{
    timestamp(){
      this.refresh();
    }
  },
  methods: {
    changeCurrent($event){
      let index= parseInt($event.target.getAttribute("data-index"));
      let bol= false;
      if(index=== this.$store.getters.currentPicNum){
        index= -1;
        bol= true;
      } 
      this.$store.commit('currentPicNum', index);
      this.$emit('emit-state', bol);
    },
    refresh(){
      this.myArray.splice(0);
      this.myArray.push(...this.$store.getters.current.pics);
    },
    dragStart({to, from, oldIndex}){
      this.drag= true;
      //取消选定状态
      this.$store.commit('currentPicNum', -1);
      this.$emit('emit-state', true);
    },
    dragEnd({to, from, oldIndex, newIndex}){
      this.drag= false;
      axios.post({
        url:'/change/index',
        data: {
          prefix: this.$store.getters.prefix,
          oldIndex: oldIndex,
          newIndex: newIndex
        }
      }).then( res => {
        if(res.state){
          this.$store.commit('changeIndex', {oldIndex: oldIndex, newIndex: newIndex});
        } else {
          this.callAlert({
            type: 'error',
            msg: res.msg,
          });
        }
      }).catch(err => {
        if(err){
          console.log(err)
          this.callAlert({
            type: 'error',
            msg: '请求数据失败，请刷新页面后再尝试'
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.left{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
}

.left .outer{
  display: flex;
}

.draglist {
  cursor: pointer;
  width: 320px;
  height: 568px;
  overflow-y: auto; 
  border:1px dashed #aeaeae;
}
.draglist::-webkit-scrollbar {
  width: 1px;
  background-color: #F5F5F5;
}
.draglist::-webkit-scrollbar-track {
    background-color: #F5F5F5;
}
.draglist::-webkit-scrollbar-thumb {
    background-color: #aeaeae;  
}

.btns {
  cursor: pointer;
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
}

.list-complete-item {
  line-height: 0;
  transition: all 0.2s ease-in;
}
.list-complete-item .selected{
  filter:brightness(30%);
}
.list-complete-enter-active {
  overflow: hidden;
  transition: all 1s;
}

.list-complete-leave-active {
  margin-top: 0px;
  overflow: hidden;
  transition: all 1s;
}

.list-complete-enter, .list-complete-leave-to {
  height: 0px;
  opacity: 0;
  padding: 0px;
  margin-top: 0px;
  overflow: hidden;
}
</style>