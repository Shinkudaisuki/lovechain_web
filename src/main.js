// import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CryptoJS from 'crypto-js'
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const myMixin = {
  created() {
    this.$md5 = (data) => {return CryptoJS.MD5(data).toString()}
  }
}

const app = createApp(App).mixin(myMixin).use(store).use(router).use(ElementPlus)
app.config.globalProperties.$axios = axios.create()
app.mount('#app')