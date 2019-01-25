import qs from 'qs'
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
      Message.error('服务内部错误')
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      method: 'post',
      baseURL: apiPath,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [function (data, headers) {
        let fd = new FormData();
        for(let i in data){
          console.log(i, data);
          fd.append(i, data[i]);
        }
        return fd;
      }],
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
}
export default Form
