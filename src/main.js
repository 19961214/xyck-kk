import Vue from 'vue'
import App from './App.vue'
import ElemeUI from 'element-ui'
import axios from 'axios'
import store from './store'
import './assets/stylus/reset.css'
import './assets/stylus/elemet-ui-reset.css'
Vue.use(ElemeUI)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
