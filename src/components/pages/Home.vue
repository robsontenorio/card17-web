<template>
<div>
  <h1 class="title"> {{ $auth.user().username }}</h1>

  <br><br>
  <tabs>
    <tab-item label="MODO BATALHA">
      <br><br>
      <estatistica-geral cover="/static/images/modo_batalha.png" :winrate="estatisticas.batalha.winrate" :vitorias="estatisticas.batalha.vitorias" :derrotas="estatisticas.batalha.derrotas" :progresso="estatisticas.batalha.progresso"></estatistica-geral>
      <br><br>
      <deck-list :decks="decks.batalha"></deck-list>


    </tab-item>
    <tab-item label="MODO PANDORA">
      <br><br>
      <estatistica-geral cover="/static/images/modo_pandora.png" :winrate="estatisticas.pandora.winrate" :vitorias="estatisticas.pandora.vitorias" :derrotas="estatisticas.pandora.derrotas"></estatistica-geral>
      <br><br>
      <deck-list :decks="decks.pandora"></deck-list>
    </tab-item>
  </tabs>

  <!-- USer : {{ this.$auth.user().id }} - {{ $auth.user().nome }}<br> Token: {{ $auth.token() }} -->

</div>
</template>

<script>
import {
  deckAPI,
  userAPI
} from '@/api'

import DeckList from '@/components/decks/DeckList'
import EstatisticaGeral from '@/components/estatisticas/EstatisticaGeral'

export default {
  name: 'pages-home',
  components: {
    DeckList,
    EstatisticaGeral
  },
  data() {
    return {
      decks: {
        batalha: [],
        pandora: []
      },
      estatisticas: {
        batalha: {
          winrate: '-',
          vitorias: '-',
          derrotas: '-'
        },
        pandora: {
          winrate: '-',
          vitorias: '-',
          derrotas: '-'
        }
      }
    }
  },
  created() {
    let filtrosBatalha = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipos,matchup.tipos,partidas',
      modo_chave: 'BATALHA'
    }

    let filtrosPandora = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipos,matchup.tipos,partidas',
      modo_chave: 'PANDORA'
    }

    let filtrosEstatisticas = {
      appends: 'estatisticas'
    }

    userAPI.get(this.$auth.user().id, filtrosEstatisticas).then(response => {
      this.estatisticas = response.data.estatisticas
    })

    deckAPI.all(filtrosBatalha).then(response => {
      this.decks.batalha = response.data.data
    })

    deckAPI.all(filtrosPandora).then(response => {
      this.decks.pandora = response.data.data
    })
  }
}
</script>
