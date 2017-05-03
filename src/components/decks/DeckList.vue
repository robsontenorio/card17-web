<template>
<div>
  <data-table :data="decks">
    <column label="Nome" field="nome"></column>
    <column label="Tipo">
      <template scope="row">
        <span>
            <span v-for="arquetipo in row.matchup.arquetipos">{{ arquetipo.nome }} </span>
        </span>
      </template>
    </column>
    <column label="Cores">
      <template scope="row">
        <span>
            <img class="icon image is-24x24" :src="`/static/images/lands/icon_land_${cor.chave}.png`" v-for="cor in row.matchup.cores"></span>
        </span>
      </template>
    </column>
    <column label="Winrate">
      <template scope="row">
        <span>
              <span class="tag is-info is-small">{{row.winrate}} %</span>
              {{ row.vitorias }}V/{{ row.derrotas }}D
        </span>
      </template>
    </column>
    <column label="Recente">
      <template scope="row">
        <span>
          <span class="icon" style="width: 10px; font-size: 8pt;" v-for="partida in row.partidas">
            <i :style="`color: ${ partida.evento == 'V' ? 'GREEN' : 'RED' }`"  class="fa fa-circle"></i>
          </span>
        </span>
      </template>
    </column>
  </data-table>

</div>
</template>

<script>
export default {
  name: 'deck-list',
  props: ['decks'],
  data() {
    return {}
  },
  methods: {
    nome(object) {
      alert(1)
      return object.nome
    }
  }

}
</script>

<style scoped>
</style>
