<template>
  <div class="outer">
    <div class="inner" style="">
      <div class="header">
        <div style="position:absolute;bottom:0;left:0;padding:0 10px;">
          视频项目管理
          <span style="color: #aeaeae; font-size: 16px;">
            {{ splitShow.textArr[splitShow.pointer] }}
          </span>
        </div>
        
        <div style="display:flex;position:absolute;bottom:0;right:0;padding:0 10px;">
         <div @click="changeContainer('editor')" title="添加项目" style="cursor: pointer; margin-right: 16px;">
           <Icon type="md-add"/>
         </div> 
         <div @click="changeContainer('ranker')" title="项目排序" style="cursor: pointer; margin-right: 16px;">
           <Icon type="ios-stats"/>
         </div>
         <div @click="showSplitFunc" title="项目分组显示" style="cursor: pointer;">
           <Icon style="font-size:20px;" type="md-git-merge"/>
         </div>
        </div>

      </div>
      <div class="container">

        <div v-if="containerState=== 'projector'">
          <videos-projector v-for="ele in filtedVideos" v-bind="ele" :key="ele.prefix"></videos-projector>
        </div>
        
        <div v-if="containerState=== 'editor'">
          <videos-editor @change-container-state="changeContainer"></videos-editor>
        </div>

        <div v-if="containerState=== 'ranker'">
          <videos-ranker 
            @change-container-state="changeContainer"
            :belong="this.splitShow.arr[this.splitShow.pointer]"
            :videos="filtedVideos"
          ></videos-ranker>
        </div>
        
      </div>
    </div>    
  </div>
</template>
<script>
import axios from '@/libs/api.form'
//混入
import { heightMixin } from '@/mixin'

//组件
import { Icon, Tooltip } from 'iview'

import videosProjector from './components/videos-projector/videos-projector'
import videosEditor from './components/videos-editor/videos-editor'
import videosRanker from './components/videos-ranker/videos-ranker'
export default {
  mixins:[ heightMixin ],
  components: {
    Icon, Tooltip,

    videosProjector,
    videosEditor,
    videosRanker
  },
  beforeRouteEnter(to, from, next){
    axios.get({
      url: '/videos/init'
    }).then(res => {
      if(res.state){
        next(vm => {
          vm.videos= Object.assign({}, res.data);
          console.log(res.data)
          for(let i in res.data){
            vm.filtedVideos.push(res.data[i]);
          }
          console.log(vm.filtedVideos)
          vm.$store.commit('videos/videosInit', Object.assign({}, res.data));
        });
      } else {
        alert('服务器故障')
      }
    })
  },
  data(){
    return {
      containerState: 'projector',
      videos: null,
      //用来显示
      filtedVideos: [],
      //分类显示
      splitShow: {
        pointer: 0,
        arr: [null, 'company', 'activity', 'bases'],
        textArr: ['', '公司视频', '活动视频', '基地视频'],
      }
    }
  },
  computed:{
    timestamp:function(){
      return this.$store.getters['videos/timestamp'];
    },
  },
  watch:{
    timestamp(){
      console.log('timestamp')
      this.videos= Object.assign({}, this.$store.getters['videos/videos']);
    }
  },
  methods: {
    changeContainer(area){
      this.containerState= area;
    },
    showSplitFunc(){
      if(this.splitShow.pointer>= 3){
        this.splitShow.pointer= 0;
      } else {
        this.splitShow.pointer++;
      }
      this.filtedVideos.splice(0);
      for(let i in this.videos){
        if(!this.splitShow.arr[this.splitShow.pointer] || this.videos[i].belong=== this.splitShow.arr[this.splitShow.pointer]){
          this.filtedVideos.push(this.videos[i]);
        }
      }
    },
  }
}
</script>

<style scoped>
.outer {
  position: relative;
}

.inner {
  width: 1200px;
  height: 100%;
  padding:20px 100px 0 100px;
}

.inner .header {
  font-size: 24px;
  position: relative; 
  height: 100px;
  border-bottom: 1px solid #aeaeae;
}

.inner .container {
  position: relative;
  max-height:780px;
  min-height: 780px;
  padding-right: 10px;
  overflow-y: auto; 
}
.container::-webkit-scrollbar {
  width: 10px;
  background-color: #F5F5F5;
}
.container::-webkit-scrollbar-track {
    background-color: #F5F5F5;
}
.container::-webkit-scrollbar-thumb {
    background-color: #aeaeae;  
}
</style>