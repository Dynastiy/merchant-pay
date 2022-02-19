import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from 'axios'

import './assets/css/main.css'
import './assets/css/util.css'

Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
