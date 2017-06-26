<template>
<span>
  <span v-if="modo" class="tag is-dark"> {{ $t('deck.' + modo.chave.toLowerCase()).toLowerCase() }} </span>
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
