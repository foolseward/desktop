export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (target, arr) => {
  return target.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

export const getElementTop= function(element){
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null){
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

/**
 * [节流方法]
 * @param  {[type]} func    [description]
 * @param  {[type]} wait    [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export const throttle = function(func, wait, options) {
  let context, args, result;
  let timeout = null;
  let previous = 0;
  if (!options) options = {};
    let later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments; 
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    previous = now;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
    //如果timeout不存在 而且 options.trailing未设置
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

export const isNull= (val) => {
  return val=== '' || val=== undefined || val=== null || val=== false || val=== 'undefined' 
        || val=== 'null' || val=== 'false';
}

/**
 * [倒计时]
 * @param  {[Timestamp]} timestamp [毫秒时间戳]
 * @return {[Object]}           [{day:.., hour:.., min:.., sec:..,}]
 */
export const getCountdown= function(timestamp){
    //得到时间差
    let timeLeft= timestamp- new Date().getTime();
    //得到天
    let day= Math.floor(timeLeft/(24*60*60000));
    //得到小时差
    timeLeft-= day*24*60*60000;
    //得到小时
    let hour= Math.floor(timeLeft/(60*60000));
    //得到分钟差
    timeLeft-= hour*60*60000;
    //得到分钟
    let min= Math.floor(timeLeft/60000);
    timeLeft-= min*60000;
    let sec= Math.floor(timeLeft/1000);
    return {
      day: day,
      hour: hour,
      min: min,
      sec: sec
    }
}

/**
 * [加工response，有时候返回的response是一种复杂格式，真正的response被包裹了一层]
 * @param  {Response} res
 */
export const resExtraction= function(res){
  if(res.statusText){
    res= res.data;
  };
  return res;
}

/**
 * @author [foolseward]
 * [图片压缩]
 * @param  {File} file [input接收到的file文件]
 * @param  {Number} maxsize [文件最大尺寸]
 * @param  {Float} rate [压缩比率]
 * @return {[type]}      [description]
 */
export const imagePress= function(file){
  const param= {
    maxsize: 204800,
    rate: 0.5,
  };
  //如果用户传入配置，则用用户配置代替默认配置
  if(arguments.length=== 2){
    let config= arguments[1];
    param.maxsize= config.maxsize || 204800;
    param.rate= config.rate || 0.5;
  };
  //如果文件不是图片，则直接返回
  if(!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.type)){
    alert('请上传图片类型文件！');
    return new Promise((resolve, reject) => {
      reject('file is not image/*');
    });
  }
  //如果图片大小合规，则直接返回
  if(file.size<= param.maxsize){
    console.warn('pic size '+ file.size+' is not need to be pressed');
    return new Promise((resolve, reject) => {
      resolve(file);
    });
  };
  let type= file.type;
  let size= file.size;
  let reader = new FileReader();
  return new Promise((resolve, reject) =>{
    reader.onload = function () {
      let result = this.result;
      let img = new Image();
      img.src = result;
      img.onload= () => {
        let data = $imagePress(img, {maxsize: param.maxsize, rate: param.rate, type: type });
        resolve(data);
        return;
        // if(data.size> param.maxsize){
        //   let sec_rate= (1- param.maxsize/data.size).toFixed(2);
        //   $blobToFile(data)
        //   .then((sec_file)=> {
        //     console.warn('sec_rate', sec_file, param.maxsize, sec_rate)
        //     imagePress(sec_file, {maxsize: param.maxsize, rate: sec_rate});
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   });
        // }
      };

    };
    reader.readAsDataURL(file);
  });
}

/**
 * [Blob转为dataUrl，再由dataUrl转File]
 * @return {[type]} [description]
 */
const $blobToFile= function(blob){
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.onload = function(e) {
      let dataurl= e.target.result;
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      res(new File([u8arr], 'newfile', {type:mime}));
    };
    reader.readAsDataURL(blob);
  });
};

const $imagePress= function(img, {maxsize, rate, type}){
  let initSize = img.src.length;
  let width = img.width;
  let height = img.height;

  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = width * height / 1800000)>1) {
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
  }else {
      ratio = 1;
  }

  //如果在裁剪大小后的size仍然大于maxsize，则取maxsize与剪裁后的size的比作为rate
  if((ratio=maxsize*ratio*ratio/initSize) < 1){
    rate= ratio;
  } else {
    rate= 1;
  }

  let canvas = document.createElement("CANVAS");
  let ctx= canvas.getContext("2d")
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.drawImage(img, 0, 0, width, height);

  //进行最小压缩
  let ndata = canvas.toDataURL("image/jpeg", rate);

  console.log("压缩前：" + initSize);
  console.log("压缩后：" + ndata.length);
  console.log("压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%");

  canvas.width = canvas.height = 0;

  return $imgPressUpload(ndata, 'image/jpeg');
}

const $imgPressUpload=function (basestr, type) {
    console.log(basestr, type);
    var text = window.atob(basestr.split(",")[1]);
    var buffer = new ArrayBuffer(text.length);
    var ubuffer = new Uint8Array(buffer);
    var pecent = 0 , loop = null;

    for (var i = 0; i < text.length; i++) {
        ubuffer[i] = text.charCodeAt(i);
    }

    var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
    var blob;

    if (Builder) {
        var builder = new Builder();
        builder.append(buffer);
        blob = builder.getBlob(type);
    } else {
        blob = new window.Blob([buffer], {type: type});
    }
    return blob;
} 