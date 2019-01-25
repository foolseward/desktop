export default {
  state: {
    //屏幕尺寸
    height: null,
    width: null,
    //监视屏幕尺寸变化
    resize: false,
    //全局alert框
    alertStatus: {
      type:null, 
      msg:null
    },
    //全局loading
    interceptorStatus: false,
    //滚动轴方法数组
    scrollCbArr: [],
    //侧边栏样式
    leftSliderStatus: true,
  },
  getters: {
    //menuList: (state, getters, rootState) => console.log(1)
    height :(state) => () => {
      return state.height;
    },
    width :(state) => () => {
      return state.width;
    },
    resize :(state) => {
      return state.resize;
    },
    interceptorStatus: (state) => {
      return state.interceptorStatus;
    },
    alertStatus: (state) => {
      return state.alertStatus;
    },
    scrollCbArr: (state) => {
      return state.scrollCbArr;
    },
    leftSliderStatus: (state) => {
      return state.leftSliderStatus;
    }
  },
  mutations: {
    /**
     * [手动重置]
     */
    setResize (state){
      state.resize= !state.resize;
    },
    /**
     * [用innerHeight初始化页面]
     */
    setSize (state, {height, width}) {
      state.resize= !state.resize;
      state.height = height;
      state.width= width;
    },
    /**
     * [控制全局遮罩loading层]
     */
    setInterceptorStatus (state, status) {
      state.interceptorStatus = status
    },
    /**
     * [控制alert]
     */
    setAlertStatus (state, {type, msg}) {
      state.alertStatus = {type: type, msg: msg};
    },
    /**
     * [控制侧边栏类型]
     */
    setLeftSliderStatus(state, status){
      state.leftSliderStatus = status;
    }
  }
}
