<template>
<div>
  <b-table :data="decks">
    <b-table-column field="nome" label="Nome"></b-table-column>
    <b-table-column field="custo" label="Custo"></b-table-column>
    <b-table-column field="dificuldade" :format="formatDificuldade" label="Dificuldade"></b-table-column>
  </b-table>
</div>
</template>

<script>
export default {
  name: 'deck-list',
  props: ['decks'],
  data() {
    return {}
  },
  methods: {
    formatDificuldade(value) {
      return value.nome
    }
  }

}
</script>

<style scoped>
</style>
