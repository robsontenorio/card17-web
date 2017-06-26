<template>
<span>
  <span v-if="modo" class="tag is-dark"> {{ $t('deck.' + deck.modo.chave.toLowerCase()) }} </span>
</span>
</template>

<script>
export default {
  name: 'deck-modo',
  props: ['modo']
}
</script>

<style scoped>
</style>
