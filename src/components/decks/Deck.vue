<template>
<div>
  <div class="columns">
    <!-- COLUNA ESQUERDA -->
    <div class="column">

      <div class="level">
        <div class="level-left">
          <h1 class="title">{{ deck.nome }}&nbsp;</h1>
        </div>
        <div class="level-right">
          <button v-if="deck.user_id === this.$auth.user().id" class="button is-primary" @click="editar()">editar deck</button>
        </div>
      </div>

      <!-- INFO GERAL -->
      <div class="block" v-if="deck.matchup">
        <deck-cores :cores="deck.matchup.cores"></deck-cores>
        <deck-modo :modo="deck.modo"></deck-modo>
        <deck-arquetipo :arquetipo="deck.matchup.arquetipo"></deck-arquetipo>
        <deck-tipos :tipos="deck.matchup.tipos"></deck-tipos>
      </div>

      <!-- BLOCO ESTATISTICA GERAL -->
      <estatistica-geral :winrate="deck.estatisticas.winrate" :vitorias="deck.estatisticas.vitorias" :derrotas="deck.estatisticas.derrotas" :progresso="deck.estatisticas.progresso"></estatistica-geral>

      <!-- DESCRICAO -->
      <br><br>
      <div class="block" v-if="deck.descricao">
        <i class="fa fa-quote-left"></i> &nbsp; {{ deck.descricao }}
      </div>

      <br>
      <!-- DISTRIBUICAO DAS CARTAS -->
      <deck-distribuicao :terrenos="deck.estatisticas.distribuicao.terrenos" :faerias="deck.estatisticas.distribuicao.faerias" :tipos="deck.estatisticas.distribuicao.tipos"></deck-distribuicao>

      <br><br>
      <!-- DESEMPENHO -->
      <h2 class="subtitle">DESEMPENHO</h2> [bom contra / ruim contra] 3 vitorias ou 3 derrotas definem o desempenho

      <!-- PARTIDAS -->
      <br><br><br>
      <h2 class="subtitle">PARTIDAS</h2>
      <deck-partidas></deck-partidas>


    </div>

    <!-- CARTAS -->

    <div class="column is-one-quarter" style="padding-top: 100px;">
      <deck-cartas :cartas="deck.cartas"></deck-cartas>
    </div>

  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'

import DeckPartidas from '@/components/decks/DeckPartidas'
import DeckCartas from '@/components/decks/DeckCartas'
import DeckCores from '@/components/decks/DeckCores'
import DeckModo from '@/components/decks/DeckModo'
import DeckTipos from '@/components/decks/DeckTipos'
import DeckArquetipo from '@/components/decks/DeckArquetipo'
import DeckDistribuicao from '@/components/decks/DeckDistribuicao'

import { EstatisticaGeral } from '@/components/estatisticas'

export default {
  name: 'deck',
  components: {
    DeckDistribuicao,
    DeckCartas,
    DeckCores,
    DeckPartidas,
    DeckTipos,
    DeckArquetipo,
    EstatisticaGeral,
    DeckModo
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      deck: 'deck'
    })
  },
  methods: {
    editar() {
      let id = this.$route.params.id
      this.$router.push(`/decks/${id}/edit`)
    }
  }

}
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>
