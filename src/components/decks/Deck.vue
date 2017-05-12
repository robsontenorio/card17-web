<template>
<div>
  <div class="columns">
    <!-- COLUNA ESQUERDA -->
    <div class="column">
      <h1 class="title">{{ deck.nome }}&nbsp;</h1>
      <div class="block" v-if="deck.matchup">
        <deck-cores :cores="deck.matchup.cores"></deck-cores>
        <deck-arquetipos :arquetipos="deck.matchup.arquetipos"></deck-arquetipos>
        <deck-tipos :tipos="deck.matchup.tipos"></deck-tipos>
      </div>

      <!-- BLOCO ESTATISTICA GERAL -->
      <estatistica-geral :winrate="deck.winrate" :vitorias="deck.vitorias" :derrotas="deck.derrotas" :progresso="deck.progresso"></estatistica-geral>
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
      <deck-partidas :partidas="deck.partidas"></deck-partidas>


    </div>

    <!-- CARTAS -->

    <div class="column is-one-quarter" style="padding-top: 100px;">
      <deck-cartas :cartas="deck.cartas"></deck-cartas>
    </div>

  </div>

</div>
</template>

<script>
import DeckPartidas from '@/components/decks/DeckPartidas'
import DeckCartas from '@/components/decks/DeckCartas'
import DeckCores from '@/components/decks/DeckCores'
import DeckTipos from '@/components/decks/DeckTipos'
import DeckArquetipos from '@/components/decks/DeckArquetipos'
import DeckDistribuicao from '@/components/decks/DeckDistribuicao'

import { EstatisticaGeral } from '@/components/estatisticas'

export default {
  name: 'deck',
  props: ['deck'],
  components: {
    DeckDistribuicao,
    DeckCartas,
    DeckCores,
    DeckPartidas,
    DeckTipos,
    DeckArquetipos,
    EstatisticaGeral
  },
  data() {
    return {
      periodo: 'temporada'
    }
  }
}
</script>

<style scoped>
/style>
