<template>
<div>
  <button class="button is-success" @click="showModal=true">
    <span class="icon is-small">
      <i class="fa fa-download"></i>
    </span>
    <span>{{ $t('deck.botoes.importar_cartas') }}</span>
  </button>

  <modal :title="$t('deck.importar_cartas')" :on-ok="importar" :ok-text="$t('deck.botoes.importar_cartas')" :cancel-text="$t('app.botoes.cancelar')" :ok-loading="true" :is-show="showModal" @close="showModal=false">
    <p>{{ $t('deck.notify.importar_cartas') }}</p>
    <br>
    <p class="control has-icon">
      <input v-model="url" class="input" :placeholder="$t('deck.placeholder.link_importar')">
      <i class="fa fa-download"></i>
    </p>
  </modal>

</div>
</template>

<script>
import { deckAPI } from '@/api'

export default {
  name: 'deck-import',
  data() {
    return {
      url: '',
      showModal: false
    }
  },
  methods: {
    async importar() {
      try {
        const response = await deckAPI.importar(this.url)
        this.$notify.success({ content: this.$t('deck.notify.cartas_importadas') })
        this.$emit('importacao-concluida', response.data)
      } catch (error) {
        this.$notify.danger({ content: error.response.data.message })
      }

      this.showModal = false
      this.url = ''
    }
  }
}
</script>

<style scoped>
</style>
