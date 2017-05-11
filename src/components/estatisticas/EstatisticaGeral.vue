<template>
<div>
  <div class="columns">
    <div class="column" v-if="cover">
      <div class="cover" :style="`background-image: url(${cover});`">
      </div>
    </div>
    <div class="column">
      <div class="notification is-warning ">
        <span>winrate</span>
        <div class="estatistica-number has-text-centered ">
          {{ winrate }}<span style="font-size: 12pt ">%</span>
        </div>
      </div>
    </div>
    <div class="column ">
      <div class="notification is-success ">
        <span>vitórias</span>
        <div class="estatistica-number has-text-centered ">
          {{ vitorias }}
        </div>
      </div>
    </div>
    <div class="column ">
      <div class="notification is-danger ">
        <span>derrotas</span>
        <div class="estatistica-number has-text-centered ">
          {{ derrotas }}
        </div>
      </div>
    </div>
    <div class="column is-half">
      <div class="notification">
        <span>progresso</span>
        <div class="grafico">
          <estatistica-progresso :height="72" :options="options" :chart-data="datacollection"></estatistica-progresso>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import EstatisticaProgresso from './EstatisticaProgresso'

export default {
  name: 'estatistica-geral',
  props: ['cover', 'winrate', 'vitorias', 'derrotas', 'progresso'],
  components: {
    EstatisticaProgresso
  },
  data() {
    return {
      options: {}
    }
  },
  methods: {},
  computed: {
    datacollection(val) {
      return {
        labels: this.progresso,
        datasets: [{
          fill: false,
          lineTension: 0,
          borderColor: 'rgba(75,192,192,1)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointRadius: 2,
          data: this.progresso
        }]
      }
    }
  }
}
</script>

<style scoped>
.notification {
  height: 120px;
}

.estatistica-number {
  font-size: 50pt;
  line-height: 1;
}



.cover {
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  border-radius: 2%;
}
</style>
