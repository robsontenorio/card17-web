<template>
<span>
  <span class="tag info" v-if="arquetipo"> {{ arquetipo.nome }}</span>
</span>
</template>

<script>
export default {
  name: 'deck-arquetipo',
  props: ['arquetipo']
}
</script>

<style scoped>
</style>
