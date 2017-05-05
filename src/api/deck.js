
import Vue from 'vue'

export default {
  salvar(deck) {
    return (deck.id === 0) ? this.post(deck) : this.put(deck)
  },
  get(id, filtros) {
    return Vue.axios.get('/decks/' + id, { params: filtros })
  },
  all(filtros) {
    return Vue.axios.get('/decks', { params: filtros })
  },
  post(deck) {
    return Vue.axios.post('/decks', deck)
  },
  put(deck) {
    return Vue.axios.put('/decks/' + deck.id, deck)
  },
  delete(id) {
    return Vue.axios.delete('/decks/' + id)
  }
}
