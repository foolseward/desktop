import { getBreadCrumbList, setTagNavListInLocalstorage, getMenuByRouter, getTagNavListFromLocalstorage, getHomeRoute } from '@/libs/util'
import routers from '@/router/routers'
export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(routers),
    local: '',

    minHeight: null,
    alertStatus: {type:null, msg:null},
    interceptorStatus: false,
    rootPath: '',
    scrollCbArr: {},
  },
  getters: {
    //menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
    menuList: (state, getters, rootState) => {
      return getMenuByRouter(routers, rootState.user.access);
    },
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
    /**
     * [向全局滚动回调方法队列中添加方法]
     * @param {Object} [obj] [{vm, fn}]
     */
    addFnToScrollCbArr (state, obj) {
      let name= obj.vm.$route.name;
      state.scrollCbArr[name]= obj;
    },
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
    },
    setTagNavList (state, list) {
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else state.tagNavList = getTagNavListFromLocalstorage()
    },
    addTag (state, item, type = 'unshift') {
      if (state.tagNavList.findIndex(tag => tag.name === item.name) < 0) {
        if (type === 'push') state.tagNavList.push(item)
        else state.tagNavList.unshift(item)
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      state.local = lang
    },
  }
}
