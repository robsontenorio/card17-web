<template>
<div v-loading="!deck">
  <div v-if="deck">
    <div class="columns">
      <div class="column">
        <div class="level">
          <div class="level-left">
            <h1 class="title">{{ $t('deck.' + deck.modo.chave.toLowerCase()) }} - {{ $t('deck.editar_deck') }} </h1>
          </div>
          <div class="level-right">
            <!-- BOTOES -->
            <div class="block">
              <button class="button is-primary" @click="salvar()">
                <span class="icon is-small">
                  <i class="fa fa-check"></i>
                </span>
                <span>{{ $t('app.botoes.salvar') }}</span>
              </button>
              <button class="button is-default" @click="cancelar()">{{ $t('app.botoes.cancelar') }}</button>
              <button class="button is-default is-outlined" @click="reset()">
                <span class="icon is-small">
                  <i class="fa fa-circle-o-notch"></i>
                </span>
                <span>{{ $t('deck.botoes.reset_cartas') }}</span>
              </button>
              <button v-if="this.deck.id" class="button is-danger is-outlined" @click="excluir()">
                <span class="icon is-small">
                  <i class="fa fa-times"></i>
                </span>
                <span>{{ $t('app.botoes.excluir') }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="notification">
          <div class="columns">
            <div class="column is-5">
              <!-- NOME -->
              <label class="label">{{ $t('deck.nome') }}</label>
              <p class="control">
                <input v-model="deck.nome" class="input" type="text" :placeholder="$t('deck.placeholder.nome')">
              </p>

              <!-- ARQUETIPOS -->
              <label class="label">{{ $t('matchup.arquetipo') }}</label>
              <radio-group v-model="deck.matchup.arquetipo_id">
                <radio-button key="arquetipo.id" :val="arquetipo.id.toString()" v-for="arquetipo in comum.arquetipos">{{ arquetipo.nome }}</radio-button>
              </radio-group>

              <!-- TIPOS -->
              <div v-show="deck.modo.chave === 'BATALHA'">
                <label class="label">{{ $t('matchup.tipos') }}</label>
                <deck-tipos :tipos="tiposSelected"></deck-tipos>
                <span class="tag selecionar-tipos" @click="addingtipo = true"><i class="fa fa-pencil"></i></span>
                </p>
              </div>

            </div>
            <div class="column">
              <!-- DESCRIÇÃO -->
              <label class="label">{{ $t('deck.descricao') }}</label>
              <p class="control">
                <textarea v-model="deck.descricao" class="textarea descricao" :placeholder="$t('deck.placeholder.descricao')"></textarea>
              </p>
            </div>
          </div>
        </div>

        <!--- PESQUISAR CARTAS -->
        <div class="notification">
          <deck-pesquisar :cartas="cartasModo" @addcarta="addcarta" @removecarta="removecarta"></deck-pesquisar>
        </div>

      </div>
      <div class="column is-one-quarter">
        <!-- CARTAS SELECIONADAS -->
        <affix>
          <div class="has-text-right">
            <span class="faeria small"></span><span class="faeria-total"> {{ mediaFaeria}} </span> <span class="cartas-total">{{ totalCartas }}/30</span>
          </div>
          <div class="cartas">
            <deck-cartas :edit="true" @removecarta="removecarta" :cartas="deck.cartas"></deck-cartas>
          </div>
        </affix>
      </div>
    </div>

    <!-- ASIDE TIPOS -->
    <b-aside v-if="deck" :is-show="addingtipo" :show-footer="false" :title="$t('matchup.tipos')" placement="right" @close="addingtipo=false">
      <p class="control has-icon">
        <input v-model="filtro" class="input" type="text" :placeholder="$t('app.placeholders.filtrar')">
        <i class="fa fa-search"></i>
      </p>
      <checkbox-group v-model="deck.matchup.tipos">
        <checkbox :key="tipo.id" :val="tipo.id" v-for="tipo in comum.tipos" :checked="deck.matchup.tipos.includes(tipo.id)" v-show="filtrar(tipo.nome) ">
          <span class="tag ">{{ tipo.nome }}</span>
        </checkbox>
      </checkbox-group>
    </b-aside>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { deckAPI } from '@/api'
import { DeckTipos, DeckModo, DeckArquetipo, DeckCartas, DeckPesquisar } from '@/components/decks'

export default {
  name: 'deck-edit',
  components: {
    DeckTipos,
    DeckCartas,
    DeckPesquisar,
    DeckArquetipo,
    DeckModo
  },
  data() {
    return {
      deck: {
        id: 0,
        custo: 0,
        modo_id: 0,
        modo: {},
        cartas: [],
        matchup: {
          arquetipo_id: '',
          tipos: [],
          cores: []
        }
      },
      filtro: '',
      addingtipo: false
    }
  },
  async created() {
    let params = {
      includes: 'modo,cartas,matchup.cores,matchup.arquetipo,matchup.tipos'
    }

    let id = this.$route.params.id

    if (id !== '0') {
      const response = await deckAPI.get(id, params)
      this.deck = response.data
      this.deck.matchup.tipos = this.deck.matchup.tipos.map(t => t.id)
      this.deck.matchup.cores = this.deck.matchup.cores.map(c => c.id)
      this.deck.matchup.arquetipo_id = this.deck.matchup.arquetipo_id.toString() // TODO
    } else {
      let chave = this.$route.query.modo
      let modo = this.comum.modos.find(m => m.chave === chave)
      this.deck.modo = modo
      this.deck.modo_id = modo.id
    }
  },
  computed: {
    ...mapState({
      comum: state => state.comum
    }),
    ...mapGetters([
      'cartas_pandora',
      'cartas_batalha'
    ]),
    totalCartas() {
      return this.deck.cartas.map(c => c.total).reduce((a, b) => a + b, 0)
    },
    mediaFaeria() {
      // TODO ajustar calculo. está errado, provavelmente usar foreach aqui
      let total = this.deck.cartas.length || 0
      let faerias = this.deck.cartas.map(c => parseInt(c.metadata.faeria)).reduce((a, b) => a + b, 0) || 0
      let media = (total === 0 || faerias === 0) ? 0 : faerias / total

      return media.toFixed(1)
    },
    tiposSelected() {
      return this.comum.tipos.filter(t => this.deck.matchup.tipos.includes(t.id))
    },
    cartasModo() {
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
        this.$notify.danger({ content: this.$t('deck.validacao.batalha_3_amostras') })
        return false
      }

      if (carta.metadata.rarity === 'LEGENDARY' && carta.total === 1) {
        this.$notify.danger({ content: this.$t('deck.validacao.batalha_lendaria_1_copia') })
        return false
      }
    },
    addcarta(carta) {
      if (this.totalCartas === 30) {
        this.$notify.danger({ content: this.$t('deck.validacao.cartas_30') })
        return
      }

      let c = this.deck.cartas.find(x => x.id === carta.id)

      if (c !== undefined) {
        if (this.deck.modo.chave === 'BATALHA') {
          if (this.validar_batalha(c) === false) {
            return
          }
        }

        c.total++
      } else {
        carta.total = 1
        this.deck.cartas.push(carta)
      }
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
        this.$notify.success({ content: this.$t('deck.notify.registrado') })
      } catch (error) {
        this.erro = error.response.data
        this.$notify.danger({ content: error.response.data.message })
      }
    },
    cancelar() {
      this.$router.go(window.history.back())
    },
    reset() {
      this.deck.cartas = []
    },
    async excluir() {
      try {
        await deckAPI.delete(this.deck.id)
        this.$router.push(`/home`)
        this.$notify.success({ content: this.$t('deck.notify.excluido') })
      } catch (error) {
        this.erro = error.response.data
        this.$notify.danger({ content: error.response.data.message })
      }
    }
  }
}
</script>

<style scoped>
.cartas {
  max-height: 550px;
  overflow-y: scroll;
  margin-top: 10px;
}

.descricao {
  height: 170px;
}

.cartas-total {
  font-size: 18pt;
  padding-left: 20px;
  color: #c0c0c0;
  padding-right: 20px;
}

.selecionar-tipos {
  cursor: pointer;
  border: 1px solid #c0c0c0;
  background-color: white;
}

.faeria.small {
  width: 24px;
  height: 24px;
  vertical-align: text-bottom;
}

.faeria-total {
  font-size: 18pt;
}

h2 {
  font-weight: bold;
}
</style>
