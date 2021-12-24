import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import config from './config'
import api from './api'
import vuetify from './plugins/vuetify'

axios.defaults.baseURL = `${config.URL_API}/api/`

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$config = config

new Vue({
  vuetify,
  render: h => h(App),
})
.$mount('#app')
