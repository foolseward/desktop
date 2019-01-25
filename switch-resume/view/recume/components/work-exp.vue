<template>
  <div>
    <div class="work-title">
      <div class="company-name">{{ job.company }}</div>
      <div class="work-time">{{ job.time }}</div>
    </div>
    <div class="work-container">
      <div style="display:flex;flex-direction:column;">
        <div class="container-fir">
          <div style="display: flex;">
            <div>职业：</div>
            <div style="color:#aeaeae;">web前端</div>
          </div>
          <div style="display: flex;">
            <div>薪资：</div>
            <div style="color:#aeaeae;">{{ job.salary }}</div>
          </div>
        </div>
        <div>
          工作描述：
        </div>
        <div class="work-describe-content">
          {{ job.describe }}
        </div>
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
  name: 'work-exp',
  props: ['job'],
  data: function(){
  	return {

  	}
  },
  
  methods: {
  
  },
}	
</script>

<style scoped>
.work-title{
  display:flex;
  align-items:flex-end;
  margin-bottom:10px;
}
.company-name{
  color:#fff;
  background-color: #333b46;

  font-size:32px;
  margin-right:20px;
  padding:2px 5px;
  border-radius: 8px;
}
.work-time{
  font-size:24px;
  color:#aeaeae;
}
.work-container{
  font-size: 28px;
}
.container-fir{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.work-describe-content{
  color:#aeaeae;
  text-align: justify;
  word-break: break-all;
  text-indent: 56px;
}
@media screen and (min-width: 1000px) {
/*ignore*/
  .work-title{
    margin-bottom:5px;
  }
  .company-name{
    font-size:16px;
    margin-right:10px;
    padding:2px 5px;
    border-radius: 4px
  }
  .work-time{
    font-size:12px;
  }
  .work-container{
    font-size: 14px;
  }
  .container-fir{
    margin-bottom: 5px;
  }
  .work-describe-content{
    text-indent: 28px;
  }
}
</style> 