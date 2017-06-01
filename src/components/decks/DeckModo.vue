<template>
<span>
  <span v-if="modo" class="tag is-dark"> {{ modo.nome }}</span>
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
