<template>
  <div class="ground" :style="{'height': HEIGHT+ 'px', 'overflow':'hidden'}">
    <div class="header">
      <img src="./source/header-logo.png" alt="">
    </div>
    <div class="container">
      <div class="shouji">
        <div :style="TRANSFORM_FIX">
          <img src="./source/shouji.png" alt="">
          <div class="content">
            <div class="change">
  <!-- 可更换区域 -->
              <div v-if="PAGE_ENTER_PATH=== 'share'" class="showpic" style="line-height: 0;">
                <img src="http://qiniu.17lvju.com/lnrly_2018_11_07_14_46_27.jpg" alt="">
              </div>
              <div v-if="PAGE_ENTER_PATH=== 'share'" class="showtitle">
                铁马秋风大散关铁马秋风大散关铁马秋风大散关铁马秋风大散关铁马秋风大散关铁马秋风大散关铁马秋风大散关铁马秋风大散关铁马秋风大散关
              </div>
              <div v-if="PAGE_ENTER_PATH=== 'share'" class="showmoney">
                ￥12345
              </div>
  <!-- 可更换区域 -->
              <div v-if="PAGE_ENTER_PATH=== 'registe'" class="changepic" style="line-height: 0;">
                <img src="@/assets/pic-logo.png" alt="">
              </div>
              <div v-if="PAGE_ENTER_PATH=== 'registe'" class="changelogo" style="line-height: 0;">
                <img src="@/assets/show-logo.png" alt="">
              </div>
              <div v-if="PAGE_ENTER_PATH=== 'registe'" class="changeword" style="line-height: 0;">
                <img src="./source/word.png" alt="">
              </div>
  <!-- 可更换区域 -->
              <div class="copy">
                <div class="switch-btns">
                  <div :class="{'switch-btn':true, 'selected': CURRENT_COPY=== 'ios'}" @click="selectApp('ios')">
                    <i class="iconfont icon-ios"></i>苹果下载
                  </div>
                  <div :class="{'switch-btn':true, 'selected': CURRENT_COPY=== 'android'}" @click="selectApp('android')">
                    <i class="iconfont icon-android"></i>安卓下载
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="copy-ground" :style="TRANSFORM_FIX">
            <input id="copy" type="text" style="z-index:10;">
            <div class="copy-btn" data-clipboard-target="#copy" onclick="">
              复制链接
            </div>
          </div>
          <div class="fir">
            提示：点击复制链接用手机内置浏览器打开，
                           点击下载
          </div>
          <div class="sec" :style="{color: CURRENT_COPY=== 'ios'? '#21A8B6': '#fff'}">
            安装教程
          </div>
          <div class="blank" :style="BLANK_FIX"></div>
        </div>
      </div>
    </div>
    <div class="decorate decorate-fir">
      <img src="./source/bang.png" alt="">
    </div>
    <div class="decorate decorate-sec">
      <img src="./source/blue-yuan.png" alt="">
    </div>
    <div class="decorate decorate-thr">
      <img src="./source/bang.png" alt="">
    </div>
    <div class="decorate decorate-fou">
      <img src="./source/white-yuan.png" alt="">
    </div>
    <div class="decorate decorate-fiv">
      <img src="./source/white-yuan.png" alt="">
    </div>
    <div class="decorate decorate-six">
      <img src="./source/white-yuan.png" alt="">
    </div>
    <div class="decorate decorate-sev">
      <img src="./source/blue-yuan.png" alt="">
    </div>
    <div class="decorate decorate-eig">
      <img src="./source/white-yuan.png" alt="">
    </div>
  </div>
</template>

<script>
//环境配置

//静态资源
import './source/font/iconfont.css'
//引用外部插件
import ClipboardJS from 'clipboard'
//混入与工具方法
import { sizeMixin } from '@/mixin'

let type= 'registe';
let bottomFixFunc= function(){
  let fix= window.innerHeight/667;
  let bottom_fix= (667- window.innerHeight)*100/(2* window.innerWidth);
  if(fix>= 1){
    fix= null;
    bottom_fix= null;
  }
  this.TRANSFORM_FIX.transform= 'scale('+ fix+ ')';
  this.BLANK_FIX.height= (this.PAGE_ENTER_PATH=== 'share'? 16: 20)+ bottom_fix+ 'vw';
}
export default {
  name: '',
  mixins: [ sizeMixin ],
  beforeRouteEnter: function(to, from, next){
    if(JSON.stringify(to.query).length!== 2){
      type= 'share';
      next();
    } else {
      next();
    };
  },
  mounted:function(){
    var clipboard = new ClipboardJS('.copy-btn');

    clipboard.on('success', function(e){
      alert("复制成功！");
      e.clearSelection();
    });

    clipboard.on('error', function(e){
      alert("您的浏览器不支持自动复制，请手动复制链接！");
    });
    this.PAGE_ENTER_PATH= type;
    bottomFixFunc.bind(this)();

    let u= navigator.userAgent;
    if(u.indexOf('iPhone')=== -1){
      this.selectApp('android');
    } else {
      this.selectApp('ios');
    }

    this.$el.querySelector("#copy").value= this.IOS_URL;
  },
  data: function(){
  	return {
      //registe | share
      PAGE_ENTER_PATH: 'registe',
      CURRENT_COPY: 'ios',
      IOS_URL: 'ios.com',
      ANDROID_URL: 'android.com',
      //对于手机屏幕小于667px的垫片
      SHOW_FIX:{
        transform: null,
      },
      TRANSFORM_FIX:{
        'transform-origin': 'top',
        'transform': null,
      },
      BLANK_FIX:{
        height: null,
      },
  	}
  },
  methods: {
    selectApp(app){
      this.CURRENT_COPY= app;
      this.$el.querySelector("#copy").value= this[app.toUpperCase()+ '_URL'];
    },
  },
}	
</script>

