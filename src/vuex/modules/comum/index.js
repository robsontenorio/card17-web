import { comumAPI } from '@/api'

const state = {
  cartas: [],
  tipos: [],
  arquetipos: [],
  modos: []
}

// getters
const getters = {
  cartas_pandora: state => state.cartas,
  cartas_batalha: state => state.cartas.filter(c => c.metadata.color !== 'PANDORA')
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
