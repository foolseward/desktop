<template>
  <div>
    <div @click="beginLucky" style="position:relative;line-height: 0;">
      <svg width="90vw" height="90vw" viewBox="0 0 300 300" v-html="luckyStr"></svg>
      <svg width="200" height="200" style="position: absolute;left:50%;top:50%;transform:translate3d(-50%, -50%, 0);">
        <circle cx="100" cy="100" r="20" fill="#fff"></circle>
      </svg>
    </div>
  </div>
</template> 

<script>
import { heightMixin } from '@/mixin'
/*
{
  type: 转盘还是方盘,
  diy_background_image: 转盘自定义背景地址,
  diy_pointer_image: 转盘自定义指针地址,
  color_arr: 颜色数组,
  prize_arr: [{
    id: 数据库中奖品的id,
    name: 数据库中奖品的第一行
    name_suffix: 数据中奖品描述第二行
    name_color: 文字颜色，默认黑色,
    image: 奖品描述图,
    
  }],
}
 */
export default {
  name:'star',
  mixins: [heightMixin],
  beforeRouteEnter: (to, from, next) => {
    document.querySelector("title").innerText= "17大转盘";
    next();
  },
  mounted(){
    this.drawLucky(6);
  },
  methods: {
    beginLucky(){
      let svgEle= this.$el.querySelector("svg");
      svgEle.style.transition= `none`;
      svgEle.style.transform= `rotateZ(0deg)`;
      this.$nextTick(() => {
        let time= (5+ Math.random()* 2).toFixed(2);
        console.log(time)
        svgEle.style.transition= `transform ${time}s cubic-bezier(.49,.07,.11,.94)`;
        svgEle.style.transform= `rotateZ(2000deg)`;
      });
    },
    /**
     * @author [foolseward]
     * [绘制转盘的svg]
     * @param  { Number } num [区域数量]
     * @return { String }     [svg标签的字符串形式]
     */
    drawLucky(num){
      if(typeof num!== 'number' || num<= 2){
        num= 3;
      }
      //弧形区域夹角
      let rotate= 360/num;
      //如果num为单数，则设置一个初始旋转角度
      let rotatePlus= rotate/2;
      //svg区域的大小
      let outerHeight= 300;
      let outerWidth= 300;
      //转盘圆心坐标（以svg区域左上角为坐标原点，默认为svg区域的中心）
      let circleX= outerWidth/2;
      let circleY= outerWidth/2;
      //圆半径 （默认为svg区域宽度的一半）
      let circleRadius= 0.48*outerWidth;
      //圆半径补值（当圆半径小于0.5* outerWidth时）
      let circleRadiusPad= 0.5*outerWidth- circleRadius;
      //圆弧弧长
      let arcLength= rotate* Math.PI/ 180;
      //圆弧第二点坐标（相对于svg原点）
      let endX= 0.5*outerWidth+ Math.sin(arcLength)* circleRadius;
      let endY= 0.5*outerWidth- Math.cos(arcLength)* circleRadius;
      //描述
      let textSize= circleRadius/(1.5* num);
      let textX= 0.5*outerWidth- Math.sin(0.5* arcLength)* circleRadius;
      let textY= textSize+ circleRadius- Math.cos(0.5* arcLength)* circleRadius;
      let textLength= Math.sin(0.5* arcLength)* circleRadius;
      let textLineHeight= 1.2;

      //颜色数组
      let colorArr= ['#D8CCB2', '#DECED1', '#BECAD6', '#ACAFB4', '#DFE4DE', '#B7C3B5', '#B4B0A4', '#A59888', '#E9CED3', '#EFE7F4' ];
      //颜色循环值
      let colorLoopNum= 10;
      
      let circleStr= 
        `
        <circle cx="${circleX}" cy="${circleY}" r="${0.5*outerWidth}" fill="yellow"/>
        <circle cx="${circleX}" cy="${circleY}" r="${circleRadius}" fill="transparent"/>`;
      //扇形拼接
      for(let i= 0; i< num; i++){
        //扇形
        let huStr=
        `<path d="
           M ${0.5*outerWidth} ${circleRadiusPad}
           A ${circleRadius} ${circleRadius}, 0, 0, 1, ${endX} ${endY}
           L ${circleX} ${circleY} Z" 
           fill="${colorArr[ i % colorLoopNum]}" 
           transform="rotate(${i* rotate- rotatePlus}, ${circleX}, ${circleY})"
           stroke="transparent"
           stroke-width="2"
        />`;
        //文字
        let textStr=
        `<text x=${textX+ textLength} y=${textY} transform="rotate(${i* rotate}, ${circleX}, ${circleY})"
        style="font-size:${textSize};
        text-anchor:middle;
        stroke-width:${0.5};
        stroke:#000;">
          澳洲羊奶皂
        </text>
        `;
        textStr+= 
        `<text x=${textX+ textLength} y=${textY+ textLineHeight* textSize} transform="rotate(${i* rotate}, ${circleX}, ${circleY})"
        style="font-size:${textSize};
        text-anchor:middle;
        stroke-width:${0.5};
        stroke:#000;">
          澳洲羊奶
        </text>
        `;
        circleStr+= huStr+ textStr;
      }
      this.luckyStr= `<g>`+ circleStr+ `</g>`;
    }
  },

  data: function(){
    return {
      luckyStr: null,
    }
  },
}
</script>

<style scoped>
input{
  height: 80px;
  font-size: 28px;
  border-radius: 10px 0 0 10px;
}
.iconfont{
  color: #fff;
  font-size: 48px;
}
/*头部轮播区*/
.home-fir{
  line-height: 0;
}
.container img{
  width:750px;
  height:422px;
}

/*底部按钮区*/
.home-fou{
  font-size: 24px;
  background-color: #21A8B6;
  position: fixed;
  width:100%;
  bottom:0;
  display: flex;
  justify-content: space-around;
  -webkit-transform: translateZ(0);
}
.home-fou img{
  width:42px;
  height:42px;
}
.home-bottom-btn{
  padding:6px 0;
}
.home-bottom-btn div:nth-child(1){
  font-size:48px;
}
.home-bottom-btn div:nth-child(2){
  color: #fff;
  line-height: 1;
}
.home-backtop{
  position: fixed;
  right: 2vw;
  bottom: 100px;
}
</style>
