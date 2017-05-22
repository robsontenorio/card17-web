<template>
<div>
  <div class="columns">
    <div class="column is-narrow">
      <div class="image is-128x128 avatar">
        <!-- <img :src="`/static/images/users/${user.id}.jpg`"> -->
        <img :src="`/static/images/users/59.png`">
      </div>
    </div>
    <div class="column">
      <p>
        <span class="title">{{ user.username }}</span>

      </p>
      <p class="tagline"><strong>CURTE</strong> {{ adora }}</p>
      <p class="social">
        <span class="icon"><i class="fa fa-twitch"></i></span>
        <span class="icon"><i class="fa fa-facebook"></i></span>
      </p>

    </div>
    <div class="column is-2 followers has-text-centered">
      <p class="stat-val">{{ winrate }}</p>
      <p class="stat-key">winrate</p>
    </div>
    <div class="column is-2 followers has-text-centered">
      <p class="stat-val">{{ vitorias }}</p>
      <p class="stat-key">vitórias</p>
    </div>
    <div class="column is-2 followers has-text-centered">
      <p class="stat-val">{{ derrotas }}</p>
      <p class="stat-key">derrotas</p>
    </div>
  </div>


</div>
</template>

<script>
export default {
  name: 'profile',
  props: ['user'],
  computed: {
    winrate() {
      let w = ((this.user.estatisticas.pandora.winrate + this.user.estatisticas.batalha.winrate) / 2)
      return w + '%'
    },
    vitorias() {
      let v = ((this.user.estatisticas.pandora.vitorias + this.user.estatisticas.batalha.vitorias))
      return v
    },
    derrotas() {
      let d = ((this.user.estatisticas.pandora.derrotas + this.user.estatisticas.batalha.derrotas))
      return d
    },
    adora() {
      let b = this.user.estatisticas.batalha.vitorias + this.user.estatisticas.batalha.derrotas
      let p = this.user.estatisticas.pandora.vitorias + this.user.estatisticas.pandora.derrotas

      return (b > p) ? 'MODO BATALHA' : 'MODO PANDORA'
    }
  }

}
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 40pt;
  padding-right: 20px;
  color: #363636;
}

.avatar {
  float: right;
}

.tagline {
  padding-top: 10px;
  color: #5d5d5d;
}

.social {
  margin-top: 10px;
  color: #616161;
}

.avatar img {
  border-radius: 50%;
}

.stat-val {
  font-size: 35px;
  font-weight: bold;
  color: #363636;
}

.stat-key {
  font-size: 20px;
  font-weight: 200;
  color: #363636;
}
</style>
