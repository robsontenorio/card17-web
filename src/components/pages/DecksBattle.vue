<template>
<div>

  <br><br>
  <div class="level">
    <div class="level-left">
      <h1 class="title">DECKS</h1>
    </div>
    <div class="level-right">
      <radio-group v-model="arquivo">
        <radio-button class="is-small" val="ativos">ativos</radio-button>
        <radio-button class="is-small" val="arquivados">arquivados</radio-button>
      </radio-group>
    </div>
  </div>
  <deck-list :decks="decks"></deck-list>
</div>
</template>

<script>
import DeckList from '@/components/decks/DeckList'
import EstatisticaGeral from '@/components/estatisticas/EstatisticaGeral'
import {
  deckAPI
} from '@/api'

export default {
  components: {
    DeckList,
    EstatisticaGeral
  },
  data() {
    return {
      decks: [],
      periodo: 'temporada',
      arquivo: 'ativos'
    }
  },
  created() {
    let filtros = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipos,matchup.tipos,partidas',
      'modo_chave': 'BATALHA'
    }

    deckAPI.all(filtros).then(response => {
      this.decks = response.data.data
    })
  }
}
</script>

<style scoped>
.level .title {
  margin-bottom: 0;
}
</style>
