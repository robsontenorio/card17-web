<template>
<div v-if="partidas">
  <div class="block">
    <button @click="adding = true" class="button is-primary">
      <span class="icon">
        <i class="fa fa-plus"></i>
      </span>
      <span>partida</span>
    </button>
    <button @click="filter()" class="button is-default">
      <span class="icon">
        <i class="fa fa-filter"></i>
      </span>
      <span>filtrar</span>
    </button>
  </div>
  <data-table :data="partidas">
    <column label="R">
      <template scope="row">
        <div class="">
            <deck-evento :evento="row.evento"></deck-evento>
        </div>
      </template>
    </column>
    <column label="P">
      <template scope="row">
        <div class="">
            <span v-if="row.primeiro == 1" class="icon is-small"><i class="fa fa-check"></i></span>
        </div>
      </template>
    </column>
    <column label="Cores">
      <template scope="row">
        <div class="">
            <deck-cores :cores="row.matchup.cores"></deck-cores>
        </div>
      </template>
    </column>
    <column label="Tipo">
      <template scope="row">
        <div>
            <deck-arquetipos :arquetipos="row.matchup.arquetipos"></deck-arquetipos>
            <deck-tipos :tipos="row.matchup.tipos"></deck-tipos>
        </div>
      </template>
    </column>
  </data-table>

  <p>
    R = Resultado
  </p>
  <p>
    P = Joguei primeiro
  </p>

  <b-aside :is-show="adding" :show-footer="false" title="PARTIDA" placement="right" @close="adding=false">
    <steps :current="currentStep" type="line" :show-footer="false" prev-text="voltar" next-text="avançar">
      <step>
        <h2 class="subtitle">QUEM COMEÇOU?</h2>
        <radio-group v-model="partida.primeiro">
          <radio-button val="1">Eu</radio-button>
          <radio-button val="0">Oponente</radio-button>
        </radio-group>
        <br />
        <h2 class="subtitle">CORES DO OPONENTE</h2>
        <checkbox-group ref="checkCores" v-model="partida.matchup.cores">
          <checkbox key="cor.id" :val="cor.id" v-for="cor in comum.cores" v-if="cor.chave != 'HUMAN' && cor.chave != 'PANDORA'">
            <deck-cor size="32x32" :chave="cor.chave"></deck-cor>
          </checkbox>
        </checkbox-group>

        <br />
        <h2 class="subtitle">ARQUÉTIPO DO OPONENTE</h2>
        <radio-group v-model="partida.matchup.arquetipos">
          <radio-button key="arquetipo.id" :val="arquetipo.id" v-for="arquetipo in comum.arquetipos">{{ arquetipo.nome }}</radio-button>
        </radio-group>

        <br />
        <h2 class="subtitle">RESULTADO</h2>
        <radio-group v-model="partida.evento">
          <radio-button val="1">Vitória <span class="icon"><i class="fa fa-thumbs-o-up"></i></span></radio-button>
          <radio-button val="0">Derrota <span class="icon"><i class="fa fa-thumbs-o-down"></i></span></radio-button>
        </radio-group>

      </step>
      <step>
        <h2 class="subtitle">DETALHES DO OPONENTE <span class="tag">opcional</span></h2>

        <p class="control has-icon">
          <input v-model="filtro" class="input" type="text" placeholder="filtrar...">
          <i class="fa fa-search"></i>
        </p>
        <br>
        <checkbox-group ref="checkTipos" v-model="partida.matchup.tipos">
          <checkbox :key="tipo.id" :val="tipo.id" v-for="tipo in comum.tipos" v-show="filtrar(tipo.nome)">
            <span class="tag">{{ tipo.nome }}</span>
          </checkbox>
        </checkbox-group>
      </step>
    </steps>
    <!-- // TODO criar componente para encapsular <alert-erros></alert-erros> que recebe titulo opcional, e uma lista de erros -->
    <alert :title="erro.message" type="danger" v-if="erro">
      <erros :itens="erro.errors"></erros>
    </alert>
    <div v-if="showFooter" class="step-footer has-text-right">
      <button class="button is-primary" @click="back()" v-show="this.currentStep === 1">voltar</button>
      <button class="button is-primary" @click="next()" v-show="this.currentStep === 0">avançar</button>
      <button class="button is-primary" @click="salvar()" v-show="this.currentStep === 1">
        <span class="icon"><i class="fa fa-check"></i></span>
        <span>salvar</span>
      </button>
    </div>
  </b-aside>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import DeckCores from './DeckCores'
import DeckCor from './DeckCor'
import DeckArquetipos from './DeckArquetipos'
import DeckTipos from './DeckTipos'
import DeckEvento from './DeckEvento'

export default {
  name: 'deck-partidas',
  components: {
    DeckCores,
    DeckArquetipos,
    DeckTipos,
    DeckEvento,
    DeckCor
  },
  data() {
    return {
      erro: null,
      filtro: '',
      currentStep: 0,
      showFooter: true,
      adding: false,
      partida: {
        id: 0,
        deck_id: null,
        primeiro: null,
        evento: null,
        matchup: {
          arquetipos: null,
          cores: [],
          tipos: []
        }
      }
    }
  },
  computed: {
    ...mapState({
      partidas: state => state.deck.partidas,
      deck_id: state => state.deck.id,
      comum: state => state.comum
    })
  },
  methods: {
    ...mapActions({
      add: 'ADD_PARTIDA'
    }),
    next() {
      this.currentStep++
    },
    back() {
      this.currentStep--
    },
    filtrar(nome) {
      return nome.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1
    },
    salvar() {
      let self = this

      this.partida.deck_id = this.deck_id

      this.add(this.partida).then(response => {
        self.reset()
        self.$notify.success({
          content: 'partida adicionada'
        })
      }).catch(function(error) {
        self.erro = error.response.data
        self.$notify.danger({
          content: error.response.data.message,
          placement: 'top-left'
        })
      })
    },
    reset() {
      // TODO o component checkboxgroup deveria ser reativo (issue aberta)

      this.$refs.checkTipos.checkedList = []
      this.$refs.checkCores.checkedList = []

      this.$refs.checkTipos.$children.map(c => {
        c.isChecked = false
        c.realVal = null
      })
      this.$refs.checkCores.$children.map(c => {
        c.isChecked = false
        c.realVal = null
      })

      // END

      Object.assign(this.$data, this.$options.data())
    }

  }

}
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>
