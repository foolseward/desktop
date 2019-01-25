<template>
  <transition name="fade"> 
    <div comp="responsive-menu" v-show="STATUS" class="menu-container">
      <div class="fir">
        <div class="header">
          <div>目录</div>
          <div @click="STATUS=!STATUS" style="display:flex;align-items:center;">
            <i class="iconfont icon-menu"></i>
          </div>
        </div>
        <div class="body">
          <div 
            :class="['ele', index=== RESPONSIVE_MENU_POINTER?'ele-selected':'']" 
            v-for="(ele, index) in RESPONSIVE_MENU_ELE_LIST"
            :key="index"
            @click="changeCurrent(index)"
          > {{ ele.name }} </div>
        </div>
      </div>
      <div class="sec">
        <div class="base-flex" @click="route">
          <i class="iconfont icon-pingjia"></i>
        </div>
        <div class="base-flex" @click="emitHtmlToImage">
          <i class="iconfont icon-camera"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法
import { responsiveMenuMixin } from '@/mixin'
//子组件
export default {
  name: 'responsive-menu',
  mixins: [responsiveMenuMixin],
  methods: {
    emitHtmlToImage(){
      this.$emit('html-to-image');
    },
    route(){
      window.location.href="http://192.168.1.149:8080/static/img/myphoto.496a9b6.png"
    }
  },
}	
</script>

<style scoped>
.iconfont{
  font-size: 42px;
}
.header .iconfont{
  font-size: 42px;
  line-height: 0;
  transform: rotateZ(90deg);
  transition: all 0.2s ease-in;
}
.header .icon-close{
  transform: rotateZ(0deg);
}
.menu-container{
  z-index:3;
  color:#fff;
  position:fixed;
  width:50%;
  max-height:100%;
  right: 20px;
  top: 20px;
}
.menu-container .fir{
  padding: 20px;
  z-index:4;
  background-color:#333b46;
}
.menu-container .header{
  display:flex;
  justify-content:space-between;
  font-size:32px;
  line-height:2;
  margin-bottom:20px;
}
.menu-container .body{
  margin:0 20px;
  border-left:4px solid #555;
}
.menu-container .ele{
  position: relative;
  padding:0 0 0 20px;
  font-size:32px;
  line-height:1.8;
  cursor: pointer;
}
.ele::before{
  content: '';
  position: absolute;
  width:12px;
  height: 12px;
  border-radius: 6px;
  background-color: #f7f7f7;
  top:50%;
  transform: translateX(-28px) translateY(-6px);
}
.menu-container .ele-selected{
  color: #333b46;
  background-color: #fff;
}
.ele-selected::before{
  background-color: #fff;
}

.menu-container .sec{
  display:flex;
  justify-content: flex-end;
  z-index:3;
  background-color:#5cb85c;
  font-size:32px;
  line-height:1;
  padding:10px 20px;
}
.sec .base-flex{
  width: 54px;
  height: 54px;
  border-radius: 27px;
  /* border: 1px; */
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.55);
  margin-bottom: 0;
  margin-left: 20px;
}
.fade-enter-active, .fade-leave-active {
  transition: transform .3s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
}
@media screen and (min-width: 1000px) {
/*ignore*/
  .iconfont{
    font-size: 24px;
  }
  .header .iconfont{
    display: none;
  }
  .menu-container{
    position:fixed;
    width: 260px;
    height: auto;
    max-height:100%;
    color:#333b46;
    background-color: transparent;
    top: auto;
    right: auto;
    z-index:3;
    transform: translateX(740px) translateY(20px);
  }
  .menu-container .fir{
    padding: 10px;
    background-color: transparent;
  }
  .menu-container .header{
    font-size:16px;
    line-height:2;
    margin:0 0 10px 0;
  }
  .menu-container .body{
    margin:0 10px;
    border-left:2px solid #eaeaea;
  }
  .menu-container .ele{
    position: relative;
    padding:0 0 0 10px;
    font-size:16px;
  }
  .ele:hover{
    background-color: #eaeaea;
  }
  .ele::before{
    content: '';
    position: absolute;
    width:6px;
    height: 6px;
    border-radius: 3px;
    background-color: #333b46;
    top:50%;
    transform: translateX(-14px) translateY(-3px);
  }
  .menu-container .ele-selected{
    background-color: #eaeaea;
  }
  .ele-selected::before{
    background-color: #333b46;
  }

  .menu-container .sec{
    background-color:transparent;font-size:16px;padding:5px 10px;border-radius:0;
    flex-direction: column;
  }
  .sec .base-flex{
    width: 36px;
    height: 36px;
    border-radius: 18px;
    /* border: 1px; */
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.35);
    margin-bottom: 10px;
    margin-left: 0;
  }
  .base-flex:hover{
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.75);
  }
}
</style> 