import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import i18n from './i18n/index.js'
import 'element-plus/dist/index.css'
// import VueSocketIO from 'vue-socket.io'
// import * as io from 'socket.io-client'
// import socket from './socket'

const app = createApp(App)

// const socket = new VueSocketIO({
//   debug: true,
//   connection: process.env.VUE_APP_BASE_DOMAIN || 'http://localhost:3000',
//   // vuex: {
//   //   store,
//   // },
//   options: {
//     autoConnect: false, // 关闭自动连接
//   },
// })
// app.config.productionTip = false
// app.config.globalProperties.$socket = socket;
app.use(i18n).use(store).use(router).use(ElementPlus).mount('#app')
