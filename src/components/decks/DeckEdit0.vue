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
        <deck-pesquisar :cartas="cartas_modo" @addcarta="addcarta" @removecarta="removecarta"></deck-pesquisar>
      </div>
      <div class="column is-one-quarter">
        <!-- <affix> -->
        <button class="button is-default" @click="deck.cartas = []">limpar deck</button>
        <deck-cartas :edit="true" @removecarta="removecarta" :cartas="deck.cartas"></deck-cartas>
        <!-- </affix> -->
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
import { mapState, mapGetters } from 'vuex'
import { deckAPI } from '@/api'
import { DeckTipos, DeckCartas, DeckPesquisar } from '@/components/decks'

export default {
  name: 'deck-edit',
  components: {
    DeckTipos,
    DeckCartas,
    DeckPesquisar
  },
  data() {
    return {
      deck: null,
      filtro: '',
      addingtipo: false
    }
  },
  async created() {
    let params = {
      includes: 'modo,cartas,matchup.cores,matchup.arquetipo,matchup.tipos'
    }

    const response = await deckAPI.get(this.$route.params.id, params)
    this.deck = response.data
    this.deck.matchup.tipos = this.deck.matchup.tipos.map(t => t.id)
    this.deck.matchup.cores = this.deck.matchup.cores.map(c => c.id)
    this.deck.matchup.arquetipo_id = this.deck.matchup.arquetipo_id.toString() // TODO
  },
  computed: {
    ...mapState({
      comum: state => state.comum
    }),
    ...mapGetters([
      'cartas_pandora',
      'cartas_batalha'
    ]),
    tiposSelected() {
      return this.comum.tipos.filter(t => this.deck.matchup.tipos.includes(t.id))
    },
    cartas_modo() {
      if (this.deck.modo.chave === 'BATALHA') {
        return this.cartas_batalha
      } else {
        return this.cartas_pandora
      }
    }
  },
  methods: {
    filtrar(nome) {
      return nome.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1
    },
    validar_batalha(carta) {
      if (carta.total === 3) {
        this.$notify.danger({ content: 'DECK BATALHA: Máximo de 3 cópias por carta' })
        return false
      }

      if (carta.metadata.rarity === 'LEGENDARY' && carta.total === 1) {
        this.$notify.danger({ content: 'DECK BATALHA: Máximo de 1 cópia por carta LENDÁRIA' })
        return false
      }
    },
    validar_pandora(carta) {
      // Carta não permitida
      if (carta.metadata.card_id === '350') {
        this.$notify.danger({ content: 'DECK PANDORA: Carta "3 Desejos" não é permitida' })
        return false
      }

      // Contagem de 3 tesouros diferentes entre si
      if (carta.metadata.color === 'PANDORA') {
        let totais = this.deck.cartas.map(c => {
          if (c.metadata.color === 'PANDORA') {
            return c.total
          }
        })

        let soma = totais.reduce((a, b) => a + b, 0)

        // TODO o calculo de duplicidade do tesouro está sendo feito no backend
        if (soma === 3) {
          this.$notify.danger({ content: 'DECK PANDORA: deve conter EXTAMENTE 3 tesouros diferentes entre si' })
          return false
        }
      }
    },
    addcarta(carta) {
      if (this.deck.cartas.map(c => c.total).reduce((a, b) => a + b, 0) === 30) {
        this.$notify.danger({ content: '30 cartas ;)' })
        return
      }

      let c = this.deck.cartas.find(x => x.id === carta.id)

      if (c !== undefined) {
        if (this.deck.modo.chave === 'BATALHA') {
          if (this.validar_batalha(c) === false) {
            return
          }
        }

        if (this.deck.modo.chave === 'PANDORA') {
          if (this.validar_pandora(carta) === false) {
            return
          }
        }

        c.total++
      } else {
        if (this.deck.modo.chave === 'PANDORA') {
          if (this.validar_pandora(carta) === false) {
            return
          }
        }

        carta.total = 1
        this.deck.cartas.push(carta)
      }

      // TODO validar quantidades, max amostras
    },
    removecarta(carta) {
      let c = this.deck.cartas.find(x => x.id === carta.id)

      if (c.total === 1) {
        this.deck.cartas.splice(this.deck.cartas.indexOf(carta), 1)
      } else {
        c.total--
      }
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
