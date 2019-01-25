export default {
  state: {
    wsKey: null,
    timestamp: null,
    prefix: null,
    current: null,
    entities: null,
    //当前点击的图片序号
    currentPicNum: -1,
  },
  getters: {
    wsKey(state){
      return state.wsKey;
    },
    /**
     * [当前edit页面标识]
     */
    prefix(state){
      return state.prefix;
    },
    entities(state){
      return state.entities;
    },
    current(state){
      return state.current;
    },
    timestamp(state){
      return state.timestamp;
    },
    currentPicNum(state){
      return state.currentPicNum;
    },
  },
  mutations: {
    wsKey(state, key){
      state.wsKey= key;
    },
    /**
     * [初始化]
     */
    init(state, entities){
      state.entities = entities;
    },
    /**
     * [点击图片后，图片指针变化]
     */
    currentPicNum(state, num){
      state.currentPicNum= num;
    },
    /**
     * [添加项目实例]
     */
    addEntity(state, entity){
      state.timestamp= new Date().getTime();
      state.entities[entity.prefix]= entity;
    },
    deleteEntity(state, prefix){
      console.log(prefix)
      state.timestamp= new Date().getTime();
      console.log(state.entities);
      this._vm.$delete(state.entities, prefix);
      console.log(state.entities);
    },
    /**
     * [更改当前current]
     */
    prefix(state, prefix){
      state.prefix= prefix;
      state.current= state.entities[prefix];
      state.currentPicNum= -1;
    },
    /**
     * [上传图片]
     */
    addPics(state, pics){
      state.timestamp= new Date().getTime();
      state.entities[state.prefix].pics.push(...pics);
    },

    /**
     * [改变图片路径]
     */
    changePath(state, url, pointer){
      state.timestamp= new Date().getTime();
      state.entities[state.prefix].pics[ pointer? pointer: state.currentPicNum ].url= url;
    },

    /**
     * [调整图片位置]
     */
    changeIndex(state, {oldIndex, newIndex}){
      //让edit-left更新视图
      state.timestamp= new Date().getTime();
      let arr= state.entities[state.prefix].pics;
      let take= Object.assign({}, arr[newIndex]);
      Object.assign(arr[newIndex], arr[oldIndex]);
      Object.assign(arr[oldIndex], take);
    },

    /**
     * [改变图片异步状态]
     */
    changeAsync(state, bol, pointer){
      //state.timestamp= new Date().getTime();
      state.entities[state.prefix].pics[ pointer? pointer: state.currentPicNum ].async= bol;
    },
    /**
     * [改变图片点击路径]
     */
    changeRedirect(state, url, pointer){
      //state.timestamp= new Date().getTime();
      state.entities[state.prefix].pics[ pointer? pointer: state.currentPicNum ].redirectUrl= url;
    },
    /**
     * [删除图片]
     */
    deletePic(state, pointer){
      state.timestamp= new Date().getTime();
      state.entities[state.prefix].pics.splice( (pointer? pointer: state.currentPicNum) , 1);
    },
  }
}