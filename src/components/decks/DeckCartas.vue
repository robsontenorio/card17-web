<template>
<div>
  <div v-for="carta in cartas">
    <deck-carta :carta="carta"></deck-carta>
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
</style>