<style scoped>
.ground {
  background-color: transparent;
  position: relative;
  overflow: hidden;
}
.header{
  display: flex;
  justify-content: center;
  padding-top: 25px;
  background-color: #21A8B6;
}
.header img{
  width: 233px;
  height: 69px;
}

.container{
  position: relative;
  padding: 29px 66px 0 66px;
  background-color: #21A8B6;
}
.shouji{
  position: relative;
}
.shouji img{
  line-height: 0;
  width: 100%;
}
.content{
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  left: 55px;
  top:143px;
  width: 508px;
}
.content .change{
  height: 575px;
}
.showpic{
  height: 339px;
}
.showpic img{
  width: 100%;
  height: 100%;
}
.showtitle{
  display: flex;
  overflow: hidden;
  text-overflow:ellipsis;
  line-height: 1.2;
  font-size: 36px;
  margin: 21px;
  max-height: 80px;
  min-height: 80px;
}
.showmoney{
  line-height: 1.2;
  overflow: hidden;
  font-size: 36px;
  margin: 21px;
  max-height: 80px;
}
.changepic, .changelogo, .changeword{
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top:40px;
}
.changepic img{
  width: 231px;
  height: 231px;
}
.changelogo img{
  width: 156px;
  height: 71px;
}
.changeword img{
  width: 389px;
  height: 42px
}

.copy{
  display: flex;
  flex-direction: column;
  margin:21px;
}
.switch-btns{
  display: flex;
  justify-content: space-between;
}
.switch-btn{
  color: #21A8B6;
  background-color: #fff;
  border: 1px solid #21A8B6;
  font-size: 32px;
  width: 224px;
  height: 60px;
  line-height: 60px;
  border-radius: 8px;
  transition: all 0.1s ease-in; 
}
.selected{
  color:#fff;
  background-color: #21A8B6;
  border: none;
}
.iconfont{
  font-size: 42px;
  color: #21A8B6;
  margin:0 10px 0 10px;
  line-height: 1;
}
.selected .iconfont{
  color: #fff;
}
.copy-ground{
  position: relative;
  border-radius: 10px;
}
.copy-ground input{
  height: 60px;
  border: 1px solid #21A8B6;
  border-radius: 10px;
  padding-left:20px;
  width: 466px;
}
.copy-btn{
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  background-color: #21A8B6;
  width: 138px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
  border-radius: 0 10px 10px 0;
}
.footer{
  position: absolute;
  left: -66px;
  bottom: 0;
  line-height: 0;
/*  height: 673px;*/
  width: 750px;
  background-image: url(./source/yun.png);
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  font-size: 32px;
}
.footer .fir{
  text-align: center;
  margin-top: 162px;
  width: 615px;
  line-height: 1.5;
}
.footer .sec{
  text-align: center;
  color:#21A8B6;
  line-height: 1.5;
}
.footer .blank{
  width: 750px;
  height: 20vw;
  background-color: #fff;
}
.decorate img{
  width: 100%;
}
.decorate-fir{
  position: absolute;
  line-height: 0;
  top: 0;
  right: 85px;
  height: 150px;
  width:129px;
}
.decorate-sec{
  position: absolute;
  line-height: 0;
  top: 159px;
  right: 119px;
  height: 34px;
  width: 34px;
}
.decorate-thr{
  position: absolute;
  line-height: 0;
  top: 207px;
  left: -30px;
  height: 111px;
  width: 125px;
}
.decorate-fou{
  position: absolute;
  line-height: 0;
  top: 330px;
  left: 42px;
  height: 61px;
  width: 61px;
}
.decorate-fiv{
  position: absolute;
  line-height: 0;
  top: 498px;
  right: 53px;
  height: 29px;
  width: 29px;
}
.decorate-six{
  position: absolute;
  line-height: 0;
  top: 591px;
  left: 62px;
  height: 49px;
  width: 49px;
}
.decorate-sev{
  position: absolute;
  line-height: 0;
  top: 870px;
  left: -34px;
  height: 96px;
  width: 96px;
}
.decorate-eig{
  position: absolute;
  line-height: 0;
  top: 768px;
  right: -24px;
  height: 49px;
  width: 49px;
}
</style> 