//ajax请求返回值判断
export const SUCCESS= '0000'
//perofomer组件异步加载图片的数量
export const ASYNC_PIC_NUM= 6

//用于路由的根路径
export const rootPath= ''
//用于请求的根路径
export const apiPath= 
	process.env.NODE_ENV=== 'production'? 'http://118.25.222.233:4423': 'http://127.0.0.1:4423';

export const staticPath= 'http://qiniu.17lvju.com/'