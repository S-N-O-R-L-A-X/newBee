import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false
// axios.defaults.baseURL = "http://youngoldman.top:5555/api/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
