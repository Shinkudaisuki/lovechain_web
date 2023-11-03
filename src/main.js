// import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CryptoJS from 'crypto-js'
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const myMixin = {
  created() {
    this.$md5 = (data) => {return CryptoJS.MD5(data).toString()}
  }
}

const app = createApp(App).mixin(myMixin).use(store).use(router).use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$axios = axios.create()

if (process.env.NODE_ENV == 'development') {
  console.log('application running in development mode')
  const Mock = require('./mock')
  app.use(Mock)
}
else if (process.env.NODE_ENV == 'production') {
  console.log('application running in production mode')
}


app.mount('#app')

