<template>
  <div ref="take_photo" class="container">
    <div class="left-container">
      <div style="position:absolute;z-index: 1000;" @click="funDownload">
        <i style="font-size: 24px;" class="iconfont icon-camera"></i>
      </div>
      <div class="my-photo">
        <div class="name">丁红开</div>
        <div class="job">web前端</div>
      </div>

      <div class="my-contact">
        <div class="title">
          <div class="text">CONTACT / 联系方式</div>
        </div>

        <div class="bodyer">
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-icon--"></i>
            </div>
            <div class="content">
              <div>Phone/手机</div>
              <div>15710560343</div>
            </div>
          </div>
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-youxiang"></i>
            </div>
            <div class="content">
              <div>Email/邮箱</div>
              <div>foolseward@163.com</div>
            </div>
          </div>
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-home"></i>
            </div>
            <div class="content">
              <div><a :href="MY_URL">HomePage/主页</a></div>
              <div><a :href="MY_URL">我的小站 (click)</a></div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-skill">
        <div class="title">
          <div class="text">SKILL / 职业技能</div>
        </div>

        <div class="bodyer">
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-vue"></i>
            </div>
            <div class="content">
              <div>Vue及全家桶</div>
              <div class="skill-bar">
                <div style="width:90px;"></div>
                <div style="width:10px"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-javascript"></i>
            </div>
            <div class="content">
              <div>Js及Es6</div>
              <div class="skill-bar">
                <div style="width:80px;"></div>
                <div style="width:20px"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-html5"></i>
            </div>
            <div class="content">
              <div>Html5及Css3</div>
              <div class="skill-bar">
                <div style="width:80px;"></div>
                <div style="width:20px"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-webpack"></i>
            </div>
            <div class="content">
              <div>Webpack</div>
              <div class="skill-bar">
                <div style="width:45px;"></div>
                <div style="width:55px"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-node"></i>
            </div>
            <div class="content">
              <div>Node</div>
              <div class="skill-bar">
                <div style="width:45px;"></div>
                <div style="width:55px"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-wxmini"></i>
            </div>
            <div class="content">
              <div>微信小程序</div>
              <div class="skill-bar">
                <div style="width:25px;"></div>
                <div style="width:75px"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="icon-outer">
              <i class="iconfont icon-canvas"></i>
            </div>
            <div class="content">
              <div>webgl、canvas及svg</div>
              <div class="skill-bar">
                <div style="width:25px;"></div>
                <div style="width:75px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-container">
      <div class="blocker">
        <div class="blocker-title">教育经历</div>
        <div class="blocker-bodyer" style="word-spacing: 10px;">
          2007/07—2011/09&nbsp;东北大学&nbsp;冶金工程(大专)
        </div>
      </div>

      <div class="blocker">
        <div class="blocker-title">外语能力</div>
        <div class="blocker-bodyer" style="word-spacing: 10px;">
          英语&nbsp;四级
        </div>
      </div>

      <div class="blocker">
        <div class="blocker-title">工作经历</div>
        <div class="blocker-bodyer">
          <div>
            <div style="font-size:16px;">辽宁宝银</div>
            <div>2017/05 - 2017/07</div>
          </div>
          <div>
            <div class="tag">薪 资：</div>
            <div>4000</div>
          </div>
          <div>
            <div class="tag">工作描述：</div>
            <div style="line-height:1.6;">
              1. 将老项目用vue分模块改写<br>
              2. 同城美推商城移动端<br>
              3. 同城美推小程序
            </div>
          </div>
        </div>
        <div class="blocker-bodyer">
          <div>
            <div style="font-size:16px;">17旅居</div>
            <div>2017/07 - 至今</div>
          </div>
          <div>
            <div class="tag">薪 资：</div>
            <div>5500</div>
          </div>
          <div>
            <div class="tag">工作描述：</div>
            <div style="line-height:1.6;">
              1. 线下活动的抽奖，开奖，投票页面<br>
              2. 安卓及ios引导页及内嵌webgl页面<br>
            </div>
          </div>
        </div>
      </div>

      <div class="blocker">
        <div class="blocker-title">项目经验</div>
        <div class="blocker-bodyer" style="word-spacing: 10px;line-height:1.6;word-spacing:20px;">
          我的小站：<a :href="MY_URL" style="color:#20c4cb;">{{ MY_LINK }}</a>  
        </div>
      </div>

      <div class="blocker">
        <div class="blocker-title">补充信息</div>
        <div class="blocker-bodyer" style="word-spacing: 10px;line-height:1.6;word-spacing:20px;">
          出生日期：1989/04/22<br>
          籍&nbsp;贯：辽宁葫芦岛<br>
          婚姻状况：未婚<br>
        </div>  
      </div>

       <div class="blocker">
        <div class="blocker-title">自我评价</div>
        <div class="blocker-bodyer" style="line-height:1.6;">
          编程是我最大的爱好，我的大部分业余时间都会用在强化已有
          知识和学习新知识上，喜欢有挑战的任务，既有成就感又能提高自己
          的技术
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件
import html2canvas from 'html2canvas'
//混入与工具方法

