<template>
  <div class="outer">
    <div class="inner">
      <div style="font-size:24px;text-align:left;width:100%;border-bottom:1px solid #aeaeae;margin-bottom:10px;">
        添加    
      </div>
      <div>
        <!-- <input v-show="false" type="file" ref="file_ground" @change="uploadSelected" accept=".jpg"/> -->
        <input v-show="false" type="file" ref="file_ground" @change="filesSelected"/>

        <div style="display:flex;align-items:center;margin-top:20px;">
          <div style="margin-right:10px;">视频上传:</div>
          <Button  type="dashed" @click="selectPics('video')"> {{ current.video? '更改视频地址': '上传视频'}}</Button>
        </div>

        <div style="display:flex;align-items:center;margin-top:20px;">
          <div style="margin-right:10px;">视频首图:</div>
          <Button  type="dashed" @click="selectPics('poster')">{{ current.poster? '更改视频首图': '上传首图'}}</Button>
          <div style="margin-left:10px;">单个图片500kb以内</div>
        </div>
        
        <div style="display:flex;align-items:center;margin-top:20px;">
          <div style="margin-right:10px;">视频标题:</div>
          <Input v-model="current.name" style="width:100px;flex-grow:2;" placeholder="视频标题"
          @on-blur="changeAttr('name')"/>
        </div>

        <div style="display:flex;align-items:center;margin-top:20px;">
          <div style="margin-right:10px;">视频文本:</div>
          <div>
            <Input v-model="current.content" type="textarea" placeholder="100个字符以内" style="width: 400px"
            @on-blur="changeAttr('content')"/>
          </div>
        </div>

        <div style="display:flex;align-items:center;margin-top:20px;">
          <div style="margin-right:10px;">外链地址:</div>
          <Input v-model="current.link" style="width:100px;flex-grow:2;" placeholder="以http开始的链接地址，用于外链推文"
          @on-blur="changeAttr('link')"/>
        </div>

      </div>
      <div v-show="IS_UPLOADING" class="add-inter">
        <div style="height: 32px; color:#fff;">
          {{ uploading.name }}:{{ uploading.percent? uploading.percent: '0%' }}
        </div>
        <div style="cursor:pointer;color:#fff;position:absolute;bottom:10px;right:10px;" @click="IS_UPLOADING= false">/ close</div>
      </div>
    </div>
  </div>
</template>
<script>
//混入
import { alertMixin } from '@/mixin'
import axios from '@/libs/api.form'
import * as qiniu from 'qiniu-js'

//组件
import { Button, Input } from 'iview'
export default {
  name: 'edit-add',
  mixins: [ alertMixin ],
  components: {
    Button, Input
  },
  created(){
    this.current=Object.assign({}, this.$store.getters['videos/current']());
  },
  data(){
    return {
      //选择的图片数量
      nums: null,
      IS_UPLOADING: false,
      //判断当前要上传的是图片还是视频
      UPLOAD_CALLER: null,
      uploading: {
        name: null,
        percent: null,
      },
    }
  },
  methods: {
    selectPics(caller){
      this.UPLOAD_CALLER= caller;
      if(this.IS_UPLOADING){
        this.callAlert({
          type: 'error',
          msg: '上传队列繁忙，稍后再试',
        })
        return;
      };
      this.$refs.file_ground.click();
    },
    
    filesSelected(){
      let arr= Array.from(this.$refs.file_ground.files);
      let check= this.checkBeforeUpload(arr);
      if(check){
        this.callAlert({
          type: 'error',
          msg: check
        });
        return;
      }
      this.uploading.name= arr[0].name;
      this._nums= arr.length;
      this.CHECK_BEFORE_STATE= true;
      this.upload();
    },

    upload(){
      this.IS_UPLOADING= true;
      let file= this.$refs.file_ground.files[0];
      if(!file) return;

      let prefix= this.$store.getters['videos/prefix'];
      let timestamp= new Date().format("yyyy_MM_dd_hh_mm_ss");
      let caller= this.UPLOAD_CALLER;
      axios.post({
        url: '/videos/change/url',
        data: {
          prefix: prefix,
          timestamp: timestamp,
          caller: caller
        }
      }).then( res => {
        if(res.state){
          let token= res.data.token;
          let observer = {
            next:(resp) => {
              console.log(resp.total.percent);
            },
            error:(err) => {
              this.IS_UPLOADING= false;
              throw(err);
            }, 
            complete:(resp) => {
              console.log(resp.key)
              this.IS_UPLOADING= false;
              this.$store.commit('videos/addUrl', {caller: res.data.caller, url: resp.key});
            }
          }
          let observable = qiniu.upload(file, res.data.url, res.data.token);
          let subscription = observable.subscribe(observer) 
        }
      }).catch(err => {
        this.IS_UPLOADING= false;
        console.log(err);
      });
    },
    
    checkBeforeUpload(files){
      let arr=[];
      files.forEach( ele => {
        if(ele.size> (this.UPLOAD_CALLER==='poster'? 1024*500: 1024*1024*500)){
          arr.push({
            name: ele.name
          })
        }
      });
      if(arr.length!== 0){
        let msg= ``;
        for(let i=0; i< arr.length; i++){
          msg+= '【'+ arr[i].name+'】\n';
        }
        return msg+ '文件过大';
      }
      return null;
    },

    changeAttr(caller){
      let prefix= this.$store.getters['videos/prefix'];
      let oldVal= this.$store.getters['videos/current']()[caller];
      let newVal= this.current[caller];
      if(newVal=== oldVal) return;
      
      axios.post({
        url: '/videos/change/attr',
        data: {
          prefix: prefix,
          caller: caller,
          val: newVal.trim(),
        }
      }).then(res => {
        if(res.state){
          this.$store.commit('videos/changeAttr',{caller: caller, val:newVal});
        }
      }).catch(err => {
        if(err) console.log(err);
      })
    },
  }
}
</script>

<style scoped>
.outer {
  display: flex;
  align-items: center;
  position: relative;
}

.inner {
  position: relative;
  min-height: 568px; 
}

.add-inter {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
}
</style>