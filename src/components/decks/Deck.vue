<template>
<div>
  <div class="columns">
    <!-- COLUNA ESQUERDA -->
    <div class="column">
      <h1 class="title">{{ deck.nome }}&nbsp;</h1>

      <!-- BLOCO ESTATISTICA GERAL -->
      <estatistica-geral :winrate="deck.winrate" :vitorias="deck.vitorias" :derrotas="deck.derrotas" :progresso="deck.progresso"></estatistica-geral>
      <!-- DESCRICAO -->


      <br><br>
      <h2 class="subtitle">DESCRIÇÃO</h2>
      <div class="block">
        {{ deck.descricao }}
      </div>

      <br>
      <!-- DISTRIBUICAO DAS CARTAS -->
      <deck-distribuicao :terrenos="deck.distribuicao.terrenos" :faerias="deck.distribuicao.faerias" :tipos="deck.distribuicao.tipos"></deck-distribuicao>

      <!-- PARTIDAS -->
      <br><br><br>
      <h2 class="subtitle">PARTIDAS</h2>
      <div class="notification is-default ">
        <deck-partidas :partidas="deck.partidas"></deck-partidas>
      </div>

    </div>

    <!-- CARTAS -->

    <div class="column is-one-quarter" style="padding-top: 60px;">
      <deck-cartas :cartas="deck.cartas"></deck-cartas>
    </div>

  </div>

</div>
</template>

<script>
import DeckDistribuicao from '@/components/decks/DeckDistribuicao'
import DeckPartidas from '@/components/decks/DeckPartidas'
import DeckCartas from '@/components/decks/DeckCartas'
import DeckCores from '@/components/decks/DeckCores'
import DeckArquetipos from '@/components/decks/DeckArquetipos'
import DeckTipos from '@/components/decks/DeckTipos'
import EstatisticaGeral from '@/components/estatisticas/EstatisticaGeral'

export default {
  name: 'deck',
  props: ['deck'],
  components: {
    DeckDistribuicao,
    DeckCartas,
    DeckCores,
    DeckArquetipos,
    DeckTipos,
    DeckPartidas,
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
