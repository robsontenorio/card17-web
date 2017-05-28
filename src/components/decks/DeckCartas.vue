<template>
<div>
  <div v-for="carta in cartas">
    <!-- TODO tenho que repassar em cadeia do component child nested até o pai? -->
    <deck-carta :edit="edit" @removecarta="$emit('removecarta', carta)" :carta="carta"></deck-carta>
  </div>
  <div class="cartas-empty" v-if="cartas.length == 0">
    {{ $t('deck.sem_cartas') }}
  </div>
</div>
</template>

<script>
import DeckCarta from '@/components/decks/DeckCarta'

export default {
  name: 'deck-cartas',
  props: ['cartas', 'edit'],
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
}
</style>
