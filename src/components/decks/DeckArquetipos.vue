<template>
<span>
  <span class="tag info" v-for="arquetipo in arquetipos"> {{ arquetipo.nome }}</span>
</span>
</template>

<script>
export default {
  name: 'deck-arquetipos',
  props: ['arquetipos']
}
</script>

<style scoped>
</style>
