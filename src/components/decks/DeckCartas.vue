<template>
<div>
  <div v-for="carta in cartas">
    <deck-carta :carta="carta"></deck-carta>
  </div>
  <div class="cartas-empty" v-if="cartas.length == 0">
    Nenhuma carta registrada para este deck
  </div>
</div>
</template>

<script>
import DeckCarta from '@/components/decks/DeckCarta'

export default {
  name: 'deck-cartas',
  props: ['cartas'],
  components: {
    DeckCarta
  }
}
</script>

<style scoped>
.cartas-empty {
  border: 3px dashed whitesmoke;
  text-align: center;
  padding: 20px;
  font-size: 20pt;
  color: #c3c3c3;
  height: 600px;
}
</style>
