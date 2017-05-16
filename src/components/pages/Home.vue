<template>
<div v-loading="!user">

  <div v-if="user">


    <profile :user="user"></profile>

    <br><br>
    <tabs :on-tab-click="show">
      <tab-item label="MODO BATALHA">
        <br>
        <transition name="fade">
          <div v-if="tab == 0 && estatisticas.batalha.progresso">

            <estatistica-geral cover="/static/images/modo_batalha.png" :winrate="estatisticas.batalha.winrate" :vitorias="estatisticas.batalha.vitorias" :derrotas="estatisticas.batalha.derrotas" :progresso="estatisticas.batalha.progresso"></estatistica-geral>

          </div>
        </transition>

        <br><br>
        <deck-list @selecionado="mostrar" :decks="decks.batalha"></deck-list>


      </tab-item>
      <tab-item label="MODO PANDORA">
        <br>
        <transition name="fade">
          <div v-if="tab == 1 && estatisticas.pandora.progresso">

            <estatistica-geral cover="/static/images/modo_pandora.png" :winrate="estatisticas.pandora.winrate" :vitorias="estatisticas.pandora.vitorias" :derrotas="estatisticas.pandora.derrotas" :progresso="estatisticas.pandora.progresso"></estatistica-geral>

          </div>
        </transition>
        <br><br>
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
  created() {
    let filtrosBatalha = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipo,matchup.tipos,partidas',
      modo_chave: 'BATALHA'
    }

    let filtrosPandora = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipo,matchup.tipos,partidas',
      modo_chave: 'PANDORA'
    }

    let filtrosEstatisticas = {
      appends: 'estatisticas'
    }

    userAPI.get(this.$auth.user().id, filtrosEstatisticas).then(response => {
      this.estatisticas = response.data.estatisticas
      this.user = response.data
    })

    deckAPI.all(filtrosBatalha).then(response => {
      this.decks.batalha = response.data.data
    })

    deckAPI.all(filtrosPandora).then(response => {
      this.decks.pandora = response.data.data
    })
  },
  methods: {
    show(i) {
      this.tab = i
    },
    mostrar(id) {
      this.$router.push(`/decks/${id}`)
    }
  }
}
</script>
