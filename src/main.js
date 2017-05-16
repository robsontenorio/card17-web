// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { default as store } from '@/vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

import { Loading } from 'element-ui'
import 'element-ui/lib/theme-default/loading.css'
Vue.use(Loading.directive)

import VueBlu from 'vue-blu'
import '../static/app.scss'

import App from './App'
import AlertErros from '@/components/html/AlertErros'
import router from './router'

Vue.config.productionTip = true
Vue.router = router // VueAuth precisa disso

Vue.component('alert-erros', AlertErros)
Vue.use(VueBlu)
Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
})

Vue.axios.defaults.baseURL = process.env.API_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
