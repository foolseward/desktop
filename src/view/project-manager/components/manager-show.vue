<template>
  <div class="manager-show">
   <div :class="['manager-show-bar', lucky.prefix=== current?'manager-show-bar-running':'']" 
   	v-for="lucky in luckies" :key="lucky.id"
   >
     <div>{{ lucky.title }}</div>

     <div class="manager-show-bar-btns">

  	   <Icon v-show="lucky.prefix!== current" type="ios-play"/>

  	   <Icon v-show="lucky.prefix=== current" type="ios-power"/>

  	   <Icon style="font-size: 18px;font-weight: bold;" type="ios-create-outline"
         @click.stop="routeToEditFunc(lucky.prefix)"
       />

  	   <Icon style="font-size: 18px;font-weight: bold;" type="ios-trash-outline" />

     </div>
   </div>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件
import { SUCCESS } from '@/config'
import ajax from '@/libs/api.form.js'
//混入与工具方法

//子组件
import { Icon } from 'iview'
export default {
  name: 'manager-show',
  
  components: {
  	Icon
  },

  mixins: [],

  props: [],

  data: function(){
  	return {

  	}
  },
  
  computed: {
    current: function(){
      return this.$store.getters.prefix;
    },
    luckies: function(){
      return this.$store.getters['luckies/luckies'];
    }
  },

  methods: {
    routeToEditFunc(prefix){
      new Promise((resolve, reject) => {
        let prizes= this.$store.getters['luckies/prizesFromDB'];
        if(prizes.length=== 0){
          ajax.get({
            baseURL: 'http://127.0.0.1:4007',
            url: '/getPrizesforDraw'
          }).then(res => {
            console.log(res);
            if(res.msgCode== 1000){
              this.$store.commit('luckies/prizesFromDB', res.data);
              resolve();
            } else {
              alert('数据错误')
              reject();
            }
          })
        }
      }).then(res => {
        this.$store.commit('luckies/prefix', prefix);
        this.$router.push({ path: `/edit/${prefix}` });
      })
    }
  },
}	
</script>

<style scoped>
.manager-show{
  display: flex;flex-wrap:wrap;justify-content: space-between;	
}

.manager-show-bar{
  position: relative;
  padding: 10px;
  min-width: 49%;
  height: 100px;
  overflow: hidden;
  border: 1px dashed #aeaeae;
  margin: 5px 0;
  border-radius: 4px;
}

.manager-show-bar-running{
  border:none;
  color: #fff;
  background-color: #009688;
}

.manager-show-bar-btns{
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px; 
  width: 70px; 
  bottom: 5px;
  right: 5px;
}
</style> 