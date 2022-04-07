import day from 'dayjs'
import { isNull } from 'lodash'
import defaultSettings from '~/defaultSettings'

const keyName = defaultSettings.key + '-'

// store参数类型
export interface StoreParamsType<A> {
  name: string,
  type?: string,
  content?: string | number | boolean | A,
  dataType?: 'string' | 'number' | 'boolean' | 'object',
}

/**
 * 存储localStorage
 */
export const setStore = <T>(params: StoreParamsType<T>) => {
  let {
    name,
    content,
    type
  } = params
  name = keyName + name
  const obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: day().valueOf()
  }
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}

/**
 * 获取localStorage
 */
export const getStore = <T>(params: StoreParamsType<T>) => {
  let { name } = params
  name = keyName + name
  let content: StoreParamsType<T>['content'], obj: StoreParamsType<T>
  let storageItem: string = window.sessionStorage.getItem(name)!
  if (isNull(storageItem)) storageItem = window.localStorage.getItem(name)!
  if (isNull(storageItem)) return
  try {
    obj = JSON.parse(storageItem)!
  } catch {
    return storageItem
  }

  switch (obj.dataType) {
    case 'number':
      content = Number(obj.content)
      break
    case 'boolean':
      content = Boolean(obj.content)
      break
    default:
      content = obj.content
      break
  }
  return content
}

/**
 * 删除localStorage
 */
export const removeStore = (params: StoreParamsType<string>) => {
  let { name, type } = params
  name = keyName + name
  type ? window.sessionStorage.removeItem(name) : window.localStorage.removeItem(name)
}

/**
 * 获取全部localStorage
 */
export const getAllStore = (params: StoreParamsType<string>) => {
  const list = []
  const { type } = params
  const storage: Storage = type ? window.sessionStorage : window.localStorage
  for (let i = 0; i <= storage.length; i++) {
    list.push({
      name: storage.key(i),
      content: getStore({
        name: storage.key(i)!,
        ...(type ? { type: 'session' } : {})
      })
    })
  }
  return list
}

/**
 * 清空全部localStorage
 */
export const clearStore = (params: StoreParamsType<string>) => {
  params.type ? window.sessionStorage.clear() : window.localStorage.clear()
}
