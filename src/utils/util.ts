interface fullScreenType {
  mozIsFullScreen: boolean,
  webkitIsFullScreen: boolean,
  isFullScreen: boolean,
  exitFullScreen: () => void,
  webkitCancelFullScreen: () => void,
  mozCancelFullScreen: () => void,
  documentElement: {
    requestFullScreen: () => void,
    webkitRequestFullScreen: () => void,
    mozRequestFullScreen: () => void,
  }
}

// 定义阿里云验证类型防止ts抛异常
declare const document: Document & fullScreenType

// 表单序列化
export const serialize = (data: Record<string, any>) => {
  const list: string[] = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}

// 获取对象类型
export const getObjType = (obj: any) => {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) return 'element'
  return map[Object.prototype.toString.call(obj) as keyof typeof map]
}

/**
 * 设置灰度模式
 */
export const toggleGrayMode = () => {
  document.body.classList.toggle('grayMode')
}

/**
 * 设置主题
 */
export const setTheme = (name: string) => {
  document.body.classList.toggle(name)
}

/**
 * 加密处理
 */
// export const encryption = (params) => {
//   const { data, type, param, key } = params
//   const result = JSON.parse(JSON.stringify(data))
//   if (type === 'Base64') {
//     param.forEach(ele => {
//       result[ele] = window.btoa(result[ele])
//     })
//   } else if (type === 'Aes') {
//     param.forEach(ele => {
//       result[ele] = window.CryptoJS.AES.encrypt(result[ele], key).toString()
//     })
//   }
//   return result
// }

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return document.fullscreenEnabled || document.mozIsFullScreen || document.webkitIsFullScreen || document.isFullScreen || false
}

/**
* 浏览器全屏
*/
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}

/**
* 浏览器退出全屏
*/
export const exitFullScreen = () => {
  if (!document.documentElement.requestFullScreen === false) {
    document.exitFullScreen()
  } else if (!document.documentElement.webkitRequestFullScreen === false) {
    document.webkitCancelFullScreen()
  } else if (!document.documentElement.mozRequestFullScreen === false) {
    document.mozCancelFullScreen()
  }
}

/**
 * 动态插入css
 */
export const loadStyle = (url: string) => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 判断路由是否相等
 */
export const diff = (obj1: any, obj2: any): boolean => {
  delete obj1.close
  const o1 = obj1 instanceof Object
  const o2 = obj2 instanceof Object
  if (!o1 || !o2) { /* 判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (const attr in obj1) {
    const t1 = obj1[attr] instanceof Object
    const t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}

/**
 * 获取顶部地址栏地址
 */
export const getTopUrl = () => {
  return window.location.origin
}
