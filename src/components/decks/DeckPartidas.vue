<template>
<div>
  <div v-for="partida in partidas">
    {{ partida.evento }} :
    <deck-cores :cores="partida.matchup.cores"></deck-cores>
    <deck-arquetipos :arquetipos="partida.matchup.arquetipos"></deck-arquetipos>
    <deck-tipos :tipos="partida.matchup.tipos"></deck-tipos>
  </div>
</div>
</template>

<script>
import DeckCores from './DeckCores'
import DeckArquetipos from './DeckArquetipos'
import DeckTipos from './DeckTipos'

export default {
  name: 'deck-partidas',
  props: ['partidas'],
  components: {
    DeckCores,
    DeckArquetipos,
    DeckTipos
  }
}
</script>

<style scoped>
</style>
