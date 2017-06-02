import { deckAPI, partidaAPI } from '@/api'

const state = {
  cartas: [],
  partidas: [],
  vitorias: 0,
  derrotas: 0,
  winrate: 0,
  modo: {},
  estatisticas: {
    progresso: [],
    desempenho: {
      bom_contra: [],
      ruim_contra: []
    },
    distribuicao: {
      terrenos: [],
      ferias: [],
      tipos: []
    }
  }
}

// getters
const getters = {
  ultimaPartida: state => {
    const [last] = [...state.partidas].reverse()
    return last
  }
}

// actions
const actions = {
  LOAD_DECK({ commit }, id) {
    let filtros = {
      includes: 'cartas,partidas,modo,matchup.cores,matchup.arquetipo,matchup.tipos,partidas.matchup.tipos,partidas.matchup.arquetipo,partidas.matchup.cores',
      appends: 'estatisticas'
    }

    return deckAPI.get(id, filtros).then(response => {
      commit('SET_DECK_FULL', { deck: response.data })
    })
  },
  async ADD_PARTIDA({ commit, dispatch }, partida) {
    const response = await partidaAPI.post(partida)
    commit('ADD_PARTIDA', { partida: response.data })
    dispatch('LOAD_DECK', state.id) // TODO ? LOAD_PARTIDAS
  },
  async DELETE_PARTIDA({ commit, dispatch }, partida) {
    const response = await partidaAPI.delete(partida)
    commit('DELETE_PARTIDA', { partida: response.data })
    dispatch('LOAD_DECK', state.id) // TODO ? LOAD_PARTIDAS
  }

}

// mutations
const mutations = {

  SET_DECK_FULL(state, { deck }) {
    state = Object.assign(state, deck)
    // todo organizar atributos ?
  },
  DELETE_PARTIDA(state, { partida }) {
  },
  ADD_PARTIDA(state, { partida }) {
    // TODO fazer push aqui ou recarregar do servidor? atualmente usando LOAD_DECK no action
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
