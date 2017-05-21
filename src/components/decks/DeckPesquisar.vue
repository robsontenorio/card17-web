<template>
<div>
  <p class="control has-icon">
    <input v-model="filtro" class="input" type="text" placeholder="Nome, texto, raridade ou tipo da carta ...">
    <i class="fa fa-search"></i>
  </p>
  <figure class="image carta" v-for="carta in cartas" v-show="filtrar(carta)">
    <img @click="$emit('addcarta', carta)" :src="`/static/images/cards/en/${carta.metadata.card_id}.png`">
  </figure>
</div>
</template>

<script>
export default {
  name: 'welcome',
  props: ['cartas'],
  data() {
    return {
      filtro: ''
    }
  },
  methods: {
    filtrar(carta) {
      return (carta.metadata.card_name.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1 ||
        carta.metadata.text.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1 ||
        carta.metadata.card_type.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1 ||
        carta.metadata.rarity.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1 ||
        carta.metadata.color.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1)
    }
  }
}
</script>

<style scoped>
.image {
  display: inline-block;
}

.carta {
  width: 200px;
  cursor: pointer;
}
</style>
