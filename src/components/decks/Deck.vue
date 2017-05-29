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
      <h2 class="subtitle"> {{ $t('deck.distribuicao') }} </h2>
      <deck-distribuicao :terrenos="deck.estatisticas.distribuicao.terrenos" :faerias="deck.estatisticas.distribuicao.faerias" :tipos="deck.estatisticas.distribuicao.tipos"></deck-distribuicao>

      <!-- DESEMPENHO -->
      <div v-show="deck.modo.chave === 'BATALHA'">
        <br><br><br>
        <h2 class="subtitle">{{ $t('deck.desempenho') }} </h2>

        <div class="columns desempenho">
          <div class="column" v-if="deck.estatisticas.desempenho.bom_contra.length">
            <h2>{{ $t('deck.bom_contra') }}</h2>
            <div class="contra" v-for="matchup in deck.estatisticas.desempenho.bom_contra">
              <span class="rate tag is-warning">{{ matchup.winrate }} %</span>
              <span class="rate tag is-success">{{ matchup.vitorias }}</span>
              <span class="rate tag is-danger">{{ matchup.derrotas }}</span>
              <deck-cores key="matchup.hash" :cores="matchup.cores"></deck-cores>
              <deck-arquetipo key="matchup.hash" :arquetipo="matchup.arquetipo"></deck-arquetipo>
              <deck-tipos key="matchup.hash" :tipos="matchup.tipos"></deck-tipos>
            </div>
          </div>

          <div class="column" v-if="deck.estatisticas.desempenho.ruim_contra.length">
            <h2>{{ $t('deck.ruim_contra') }}</h2>
            <div class="contra" v-for="matchup in deck.estatisticas.desempenho.ruim_contra">
              <span class="rate tag is-warning">{{ matchup.winrate }} %</span>
              <span class="rate tag is-success">{{ matchup.vitorias }}</span>
              <span class="rate tag is-danger">{{ matchup.derrotas }}</span>
              <deck-cores key="matchup.hash" :cores="matchup.cores"></deck-cores>
              <deck-arquetipo key="matchup.hash" :arquetipo="matchup.arquetipo"></deck-arquetipo>
              <deck-tipos key="matchup.hash" :tipos="matchup.tipos"></deck-tipos>
            </div>
          </div>
        </div>

        <small>O desempenho é calculado após 5 partidas contra a <strong>mesma</strong> matchup (cor + arquétipo + tipos [se houver]). Um winrate acima de 66% indica um bom desempenho. Um winrate abaixo de 40% indica um desempenho ruim.</small>

      </div>

      <!-- PARTIDAS -->
      <br><br>
      <h2 class="subtitle"> {{ $t('deck.partidas') }} </h2>
      <deck-partidas></deck-partidas>


    </div>

    <!-- CARTAS -->

    <div class="column is-one-quarter">
      <div class="has-text-right">
        <button v-if="deck.user_id === this.$auth.user().id" class="button is-primary" @click="editar()">
          <span class="icon is-small">
            <i class="fa fa-pencil"></i>
          </span>
          <span>{{ $t('deck.botoes.editar_deck') }}</span>
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

.desempenho .rate {
  width: 45px;
}

.desempenho .contra {
  margin-bottom: 10px;
}

.desempenho h2 {
  margin-bottom: 15px;
}
</style>
