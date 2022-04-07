export interface defaultSettingsType {
  clientId: string,
  clientSecret: string,
  statusWhiteList: number[],
  key: string,
  language: string,
  menu: {
    iconDefault: string,
    props: {
      label: string,
      path: string,
      icon: string,
      children: string,
    }
  }
}

export default {
  clientId: '', // 客户端id
  clientSecret: '', // 客户端密钥
  // http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  key: '', // 配置主键,目前用于h5本地存储
  language: 'zh-cn',
  // 配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      children: 'children'
    }
  }
} as defaultSettingsType
