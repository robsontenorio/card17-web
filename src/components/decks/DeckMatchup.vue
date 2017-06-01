<template>
<span>
  <deck-cores :cores="matchup.cores"></deck-cores>
  <deck-modo :modo="modo"></deck-modo>
  <deck-arquetipo :arquetipo="matchup.arquetipo"></deck-arquetipo>
  <deck-tipos :tipos="matchup.tipos"></deck-tipos>
</span>
</template>

<script>
import DeckModo from '@/components/decks/DeckModo'
import DeckCores from '@/components/decks/DeckCores'
import DeckTipos from '@/components/decks/DeckTipos'
import DeckArquetipo from '@/components/decks/DeckArquetipo'

export default {
  name: 'deck-matchup',
  props: ['matchup', 'modo'],
  components: {
    DeckCores,
    DeckArquetipo,
    DeckTipos,
    DeckModo
  }
}
</script>

<style scoped>
</style>
