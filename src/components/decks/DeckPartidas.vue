<template>
<div v-if="partidas">

  <div class="block">
    <button @click="add()" class="button is-primary">
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
    <steps :current="0" type="line" prev-text="voltar" next-text="avançar">
      <step>
        <h2 class="subtitle">QUEM COMEÇOU?</h2>
        <radio-group v-model="partida.primeiro">
          <radio-button val="1">Eu</radio-button>
          <radio-button val="0">Oponente</radio-button>
        </radio-group>
        <br />
        <h2 class="subtitle">CORES DO OPONENTE</h2>
        <checkbox-group v-model="partida.matchup.cores">
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
        <checkbox-group v-model="partida.matchup.tipos">
          <checkbox :key="tipo.id" :val="tipo.id" v-for="tipo in comum.tipos" v-show="filtrar(tipo.nome)">
            <span class="tag">{{ tipo.nome }}</span>
          </checkbox>
        </checkbox-group>
      </step>
    </steps>
  </b-aside>

</div>
</template>

<script>
import { comumAPI } from '@/api'

import DeckCores from './DeckCores'
import DeckCor from './DeckCor'
import DeckArquetipos from './DeckArquetipos'
import DeckTipos from './DeckTipos'
import DeckEvento from './DeckEvento'

export default {
  name: 'deck-partidas',
  props: ['partidas'],
  components: {
    DeckCores,
    DeckArquetipos,
    DeckTipos,
    DeckEvento,
    DeckCor
  },
  data() {
    return {
      filtro: '',
      partida: {
        primeiro: null,
        evento: null,
        matchup: {
          arquetipos: null,
          cores: null,
          tipos: null
        }

      },
      adding: false,
      comum: {}
    }
  },
  methods: {
    filtrar(nome) {
      return nome.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1
    },
    add() {
      this.adding = true
      comumAPI.all().then(response => {
        this.comum = response.data
      })
    }
  }

}
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>
