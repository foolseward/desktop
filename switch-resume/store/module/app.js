import routers from '@/router/routers'
export default {
  state: {
    height: null,
    width: null,
    resize: false,
    alertStatus: {
      type:null, 
      msg:null
    },
    interceptorStatus: false,
    scrollCbArr: [],
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
      if(Math.abs(state.height- height)> 200 || state.width!== width){
        state.resize= !state.resize;
      }
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
  }
}
