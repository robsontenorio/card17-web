import { deckAPI, partidaAPI } from '@/api'

const state = {
  vitorias: 0,
  derrotas: 0,
  winrate: 0,
  cartas: [],
  partidas: [],
  desempenho: [],
  progresso: [],
  distribuicao: {
    terrenos: [],
    ferias: [],
    tipos: []
  }
}

// getters
const getters = {
  // checkoutStatus: state => state.checkoutStatus
}

// actions
const actions = {
  LOAD_DECK({ commit }, id) {
    let filtros = {
      includes: 'cartas,partidas,matchup.cores,matchup.arquetipos,matchup.tipos,partidas.matchup.tipos,partidas.matchup.arquetipos,partidas.matchup.cores',
      appends: 'distribuicao,progresso'
    }

    return deckAPI.get(id, filtros).then(response => {
      commit('SET_DECK_FULL', { deck: response.data })
    })
  },
  ADD_PARTIDA({ commit, dispatch }, partida) {
    return partidaAPI.post(partida).then(response => {
      commit('ADD_PARTIDA', { partida: response.data })
      dispatch('LOAD_DECK', state.id) // TODO ? LOAD_PARTIDAS
    })
  }

}

// mutations
const mutations = {

  SET_DECK_FULL(state, { deck }) {
    state = Object.assign(state, deck)
    // todo organizar atributos ?
  },
  ADD_PARTIDA(state, { partida }) {
    //  state.partidas.push(partida) TODO

    // TODO adicionar progresso (lembrar das limitacoes do array ser reativo, chartjs re-renderizar)
    if (partida.evento === '1') {
      state.vitorias++
    } else {
      state.derrotas++
    }

    state.winrate = Math.floor((state.vitorias / (state.vitorias + state.derrotas)) * 100)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
