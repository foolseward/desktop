<template>
  <div class="outer">
    <div class="btns">
      <router-link :to="{ path: '/videosedit', query: { prefix: prefix }}" tag="div">
        <div>
          <Icon type="md-create" size="22"/>
        </div>
      </router-link>
      <div @click="deleteEntity" style="margin-left:10px;">
        <Icon type="md-trash" size="24"/>
      </div>
    </div>
    <div class="headpic">
      <img :src="poster?(staticPath+ poster):defaultUrl">
    </div> 
    <div class="detail">
      <div class="name">
        <div style="min-width:50px;">名称: </div>
        <div>{{ name }}</div>
      </div>
      <div class="name">
        <div style="min-width:50px;">标识: </div>
        <div>{{ prefix }}</div>
      </div>
      <div class="tips">
        <div style="min-width:50px;">归属: </div>
        <div>{{ belongText }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import defaultUrl from './source/default.jpg'
import { apiPath, staticPath } from '@/config'
import axios from '@/libs/api.form'

import { Icon} from 'iview'
export default {
  name: 'videosProjector',
  props: ['name', 'prefix', 'belong', 'poster'],
  components:{
    Icon
  },
  data(){
    return {
      apiPath: apiPath,
      staticPath: staticPath,
      defaultUrl: defaultUrl
    }
  },
  computed: {
    belongText: function(){
      if(this.belong==='company') return '公司视频';
      if(this.belong==='activity') return '活动视频';
      if(this.belong==='ipfs') return 'ipfs视频';
    }
  },
  methods: {
    /**
     * [删除项目实例]
     */
    deleteEntity(){
      let confirmVal= confirm("项目删除不可恢复，确定要删除吗？");
      if(!confirmVal) return;
      axios.post({
        url: '/videos/delete/project',
        data: {prefix: this.prefix}
      }).then((res) => {
        if(res.state){
          this.$store.commit('videos/deleteVideo', this.prefix);
        }
      })
    },
  }
}
</script>

<style scoped>
.outer {
  cursor: pointer;
  display: flex;
  height: 170px;
  width: 100%;
  margin: 20px 0;
  padding: 10px 200px 10px 10px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 6px;
  box-shadow: 3px 3px 5px transparent;
  transition: all 0.2s ease-in;
  -webkit-user-select:none;

  -moz-user-select:none;

  -ms-user-select:none;

  user-select:none;
}
.outer:hover{
  box-shadow: 3px 3px 5px #aeaeae;
}
.outer > div{
  display: flex;
  height: 150px;
}

.outer .btns{
  position: absolute;
  top: 10px;
  right: 10px;
}

.outer .headpic{
  min-width: 100px;
  max-width: 100px;
  border-radius: 6px;
  box-shadow: 2px 2px 2px #aeaeae;
}
.headpic img{
  height: 100%;
  width: 100%;
  border-radius: 6px;
}

.outer .detail{
  font-size: 16px;
  flex-direction: column;
  padding-left:20px;
}
.detail>div {
  padding: 5px 0;
}
.detail .name{
  display: flex;
  word-break: break-all;
}
.detail .tips{
  display: flex;
  word-break: break-all;
}
</style>