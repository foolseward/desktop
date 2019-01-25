import Axios from 'axios'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
import { apiPath } from '@/config'
import store from '@/store'

class httpRequest {
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
      baseURL: apiPath,
      // timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        //'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    return instance(options)
  }
}
export default httpRequest