//子组件
export default {
  name: 'wps-resume',
  data: function(){
  	return {
      MY_LINK: 'click!',
      MY_URL: 'http://118.25.222.233:2333',
  	}
  },
  methods: {
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
      this.MY_LINK= this.MY_URL;
      new Promise((res, rej) => {
        setTimeout(() => {
          res(this.html2image())
        }, 100)
      }).then(canvas => {
        let filename= '简历_web前端_丁丁.jpg';
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
  }
}	
</script>

<style scoped>
@media screen and (min-width: 1000px){
/*ignore*/
a, a:hover, a:visited, a:link, a:active{ 
  text-decoration:none; 
  color:#fff; 
}
.iconfont{
  font-size: 32px;
  color: #20c4cb;
} 
.container{
  display: flex;
  min-height: 100px;
  width: 660px;
  margin:80px 0 80px 220px;
  overflow:hidden;
  box-shadow: -12px 12px 50px #aeaeae;
}

.left-container{
  z-index: 2;
  position: relative;
  width: 180px;
  min-height: 100px;
  background-color: #3e3e3e;
}

.my-photo{
  position: relative;
  line-height: 0;
  width: 180px;
  height: 180px;
  background-image: url('./source/myphoto.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.my-photo::before{
  line-height: 0;
  content: '';
  position: absolute;
  height: 72px;
  width: 360px;
  bottom:0;
  left: -161px;
  background-image: url('./source/sign.svg');
  background-repeat: no-repeat;
  background-size: 100%;
}
.my-photo .name{
  font-size: 16px;
  position: absolute;
  line-height: 1;
  color: #fff;
  bottom: 26px;
  left: 65px;
}
.my-photo .job{
  font-size: 12px;
  position: absolute;
  line-height: 1;
  color: #fff;
  bottom: 8px;
  left: 65px;
}

.title::before{
  line-height: 0;
  content: '';
  position: absolute;
  height: 36px;
  width: 180px;
  bottom:0;
  left: 9px;
  background-image: url('./source/sign.svg');
  background-repeat: no-repeat;
  background-size: 100%;
}
.title .text{
  color:#fff;
  position: absolute;
  font-size: 12px;
  left: 50px;
  bottom: 0;
  line-height: 1;
  height: 40px;
  line-height: 50px;
}

.my-contact, .my-skill{
  position: relative;
  padding-top: 10px;
}
.my-contact .title, .my-skill .title{
  position: relative;
  height: 40px;
  line-height: 50px;
}

.my-contact .bodyer, .my-skill .bodyer{
  color: #fff;
  position: relative;
  padding: 20px 0 0 10px;
}
.bodyer > div{
  display: flex;
  margin-bottom: 10px;
}
.bodyer .icon-outer{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  box-shadow: 2px 2px 5px #252525;
  transform: scale(0.8);
}
.content{
  transform-origin: left;
  transform:scale(0.8);
  padding-left: 5px;
}
.content > div:nth-child(1){
  font-weight: bold;
  font-size: 14px;
}
.content > div:nth-child(2){
  font-size: 12px;
}
.skill-bar{
  margin-top: 6px;
  background-color: #fff;
  height: 4px;
  width: 100px;
  display: flex;
}
.skill-bar> div:nth-child(1){
  height: 4px;
  background-color: #20c4cb;
}
.skill-bar> div:nth-child(2){
  height: 4px;
  background-color: #167f7f;
}

.right-container{
  width: 480px;
  max-height: 814px;
  overflow: auto;
  position: relative;
  padding: 20px 20px 20px 30px;
}
.blocker{
  margin-bottom: 20px;
}
.blocker-title{
  color:#20c4cb;
  letter-spacing: 2px;
  font-size:14px;
  padding-bottom: 5px;
  border-bottom: 1px solid #aeaeae;
  font-weight: bold;
}
.blocker-bodyer{
  padding: 10px 20px;
  font-size: 12px;
}
.blocker-bodyer>div{
  display: flex;
  margin-bottom: 5px;
}
.blocker-bodyer>div:nth-child(1){
  justify-content: space-between;
  align-items: flex-end;
}
.blocker-bodyer .tag{
  min-width: 60px;
  word-spacing: 20px;
}

.right-container::-webkit-scrollbar {
  width: 2px;
  background-color: #167f7f;
}
.right-container::-webkit-scrollbar-track {
    background-color: #167f7f;
}
.right-container::-webkit-scrollbar-thumb {
    background-color: #20c4cb;  
}
}
</style> 