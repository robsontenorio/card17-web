import { comumAPI } from '@/api'

const state = {
}

// getters
const getters = {
  cartas_pandora: state => state.cartas,
  cartas_batalha: state => state.cartas.filter(c => c.metadata.color !== 'PANDORA')
}

// actions
const actions = {
  LOAD_COMUM({ commit }) {
    comumAPI.all().then(response => {
      commit('SET_COMUM', { dados: response.data })
    })
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
