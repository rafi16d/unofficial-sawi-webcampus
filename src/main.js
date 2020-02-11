import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import VueWait from 'vue-wait'
import axios from 'axios'

Vue.config.productionTip = false

export const baseUrl = 'http://localhost:8089'

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// Moment JS
const moment = require('moment')
require('moment/locale/fr-ch')

axios.defaults.baseURL = baseUrl
if (localStorage.getItem('auth')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth')
}

const app = new Vue({
  router,
  store,
  vuetify,
  wait: new VueWait({
    useVuex: true
  }),
  render: h => h(App)
}).$mount('#app')

export { app, router, store, moment }
