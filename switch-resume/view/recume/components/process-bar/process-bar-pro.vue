<template>
  <div style="display: flex;align-items: center;margin:0 0 10px 10px;perspective: 200px;width: 100px;height: 100px;justify-content: center;">
    <div class="icon-outer xiegang" :style="{ backgroundColor: processColor }">
      <i :class="['iconfont', 'icon-'+ ele.icon]"></i>
    </div>

    <div style="position: absolute;width: 80px;height: 80px;
    transform:translateY(35px) translateZ(-10px) rotateX(70deg);border-radius: 50px;line-height: 80px;text-align: center;border:5px solid rgba(0,0,0,0.4);;
    ">11%</div>
<!--     <div style="position: absolute;width: 20px;height: 20px; background-color: red;
    transform:translateZ(100px) rotateX(80deg) translateY(50px);border-radius: 25px;
    "></div> -->
  </div>
</template>
<script>
export default {
  name: 'process-bar-pro',
  //{icon, name, current, total}
  props: ['ele'],
  mounted(){
    this.animate();
  },
  data: function(){
    return {
      current: 0,
      step: 0,
    }
  },
  computed:{
    processColor(){
      let percent= this.ele.current/ this.ele.total;
      if(percent> 0 && percent< 0.3333) return '#d9534f';
      if(percent>= 0.3333 && percent< 0.6666) return '#f0ad4e';
      if(percent>= 0.6666 && percent<= 1) return '#5cb85c';
    },
    processWidth(){
      return this.current* 100/ (1.2* this.ele.total)+ '%';
    },
    timeCountByMonth(){
      return Math.round(this.ele.current/30)+ '个月';
    }
  },
  methods: {
    animate(){
      if(this.current>= this.ele.current) return;
      this.current+= this.ele.current/20;
      requestAnimationFrame(this.animate);
    },
  },
} 
</script>

<style scoped>
.iconfont{
  color: #333b46;
  font-size:64px;
}
.xiegang{
  background-image: linear-gradient(45deg,rgba(255,255,255,.25) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.25) 50%,rgba(255,255,255,.25) 75%,transparent 75%,transparent); 
  transform-origin: bottom;
  
}
.icon-outer{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  height: 100px;
  border-radius: 50px;
  z-index: 2;
}
.icon-outer::after{
  content: '';
  width: 80px;
  height: 80px;
  background: #fff;
  position: absolute;
  border-radius: 40px;
  top: 10px;
  left: 10px;
  z-index: -1;
  box-shadow: 6px 6px 6px rgba(0,0,0,.75)
}
.process {
  height: 20px;
  border-radius: 8px;
  background-size: 40px 40px;
  transform: translateX(-20px);
  z-index: 1;
}
.skill-name{
  letter-spacing: 0.5px;
  height: 40px;
  min-width: 500px;
  line-height: 90px;
  font-size: 28px;
  color: #333b46;
  transform: translateX(20px);
}
@media screen and (min-width: 1000px) {
/*ignore*/
  .iconfont{
    font-size:32px;
  }
  .icon-outer{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    height: 50px;
    border-radius: 25px;
    z-index: 2;
  }
  .icon-outer::after{
    content: '';
    width: 40px;
    height: 40px;
    background: #fff;
    position: absolute;
    border-radius: 20px;
    top: 5px;
    left: 5px;
    z-index: -1;
    box-shadow: 2px 2px 3px rgba(0,0,0,.75)
  }
  .process{
    height: 10px;
    border-radius: 4px;
    background-size: 20px 20px;
    transform: translateX(-10px);
    z-index: 1;
  }
  .skill-name{
    height: 20px;
    min-width: 250px;
    line-height: 45px;
    font-size: 14px;
    color: #333b46;
    transform: translateX(15px);
  }
}
</style> 