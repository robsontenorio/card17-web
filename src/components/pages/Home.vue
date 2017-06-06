<template>
<div v-loading="!user || carregando">
  <div v-if="user">

    <radio-group v-model="temporada" :on-change="carregar">
      <radio-button val="todas">todas temporadas</radio-button>
      <radio-button val="anterior">anterior</radio-button>
      <radio-button val="atual">atual</radio-button>
    </radio-group>

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
        <deck-list v-loading="loading_batalha" @selecionado="mostrar" :decks="decks.batalha"></deck-list>
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
        <deck-list v-loading="loading_pandora" @selecionado="mostrar" :decks="decks.pandora"></deck-list>
      </tab-item>

      <!-- TEMPORADAS -->
      <!--  TODO criar componente -->
      <tab-item :label="$t('deck.temporadas')">
        <br>
        <transition name="fade">
          <div v-if="tab == 2">
            <div v-for="temporada in user.temporadas" class="temporada">
              <h2 class="subtitle">{{ temporada.nome }}</h2>
              <span class="tag rate is-warning">{{ temporada.winrate }}%</span>
              <span class="tag rate is-success">{{ temporada.vitorias }}</span>
              <span class="tag rate is-danger">{{ temporada.derrotas }}</span>
              <button v-if="temporada.aberta" class="button is-small" @click="showModal=true"> {{ $t('deck.botoes.encerrar_temporada') }}</button>
            </div>
          </div>
        </transition>

        <modal :title="$t('app.notify.certeza')" :on-ok="encerrar_temporada" :ok-text="$t('app.botoes.confirmar')" :ok-loading="true" :is-show="showModal" @close="showModal=false">
          <p>{{ $t('deck.notify.encerrar_temporada') }}</p>
          <br>
          <p class="control has-icon">
            <input v-model="nome_temporada" class="input" :placeholder="$t('deck.placeholder.nome_temporada')">
            <i class="fa fa-pencil"></i>
          </p>
        </modal>

      </tab-item>
    </tabs>
  </div>
</div>
</template>

<script>
import {
  deckAPI,
  userAPI,
  temporadaAPI
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
      temporada: 'atual',
      nome_temporada: '',
      showModal: false,
      tab: null,
      user: null,
      loading_pandora: true,
      loading_batalha: true,
      carregando: true,
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
    this.carregar()
  },
  methods: {
    carregar() {
      let filtrosBatalha = {
        user_id: this.$auth.user().id,
        temporada: this.temporada,
        includes: 'dificuldade,modo,matchup.cores,matchup.arquetipo,matchup.tipos,temporadas',
        modo_chave: 'BATALHA',
        appends: 'partidas_recentes'
      }

      let filtrosPandora = {
        user_id: this.$auth.user().id,
        temporada: this.temporada,
        includes: 'dificuldade,modo,matchup.cores,matchup.arquetipo,matchup.tipos,partidas,temporadas',
        modo_chave: 'PANDORA',
        appends: 'partidas_recentes'
      }

      let filtrosEstatisticas = {
        appends: 'estatisticas',
        includes: 'temporadas',
        temporada: this.temporada
      }

      this.carregando = true
      userAPI.get(this.$auth.user().id, filtrosEstatisticas).then(response => {
        this.estatisticas = response.data.estatisticas
        this.user = response.data
        this.carregando = false
      })

      deckAPI.all(filtrosBatalha).then(response => {
        this.decks.batalha = response.data.data
        this.loading_batalha = false
      })

      deckAPI.all(filtrosPandora).then(response => {
        this.decks.pandora = response.data.data
        this.loading_pandora = false
      })
    },
    show(i) {
      this.tab = i
    },
    addDeck(modo) {
      this.$router.push(`/decks/0/edit?modo=${modo}`)
    },
    mostrar(id) {
      this.$router.push(`/decks/${id}`)
    },
    encerrar_temporada() {
      if (this.nome_temporada === '') {
        alert(this.$t('deck.validacao.nome_temporada'))
        return
      }

      temporadaAPI.encerrar(this.nome_temporada).then(response => {
        this.showModal = false
        this.temporada_nome = ''
        this.carregar()
        this.$notify.open({
          type: 'success',
          content: this.$t('deck.notify.nova_temporada')
        })
        // TODO não consegui fechar o modal
        // window.location = '/home'
      })
    }
  }
}
</script>

<style scoped>
/* TODO mover para componente*/

.temporada {
  margin-bottom: 20px;
}

.temporada .rate {
  width: 45px;
}

h2 {
  font-weight: bold;
}
</style>
