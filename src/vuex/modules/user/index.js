import { userAPI } from '@/api'

const state = {
  id: 0,
  locale: ''
}

// getters
const getters = {
  locale: (state) => {
    let l

    if (state.locale === '') {
      l = localStorage.getItem('locale')
      if (l === null) {
        // TODO redirecionar pra selecao de liguagem em Appvue
        localStorage.setItem('locale', 'br')
        l = 'br'
      }
    } else {
      l = state.locale
    }

    return l
  }
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
