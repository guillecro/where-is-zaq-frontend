import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'

import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import http from './http'

Vue.use(Buefy)
Vue.prototype.$http = http
Vue.config.productionTip = false

const socketParams = {
  reconnection: true,
  reconnectionDelay: 2000,
  maxReconnectionAttempts: Infinity,
  // autoConnect: false
}

const socket = io(process.env.VUE_APP_API_URL, socketParams);
// const socket = io('https://192.168.0.215:13230/', socketParams);
Vue.use(VueSocketIOExt, socket);

new Vue({
  render: h => h(App),
}).$mount('#app')
