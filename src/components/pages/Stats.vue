<template>
<div v-loading="carregando">
  <h2 class="title"> {{ $t('app.mais_jogados') }} </h2>
  <div class="columns">
    <div class="column is-one-third">
      <div class="item" v-for=" matchup in stats.matchups.mais_jogados">
        <deck-desempenho v-if="stats.matchups" :key="matchup.id" :matchup="matchup"></deck-desempenho>
      </div>
    </div>
    <div class="column">
      <estatistica-vert-bar :height="110" :chart-data="maisJogadosData"></estatistica-vert-bar>
      <small> {{ $t('app.partidas_jogadas') }}</small>
    </div>
  </div>
  <br><br>
  <h2 class="title"> {{ $t('app.melhor_winrate') }} </h2>
  <div class="columns">
    <div class="column is-one-third">
      <div class="item" v-for=" matchup in stats.matchups.melhor_winrate">
        <deck-desempenho v-if="stats.matchups" :key="matchup.id" :matchup="matchup"></deck-desempenho>
      </div>
    </div>
    <div class="column">
      <estatistica-vert-bar :height="110" :chart-data="melhorWinrate"></estatistica-vert-bar>
    </div>
  </div>
</div>
</template>

<script>
import { comumAPI } from '@/api'
import { DeckDesempenho } from '@/components/decks'
import { EstatisticaVertBar } from '@/components/estatisticas'

export default {
  name: 'page-stats',
  components: {
    DeckDesempenho,
    EstatisticaVertBar
  },
  data() {
    return {
      carregando: true,
      stats: {
        matchups: {
          mais_jogados: [],
          melhor_winrate: []
        }
      }
    }
  },
  async created() {
    await comumAPI.stats().then(response => {
      this.carregando = false
      this.stats = response.data
    })
  },
  computed: {
    maisJogadosData() {
      let vitorias = this.stats.matchups.mais_jogados.map(x => x.vitorias)
      let derrotas = this.stats.matchups.mais_jogados.map(x => x.derrotas)
      let total = this.stats.matchups.mais_jogados.map(x => x.total)

      return {
        labels: total,
        datasets: [{
          backgroundColor: 'green',
          // label: this.$t('app.vitorias'),
          data: vitorias
        }, {
          backgroundColor: 'red',
          // label: this.$t('app.derrotas'),
          data: derrotas
        }]
      }
    },
    melhorWinrate() {
      let vitorias = this.stats.matchups.melhor_winrate.map(x => x.vitorias)
      let derrotas = this.stats.matchups.melhor_winrate.map(x => x.derrotas)
      let total = this.stats.matchups.melhor_winrate.map(x => x.total)

      return {
        labels: total,
        datasets: [{
          backgroundColor: '#93c5a3',
          // label: this.$t('app.vitorias'),
          data: vitorias
        }, {
          backgroundColor: '#ec8e80',
          // label: this.$t('app.derrotas'),
          data: derrotas
        }]
      }
    }
  }
}
</script>

<style scoped>
.item {
  margin-bottom: 20px;
}

h2 {
  font-weight: bold;
  text-transform: uppercase;
}
</style>
