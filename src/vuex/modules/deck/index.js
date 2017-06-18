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
  ultima_partida: state => {
    const [last] = [...state.partidas].reverse()
    return last
  },
  jornada_encerrada: state => {
    if (state.modo.chave === 'PANDORA') {
      return (state.vitorias === 9 || state.derrotas === 3) ? 1 : 0
    } else {
      return false
    }
  }
}

// actions
const actions = {
  LOAD_DECK({ commit, state }, deck) {
    let filtros = {
      includes: 'cartas,modo,matchup.cores,matchup.arquetipo,matchup.tipos,user',
      appends: 'estatisticas,partidas',
      temporada: deck.temporada
    }

    return deckAPI.get(deck.id, filtros).then(response => {
      commit('SET_DECK_FULL', { deck: response.data })
    })
  },
  async ADD_PARTIDA({ commit, dispatch }, partida) {
    const response = await partidaAPI.post(partida)
    commit('ADD_PARTIDA', { partida: response.data })
    dispatch('LOAD_DECK', {id: state.id}) // TODO ? LOAD_PARTIDAS
  },
  async DELETE_PARTIDA({ commit, dispatch }, partida) {
    const response = await partidaAPI.delete(partida)
    commit('DELETE_PARTIDA', { partida: response.data })
    dispatch('LOAD_DECK', {id: state.id}) // TODO ? LOAD_PARTIDAS
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
