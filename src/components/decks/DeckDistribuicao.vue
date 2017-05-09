<template>
<div>
  <div class="columns ">
    <div class="column">
      <estatistica-terrenos v-if="terrenos" :terrenos="terrenos"></estatistica-terrenos>
    </div>
    <div class="column">
      <estatistica-faerias v-if="faerias" :faerias="faerias"></estatistica-faerias>
    </div>
    <div class="column">

    </div>
  </div>
</div>
</template>

<script>
import EstatisticaTerrenos from '@/components/estatisticas/EstatisticaTerrenos'
import EstatisticaFaerias from '@/components/estatisticas/EstatisticaFaerias'
export default {
  name: 'deck-distribuicao',
  props: ['terrenos', 'faerias', 'tipos'],
  components: {
    EstatisticaTerrenos,
    EstatisticaFaerias
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
</style>
