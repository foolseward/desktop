<template>
  <div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <img src="./error-404.svg" alt="404" style="width:50%;">
      <div class="text-con">
        <div class="text-con-fir">
          404 页面未找到
        </div>
        <router-link :to="'/'" tag="div">
          <div class="text-con-sec">
            点击返回首页
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import error404 from './error-404.svg'
export default {
  name: 'error_404',
  data () {
    return {
      src: error404,
    }
  }
}
</script>
<style>
.text-con-fir{
  text-align: center;
  width:300px;
  font-size: 24px;
}
.text-con-sec{
  text-align: center;
  width: 300px;
  color:#aeaeae;
  font-size: 18px;
}
</style>
