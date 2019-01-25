<template>
  <div class="outer">
    <div class="tagname">{{ tagname }}</div>
    <div>{{ text? text: val }}</div>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法

export default {
  name: 'baseinfo-tag',
  
  mixins: [],
  
  props: ['tagname', 'val', 'text'],

  data: function(){
  	return {

  	}
  },
}	
</script>

<style scoped>
.outer{
  display:flex;
  align-items:center;
  margin-bottom:35px;
}
.tagname{
  position: relative;
  background-color:#333b46;
  color:#fff;
  border-radius:8px;
  padding:4px;
  margin-right:16px;
  min-width: 140px;
  text-align: center;
}
.tagname::after{
  color: #333b46;
  content: ':';
  position: absolute;
  right: -12px;
  top:2px;
}
@media screen and (min-width: 1000px) {
/*ignore*/
  .outer{
    margin-bottom:20px;
  }
  .tagname{
    position: relative;
    background-color:#333b46;
    color:#fff;
    border-radius:4px;
    padding:4px;
    margin-right:16px;
    min-width: 90px;
    text-align: center;
  }
  .tagname::after{
    color: #333b46;
    content: ':';
    position: absolute;
    right: -12px;
    top:2px;
  }
}
</style> 