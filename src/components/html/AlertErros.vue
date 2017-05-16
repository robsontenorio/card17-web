<template>
<div>
  <alert :title="titulo" type="danger">
    <p v-for="erro in itens" v-html="erro"></p>
  </alert>

</div>
</template>

<script>
export default {
  name: 'alert-erros',
  props: ['itens', 'titulo']
}
</script>

<style scoped>
</style>
