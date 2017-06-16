import { userAPI } from '@/api'

const state = {
  id: 0,
  locale: '',
  isLogado: false
}

// getters
const getters = {}

// actions
const actions = {
  SET_USER({ commit }, u) {
    commit('SET_USER', { user: u })
    if (u !== null) {
      commit('SET_LOCALE', { locale: u.locale })
      if (state.id !== 0) {
        userAPI.patch(state)
      }
    }
  },
  SET_LOCALE({ commit, state }, l) {
    commit('SET_LOCALE', { locale: l })

    if (state.id !== 0) {
      userAPI.patch(state)
    }
  }
}

// mutations
const mutations = {
  SET_USER(state, { user }) {
    if (user === null) {
      let user = {id: 0, isLogado: false, locale: localStorage.getItem('locale')}
      Object.assign(state, user)
    } else {
      state = Object.assign(state, user)
      state.isLogado = (user.id !== 0)
    }
  },
  SET_LOCALE(state, { locale }) {
    localStorage.setItem('locale', locale)
    state.locale = locale
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
