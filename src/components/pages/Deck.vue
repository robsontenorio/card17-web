<template>
<div>

  <!-- //TODO PROFILE AQUI EM CIMA CASO NÃO SEJA O DONO -->
  <deck v-loading="carregando"></deck>

</div>
</template>

<script>
import { mapActions } from 'vuex'

import Deck from '@/components/decks/Deck'

export default {
  components: {
    Deck
  },
  data() {
    return {
      carregando: true
    }
  },
  async created() {
    await this.carregar(this.$route.params.id)
    this.carregando = false
  },
  methods: {
    ...mapActions({
      carregar: 'LOAD_DECK'
    })
  }
}
</script>

<style scoped>
</style>
