
import Vue from 'vue'

export default {
  salvar(user) {
    return (user.id === 0) ? this.post(user) : this.put(user)
  },
  get(id, filtros) {
    return Vue.axios.get('/users/' + id, { params: filtros })
  },
  all(filtros) {
    return Vue.axios.get('/users', { params: filtros })
  },
  post(user) {
    return Vue.axios.post('/users', user)
  },
  put(user) {
    return Vue.axios.put('/users/' + user.id, user)
  },
  delete(id) {
    return Vue.axios.delete('/users/' + id)
  }
}
