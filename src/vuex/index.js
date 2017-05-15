import Vue from 'vue'
import Vuex from 'vuex'

import comum from './modules/comum'
import deck from './modules/deck'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // actions,  <---- caso queira criar actions genericas
  // getters,
  modules: {
    comum,
    deck
  },
  strict: debug
})
