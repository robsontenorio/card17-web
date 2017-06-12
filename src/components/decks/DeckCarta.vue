<template>
<div>

  <div @click="removecarta" class="carta-mini" :style="`background-image: url(/static/images/cards/mini/${carta.metadata.card_id}_minicard.png)`">

    <div class="carta-mini-mask">

      <div class="level">
        <div class="level-left">
          <span class="faeria">{{ carta.metadata.faeria }}</span>
          <span class="lands">
            <span class="land desert" v-if="carta.metadata.desert">{{ carta.metadata.desert }}</span>
          <span class="land mountain" v-if="carta.metadata.mountain">{{ carta.metadata.mountain }}</span>
          <span class="land lake" v-if="carta.metadata.lake">{{ carta.metadata.lake }}</span>
          <span class="land forest" v-if="carta.metadata.forest">{{ carta.metadata.forest }}</span>
          <span class="carta-nome">{{ carta.nome }}</span>
          </span>

        </div>
        <div class="level-right">
          <span class="carta-total">{{ carta.total}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'deck-carta',
  props: ['carta', 'edit'],
  methods: {
    removecarta() {
      if (this.edit === true) {
        this.$emit('removecarta', this.carta)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/variaveis.scss';

.image {
    display: inline-block;
}

.carta-mini-mask {
    background-image: linear-gradient(to right, #000 1px, #1e2e05 40%, rgba(30, 46, 5, 0) 100%);
    padding-bottom: 5px;
    border-radius: 3px;
}

.carta-mini {
    background-position: right;
    background-repeat: no-repeat;
    margin-bottom: 2px;
    border-radius: 3px;
    cursor: pointer;
}

.carta-nome {
    color: white;
    font-weight: 600;
    font-size: 10pt;
}

.carta-total {
    color: white;
    background-color: black;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    border-radius: 3px;
    font-weight: 500;
}

.lands {
    padding-left: 5px;
}

.land {
    width: 30px;
    height: 30px;
    display: inline-block;
    text-align: center;
    padding-top: 10px;
    margin-left: -7px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    font-weight: bold;
}

.forest {
    color: $forest;
    background-image: url("/static/images/lands/card_cost_green.png");
}

.desert {
    background-image: url("/static/images/lands/card_cost_yellow.png");
    color: $desert;
}

.mountain {
    color: $mountain;
    padding-left: 2px;
    background-image: url("/static/images/lands/card_cost_red.png");
}

.lake {
    color: $lake;
    background-image: url("/static/images/lands/card_cost_blue.png");
}
</style>
