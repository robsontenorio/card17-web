<template>
<div v-if="partidas">
  <div class="block">
    <button @click="adding = true" :class="{'is-hidden': jornada_encerrada}" class="button is-primary">
      <span class="icon is-small">
        <i class="fa fa-plus"></i>
      </span>
      <span>{{ $t('partida.botoes.adicionar_partida') }}</span>
    </button>

  </div>
  <data-table :data="partidas">
    <column :label="$t('partida.r')">
      <template scope="row">
      <div class="">
        <deck-evento :evento="row.evento"></deck-evento>
      </div>
      </template>
    </column>
    <column :label="$t('partida.p')">
      <template scope="row">
      <div class="">
        <span v-if="row.primeiro == 1" class="icon is-small"><i class="fa fa-check"></i></span>
      </div>
      </template>
    </column>
    <column :label="$t('matchup.cores')">
      <template scope="row">
        <div class="">
            <deck-cores :cores="row.matchup.cores"></deck-cores>
        </div>
      </template>
    </column>
    <column :label="$t('matchup.tipos')">
      <template scope="row">
        <div>
            <deck-arquetipo :arquetipo="row.matchup.arquetipo"></deck-arquetipo>
            <deck-tipos :tipos="row.matchup.tipos"></deck-tipos>
        </div>
      </template>
    </column>
  </data-table>
  <small>
    <p>
      {{ $t('partida.resultado_label') }}
    </p>
    <p>
      {{ $t('partida.primeiro_label') }}
    </p>
  </small>


  <b-aside :is-show="adding" :show-footer="false" :title="$t('partida.partida')" placement="right" @close="adding=false">
    <steps :current="currentStep" type="line" :show-footer="false" prev-text="voltar" next-text="avançar">
      <step>
        <h2 class="subtitle">{{ $t('partida.quem_comecou') }}</h2>
        <radio-group v-model="partida.primeiro">
          <radio-button val="1">{{ $t('partida.eu') }}</radio-button>
          <radio-button val="0">{{ $t('partida.oponente') }}</radio-button>
        </radio-group>
        <br />
        <h2 class="subtitle">{{ $t('partida.cores_oponente') }}</h2>
        <checkbox-group ref="checkCores" v-model="partida.matchup.cores">
          <checkbox key="cor.id" :val="cor.id" v-for="cor in comum.cores" v-if="cor.chave != 'HUMAN' && cor.chave != 'PANDORA'">
            <deck-cor size="32x32" :chave="cor.chave"></deck-cor>
          </checkbox>
        </checkbox-group>

        <br />
        <h2 class="subtitle">{{ $t('partida.arquetipo_oponente') }}</h2>
        <radio-group v-model="partida.matchup.arquetipo_id">
          <radio-button key="arquetipo.id" :val="arquetipo.id.toString()" v-for="arquetipo in comum.arquetipos">{{ arquetipo.nome }}</radio-button>
        </radio-group>

        <br />
        <h2 class="subtitle">{{ $t('partida.resultado') }}</h2>
        <radio-group v-model="partida.evento">
          <radio-button val="1"> {{ $t('partida.vitoria') }} <span class="icon"><i class="fa fa-thumbs-o-up"></i></span></radio-button>
          <radio-button val="0"> {{ $t('partida.derrota') }} <span class="icon"><i class="fa fa-thumbs-o-down"></i></span></radio-button>
        </radio-group>

      </step>
      <step>
        <h2 class="subtitle">{{ $t('partida.detalhes_oponente') }} <span class="tag">{{ $t('partida.opcional') }}</span></h2>

        <p class="control has-icon">
          <input v-model="filtro" class="input" type="text" :placeholder="$t('app.placeholders.filtrar')">
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

    <alert-erros :titulo="erro.message" :itens="erro.errors" v-if="erro"></alert-erros>
    <br>
    <div v-if="showFooter" class="step-footer has-text-right">
      <button class="button is-primary" @click="back()" v-show="this.currentStep === 1"> {{ $t('app.botoes.voltar') }} </button>
      <button class="button is-primary" @click="next()" v-show="this.currentStep === 0">{{ $t('app.botoes.avancar') }}</button>
      <button class="button is-primary" @click="salvar()" v-show="this.currentStep === 1">
        <span class="icon"><i class="fa fa-check"></i></span>
        <span>{{ $t('app.botoes.salvar') }}</span>
      </button>
    </div>
  </b-aside>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import DeckCores from './DeckCores'
import DeckCor from './DeckCor'
import DeckArquetipo from './DeckArquetipo'
import DeckTipos from './DeckTipos'
import DeckEvento from './DeckEvento'

export default {
  name: 'deck-partidas',
  components: {
    DeckCores,
    DeckArquetipo,
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
          arquetipo_id: null,
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
      deck: state => state.deck,
      comum: state => state.comum
    }),
    jornada_encerrada() {
      if (this.deck.modo.chave === 'PANDORA') {
        return (this.deck.vitorias === 9 || this.deck.derrotas === 3) ? 1 : 0
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      addPartida: 'ADD_PARTIDA'
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
    async salvar() {
      let avisoJornada = this.$t('partida.pandora.aviso_jornada') + this.deck.vitorias + this.$t('deck.v') + ' - ' + this.deck.derrotas + this.$t('deck.d')
      // TODO ... padronizar todos s numeros serem INT e nao string. AXIOS?
      if (this.deck.modo.chave === 'PANDORA') {
        if ((this.partida.evento === '0' && this.deck.derrotas === 2) || (this.partida.evento === '1' && this.deck.vitorias === 8)) {
          // TODO usar componente do vue-blue
          if (!confirm(avisoJornada)) {
            return
          }
        }
      }

      this.partida.deck_id = this.deck_id // TODO

      try {
        await this.addPartida(this.partida)
        this.reset()
        this.$notify.success({ content: this.$t('partida.notify.adicionada') })
      } catch (error) {
        this.erro = error.response.data
        this.$notify.danger({ content: error.response.data.message, placement: 'top-left' })
      }
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
