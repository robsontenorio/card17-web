<template>
<div>
  <deck :deck="deck"></deck>
</div>
</template>

<script>
import {
  deckAPI
} from '@/api'

import Deck from '@/components/decks/Deck'

export default {
  components: {
    Deck
  },
  data() {
    return {
      deck: {
        id: this.$route.params.id,
        cartas: {},
        distribuicao: {
          terrenos: {},
          ferias: {},
          tipos: {}
        }
      }
    }
  },
  created() {
    let filtros = {
      includes: 'cartas,partidas,matchup,partidas.matchup.tipos,partidas.matchup.arquetipos,partidas.matchup.cores',
      appends: 'distribuicao,progresso'
    }

    deckAPI.get(this.deck.id, filtros).then(response => {
      this.deck = response.data
    })
  }
}
</script>

<style scoped>
</style>
