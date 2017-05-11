<template>
<div v-if="partidas">
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
            <span v-if="row.evento == 1" class="icon is-small"><i class="fa fa-check"></i></span>
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

</div>
</template>

<script>
import DeckCores from './DeckCores'
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
    DeckEvento
  }
}
</script>

<style scoped>
</style>
