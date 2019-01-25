export default {
  state: {
    minHeight: null,
    alertStatus: {type:null, msg:null},
    interceptorStatus: false,
    rootPath: '',
    scrollCbArr: {},
  },
  getters: {
    //menuList: (state, getters, rootState) => console.log(1)
    minHeight :(state) => {
      return state.minHeight;
    },
    interceptorStatus: (state) => {
      return state.interceptorStatus;
    },
    alertStatus: (state) => {
      return state.alertStatus;
    },
    rootPath: (state) => {
      return state.rootPath;
    },
    scrollCbArr: (state) => {
      return state.scrollCbArr;
    },
  },
  mutations: {
    /**
     * [用innerHeight初始化页面]
     */
    setMinHeight (state, height) {
      state.minHeight = height
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
     * [设置全局根路径]
     */
    setRootPath (state, str) {
      state.rootPath= str;
    },
  }
}
