<template>
  <div class="outer">
    <div class="inner">
      <div style="font-size:24px;text-align:left;width:100%;border-bottom:1px solid #aeaeae;margin-bottom:10px;">
        添加    
      </div>
      <div>
        <!-- <input v-show="false" type="file" ref="file_ground" @change="uploadSelected" accept=".jpg"/> -->
        <input v-show="false" type="file" ref="file_ground" multiple="multiple" @change="uploadSelected" accept=".jpg"/>
        <div style="display:flex;align-items:center;">
          <div style="margin-right:10px;">图片上传:</div>
          <Button  type="dashed" @click="uploadPre">选择图片</Button>
          <div v-show="!checkBeforeState" style="margin-left:10px;">单个图片500kb以内，最多5张</div>
          <div v-show="checkBeforeState" style="margin-left:10px;">共选择{{ nums }}个文件</div>
        </div>
        
        <div style="display:flex;align-items:center;margin-top:20px;">
          <div style="margin-right:10px;">异步加载:</div>
          <i-switch v-model="async" />
        </div>
        
        <Button v-show="checkBeforeState" style="margin-top:20px;" type="primary"
          @click="upload"
        >上传</Button>
      </div>
      <div v-show="IS_UPLOADING" class="add-inter">
        <div v-for="ele in uploading_arr" style="height: 32px; color:#fff;">
          {{ ele.name }}:{{ ele.percent? ele.percent: '0%' }}
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
import { Button, Switch } from 'iview'
export default {
  name: 'edit-add',
  mixins: [ alertMixin ],
  components: {
    Button, 
    'i-switch':Switch,
  },
  data(){
    return {
      //图片是否异步
      async: true,
      //选择的图片数量
      nums: null,
      checkBeforeState: false,
      IS_UPLOADING: false,
      uploading_arr: [],
    }
  },
  computed:{

  },
  methods: {
    /**
     * [获取token及建立transfer启动循环上传]
     */
    upload(){
      let files= Array.from(this.$refs['file_ground'].files);
      let pointer= this.$store.getters.currentPicNum;
      let prefix= this.$store.getters.prefix;
      let timestamp= new Date().format("yyyy_MM_dd_hh_mm_ss");

      this.IS_UPLOADING= true;
      axios.post({
        url: '/uploads',
        data: {
          prefix: prefix,
          timestamp: timestamp,
          num: files.length,
        }
      }).then(res => {
        if(res.state){
          let pics= res.data.pics;
          let num= files.length;
          //创建一个非响应式的，用于方法间传递数据的对象
          this._upload_transfer= null;
          this._upload_transfer= {
            _isVue: true,
            files: files,
            token: res.data.token,
            pics: res.data.pics,
            countDown: 0,
          }
          this.doUpload();
        } 
      }).catch(err => {
        if(err){
          console.log(err)
          this.callAlert({
            type: 'error',
            msg: '上传失败，请刷新后重试'
          });
        }
        //回滚服务器数据
        axios.post({
          url: '/rollback/uploads',
          data: {
            prefix: prefix,
            pointer: pointer,
            nums: files.length,
          }
        }).then(res => {
          this.IS_UPLOADING= false;
        }).catch(err => {
          this.IS_UPLOADING= false;
        })
      });
    },

    /**
     * [循环上传动作]
     */
    doUpload(){
      let transfer= this._upload_transfer;
      //完成了循环任务
      if(transfer.countDown>= this.nums){
        this.checkBeforeState= false;
        this.$store.commit('addPics', transfer.pics);
        //this.$el.querySelector("input").files= 0;
        this.$el.querySelector("input").value= '';
        return;
      }
      new Promise((resolve, reject) => {
        let observer = {
          next: (resp) => {
            console.log(typeof resp.total.percent)
            this.uploading_arr[transfer.countDown].percent= resp.total.percent.toFixed(2);
          },
          error: (err) => {
            transfer.countDown++;
            this.uploading_arr[transfer.countDown].percent= '上传失败，删除后重新上传';
            reject(err);
          }, 
          complete: (resp) => {
            transfer.countDown++;
            resolve(resp);
          }
        }
        let observable = qiniu.upload(transfer.files[transfer.countDown], transfer.pics[transfer.countDown].url, transfer.token);
        let subscription = observable.subscribe(observer);
      }).then(resolve => {
        this.doUpload();
      }).catch(err => {
        if(err){
          console.log(err);
        }
      })
    },

    /**
     * [uploadSelected description]
     * @return {[type]} [description]
     */
    uploadSelected(){
      let arr= Array.from(this.$refs.file_ground.files);
      if(arr.length=== 0 || arr.length> 5) return;
      let check= this.uploadCheck(arr);
      if(check){
        this.callAlert({
          type: 'error',
          msg: check
        });
        return;
      }
      this.nums= arr.length;
      this.checkBeforeState= true;
    },

    /**
     * [传递点击动作，拦截频繁点击]
     */
    uploadPre(){
      if(this.IS_UPLOADING){
        this.callAlert({
          type: 'error',
          msg: '上传队列繁忙，稍后再试',
        })
        return;
      };
      this.$refs.file_ground.click();
    },
    
    /**
     * [检查上传文件]
     * @param  { Array<File> } files [已经array.from过得文件数组]
     * @return { 如果有文件不合规，则返回存有名字的数组，否则返回null }
     */
    uploadCheck(files){
      let arr=[];
      this.uploading_arr.splice(0);
      files.forEach( ele => {
        if(ele.size> 1024*50000){
          arr.push({
            name: ele.name
          })
        } else {
          this.uploading_arr.push({
            name: ele.name,
            percent: null,
          })
        }
      });
      if(arr.length!== 0){
        let msg= ``;
        for(let i=0; i< arr.length; i++){
          msg+= '【'+ arr[i].name+'】\n';
        }
        return msg+ '文件不合规';
      }
      return null;
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