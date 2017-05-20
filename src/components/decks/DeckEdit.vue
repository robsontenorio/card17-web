<template>
<div v-loading="!deck">
  <div v-if="deck">

    <div class="level">
      <div class="level-left">
        <h1 class="title">EDITAR DECK</h1>
      </div>
      <div class="level-right">
        <button class="button is-primary" @click="salvar()">salvar</button>
        <button class="button is-default" @click="cancelar()">cancelar</button>
      </div>
    </div>

    <div class="block">
      <label class="label">Nome do deck</label>
      <p class="control">
        <input v-model="deck.nome" class="input" type="text" placeholder="Nome do deck (Ex: Super Blue Jump)">
      </p>
      <div class="field is-grouped">
        <label class="label">Arquétipo</label>
        <p class="control">
          <radio-group v-model="deck.matchup.arquetipo_id">
            <radio-button key="arquetipo.id" :val="arquetipo.id.toString()" v-for="arquetipo in comum.arquetipos">{{ arquetipo.nome }}</radio-button>
          </radio-group>
        </p>
        <label class="label">Tipos</label>
        <p class="control">
          <deck-tipos :tipos="tiposSelected"></deck-tipos>
          <button class="button is-default" @click="addingtipo = true">editar</button>
        </p>
        <label class="label">Descrição</label>
        <p class="control">
          <textarea v-model="deck.descricao" class="textarea" placeholder="Diga algo sobre este deck. Visão geral, muligans, estratégias ..."></textarea>
        </p>
      </div>

    </div>
    <div class="columns">
      <div class="column">
        <button class="button is-primary" @click="addcarta()">add</button> {{ this.deck.cartas }}
        <br><br><br> pesquisar cartas {{ cartasSelected }}


      </div>
      <div class="column is-one-quarter">

        <deck-cartas :cartas="cartasSelected"></deck-cartas>
      </div>
    </div>
  </div>

  <b-aside v-if="deck" :is-show="addingtipo" :show-footer="false" title="TIPOS" placement="right" @close="addingtipo=false">

    <p class="control has-icon">
      <input v-model="filtro" class="input" type="text" placeholder="filtrar...">
      <i class="fa fa-search"></i>
    </p>
    <checkbox-group v-model="deck.matchup.tipos">
      <checkbox :key="tipo.id" :val="tipo.id" v-for="tipo in comum.tipos" v-show="filtrar(tipo.nome)">
        <span class="tag">{{ tipo.nome }}</span>
      </checkbox>
    </checkbox-group>
  </b-aside>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { deckAPI } from '@/api'
import { DeckTipos, DeckCartas } from '@/components/decks'

export default {
  name: 'deck-edit',
  components: {
    DeckTipos,
    DeckCartas
  },
  data() {
    return {
      deck: null,
      filtro: '',
      addingtipo: false
    }
  },
  async mounted() {
    let params = {
      includes: 'cartas,matchup.cores,matchup.arquetipo,matchup.tipos'
    }

    const response = await deckAPI.get(this.$route.params.id, params)
    this.deck = response.data
    this.deck.cartas = this.deck.cartas.map(c => {
      return {
        id: c.id,
        total: c.total
      }
    })

    this.deck.matchup.tipos = this.deck.matchup.tipos.map(t => t.id)
    this.deck.matchup.cores = this.deck.matchup.cores.map(c => c.id)
    this.deck.matchup.arquetipo_id = this.deck.matchup.arquetipo_id.toString() // TODO
  },
  computed: {
    ...mapState({
      comum: state => state.comum
    }),
    tiposSelected() {
      return this.comum.tipos.filter(t => this.deck.matchup.tipos.includes(t.id))
    },
    cartasSelected() {
      let cartas = this.comum.cartas.filter(c => {
        return this.deck.cartas.map(x => x.id).includes(c.id)
      }).map(y => {
        y.total = this.deck.cartas.find(x => x.id === y.id).total
        return y
      })

      cartas.splice()

      return cartas
    }
  },
  methods: {
    filtrar(nome) {
      return nome.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1
    },
    addcarta() {
      this.deck.cartas.find(c => c.id === 6).total = 5
      this.deck.cartas.splice()

      // this.deck.cartas = Object.assign(this.deck.cartas, {})
      //
      // console.log(this.deck.cartas)
    },
    async salvar() {
      // TODO ao salvar cartas user stringfy... mas perco a referencia?
      try {
        const response = await deckAPI.salvar(this.deck)
        this.$router.push(`/decks/${response.data.id}`)
        this.$notify.success({ content: 'deck registrado' })
      } catch (error) {
        this.erro = error.response.data
        this.$notify.danger({ content: error.response.data.message })
      }
    },
    cancelar() {
      let id = this.$route.params.id
      this.$router.push(`/decks/${id}`)
    }

  }
}
</script>

<style scoped>
</style>
