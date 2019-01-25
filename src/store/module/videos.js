export default {
  namespaced: true,
  state: {
    prefix: null,
    current: null,
    videos: null,
    timestamp: null,
  },
  getters: {
    videos(state){
      return state.videos
    },
    timestamp(state){
      return state.timestamp
    },
    current:(state) => () => {
      return state.videos[state.prefix];
    },
    prefix(state){
      return state.prefix
    }
  },
  mutations: {
    videosInit(state, videos){
      state.videos = videos;
    },
    addVideos(state, video){
      state.timestamp= new Date().getTime();
      state.videos[video.prefix]= video;
    },
    deleteVideo(state, prefix){
      state.timestamp= new Date().getTime();
      this._vm.$delete(state.videos, prefix);
    },
    prefix(state, prefix){
      state.prefix= prefix;
      state.current= state.videos[prefix];
    },
    addUrl(state, {caller, url}){
      state.current[caller]= url;
    },
    changeAttr(state, {caller, val}){
      state.current[caller]= val;
    },
  }
}