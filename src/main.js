import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import store from './store'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './axios'
// import './permission'

Vue.use(Element)
Vue.prototype.$axios = axios

// Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
