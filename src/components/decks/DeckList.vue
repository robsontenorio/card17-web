<template>
<div>
  <data-table :data="decks">
    <column label="Nome" field="nome">
      <template scope="row">
        <span>
            <a @click="mostrar(row)">{{ row.nome}}</a>
        </span>
      </template>
    </column>
    <column label="Tipo">
      <template scope="row">
        <span>
            <span v-for="arquetipo in row.matchup.arquetipos">{{ arquetipo.nome }} </span>
        </span>
      </template>
    </column>
    <column label="Cores">
      <template scope="row">
        <span>
            <deck-cores :cores="row.matchup.cores"></deck-cores>
        </span>
      </template>
    </column>
    <column label="Winrate">
      <template scope="row">
        <span>
              <span class="tag is-default is-small">{{row.winrate}} %</span>
        </span>
      </template>
    </column>
    <column label="V" field="vitorias"></column>
    <column label="D" field="derrotas"></column>
    <column label="Recente">
      <template scope="row">
        <span>
          <span class="icon" style="width: 10px; font-size: 8pt;" v-for="partida in row.partidas">
            <i :style="`color: ${ partida.evento == '1' ? 'GREEN' : 'RED' }`"  class="fa fa-circle"></i>
          </span>
        </span>
      </template>
    </column>
  </data-table>

  <div v-if="decks.length == 0" class="has-text-centered">
    Nenhum deck registrado
  </div>

</div>
</template>

<script>
import DeckCores from '@/components/decks/DeckCores'

export default {
  name: 'deck-list',
  props: ['decks'],
  components: {
    DeckCores
  },
  data() {
    return {
      deck: {}
    }
  },
  methods: {
    mostrar(row) {
      console.log(row)
      // TODO fazer com EVENT EMMIT
      this.$router.push(`/decks/${row.id}`)
    },
    apagar() {
      console.log(this.deck.id)
    }
  }

}
</script>

<style scoped>
</style>
