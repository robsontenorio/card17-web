
import Vue from 'vue'

export default {
  all(filtros) {
    return Vue.axios.get('/comum', { params: filtros })
  }
}