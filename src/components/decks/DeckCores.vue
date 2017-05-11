<template>
<span>
  <deck-cor key="cor.chave" :chave="cor.chave" v-for="cor in cores" v-if="cor.chave != 'PANDORA'"></deck-cor>
</span>
</template>

<script>
import DeckCor from '@/components/decks/DeckCor'

export default {
  name: 'deck-cores',
  props: ['cores'],
  components: {
    DeckCor
  }
}
</script>

<style scoped>
</style>
