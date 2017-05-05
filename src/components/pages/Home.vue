<template>
<div>

  <div class="columns">
    <div class="column is-one-quarter has-text-centered">
      <figure class="image is-128x128" style="display: inline-block">
        <img src="static/images/3.jpg" style="border-radius: 50%">
      </figure>
      <p class="title">{{ $auth.user().username }}</p>
    </div>
    <div class="column">

      <div class="columns">
        <div class="column">
          <div class="notification is-warning">
            <p class="title">BATALHA</p>
            <p><i class="fa fa-check"></i>14 vitórias</p>
            <router-link to="/decks/battle">decks batalha</router-link>
          </div>
        </div>
        <div class="column">
          <div class="notification is-info">
            <p class="title">PANDORA</p>
            <p><i class="fa fa-check"></i>14 vitórias</p>
            <router-link to="/decks/pandora">decks pandora</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- USer : {{ this.$auth.user().id }} - {{ $auth.user().nome }}<br> Token: {{ $auth.token() }} -->

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
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipos,matchup.tipos,partidas',
      'modo_chave': 'RANQUEADO'
    }

    deckAPI.all(filtros).then(response => {
      this.decks_ranqueado = response.data.data
    })

    let filtros2 = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipos,matchup.tipos,partidas',
      'modo_chave': 'PANDORA'
    }

    deckAPI.all(filtros2).then(response => {
      this.decks_pandora = response.data.data
    })
  }
}
</script>
