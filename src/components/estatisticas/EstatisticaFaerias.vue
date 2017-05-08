<template>
<div>
  <div class="notification is-default">
    <div class="columns">
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra">
            <div class="total">{{ faerias[0]}}</div>
          </div>
        </div>
        <span class="faeria">0</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra">
            <div class="total">{{ faerias[1]}}</div>
          </div>
        </div>
        <span class="faeria">1</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra">
            <div class="total">{{ faerias[2]}}</div>
          </div>
        </div>
        <span class="faeria">2</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra">
            <div class="total">{{ faerias[3]}}</div>
          </div>
        </div>
        <span class="faeria">3</span>
      </div>

      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra">
            <div class="total">{{ faerias[4]}}</div>
          </div>
        </div>
        <span class="faeria">4</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra">
            <div class="total">{{ faerias[5]}}</div>
          </div>
        </div>
        <span class="faeria">5</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra">
            <div class="total">{{ faerias[6]}}</div>
          </div>
        </div>
        <span class="faeria">6</span>
      </div>
      <div class="column has-text-centered">
        <div class="barra faeria-bar">
          <div class="fill-barra">
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
import DeckCor from '@/components/decks/DeckCor'
export default {
  name: 'estatistica-faerias',
  props: ['faerias'],
  components: {
    DeckCor
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
