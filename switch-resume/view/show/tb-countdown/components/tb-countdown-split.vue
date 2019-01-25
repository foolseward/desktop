<!-- 
转动复用同一个元素，数字切换使用rotate
存在问题，数字频繁赋值，导致数字闪动,ios下存在bottom数字不变的情况
 -->
<template>
  <div class="container">
    <div class="ele-out">
      <div>
        <!-- <div style="background-image:linear-gradient(to bottom , #fff , #ddd);"> -->
        {{ val }}
      </div>
    </div>

    <div :class="['ele-out', changing_?'change':null]">
      <div class="ele" style="transform:rotateX(-180deg);">  
        {{val}}
      </div>
      <div :class="[changing_?'ele fir':'ele']">
        {{ changing_?old:val }}
      </div>
    </div>

    <div class="ele-out bottom">
      <div>
        {{ changing_?old:val }}
      </div>
    </div>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法

//子组件
export default {
  name: 'tb-countdown-split',
  props: [
    'sign', //提交fn的标志
    'val'
  ],
  data: function(){
  	return {
      //增加还是减少
      prefix_: -1,
      old: null,
      changing_: false,
    }
  },
  watch:{
    val:{
      handler:function(nval, oldval){
        //console.log('split val changed')
        this.changing_= true;
        if(this.old=== 0 || this.old){
          this.old= oldval;
          this.emitCbFunc();
        } else {
          this.old= nval;
        }
      },
    }
  },
  methods: {
    emitCbFunc(){
      //console.log('split emitCbFunc')
      this.$emit('emit-cb', {fn: function(){ 
        //console.log('split cb');
        this.changing_= false}.bind(this), sign: this.sign}
      );
    },
  },
}	
</script>

<style scoped>
@media screen and (min-width: 700px) {
/*ignore*/
  .container{
    position:relative;width:62px;height:62px;perspective : 124px;
    background-color: #fff;
  }
  .container::after{
    position: absolute;
    bottom: -10px;
    content: '';
    height: 10px;
    width: 100%;
    clear: both;
    border: 1px solid #e4e4e4;
    border-top:none;
    box-sizing: border-box;
    background-color: #fff;
  }
  .ele{
    position: absolute;
    top:0;
    left:0;
    width:62px;
    height:31px;
    line-height: 62px;
    text-align: center;
    background-color: #fff;
  }
  .ele-out{
    font-size: 31px;
    display: flex;
    position: absolute;
    top:0;
    left:0;
    width:62px;
    height:31px;
    line-height: 62px;
    justify-content: center;
    overflow:hidden;
    border: 1px solid #e4e4e4;
    background-color: #fff;
    transform-origin: bottom;
  }
  .ele-out div{
    text-align: center;
    width: 100%;
    transform-origin: bottom;
  }
  .bottom{
    z-index: 2;
    border-top: none;
    transform: translateY(100%);
  }
  .bottom div{
    text-align: center;
    width: 100%;
    transform: translateY(-100%);
  }
  .change{
    z-index: 10;
    flex-direction: column;
    background-color: #fff;
    animation:change 1s infinite;
  }
  @keyframes change{
    0%{
      transform: rotateX(0deg);
    }

    100%{
      border-bottom: none;
      transform: rotateX(-180deg);
    }
  }
  .fir{
    animation:fir 1s infinite;
   /* background-image:linear-gradient(to bottom , #fff , #aeaeae);*/
  }
  @keyframes fir{
    0%, 35%{
      filter: opacity(1);
    }
    36%, 100%{
      filter: opacity(0);
    }
  }
}
</style> 