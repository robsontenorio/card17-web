<template>
<div>
  <div class="columns">
    <!-- COLUNA ESQUERDA -->
    <div class="column">
      <h1 class="title">{{ deck.nome }}&nbsp;</h1>
      <div class="block" v-if="deck.matchup">
        <deck-cores :cores="deck.matchup.cores"></deck-cores>
        <deck-modo :modo="deck.modo"></deck-modo>
        <deck-arquetipo :arquetipo="deck.matchup.arquetipo"></deck-arquetipo>
        <deck-tipos :tipos="deck.matchup.tipos"></deck-tipos>
      </div>

      <!-- BLOCO ESTATISTICA GERAL -->
      <estatistica-geral :winrate="winrate" :vitorias="vitorias" :derrotas="derrotas" :progresso="progresso"></estatistica-geral>

      <!-- DESCRICAO -->
      <br><br>
      <div class="block">
        {{ deck.descricao }}
      </div>

      <br>
      <!-- DISTRIBUICAO DAS CARTAS -->
      <deck-distribuicao :terrenos="deck.distribuicao.terrenos" :faerias="deck.distribuicao.faerias" :tipos="deck.distribuicao.tipos"></deck-distribuicao>

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
      <button v-if="deck.user_id === this.$auth.user().id" class="button is-primary" @click="editar()">editar deck</button>
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
      deck: 'deck',
      winrate: state => state.deck.winrate,
      derrotas: state => state.deck.derrotas,
      vitorias: state => state.deck.vitorias,
      progresso: state => state.deck.progresso
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
/style>
