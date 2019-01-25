<template>
  <div :style="{minHeight: HEIGHT+ 'px', backgroundColor:'#f4f5f5', display: 'flex', 'justify-content': 'center'}">
    <div class="container">
      <div ref="take_photo" class="container-left">
        <div style="display:absolute;top:0;left:0;height:1px;width:1px;">
          <div style="height:1px;width:1px;" id="copy-btn" data-clipboard-target="#copy-input" onclick=""></div>
          <input style="height:1px;width:1px;" id="copy-input" type="text">
        </div>
<!--         <div class="left-head">
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div> -->
<!-- 响应式菜单 -->
        <responsive-menu @html-to-image="funDownload"></responsive-menu>
<!-- 基本信息 -->
        <div class="left-head" resposive-menu-ele="基本信息">
          <div class="common-title">
            <div>基本信息</div>
            <div @click="callResposiveMenu">
              <i class="iconfont icon-menu"></i>
            </div>
          </div>
          <div style="display:flex;justify-content: space-between;">
            <div class="baseinfo">
              <baseinfo-tag 
                v-for="(ele, index) in baseInfo" 
                :tagname="ele.tagname" 
                :val="ele.val"
                :text="ele.text" 
                :key="index"
              ></baseinfo-tag>
            </div>
            <div class="myphoto"></div>
          </div>
        </div>
<!-- 技能熟练度 -->
        <div class="left-head" resposive-menu-ele="技能熟练度">
          <div class="common-title" @click="funDownload">技能熟练度</div>
          <process-bar v-for="(skill, index) in skills" :ele="skill" :key="index"></process-bar>
        </div>
<!-- 工作经验 -->
        <div class="left-head" resposive-menu-ele="工作经验">
          <div class="common-title">工作经验</div>
          <div style="padding:0 10px;">
            <work-exp v-for="(job, index) in jobs" :job="job" :key="index" class="work-exp"></work-exp>
          </div>
        </div>

        <div class="left-head" style="margin-bottom:20px;" resposive-menu-ele="项目展示">
          <div class="common-title">项目展示</div>
          <div>
            
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
//环境配置

//静态资源
import './source/font/iconfont.css'
//引用外部插件
import html2canvas from 'html2canvas'
//混入
import { alertMixin, sizeMixin } from '@/mixin'
//工具方法
import { getElementTop } from '@/libs/tools'
//子组件
import baseinfoTag from './components/baseinfo-tag.vue'
import workExp from './components/work-exp.vue'
import processBar from './components/process-bar/process-bar.vue'
import responsiveMenu from './components/responsive-menu/responsive-menu.vue'
export default {
  name: 'recume',
  mixins: [alertMixin, sizeMixin],
  components: {
    baseinfoTag, processBar, workExp, responsiveMenu
  },
  mounted(){
    //响应式菜单
    this.$store.commit('RESPONSIVE_MENU/init')
  },
  data: function(){
  	return {
      baseInfo:[
        {tagname: '姓名', val:'丁红开'},
        {tagname: '出生日期', val:'1989/ 04/ 22'},
        {tagname: '学历', val:'大专(冶金工程)'},
        {tagname: '手机', val:'15710560343', text: '15710560343 (微信)'},
        {tagname: '邮箱', val:'foolseward@163.com'},
        {tagname: '工作状态', val: '在职 (一星期内到岗)'},
      ],

      skills: [
        {icon: 'vue', name: 'Vue全家桶及Iview', current: 490, total: 655},
        {icon: 'javascript', name: 'js及es6', current: 550, total: 655},
        {icon: 'html5', name: 'html5', current: 550, total: 655},
        {icon: 'css3', name: 'css3', current: 550, total: 655},
        {icon: 'canvas', name: 'webgl、canvas及svg', current: 100, total: 655},
        {icon: 'wxmini', name: '微信小程序', current: 180, total: 655},
        {icon: 'node', name: 'node', current: 280, total: 655},
        {icon: 'webpack', name: 'webpack', current: 280, total: 655},
        {icon: 'git', name: 'git', current: 180, total: 655},
        {icon: 'linux', name: 'linux', current: 130, total: 655},
      ],

      jobs: [
        {company: '辽宁宝银', time: '2017/05 - 2018/07', salary: '3500',
         describe: '维护更新旧项目，新项目技术选型、开发及优化，以及前端招聘面试'
        },
        {company: '17旅居', time: '2018/07 - 至今', salary: '6000',
         describe: '新项目技术选型、开发及优化，配合宣传和美工改善页面效果，辅助产品经理制作页面原型'
        },
      ],
  	}
  },
  computed: {
    isPhone:function(){
      return this.$store.getters.height< 1000;
    },
  },
  methods: {
    callResposiveMenu(){
      this.$store.getters['RESPONSIVE_MENU/status']();
    },
    html2image(){
      return new Promise((res, rej) => {
        let ele= this.$refs.take_photo;
        var width = ele.offsetWidth; //获取dom 宽度
        var height = ele.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
        var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            // logging: true, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height,
            useCORS: true // 【重要】开启跨域配置
        };
        html2canvas(ele, opts).then(function (canvas) {

          var context = canvas.getContext('2d');
          // 【重要】关闭抗锯齿
          context.mozImageSmoothingEnabled = false;
          context.webkitImageSmoothingEnabled = false;
          context.msImageSmoothingEnabled = false;
          context.imageSmoothingEnabled = false;

          //document.body.appendChild(canvas);
          res(canvas)
        });
      })
    },
    canvasToBlob(canvas){
      return this.dataURLToBlob(this.canvasToDataURL(canvas));
    },
    funDownload() {
      this.html2image().then(canvas => {
        let filename= 'aaa.jpg';
        let content= this.canvasToBlob(canvas);
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      })
    },
    dataURLToBlob(dataurl){
      var arr = dataurl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    },
    canvasToDataURL(canvas, format, quality){
      return canvas.toDataURL(format||'image/jpeg', quality||1.0);
    }
  },
}	
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
  width: 750px;
}
.container-left{
  position: relative;
  width: 750px;
}

.left-head{
  margin:20px 20px;
  padding: 20px 20px 10px 20px;
  background-color:#fff;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.05);
}
.common-title {
  display: flex;
  justify-content: space-between;
  color: #5f5f5f;
  font-size: 32px;
  line-height: 2;
  border-bottom: 1px solid #5f5f5f;
  margin-bottom: 40px;
}
.common-title .iconfont{
  display: inline;
  line-height: 1;
  font-size: 36px;
}
.left-head .myphoto{
  width: 150px;
  height: 150px;
  background-image: url(./source/myphoto.png);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.left-head .baseinfo{
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.baseinfo div{
  font-size: 24px;
}
.work-exp{
  margin-bottom: 40px;
}
@media screen and (min-width: 1000px) {
/*ignore*/
  .container{
    width: 1000px;
  }
  .container-left{
    position: relative;
    width: 720px;
    margin-right: 20px;
  }

  .left-head{
    margin: 0;
    margin-top: 20px;
    padding: 10px 10px 5px 10px;
    background-color:#fff;box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  }
  .common-title {
    color: #5f5f5f;
    font-size: 18px;
    line-height: 2;
    border-bottom: 1px solid #5f5f5f;
    margin-bottom: 20px;
  }
  .common-title .iconfont{
    display: none;
  }
  .left-head .myphoto{
    width: 100px;
    height: 100px;
  }
  .left-head .baseinfo{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  .baseinfo div{
    font-size: 14px;
  }
  .work-exp{
    margin-bottom: 20px;
  }
}
</style> 