import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import router from '~/router'
import store from '~/store'
// import { Base64 } from 'js-base64'
import { ElNotification } from 'element-plus'
import defaultSettings from '~/defaultSettings'
// import { serialize } from '~/utils/util'
// import { getToken } from '~/utils/auth'

// 正在请求的API队列
const requestList: string[] = []
/**
 * @name:  阻止请求
 * @param {string[]} requestList 当前API请求队列
 * @param {string} currentUrl  当前请求API
 * @param {string} errorMsg   中断错误信息
 */
const stopRepeatRequest = (requestList: string[], currentUrl: string): boolean => {
  for (let i = 0; i < requestList.length; i++) {
    if (requestList[i] === currentUrl) {
      return false
    }
  }
  // 将当前请求加入执行队列
  requestList.push(currentUrl)
  return true
}

const instance = axios.create({
  // 多久超时
  timeout: 10000,
  // 跨域请求，允许保存cookie
  withCredentials: true,
  // 返回其他状态码
  validateStatus: function (status) {
    return status >= 200 && status < 500 // default
  }
})

// HTTPrequest拦截
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (stopRepeatRequest(requestList, config.url!)) {
    ElNotification({
      title: '系统提示',
      message: '请求速度过快请稍后再试',
      type: 'warning'
    })
  }
  // const meta = (config.meta || {})
  // const isToken = meta.isToken === false
  // config.headers!.Authorization = `Basic ${Base64.encode(`${defaultSettings.clientId}:${defaultSettings.clientSecret}`)}`
  // if (getToken() && !isToken) {
  //   // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  //   config.headers!['Blade-Auth'] = 'bearer ' + getToken()
  // }
  // // headers中配置serialize为true开启序列化
  // if (config.method === 'post' && meta.isSerialize === true) {
  //   config.data = serialize(config.data)
  // }
  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
axios.interceptors.response.use(res => {
  const status = res.data.code || 200
  const statusWhiteList = defaultSettings.statusWhiteList || []
  const message = res.data.msg || '未知错误'
  // 如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) return Promise.reject(res)
  // 如果是401则跳转到登录页面
  if (status === 401) store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }))
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    ElNotification({
      title: '系统提示',
      message: message,
      type: 'warning'
    })
    return Promise.reject(new Error(message))
  }
  return res
}, error => {
  return Promise.reject(new Error(error))
})

export default instance
