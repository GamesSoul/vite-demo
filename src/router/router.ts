import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/layout/loginLayout'),
    children: [
      {
        path: '',
        component: () => import('~/pages/login')
      }
    ]
  }
]

export default routes
