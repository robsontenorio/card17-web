<template>
<div v-if="deck">
  <div class="block">
    <p class="control">
      <input v-model="deck.nome" class="input" type="text" placeholder="Nome do deck (Ex: Super Blue Jump)">
    </p>
    <radio-group v-model="deck.matchup.arquetipo_id">
      <radio-button key="arquetipo.id" :val="arquetipo.id.toString()" v-for="arquetipo in comum.arquetipos">{{ arquetipo.nome }}</radio-button>
    </radio-group>

    // TODO descricao

  </div>
  <div class="columns">
    <div class="column">
      pesquisar cartas
    </div>
    <div class="column">
      {{ deck.cartas }}
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

import { deckAPI } from '@/api'

export default {
  name: 'deck-edit',
  data() {
    return {
      deck: null
    }
  },
  mounted() {
    let params = {
      includes: 'cartas,matchup.cores,matchup.arquetipo,matchup.tipos'
    }
    deckAPI.get(this.$route.params.id, params).then(response => {
      this.deck = response.data
      this.deck.matchup.arquetipo_id = this.deck.matchup.arquetipo_id.toString() // TODO
    })
  },
  computed: {
    ...mapState({
      comum: state => state.comum
    })
  }
}
</script>

<style scoped>
</style>
