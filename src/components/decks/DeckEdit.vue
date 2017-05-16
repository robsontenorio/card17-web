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
          <deck-tipos :tipos="deck.matchup.tiposList"></deck-tipos>
        </p>
        <label class="label">Descrição</label>
        <p class="control">
          <textarea v-model="deck.descricao" class="textarea" placeholder="Diga algo sobre este deck. Visão geral, muligans, estratégias ..."></textarea>
        </p>
      </div>
      // TODO descricao

    </div>
    <div class="columns">
      <div class="column">
        pesquisar cartas {{ this.deck.matchup.cores }}
      </div>
      <div class="column is-one-quarter">
        <deck-cartas :cartas="deck.cartasList"></deck-cartas>
      </div>
    </div>
  </div>
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
      deck: null
    }
  },
  mounted() {
    let params = {
      includes: 'cartas,matchup.cores,matchup.arquetipo,matchup.tipos'
    }
    deckAPI.get(this.$route.params.id, params).then(response => {
      this.deck = response.data
      // this.deck = Object.assign(this.deck, response.data)
      this.deck.cartasList = this.deck.cartas
      this.deck.matchup.tiposList = this.deck.matchup.tipos
      this.deck.matchup.coresList = this.deck.matchup.cores
      this.deck.matchup.arquetipo_id = this.deck.matchup.arquetipo_id.toString() // TODO
    })
  },
  computed: {
    ...mapState({
      comum: state => state.comum
    })
  },
  methods: {

    // converte um array de objetos em string json {carta_id : total, carta_id : total ...}
    cartasToJson(lista) {
      let cartas

      cartas = lista.map(c => {
        return {
          [c.id]: c.total
        }
      })

      cartas = cartas.reduce(function (result, item) {
        var key = Object.keys(item)[0]
        result[key] = item[key]
        return result
      }, {})

      return JSON.stringify(cartas)
    },
    salvar() {
      let self = this

      self.deck.cartas = this.cartasToJson(self.deck.cartasList)
      self.deck.matchup.cores = this.deck.matchup.coresList.map(c => c.id)
      self.deck.matchup.tipos = this.deck.matchup.tiposList.map(c => c.id)

      deckAPI.salvar(this.deck).then(response => {
        self.$router.push(`/decks/${self.deck.id}`)
        self.$notify.success({
          content: 'deck registrado'
        })
      }).catch(error => {
        self.erro = error.response.data
        self.$notify.danger({
          content: error.response.data.message
        })
      })
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
