<template>
<div>
  <p class="control has-icon">
    <input v-model="filtro" class="input" type="text" :placeholder="$t('deck.placeholder.search')">
    <i class="fa fa-search"></i>
  </p>
  <div class="cartas">
    <figure class="image carta" v-for="carta in cartas" v-show="filtrar(carta)">
      <img @click="$emit('addcarta', carta)" :src="`${API_URL}/cards/${user.locale}/${carta.metadata.card_id}.png`">
    </figure>
    <!-- <div class="cartas-empty has-text-centered">
      Nenhuma carta encontrada
    </div> -->
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'deck-pesquisar',
  props: ['cartas'],
  data() {
    return {
      filtro: ''
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    filtrar(carta) {
      return (carta.nome.toLowerCase().includes(this.filtro.toLowerCase()) ||
        carta.texto.toLowerCase().includes(this.filtro.toLowerCase()))

      // return (carta.metadata.card_name.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1 ||
      //   carta.metadata.text.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1 ||
      //   carta.metadata.card_type.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1 ||
      //   carta.metadata.rarity.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1 ||
      //   carta.metadata.color.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1)
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

.cartas {
  /*height: 500px;
  overflow-y: scroll;
  border: 2px solid #c0c0c0;*/
}

.cartas-empty {
  font-size: 20pt;
  color: #c0c0c0;
  margin-top: 50px;
}
</style>
