<template>
<div>
  <div class="notification">
    <div class="columns">
      <div class="column has-text-centered">
        <div class="total">{{ yellow }}</div>
        <div class="barra yellow">
          <div class="fill-barra" :style="`height: ${yellow_height}%`">
          </div>
        </div>
        <deck-cor chave="YELLOW"></deck-cor>
      </div>
      <div class="column has-text-centered">
        <div class="total">{{ green }}</div>
        <div class="barra green">
          <div class="fill-barra" :style="`height: ${green_height}%`">
          </div>
        </div>
        <deck-cor chave="GREEN"></deck-cor>
      </div>
      <div class="column has-text-centered">
        <div class="total">{{ red }}</div>
        <div class="barra red">
          <div class="fill-barra" :style="`height: ${red_height}%`">
          </div>
        </div>
        <deck-cor chave="RED"></deck-cor>
      </div>
      <div class="column has-text-centered">
        <div class="total">{{ blue }}</div>
        <div class="barra blue">
          <div class="fill-barra" :style="`height: ${blue_height}%`">
          </div>
        </div>
        <deck-cor chave="BLUE"></deck-cor>
      </div>

      <div class="column has-text-centered">
        <div class="total">{{ human }}</div>
        <div class="barra human">
          <div class="fill-barra" :style="`height: ${human_height}%`">
          </div>
        </div>
        <deck-cor chave="HUMAN"></deck-cor>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import DeckCor from '@/components/decks/DeckCor'

export default {
  name: 'estatistica-terrenos',
  props: ['terrenos'],
  components: {
    DeckCor
  },
  computed: {
    blue() {
      return (this.terrenos.BLUE) ? this.terrenos.BLUE : 0
    },
    red() {
      return (this.terrenos.RED) ? this.terrenos.RED : 0
    },
    green() {
      return (this.terrenos.GREEN) ? this.terrenos.GREEN : 0
    },
    yellow() {
      return (this.terrenos.YELLOW) ? this.terrenos.YELLOW : 0
    },
    human() {
      return (this.terrenos.HUMAN) ? this.terrenos.HUMAN : 0
    },
    total() {
      let t = this.blue + this.red + this.green + this.human
      t = (t === 0) ? 1 : t
      return t
    },
    yellow_height() {
      return 100 - ((this.yellow / this.total) * 100)
    },
    blue_height() {
      return 100 - ((this.blue / this.total) * 100)
    },
    red_height() {
      return 100 - ((this.red / this.total) * 100)
    },
    green_height() {
      return 100 - ((this.green / this.total) * 100)
    },
    human_height() {
      return 100 - ((this.human / this.total) * 100)
    }

  }
}
</script>

<style lang="scss" scoped>
@import './static/variaveis.scss';

.notification {
    background-color: white;
}

.barra {
    background-color: black;
    height: 100px;
    margin-bottom: 5px;
}

.fill-barra {
    background-color: whitesmoke;
}

.total {
    color: white;
    background-color: #c3c3c3;
}

.yellow {
    background-color: $desert;
}

.green {
    background-color: $forest;
}

.red {
    background-color: $mountain;
}

.blue {
    background-color: $lake;
}

.human {
    background-color: $human;
}
</style>
