<template>
<div>
  <div v-loading="carregando">
    <div v-if="!carregando">
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

          <!-- ESTATISTICAS -->
          <estatistica-geral :winrate="deck.winrate" :vitorias="deck.vitorias" :derrotas="deck.derrotas" :progresso="deck.estatisticas.progresso"></estatistica-geral>

          <!-- MATCHUP -->
          <br><br>
          <div class="block" v-if="deck.matchup">
            <deck-matchup :modo="deck.modo" :matchup="deck.matchup"></deck-matchup>
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
            <div class="columns">
              <div class="column" v-if="deck.estatisticas.desempenho.bom_contra.length">
                <h2>{{ $t('deck.bom_contra') }}</h2>
                <div v-for="matchup in deck.estatisticas.desempenho.bom_contra">
                  <deck-desempenho :matchup="matchup"></deck-desempenho>
                </div>
              </div>
              <div class="column" v-if="deck.estatisticas.desempenho.ruim_contra.length">
                <h2>{{ $t('deck.ruim_contra') }}</h2>
                <div v-for="matchup in deck.estatisticas.desempenho.ruim_contra">
                  <deck-desempenho :matchup="matchup"></deck-desempenho>
                </div>
              </div>
            </div>
            <small v-html="$t('deck.desempenho_info')"></small>
          </div>

          <!-- PARTIDAS -->
          <br><br>
          <h2 class="subtitle"> {{ $t('deck.partidas') }}</h2>
          <deck-partidas></deck-partidas>


        </div>

        <!-- CARTAS -->

        <div class="column is-one-quarter">
          <div class="has-text-right">
            <button v-if="permiteEditar" class="button is-primary" @click="editar()">
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
  </div>
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import DeckPartidas from '@/components/decks/DeckPartidas'
import DeckCartas from '@/components/decks/DeckCartas'
import DeckModo from '@/components/decks/DeckModo'
import DeckDistribuicao from '@/components/decks/DeckDistribuicao'
import DeckMatchup from '@/components/decks/DeckMatchup'
import DeckDesempenho from '@/components/decks/DeckDesempenho'

import { EstatisticaGeral } from '@/components/estatisticas'

export default {
  name: 'deck',
  components: {
    DeckDistribuicao,
    DeckCartas,
    DeckPartidas,
    EstatisticaGeral,
    DeckModo,
    DeckMatchup,
    DeckDesempenho
  },
  data() {
    return {
      carregando: true
    }
  },
  created() {
    this.LOAD_DECK(this.$route.params.id).then(response => {
      this.carregando = false
    })
  },
  computed: {
    ...mapState({
      deck: 'deck'
    }),
    ...mapGetters([
      'jornada_encerrada'
    ]),
    permiteEditar() {
      // ultima partida, dono do deck, deck carregado
      let p = (this.deck.user_id === this.$auth.user().id && this.deck.id)

      if (this.deck.modo.chave === 'PANDORA') {
        p = p && !this.jornada_encerrada
      }

      return p
    }
  },
  methods: {
    ...mapActions([
      'LOAD_DECK'
    ]),

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
