<template>
  <div class="outer">
    <div class="inner">
      <div style="font-size:24px;text-align:left;width:100%;border-bottom:1px solid #aeaeae;margin-bottom:10px;">
        修改    
      </div>
      <div>
        <input v-show="false" type="file" ref="file_ground" @change="filesSelected" accept=".jpg"/>
        <div style="display:flex;align-items:center;">
          <div style="margin-right:10px;">图片更换:</div>
          <Button  type="dashed" @click="selectPics">选择图片</Button>
          <div v-show="!CHECK_BEFORE_STATE" style="margin-left:10px;">单个图片500kb以内</div>
        </div>
        
        <div style="display:flex;align-items:center;margin-top:20px;">
          <div style="margin-right:10px;">异步加载:</div>
          <i-switch v-model="async" @on-change="changeAsync"/>
        </div>

        <div style="display:flex;align-items:center;margin-top:20px;">
          <div style="margin-right:10px;">跳转链接:</div>
          <Input v-model="redirectUrl" placeholder="输入要跳转的页面" style="width: 300px" 
          @on-focus="URL_SHOW_STATE= false"
          @on-blur="changeRedirectUrl"/>
          <div style="width:100px;padding-left: 10px;">
            <div v-if="!URL_SHOW_STATE" @click="URL_SHOW_STATE= true">
              <Icon size="24" type="md-paper-plane"/>
            </div>
            <Select v-if="URL_SHOW_STATE" @on-change="selectDirectUrl">
               <Option v-for="item in entities" :value="item.prefix" :key="item.prefix">
                {{ item.prefix+ ":"+ item.name }}
               </Option>
            </Select>
          </div>
        </div>
        
        <div style="display:flex;align-items:center;margin-top:20px;">
          <Button type="error" @click="deletePic">删除</Button>
          <Button type="dashed" @click="emitState" style="margin-left:10px;">返回</Button>
        </div>
          
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
import { Button, Switch, Input, Select, Icon, Option } from 'iview'
export default {
  name: 'edit-change',
  mixins: [ alertMixin ],
  components: {
    Button, Input, Select, Icon, Option,
    'i-switch': Switch, 
  },
  data(){
    return {
      //选择的图片数量
      _nums: null,
      CHECK_BEFORE_STATE: false,
      URL_SHOW_STATE: false,
      //当前上传是否结束
      IS_UPLOADING: false,
    }
  },
  computed:{
    async:{
      set:function(a, b){
        console.log(this.async)
      },
      get:function(){
        return this.$store.getters.current.pics[this.$store.getters.currentPicNum].async;
      }
    },
    redirectUrl: {
      set:function(a, b){
        console.log(this.redirectUrl)
      },
      get:function(){
        return this.$store.getters.current.pics[this.$store.getters.currentPicNum].redirectUrl;
      }
    },
    entities: {
      get:function(){
        return this.$store.getters.entities;
      }
    }
  },
  methods: {

    selectPics(){
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
      this._nums= arr.length;
      this.CHECK_BEFORE_STATE= true;
      this.upload();
    },

    upload(){
      let file= this.$refs.file_ground.files[0];
      if(!file) return;

      let prefix= this.$store.getters.prefix;
      let timestamp= new Date().format("yyyy_MM_dd_hh_mm_ss");
      let pointer= this.$store.getters.currentPicNum;
      axios.post({
        url: '/change/url',
        data: {
          prefix: prefix,
          timestamp: timestamp,
          pointer: pointer
        }
      }).then( res => {
        if(res.state){
          let token= res.data.token;
          let observer = {
            next:(resp) => {
              console.log(resp.total.percent);
            },
            error:(err) => {
              console.log(err);
            }, 
            complete:(resp) => {
              this.$store.commit('changePath', res.data.url, pointer);
            }
          }
          let observable = qiniu.upload(file, res.data.url, res.data.token);
          let subscription = observable.subscribe(observer) 
        }
      }).catch(err => {
        console.log(err);
      });
    },
    
    checkBeforeUpload(files){
      let arr=[];
      files.forEach( ele => {
        if(ele.size> 1024*500){
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

    /**
     * [取消当前的选择状态]
     */
    emitState(){
      this.$store.commit('currentPicNum', -1);
      this.$emit('emit-state', true);
    },

    /**
     * [改变是否异步]
     */
    changeAsync(bol){
      let pointer= this.$store.getters.currentPicNum;
      axios.post({
        url:'/change/async',
        data: {
          prefix: this.$store.getters.prefix,
          pointer: pointer,
          async: bol
        }
      }).then( res => {
        if(res.state){
          this.$store.commit('changeAsync', bol, pointer);
        } else {
          this.callAlert({
            type: 'error',
            msg: res.msg,
          });
        }
      }).catch( err => {
        console.log(err)
        this.$store.commit('changeAsync', !bol, pointer);
        this.callAlert({
          type: 'error',
          msg: '数据更新失败，请刷新后重试'
        });
      })
    },
    /**
     * [改变跳转]
     */
    changeRedirectUrl($event){
      let redirectUrl= $event.target.value;
      this.changeRedirectUrlPost(redirectUrl);
    },
    selectDirectUrl(val){
      this.changeRedirectUrlPost(val);
      this.URL_SHOW_STATE= false;
    },
    changeRedirectUrlPost(redirectUrl){
      let pointer= this.$store.getters.currentPicNum;
      axios.post({
        url:'/change/redirect',
        data: {
          prefix: this.$store.getters.prefix,
          pointer: pointer,
          redirectUrl: redirectUrl
        }
      }).then( res => {
        if(res.state){
          this.$store.commit('changeRedirect', res.data.redirectUrl, pointer);
        } else {
          this.callAlert({
            type: 'error',
            msg: res.msg,
          });
        }
      }).catch( err => {
        console.log(err)
        this.callAlert({
          type: 'error',
          msg: '数据更新失败，请刷新后重试'
        });
      })
    },
    /**
     * [删除一个图片]
     */
    deletePic(){
      let pointer= this.$store.getters.currentPicNum;
      axios.post({
        url:'/delete/pic',
        data: {
          prefix: this.$store.getters.prefix,
          pointer: this.$store.getters.currentPicNum,
        }
      }).then( res => {
        if(res.state){
          this.$store.commit('deletePic', pointer);
          this.emitState();
        } else {
          this.callAlert({
            type: 'error',
            msg: res.msg,
          });
        }
      }).catch( err => {
        console.log(err)
        this.callAlert({
          type: 'error',
          msg: '数据更新失败，请刷新后重试'
        });
      })
    }
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
  min-height: 568px;
}
</style>