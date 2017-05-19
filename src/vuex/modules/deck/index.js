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
  async LOAD_DECK({ commit }, id) {
    let filtros = {
      includes: 'cartas,partidas,modo,matchup.cores,matchup.arquetipo,matchup.tipos,partidas.matchup.tipos,partidas.matchup.arquetipo,partidas.matchup.cores',
      appends: 'distribuicao,progresso'
    }

    const response = await deckAPI.get(id, filtros)
    commit('SET_DECK_FULL', { deck: response.data })
  },
  async ADD_PARTIDA({ commit, dispatch }, partida) {
    const response = await partidaAPI.post(partida)
    commit('ADD_PARTIDA', { partida: response.data })
    dispatch('LOAD_DECK', state.id) // TODO ? LOAD_PARTIDAS
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
