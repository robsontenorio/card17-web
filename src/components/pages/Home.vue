<template>
<div v-loading="!user">
  <div v-if="user">
    <profile :user="user"></profile>
    <br><br>
    <tabs :on-tab-click="show">
      <!-- DECKS BATALHA -->
      <tab-item :label="$t('deck.modo_batalha')">
        <br>
        <transition name="fade">
          <div v-if="tab == 0 && estatisticas.batalha.progresso">
            <estatistica-geral cover="/static/images/modo_batalha.png" :winrate="estatisticas.batalha.winrate" :vitorias="estatisticas.batalha.vitorias" :derrotas="estatisticas.batalha.derrotas" :progresso="estatisticas.batalha.progresso"></estatistica-geral>
          </div>
        </transition>
        <br>
        <div class="block">
          <button @click="addDeck('BATALHA')" class="button is-primary">
            <span class="icon is-small">
              <i class="fa fa-plus"></i>
            </span>
            <span>{{ $t('deck.botoes.criar_deck') }}</span>
          </button>
        </div>
        <deck-list @selecionado="mostrar" :decks="decks.batalha"></deck-list>
      </tab-item>

      <!-- DECKS PANDORA -->
      <tab-item :label="$t('deck.modo_pandora')">
        <br>
        <transition name="fade">
          <div v-if="tab == 1 && estatisticas.pandora.progresso">
            <estatistica-geral cover="/static/images/modo_pandora.png" :winrate="estatisticas.pandora.winrate" :vitorias="estatisticas.pandora.vitorias" :derrotas="estatisticas.pandora.derrotas" :progresso="estatisticas.pandora.progresso"></estatistica-geral>
          </div>
        </transition>
        <br>
        <div class="block">
          <button @click="addDeck('PANDORA')" class="button is-primary">
            <span class="icon is-small">
              <i class="fa fa-plus"></i>
            </span>
            <span>{{ $t('deck.botoes.criar_deck') }}</span>
          </button>
        </div>
        <deck-list @selecionado="mostrar" :decks="decks.pandora"></deck-list>
      </tab-item>
    </tabs>
  </div>
</div>
</template>

<script>
import {
  deckAPI,
  userAPI
} from '@/api'

import Profile from '@/components/pages/Profile'
import { DeckList } from '@/components/decks'
import { EstatisticaGeral } from '@/components/estatisticas'

export default {
  name: 'pages-home',
  components: {
    DeckList,
    EstatisticaGeral,
    Profile
  },
  data() {
    return {
      tab: null,
      user: null,
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
  async created() {
    let filtrosBatalha = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipo,matchup.tipos',
      modo_chave: 'BATALHA',
      appends: 'partidas_recentes'
    }

    let filtrosPandora = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipo,matchup.tipos,partidas',
      modo_chave: 'PANDORA',
      appends: 'partidas_recentes'
    }

    let filtrosEstatisticas = {
      appends: 'estatisticas'
    }

    // TODO vuex aqui?
    // TODO aqui poderia ser com THEN mesmo , para que as chamadas fossem paralelas. Com await parecem ser serial
    let response = await userAPI.get(this.$auth.user().id, filtrosEstatisticas)
    this.estatisticas = response.data.estatisticas
    this.user = response.data

    response = await deckAPI.all(filtrosBatalha)
    this.decks.batalha = response.data.data

    response = await deckAPI.all(filtrosPandora)
    this.decks.pandora = response.data.data
  },
  methods: {
    show(i) {
      this.tab = i
    },
    addDeck(modo) {
      this.$router.push(`/decks/0/edit?modo=${modo}`)
    },
    mostrar(id) {
      this.$router.push(`/decks/${id}`)
    }
  }
}
</script>
