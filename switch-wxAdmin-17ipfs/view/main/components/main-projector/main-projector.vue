<template>
  <div class="outer">
    <div class="btns">
      <router-link :to="{ path: '/edit', query: { prefix: prefix }}" tag="div">
        <div>
          <Icon type="md-create" size="22"/>
        </div>
      </router-link>
      <div @click="deleteEntity" style="margin-left:10px;">
        <Icon type="md-trash" size="24"/>
      </div>
    </div>
    <div class="headpic">
      <img :src="noPic? defaultUrl: staticPath+ pics[0].url">
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
        <div style="min-width:50px;">备忘: </div>
        <div>{{ tips }}</div>
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
  name: 'mainProjector',
  props: ['name', 'prefix', 'tips', 'pics'],
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
    noPic: function(){
      return this.pics.length=== 0? true: false;
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
        url: '/delete/project',
        data: {prefix: this.prefix}
      }).then((res) => {
        if(res.state){
          this.$store.commit('deleteEntity', this.prefix);
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