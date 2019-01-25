<template>
  <div>1</div>
</template>

<script>
import { heightMixin } from '@/mixin'
export default {
  mixins: [heightMixin],
  created(){
    let cookieLimit= getMessageCodeLimit();
    if(cookieLimit!== 'null' && cookieLimit!== false){
      this.getMessageCode();
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      //成功修改密码 会重置messageCodeLimit

      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //     this.$router.push({
      //       name: 'home'
      //     })
      //   })
      // })
    },

    preGetMessageCode(){
      //如果存在定时器则返回
      if(this.messageCodeAsync!== null)return;
      //如果未输入手机号则返回并提示
      if(!this.phone){
        alert('请先输入手机号码');
        return;
      }
      this.getMessageCode();
    },
    getMessageCode(){
      let cookieLimit= getMessageCodeLimit();
      console.log(new Date().getTime(), cookieLimit)
      let limit;
      if(cookieLimit!== "null" && cookieLimit!== false){
        limit= 60- parseInt((new Date().getTime()- parseFloat(cookieLimit))/1000);
      } else {
        setMessageCodeLimit(new Date().getTime());
        limit= 60;
        this.messageCodeCount= "("+ limit+"秒)";
      }
      console.log(limit)
      this.messageCodeAsync= setInterval(() => {
        if(limit<= 0){
          clearInterval(this.messageCodeAsync);
          //清除cookie中的时间记录
          setMessageCodeLimit(null);
          this.messageCodeAsync= null;
          this.messageCodeCount= "获取验证码";
        } else {
          limit--;
          this.messageCodeCount= "("+ limit+"秒)";
        }
      }, 1000);
    },
  },

  data: function(){
    return {
      phone: null,
      messageCode: null,
      pwd: null,
      surePwd: null,
      //验证码倒数
      messageCodeCount: "获取验证码",
      //验证码是否处于异步状态
      messageCodeAsync: null,
    }
  },

  computed: {
    phoneNull: function(){
      return this.phone=== '' || this.phone=== undefined || this.phone=== null; 
    },
    messageCodeNull: function(){
      return this.messageCode=== '' || this.messageCode=== undefined || this.messageCode=== null; 
    }
  }
}
</script>

<style scoped>
input{
  height: 88px;
  font-size: 24px;
  padding-left: 24px;
}
.base{
  position: relative;
  overflow: hidden;
  background-color: #fff;
}
.reg-fir{
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 20px 0 20px;
}
.reg-input-ground{
  width: 100%;
  flex-direction: column;
}
.reg-input-outer{
  position: relative;
  padding: 2px 0;
  display: flex;
  border-bottom: 2px solid #f4f4f4;
}
.reg-input-tip{
  display: flex;
  align-items: center;
  font-size: 32px;
  min-width: 148px;
}
.get-messagecode{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #21A8B6;
  position: absolute;
  width: 170px;
  height: 60px;
  right:0;
  bottom: 13px;
  border:1px solid #21A8B6;
  border-radius: 10px;
}
.ing-messagecode{
  background-color: #bdbdbd;
  border: 1px solid #bdbdbd;
  color: #fff;
}
.reg-sec{
  position: relative;
  padding: 0 20px 0 20px;
  height: 241px;
}
.reg-btn{
  align-items: center;
  position: relative;
  top: 161px;
  font-size: 32px;
  height: 80px;
  background-color: #21A8B6;
  border-radius: 10px;
  color: #fff;
}
.right-enter-active {
  transition: all .3s ease;
}
.right-leave-active {
  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.right-enter, .right-leave-to
{
  transform: translateX(100%);
}
</style>
