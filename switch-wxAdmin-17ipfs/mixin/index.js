import { isNull, resExtraction } from '@/libs/tools'
import { setMessageCodeLimit, getMessageCodeLimit, setCacheMessage } from '@/libs/util'
import axios from 'axios'
import { SUCCESS, apiPath } from '@/config'
/**
 * [为元素赋初始高度]
 */
export const heightMixin= {
  mounted: function () {
    this.$el.style.height= this.$store.getters.minHeight+ 'px';
  },
}

export const alertMixin= {
  computed: {
    alertStatus: function(){
      return this.$store.getters.alertStatus;
    }
  },
  methods: {
    /**
     * [调起提示框]
     * @param  {[String]} options.type ['right', 'error']
     * @param  {[String]} options.msg  [提示信息]
     */
    callAlert: function ({type, msg}) {
      this.$store.commit('setAlertStatus', {type: type, msg: msg});
    },
    closeAlert: function(){
      this.$store.commit('setAlertStatus', {type: null, msg: null});
    }
  },
}

/**
 * [验证码功能模块]
 */
export const messageCodeMixin= {
  created(){
    if(!isNull(getMessageCodeLimit())){
      this.getMessageCode();
    };
  },
  data:function () {
    return {
      //验证码倒数
      messageCodeCount: "获取验证码",
      //验证码是否处于异步状态
      messageCodeAsync: null,
      //测试时的验证码时限
      TEST_LIMIT: 60,
    }
  },
  methods: {
    preGetMessageCode(){
      //如果存在定时器则返回
      if(this.messageCodeAsync!== null)return;
      //如果未输入手机号则返回并提示
      if(!this.mobile){
        this.callAlert({type:'error', msg: '请先输入手机号码'});
        return;
      }
      this.getMessageCode();
    },
    getMessageCode(){
      //查看cookie里是否有等待时间
      let cookieLimit= getMessageCodeLimit();
      let limit;
      if(!isNull(cookieLimit)){
        limit= (this.TEST_LIMIT || 60)- parseInt((new Date().getTime()- parseFloat(cookieLimit))/1000);
      } else {
        setMessageCodeLimit(new Date().getTime());
        limit= (this.TEST_LIMIT || 60);
        this.messageCodeCount= "("+ limit+"秒)";


        let fd = new FormData();
        fd.append('mobile', this.mobile);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        //{"status":"0000","msg":"\u53d1\u9001\u6210\u529f","data":{"code":3683}}
        axios.post(apiPath+ '/mobile/player/sms', fd, config)
        .then((res) => {
          res= resExtraction(res.data);
          console.log(res);
          if(res.status=== SUCCESS){
            setCacheMessage(res.data.code);
          } else {
            this.callAlert({type: error, msg: res.msg});
          };
        })
        .catch((error) => {
          console.log(error);
        });
      }
      //声明验证码定时器
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
  }
}