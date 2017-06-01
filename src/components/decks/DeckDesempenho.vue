<template>
<div class="desempenho">
  <span class="rate tag is-warning">{{ matchup.winrate }} %</span>
  <span class="rate tag is-success">{{ matchup.vitorias }}</span>
  <span class="rate tag is-danger">{{ matchup.derrotas }}</span>
  <deck-matchup :matchup="matchup"></deck-matchup>
</div>
</template>

<script>
import DeckMatchup from '@/components/decks/DeckMatchup'

export default {
  name: 'deck-desempenho',
  props: ['matchup'],
  components: {
    DeckMatchup
  }
}
</script>

<style scoped>
.desempenho .rate {
  width: 45px;
}

.desempenho {
  margin-top: 10px;
}
</style>
