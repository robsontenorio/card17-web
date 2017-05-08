<template>
<div>
  <div class="level">
    <div class="level-left">
      <h1 class="title">MODO BATALHA</h1>
    </div>
    <div class="level-right">
      <radio-group v-model="periodo">
        <radio-button class="is-small" val="temporada">esta temporada</radio-button>
        <radio-button class="is-small" val="semana">esta semana</radio-button>
        <radio-button class="is-small" val="hoje">hoje</radio-button>
      </radio-group>
    </div>
  </div>
  <div class="columns">
    <div class="column is-narrow">

      <figure class="image is-128x128">
        <img src="/static/images/modo_batalha.png" style="border-radius: 2%">
      </figure>

    </div>
    <div class="column">
      <div class="notification is-warning">
        <span>winrate</span>
        <div class="estatistica-number has-text-centered">
          68<span style="font-size: 12pt">%</span>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="notification is-success">
        <span>vitórias</span>
        <div class="estatistica-number has-text-centered">
          671
        </div>
      </div>
    </div>
    <div class="column">
      <div class="notification is-danger">
        <span>derrotas</span>
        <div class="estatistica-number has-text-centered">
          132
        </div>
      </div>
    </div>
    <div class="column is-half">
      <div class="notification is-default">
        <span>progresso</span>
        <div class="estatistica-number has-text-centered">
          ...
        </div>
      </div>
    </div>
  </div>
  <br><br>
  <div class="level">
    <div class="level-left">
      <h1 class="title">DECKS</h1>
    </div>
    <div class="level-right">
      <radio-group v-model="arquivo">
        <radio-button class="is-small" val="ativos">ativos</radio-button>
        <radio-button class="is-small" val="arquivados">arquivados</radio-button>
      </radio-group>
    </div>
  </div>
  <deck-list :decks="decks"></deck-list>
</div>
</template>

<script>
import DeckList from '@/components/decks/DeckList'
import {
  deckAPI
} from '@/api'

export default {
  components: {
    DeckList
  },
  data() {
    return {
      decks: [],
      periodo: 'temporada',
      arquivo: 'ativos'
    }
  },
  created() {
    let filtros = {
      user_id: this.$auth.user().id,
      includes: 'dificuldade,modo,matchup.cores,matchup.arquetipos,matchup.tipos,partidas',
      'modo_chave': 'BATALHA'
    }

    deckAPI.all(filtros).then(response => {
      this.decks = response.data.data
    })
  }
}
</script>

<style scoped>
.notification {
  height: 100%;
  padding: 16px 16px;
}

.estatistica-number {
  font-size: 50pt;
  line-height: 1;
}

.level .title {
  margin-bottom: 0;
}
</style>
