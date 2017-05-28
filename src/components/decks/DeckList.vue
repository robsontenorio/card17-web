<template>
<div>
  <data-table :data="decks">
    <column :label="$t('deck.nome')" field="nome">
      <template scope="row">
        <span>
            <a @click="mostrar(row)">{{ row.nome}}</a>
        </span>
      </template>
    </column>
    <column :label="$t('matchup.cores')">
      <template scope="row">
        <span>
            <deck-cores :cores="row.matchup.cores"></deck-cores>
        </span>
      </template>
    </column>
    <column :label="$t('matchup.tipos')">
      <template scope="row">
        <span>
            <deck-arquetipo :arquetipo="row.matchup.arquetipo"></deck-arquetipo>
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
    <column :label="$t('deck.v')" field="vitorias"></column>
    <column :label="$t('deck.d')" field="derrotas"></column>
    <column :label="$t('partida.recente')">
      <template scope="row">
        <span>
          <deck-evento key="partida.id" :evento="partida.evento" v-for="partida in row.partidas"></deck-evento>
        </span>
      </template>
    </column>
  </data-table>

  <div v-if="decks.length == 0" class="has-text-centered">
    {{ $t('deck.nenhum_deck') }}
  </div>

</div>
</template>

<script>
import DeckCores from '@/components/decks/DeckCores'
import DeckArquetipo from '@/components/decks/DeckArquetipo'
import DeckTipos from '@/components/decks/DeckTipos'
import DeckEvento from '@/components/decks/DeckEvento'

export default {
  name: 'deck-list',
  props: ['decks'],
  components: {
    DeckCores,
    DeckArquetipo,
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
