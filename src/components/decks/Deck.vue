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

        </div>
      </div>

      <!-- BLOCO ESTATISTICA GERAL -->
      <estatistica-geral :winrate="deck.winrate" :vitorias="deck.vitorias" :derrotas="deck.derrotas" :progresso="deck.estatisticas.progresso"></estatistica-geral>

      <!-- INFO GERAL -->
      <br><br>
      <div class="block" v-if="deck.matchup">
        <deck-cores :cores="deck.matchup.cores"></deck-cores>
        <deck-modo :modo="deck.modo"></deck-modo>
        <deck-arquetipo :arquetipo="deck.matchup.arquetipo"></deck-arquetipo>
        <deck-tipos :tipos="deck.matchup.tipos"></deck-tipos>
      </div>

      <!-- DESCRICAO -->
      <br>
      <div class="block" v-if="deck.descricao">
        <i class="fa fa-quote-left"></i> &nbsp; {{ deck.descricao }}
        <br><br>
      </div>

      <!-- DISTRIBUICAO DAS CARTAS -->
      <h2 class="subtitle">DISTRIBUIÇÃO</h2>
      <deck-distribuicao :terrenos="deck.estatisticas.distribuicao.terrenos" :faerias="deck.estatisticas.distribuicao.faerias" :tipos="deck.estatisticas.distribuicao.tipos"></deck-distribuicao>

      <!-- DESEMPENHO -->
      <div v-show="deck.modo.chave === 'BATALHA'">
        <br><br>
        <h2 class="subtitle">DESEMPENHO</h2> TODO ... [bom contra / ruim contra] 3 vitorias ou 3 derrotas definem o desempenho
      </div>

      <!-- PARTIDAS -->
      <br><br><br>
      <h2 class="subtitle">PARTIDAS</h2>
      <deck-partidas></deck-partidas>


    </div>

    <!-- CARTAS -->

    <div class="column is-one-quarter">
      <div class="has-text-right">
        <button v-if="deck.user_id === this.$auth.user().id" class="button is-primary" @click="editar()">
          <span class="icon is-small">
            <i class="fa fa-pencil"></i>
          </span>
          <span>editar deck</span>
        </button>
      </div>

      <div style="padding-top: 15px;">
        <deck-cartas :cartas="deck.cartas"></deck-cartas>
      </div>

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
