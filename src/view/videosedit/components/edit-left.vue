<template>
  <div class="left">
    <div class="outer">
      <div class="header">
        <img src="./source/logo.png" alt="">
      </div>
      <div class="video-ground">
        <div style="line-height:0;background-color:#000;">
          <video v-if="current.video" :src="staticPath+ current.video" :poster="staticPath+ current.poster" controls="controls"></video>
          <div v-else style="color:#aeaeae;width:320px;display:flex;justify-content:center;align-items:center;min-height:198px;border:1px dashed #aeaeae;line-height:0;">
            + 视频
          </div>
        </div>
      </div>
      <div class="draglist">
        <div class="text-ground">
          <div class="name">
            <div v-if="current.name">{{ current.name }}</div>
          </div>
          <div class="content">
            <div v-if="current.content"> {{current.content}} </div>
            <div v-else style="display:flex;justify-content:center;align-items:center;min-height:100px;border:1px dashed #aeaeae;"> + 视频文本内容 </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from '@/libs/api.form'
import { apiPath, staticPath } from '@/config'
export default {
  name: 'videosedit-left',
  components: {
  },
  data(){
    return {
      apiPath: apiPath,
      staticPath: staticPath,
    }
  },
  computed:{
    timestamp:function(){
      return this.$store.getters['videos/timestamp'];
    },
    current: {
      set: function(){},
      get: function(){
        return Object.assign({}, this.$store.getters['videos/current']());
      }
    }
  },
  watch:{
    current:function(){
      console.log(this.current)
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
  position: relative;
}

.draglist {
  position: relative;
  cursor: pointer;
  width: 320px;
  height: 568px;
  overflow-y: auto; 
  border:1px dashed #aeaeae;
  padding-top: 238px;
  z-index: -1;
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

.outer .header{
  position: absolute;
  height: 40px;
  width: 320px;
  background-color: #69cab7;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header img{
  height: 30px;
}

.video-ground{
  position: absolute;
  top:40px;
}

.video-ground video{
  height: 198px;
  width: 320px;
}

.text-ground{
  padding: 10px;
}

.text-ground .name{
  line-height: 2;
  font-size: 24px;
}

.text-ground .content{
  color: #aeaeae;
  text-align: justify;
  line-height: 2;
  font-size: 12px;
}

</style>