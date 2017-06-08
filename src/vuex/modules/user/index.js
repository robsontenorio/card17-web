import { userAPI } from '@/api'

const state = {
  id: 0,
  locale: ''
}

// getters
const getters = {
  locale: (state) => { return (state.locale === '') ? 'br' : state.locale }
}

// actions
const actions = {
  SET_USER({ commit }, u) {
    commit('SET_USER', { user: u })
  },
  async SET_LOCALE({ commit, state }, l) {
    commit('SET_LOCALE', { locale: l })

    if (state.id !== 0) {
      await userAPI.patch(state)
    }
  }
}

// mutations
const mutations = {
  SET_USER(state, { user }) {
    state = Object.assign(state, user)
    // todo organizar atributos ?
  },
  SET_LOCALE(state, { locale }) {
    state.locale = locale
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
