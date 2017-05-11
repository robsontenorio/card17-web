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
    <column label="Cores">
      <template scope="row">
        <span>
            <deck-cores :cores="row.matchup.cores"></deck-cores>
        </span>
      </template>
    </column>
    <column label="Tipo">
      <template scope="row">
        <span>
            <deck-arquetipos :arquetipos="row.matchup.arquetipos"></deck-arquetipos>
            <deck-tipos :tipos="row.matchup.tipos"></deck-tipos>
        </span>
      </template>
    </column>
    <column label="%">
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
          <deck-evento key="partida.id" :evento="partida.evento" v-for="partida in row.partidas"></deck-evento>
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
import DeckArquetipos from '@/components/decks/DeckArquetipos'
import DeckTipos from '@/components/decks/DeckTipos'
import DeckEvento from '@/components/decks/DeckEvento'

export default {
  name: 'deck-list',
  props: ['decks'],
  components: {
    DeckCores,
    DeckArquetipos,
    DeckEvento,
    DeckTipos
  },
  data() {
    return {
      deck: {}
    }
  },
  methods: {
    mostrar(row) {
      this.$emit('selecionado', row.id)
    },
    apagar() {

    }
  }

}
</script>

<style scoped>
</style>
