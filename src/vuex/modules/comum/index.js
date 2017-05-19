import { comumAPI } from '@/api'

const state = {
  comum: []
}

// getters
const getters = {
  // checkoutStatus: state => state.checkoutStatus
}

// actions
const actions = {
  async LOAD_COMUM({ commit }) {
    const response = await comumAPI.all()
    commit('SET_COMUM', { dados: response.data })
  }
}

// mutations
const mutations = {

  SET_COMUM(state, { dados }) {
    state = Object.assign(state, dados)
    // todo organizar atributos ?
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
