<template>
  <div class="rooter">
    <div class="outer">
      <div class="title">名称: </div>
      <div>
        <Input v-model="name" placeholder="汉字，英文，数字在内3至20个字符" style="width: 400px;"/>
      </div>
    </div>

    <div class="outer">
      <div class="title">标识: </div>
      <div>
        <Input v-model="prefix" placeholder="英文，数字在内3至20个字符，项目所属图片的前缀" style="width: 400px"/>
      </div>
    </div>

    <div class="outer">
      <div class="title" style="align-self:flex-start;">备忘: </div>
      <div>
        <Input v-model="tips" type="textarea" placeholder="100个字符以内" style="width: 400px"/>
      </div>
    </div>

    <div style="display:flex; justify-content:center; width:480px;">
      <Button type="primary" @click="addProject">创建项目</Button>
      <Button type="dashed" @click="changeContainer" style="letter-spacing:10px;margin-left:20px;">取消</Button>
    </div>
  </div>
</template>
<script>
//组件
import { Input, Button } from 'iview'

//混入
import { alertMixin } from '@/mixin'

//方法, 对象
import { isNull } from '@/libs/tools'
import axios from '@/libs/api.form'

//配置
import { apiPath } from '@/config'

export default {
  name: 'mainEditor',
  mixins: [alertMixin],
  components: {
    Input, Button
  },
  data(){
    return {
      name: '',
      prefix: '',
      tips: ''
    }
  },
  methods: {
    changeContainer(){
      this.$emit('change-container-state');
    },
    /**
     * [查看标识是否重复]
     * @return {[type]} [description]
     */
    testPrefixRepeat(prefix){
      return this.$store.getters.entities[prefix];
    },
    addProject(){
      //3到20位，首字母不能是数字
      let _NAME_REG= /^([a-zA-Z\u4e00-\u9fa5][\w\u4e00-\u9fa5]{2,19})$/;
      //3到20位，首字母不能是数字
      let _PREFIX_REG= /^([a-zA-Z][\w]{2,19})$/;
      if(!_NAME_REG.test(this.name)){
        this.callAlert({
          type: 'error',
          msg: '名称填写有误',
        });
        this.name= '';
        return;
      }
      if(!_PREFIX_REG.test(this.prefix)){
        this.callAlert({
          type: 'error',
          msg: '标识填写有误',
        });
        this.prefix= '';
        return;
      }
      if(this.testPrefixRepeat(this.prefix)){
        this.callAlert({
          type: 'error',
          msg: '此标识已存在，标识唯一不可重复',
        });
        this.prefix= '';
        return;
      }
      axios.post({
        url: '/add/project',
        data: Object.assign({pics:[]}, this._data)
      }).then((res) => {
        if(res.state){
          this.$store.commit('addEntity', Object.assign({pics:[]}, this._data));
          this.changeContainer();
        }
      })
    },
  }
}
</script>

<style scoped>
.rooter{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #fff;
}

.rooter .outer{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
}
.outer .title{
  text-align: center;
  min-width: 80px;
}
</style>