import { createApp } from 'vue'
import VueAxiosPlugin from 'vue-axios'
import Router from './router'
import Store from './store'
import Axios from '~/utils/resquest'
import App from './App'

const app = createApp(App)
// 挂在axios到全局上
// app.config.globalProperties.axios = axios

app.use(Router).use(Store).use(VueAxiosPlugin, Axios).mount('#app')
