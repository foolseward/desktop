import Axios from 'axios'
import { apiPath } from '@/config'
import store from '@/store'

class Form {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      store.commit('setInterceptorStatus', true);
      return config
    }, error => {
      // 对请求错误做些什么
      store.commit('setInterceptorStatus', false);
      return Promise.reject(error)
    });

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      store.commit('setInterceptorStatus', false);
      let { data } = res
      return data
    }, (error) => {
      store.commit('setInterceptorStatus', false);
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      method: 'post',
      baseURL: apiPath,
      headers: {
        'Content-Type': 'multipart/form-data',
        'ws-key': store.getters.wsKey,
      },
      transformRequest: [function (data, headers) {
        let fd = new FormData();
        for(let i in data){
          console.log(i, data);
          if(data[i] instanceof FormData){
            fd= data[i];
            break;
          }
          fd.append(i, data[i]);
        }
        return fd;
      }],
    }
    return Axios.create(conf)
  }

  createGet () {
    let conf = {
      method: 'get',
      baseURL: apiPath,
      timeout: 10000,
    }
    return Axios.create(conf)
  }

  createPost () {
    let conf = {
      method: 'post',
      baseURL: apiPath,
      timeout: 10000,
      headers: {
        'ws-key': store.getters.wsKey,
      },
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例url, data
  form (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    return instance(options)
  }

  get (options) {
    var instance = this.createGet()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    return instance(options)
  }

  post (options) {
    var instance = this.createPost()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    return instance(options)
  }
}
export default Form
