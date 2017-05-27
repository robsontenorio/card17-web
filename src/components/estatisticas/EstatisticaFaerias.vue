<template>
<div>
  <div class="box">
    <div class="columns">
      <div class="column has-text-centered">
        <div class="total">{{ faerias[0]}}</div>
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f_height(0)}%`"></div>
        </div>
        <span class="faeria">0</span>
      </div>
      <div class="column has-text-centered">
        <div class="total">{{ faerias[1]}}</div>
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f_height(1)}%`"> </div>
        </div>
        <span class="faeria">1</span>
      </div>
      <div class="column has-text-centered">
        <div class="total">{{ faerias[2]}}</div>
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f_height(2)}%`"> </div>
        </div>
        <span class="faeria">2</span>
      </div>
      <div class="column has-text-centered">
        <div class="total">{{ faerias[3]}}</div>
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f_height(3)}%`"></div>
        </div>
        <div class="faeria">3</div>
      </div>

      <div class="column has-text-centered">
        <div class="total">{{ faerias[4]}}</div>
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f_height(4)}%`"></div>
        </div>
        <span class="faeria">4</span>
      </div>
      <div class="column has-text-centered">
        <div class="total">{{ faerias[5]}}</div>
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f_height(5)}%`"> </div>
        </div>
        <span class="faeria">5</span>
      </div>
      <div class="column has-text-centered">
        <div class="total">{{ faerias[6]}}</div>
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f_height(6)}%`"> </div>
        </div>
        <span class="faeria">6</span>
      </div>
      <div class="column has-text-centered">
        <div class="total">{{ faerias[7]}}</div>
        <div class="barra faeria-bar">
          <div class="fill-barra" :style="`height: ${f_height(7)}%`"></div>
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
  methods: {
    f_height(i) {
      return 100 - ((this.faerias[i] / this.total) * 100)
    }
  },
  computed: {
    total() {
      let t = this.faerias[0] + this.faerias[1] + this.faerias[2] + this.faerias[3] +
        this.faerias[4] + this.faerias[5] + this.faerias[6] + this.faerias[7]

      t = (t === 0) ? 1 : t

      return t
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/variaveis.scss';

// .column {
//     padding-right: 2px;
// }

// .notification {
//     background-color: white;
// }

.barra {
    background-color: black;
    height: 100px;
    margin-bottom: 5px;
    border: 1px solid #e2e2e2;
}

.fill-barra {
    background-color: whitesmoke;
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
