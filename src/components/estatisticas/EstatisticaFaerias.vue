<template>
<div>
  <!--  //TODO fazer calculo da barra -->

  <div class="notification is-default">
    {{ faerias }} {{ total }}
    <div class="columns">
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f0_height}%`">
            <div class="total">{{ faerias[0]}}</div>
          </div>
        </div>
        <span class="faeria">0</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f1_height}%`">
            <div class="total">{{ faerias[1]}}</div>
          </div>
        </div>
        <span class="faeria">1</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f2_height}%`">

            <div class="total">{{ faerias[2]}}</div>
          </div>
        </div>
        <span class="faeria">2</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f3_height}%`">

            <div class="total">{{ faerias[3]}}</div>
          </div>
        </div>
        <span class="faeria">3</span>
      </div>

      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f4_height}%`">

            <div class="total">{{ faerias[4]}}</div>
          </div>
        </div>
        <span class="faeria">4</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f5_height}%`">

            <div class="total">{{ faerias[5]}}</div>
          </div>
        </div>
        <span class="faeria">5</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f6_height}%`">

            <div class="total">{{ faerias[6]}}</div>
          </div>
        </div>
        <span class="faeria">6</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f7_height}%`">
            <div class="total">{{ faerias[7]}}</div>
          </div>
        </div>
        <span class="faeria">7+</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'estatistica-faerias',
  props: ['faerias'],
  computed: {
    total() {
      return 1
    },
    f0_height() {
      return 1
    },
    f1_height() {
      return 1
    },
    f2_height() {
      return 1
    },
    f3_height() {
      return 1
    },
    f4_height() {
      return 1
    },
    f5_height() {
      return 1
    },
    f6_height() {
      return 1
    },
    f7_height() {
      return 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/variaveis.scss';

.column {
    padding-right: 2px;
}

.notification {
    background-color: white;
}

.barra {
    background-color: black;
    height: 120px;
    margin-bottom: 5px;
}

.fill-barra {
    background-color: whitesmoke;
    height: 80%;
}

.total {
    color: white;
    background-color: #c3c3c3;
}

.faeria-bar {
    background-color: $faeria;
}

.faeria {
    font-size: 9pt;
    padding-top: 4px;
    width: 25px;
    height: 25px;
}
</style>
