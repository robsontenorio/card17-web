// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

// import { Table, TableColumn } from 'element-ui'
// import 'element-ui/lib/theme-default/index.css' // TODO importar somente CSS especifico?
// Vue.component(Table.name, Table)
// Vue.component(TableColumn.name, TableColumn)

import { Loading } from 'element-ui'
import 'element-ui/lib/theme-default/loading.css'
Vue.use(Loading.directive)

// import Buefy from 'buefy'
// import 'buefy/lib/buefy.css'
import VueBlu from 'vue-blu'
import '../static/app.scss'

import App from './App'
import router from './router'

Vue.config.productionTip = true
Vue.router = router // VueAuth precisa disso

// Vue.use(Buefy)
Vue.use(VueBlu)
Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
//  refreshData: { url: '/auth/refresh' }

})

Vue.axios.defaults.baseURL = process.env.API_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Vue.router,
  template: '<App/>',
  components: { App }
})
