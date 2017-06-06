import Vue from 'vue'

export default {
  salvar(temporada) {
    return (temporada.id === 0) ? this.post(temporada) : this.put(temporada)
  },
  get(id, filtros) {
    return Vue.axios.get('/temporadas/' + id, { params: filtros })
  },
  all(filtros) {
    return Vue.axios.get('/temporadas', { params: filtros })
  },
  post(temporada) {
    return Vue.axios.post('/temporadas', temporada)
  },
  encerrar(nome) {
    return Vue.axios.post('/temporadas/encerrar?nome=' + nome)
  },
  put(temporada) {
    return Vue.axios.put('/temporadas/' + temporada.id, temporada)
  },
  delete(id) {
    return Vue.axios.delete('/temporadas/' + id)
  }
}
