<template>
<div>
  <radio-group :on-change="selecionada" class="is-small" value="atual">
    <radio-button class="is-small" val="todas">{{ $t('app.todas_temporadas') }}</radio-button>
    <radio-button class="is-small" val="anterior" v-if="temporadas.length > 1">{{ $t('app.temporada_anterior') }}</radio-button>
    <radio-button class="is-small" val="atual" :checked="true">{{ $t('app.temporada_atual') }}</radio-button>
  </radio-group>
</div>
</template>

<script>
export default {
  name: 'temporada-select',
  props: ['temporadas'],
  methods: {
    selecionada(s) {
      this.$emit('temporada-selecionada', s)
    }
  }
}
</script>

<style scoped>
.temporada-select .control {
  text-align: right;
  display: inherit;
}

.temporada-select .button {
  margin-left: -5px;
}
</style>
