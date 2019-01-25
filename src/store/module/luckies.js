export default {
  namespaced: true,
  state: {
    //in_use表示转盘正采用的是哪套方案
    in_use: null,
    //prefix表示当前编辑的是哪套方案
    prefix: null,
    luckies: null,
    //virtualPhone观察监视的对象，如果发生变化，则用transfer_data更新数据
    transfer: 0,
    //如果key是number类型，则更改的是prize_arr数组，那对应的key_suffix则是要改的键名
    transfer_data: {
      _isVue: true,
      key: null,  
      key_suffix: null,
      value: null,
    },
    //数据库中的商品信息
    prizesFromDB:[],
  },
  getters: {
    luckies:(state) => {
      return state.luckies
    },
    current:(state) => () => {
      return state.luckies[state.prefix];
    },
    prefix(state){
      return state.prefix
    },
    transfer(state){
      return state.transfer;
    },
    transferData(state){
      return state.transfer_data;
    },
    prizesFromDB(state){
      return state.prizesFromDB;
    }
  },
  mutations: {
    luckiesInit(state, {current, luckies}){
      state.luckies = luckies;
      state.in_use = current;
    },
    addLuckies(state, lucky){
      this._vm.$set(state.luckies, lucky.prefix, lucky);
    },
    deleteVideo(state, prefix){
      state.timestamp= new Date().getTime();
      this._vm.$delete(state.videos, prefix);
    },
    //进入编辑页面
    prefix(state, prefix){
      state.prefix= prefix;
    },
    transferData(state, data){
      data.func.call(state.luckies[state.prefix], data.val);
      state.transfer++;
      Object.assign(state.transfer_data, data);
    },
    /**
     * @description: 来自manager-show.vue 
     */
    prizesFromDB(state, data){
      state.prizesFromDB.push(...data);
    }
  },
}