// import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CryptoJS from 'crypto-js'

const myMixin = {
    created() {
        this.$md5 = (data) => {return CryptoJS.MD5(data).toString()}
    }
}

createApp(App).mixin(myMixin).use(store).use(router).mount('#app')
