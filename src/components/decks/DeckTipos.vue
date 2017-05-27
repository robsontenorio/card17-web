<template>
<span>
  <span style="margin-right: 4px" class="tag" v-for="tipo in tipos">{{ tipo.nome }}</span>
</span>
</template>

<script>
export default {
  name: 'deck-tipos',
  props: ['tipos']
}
</script>

<style scoped>
</style>
