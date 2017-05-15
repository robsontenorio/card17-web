<template>
<div>
  <p v-for="erro in itens" v-html="erro"></p>
</div>
</template>

<script>
export default {
  name: 'erros',
  props: ['itens']
}
</script>

<style scoped>
</style>
