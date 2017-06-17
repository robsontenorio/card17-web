<template>
<span>
  <deck-cor key="cor.chave" :chave="cor.chave" v-for="cor in coresFiltradas" v-if="cor.chave != 'PANDORA'"></deck-cor>
</span>
</template>

<script>
import DeckCor from '@/components/decks/DeckCor'

export default {
  name: 'deck-cores',
  props: ['cores'],
  components: {
    DeckCor
  },
  computed: {
    coresFiltradas() {
      if (this.cores.find(x => x.chave === 'HUMAN') !== undefined && this.cores.length >= 2) {
        return this.cores.filter(obj => obj.chave !== 'HUMAN')
      }

      return this.cores
    }
  }
}
</script>

<style scoped>
</style>
