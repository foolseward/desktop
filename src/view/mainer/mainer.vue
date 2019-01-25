<template>
  <div style="display: block;width: 100%;">
    <router-view/>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件

//混入与工具方法
import axios from '@/libs/api.form.js'
//子组件
export default {
  name: 'mainer',
  mixins: [],
  props: [],

  beforeRouteEnter(to, from, next){
    axios.get({
      url: '/init'
    }).then(res => {
      if(res.state){
        next(vm => {
          vm.$store.commit('luckies/luckiesInit', {...res.data});
        });
      } else {
        alert('服务器无响应');
      }
    }).catch(err => {
      console.log(err);
      alert('服务器无响应');
    });
  },

  data: function(){
  	return {

  	}
  },
  
  methods: {
  
  },
}	
</script>

<style scoped>
	
</style> 