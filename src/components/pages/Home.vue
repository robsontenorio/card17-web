<template>
<div>
  <!-- USer : {{ this.$auth.user().id }} - {{ $auth.user().nome }}<br> Token: {{ $auth.token() }} -->
  <h1>DECKS RANQUEADOS</h1>

  <deck-list :decks="decks_ranqueado"></deck-list>

  <h1>DECKS PANDORA</h1>

  <deck-list :decks="decks_pandora"></deck-list>


</div>
</template>

<script>
import {
  deckAPI
} from '@/api'

import DeckList from '@/components/decks/DeckList'

export default {
  name: 'pages-home',
  components: {
    DeckList
  },
  data() {
    return {
      decks_ranqueado: [],
      decks_pandora: []
    }
  },
  created() {
    let filtros = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo',
      "modo_chave": 'RANQUEADO'
    }

    deckAPI.all(filtros).then(response => {
      this.decks_ranqueado = response.data.data
    })


    let filtros2 = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo',
      "modo_chave": 'PANDORA'
    }

    deckAPI.all(filtros2).then(response => {
      this.decks_pandora = response.data.data
    })
  }
}
</script>
