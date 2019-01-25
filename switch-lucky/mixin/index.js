import { isNull, resExtraction, getElementTop, getCountdown, throttle } from '@/libs/tools'
import { setMessageCodeLimit, getMessageCodeLimit, setCacheMessage } from '@/libs/util'
import axios from 'axios'
import { SUCCESS, apiPath } from '@/config'
/**
 * [为元素赋初始高度]
 */
export const heightMixin= {
  mounted: function () {
    this.$el.style.minHeight= this.$store.getters.minHeight+ 'px';
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
<<<<<<< HEAD
=======
 * [响应式侧边目录]
 * 给元素赋值"resposive-menu-ele"属性，属性值为其对应的目录名,
 */
export const responsiveMenuMixin= {
  created(){
    //动态创建一个专属模块
    /**
     * 为什么要动态建立一个专属模块
     * 1.虽然mixin在子组件中，但是init收集的对象在父组件中，如果
     *   在子组件中init，父组件中的元素有可能未创建完毕，导致收
     *   集到错误的信息
     * 2.移动端的目录有弹出收起的功能，弹出的按钮在父组件上，
     *   如果不使用vuex，那么通过props传值给子组件，比较麻烦
     */
    let newEle= {
      namespaced: true,
      state: {
        init: this.initResponsiveMenu,
        list: [],
        pointer: 0,
        status: this.changeStatus
      },
      getters: {
        list: (state) => () => {
          return state.list
        },
        status: (state) => {
          return state.status
        },
        pointer: (state) => {
          return state.pointer;
        },
      },
      mutations: {
        init(state){
          state.init();
        },
        createList(state, arr){
          state.list.splice(0); 
          state.list.push(...arr);
        },
        changePointer(state, index){
          state.pointer= index;
        },  
      },
    }
    if(undefined=== this.$store._modules.root._children.RESPONSIVE_MENU){
      this.$store.registerModule('RESPONSIVE_MENU', newEle);  
    }
  },
  data:function(){
    return {
      IS_IN_CHANGE: false,
      STATUS: true,
    }
  },
  computed: {
    //视线位置，0.2指的就是位于屏幕1/5处
    RESPONSIVE_MENU_LINE(){
      return 0.2* this.$store.getters.height();
    },
    RESPONSIVE_MENU_ELE_LIST: function(){
      return this.$store.getters['RESPONSIVE_MENU/list']();
    },
    RESPONSIVE_MENU_POINTER: function(){
      return this.$store.getters['RESPONSIVE_MENU/pointer'];
    },
    //引入全局高度
    resize: function(){
      return this.$store.getters.resize;
    },
  },
  watch:{
    //监视全局高度，响应屏幕变化
    resize(){
      this.initResponsiveMenu();
      this.$store.getters['RESPONSIVE_MENU/status'].call(this, true);
    }
  },
  methods: {
    /**
     * [是否显示]
     */
    changeStatus(bol){
      this.STATUS= bol? true: !this.STATUS;
    },
    /**
     * [改变指针，在执行window.scrollTo之前，需要将滚动响应关闭，防止冲突]
     */
    changeCurrent(index){
      this.$store.commit('RESPONSIVE_MENU/changePointer', index);
      this.IS_IN_CHANGE= true;
      window.scrollTo(0, this.RESPONSIVE_MENU_ELE_LIST[index].top);
      setTimeout(() => {
        this.IS_IN_CHANGE= false;
      }, 500);
    },
    /**
     * [初始化及刷新菜单内容，响应函数]
     */
    initResponsiveMenu(){
      //收集元素
      let arr= [...document.querySelectorAll("[resposive-menu-ele]")];
      //构建RESPONSIVE_MENU_ELE_LIST
      arr= arr.map((ele, index) => {
        let name= ele.getAttribute("resposive-menu-ele");
        return {top: getElementTop(ele), name: name, index: index}
      });
      //组件渲染视图用的数据初始化
      this.$store.commit('RESPONSIVE_MENU/createList', arr);
      //回调函数
      let cb= function(){
        //如果是点击切换，则占时关闭回调函数相应
        if(this.IS_IN_CHANGE) return;
        //算上滑动条，取得当前视线的位置
        let _line= window.scrollY+ this.RESPONSIVE_MENU_LINE;
        //当前对象，第一次循环默认赋值，之后要判断，如果_distance小于distance，则赋新值
        let _current= {distance: null, index: 0};
        for(let i= 0; i< arr.length; i++){
          let _distance= arr[i].top- _line;
          //如果当前为第一次遍历，直接赋值，如果当前遍历到的元素，绝对距离小于_current.distance, 赋值
          _distance= _distance< 0? -1* _distance: _distance;
          if((_current.distance!== 0 && !_current.distance) 
            || _current.distance>= _distance){
            _current.index= i;
            _current.distance= _distance;
          }
        }
        this.$store.commit('RESPONSIVE_MENU/changePointer', _current.index);
      }.bind(this);
      //讲回调函数放入全局队列，未注册，则注册，已注册，则替换
      let find= this.$store.getters.scrollCbArr.find(ele => {
        return ele.name=== 'RESPONSIVE_MENU';
      });
      isNull(find)? 
        this.$store.getters.scrollCbArr.push({name: 'RESPONSIVE_MENU', cb: cb})
          : find.cb= cb;
    }
  },
}

/**
 * [目前由秒来执行定时器]
 */
export const countDownMixin= {
  data: function(){
    return {
      _COUNT_DOWN_INTERVAL: null,
      COUNT_DOWN_DAY: null,
      COUNT_DOWN_HOUR: null,
      COUNT_DOWN_MINUTE: null,
      COUNT_DOWN_SECOND: null,
    }
  },
  methods: {
    COUNT_DOWN_INIT(timestamp){
      let future= getCountdown(timestamp);
      console.log(future)
      future.day?(this.COUNT_DOWN_DAY= future.day):(this.COUNT_DOWN_DAY= 0);
      future.hour?(this.COUNT_DOWN_HOUR= future.hour):(this.COUNT_DOWN_HOUR= 0);
      future.min?(this.COUNT_DOWN_MINUTE= future.min):(this.COUNT_DOWN_MINUTE= 0);
      future.sec?(this.COUNT_DOWN_SECOND= future.sec):(this.COUNT_DOWN_SECOND= 0);
      //this.COUNT_DOWN_INTERVAL_INIT();
    },
    //秒重置为59的时候触发
    COUNT_DOWN_BY_SEC(){
      this.COUNT_DOWN_MINUTE--;
      if(this.COUNT_DOWN_MINUTE< 0){
        this.COUNT_DOWN_MINUTE= 59
        this.COUNT_DOWN_HOUR--;
      }
      if(this.COUNT_DOWN_HOUR< 0){
        this.COUNT_DOWN_HOUR= 23;
        this.COUNT_DOWN_DAY--;
      }
    },
  }
}


/**
>>>>>>> 9b338abc69386ad7fcf6843fdd63f0e41a182a8d
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