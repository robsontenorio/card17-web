
import Vue from 'vue'

export default {
  salvar(partida) {
    return (partida.id === 0) ? this.post(partida) : this.put(partida)
  },
  get(id, filtros) {
    return Vue.axios.get('/partidas/' + id, { params: filtros }).catch(function (error) {
      throw error
    })
  },
  all(filtros) {
    return Vue.axios.get('/partidas', { params: filtros }).catch(function (error) {
      throw error
    })
  },
  post(partida) {
    return Vue.axios.post('/partidas', partida).catch(function (error) {
      throw error
    })
  },
  put(partida) {
    return Vue.axios.put('/partidas/' + partida.id, partida).catch(function (error) {
      throw error
    })
  },
  delete(id) {
    return Vue.axios.delete('/partidas/' + id).catch(function (error) {
      throw error
    })
  }
}
