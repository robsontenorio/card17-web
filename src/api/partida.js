import Vue from 'vue'

export default {
  salvar(partida) {
    return (partida.id === 0) ? this.post(partida) : this.put(partida)
  },
  get(id, filtros) {
    return Vue.axios.get('/partidas/' + id, { params: filtros })
  },
  all(filtros) {
    return Vue.axios.get('/partidas', { params: filtros })
  },
  post(partida) {
    return Vue.axios.post('/partidas', partida)
  },
  put(partida) {
    return Vue.axios.put('/partidas/' + partida.id, partida)
  },
  delete(id) {
    return Vue.axios.delete('/partidas/' + id)
  }
}
