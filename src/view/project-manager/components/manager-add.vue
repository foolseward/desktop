<template>
  <div class="manager-add">
    <div style="display: flex;align-items: center;">
      <div>项目名称：</div>
      <div style="margin-left: 10px;">
        <Input v-model="title" placeholder="输入项目名称" style="width:240px;"/>
      </div>
      <Button type="success" size="small" style="margin-left: 10px;"
       @click="createProjectFunc"
      >创建</Button>

      <Button type="error" size="small" style="margin-left: 10px;"
       @click="emitCloseCreateState"
      >返回</Button>
    </div>
  </div>
</template>

<script>
//环境配置

//静态资源

//引用外部插件
import 'pinyin4js'
//混入与工具方法
import axios from '@/libs/api.form.js'
import { alertMixin } from '@/mixin'
//子组件
import { Input, Button } from 'iview'
export default {
  name: 'manager-add',
  
  mixins: [ alertMixin ],
  
  components: {
    Input, Button
  },

  props: [],
  data: function(){
  	return {
      title: null,
  	}
  },
  
  methods: {
    createProjectFunc(){
      let prefix;
      if(!this.title) return;
      let title= this.title.trim();
      if(!title) return;
      prefix= PinyinHelper.convertToPinyinString(title, '', PinyinFormat.FIRST_LETTER);
      //只返回前6个字母
      let num= 0;
      prefix= [...prefix].filter(ele => {
        num++;
        return num<= 6 && /[a-z]+/.test(ele);
      }).join('');

      if(prefix.length< 3) return;
      axios.post({
        url: '/add/project',
        data: {
          prefix: prefix,
          title: title,
        }
      }).then(res => {
        if(res.state){
          this.$store.commit('luckies/addLuckies', res.data);
          this.emitCloseCreateState();
        } else {
          this.callAlert({
            type: 'error',
            msg: res.msg,
          })
        }
      })
    },
    emitCloseCreateState(){
      this.$emit('close-create-state');
    }
  },
}	
</script>

<style scoped>
.manager-add{
  padding: 20px;
}	
</style> 