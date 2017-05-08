<template>
<div>
  <data-table :data="decks">
    <column label="Nome" field="nome">
      <template scope="row">
        <span>
            <a @click="mostrar(row)">{{ row.nome}}</a>
        </span>
      </template>
    </column>
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
            <deck-cores :cores="row.matchup.cores"></deck-cores>
        </span>
      </template>
    </column>
    <column label="Winrate">
      <template scope="row">
        <span>
              <span class="tag is-default is-small">{{row.winrate}} %</span>
        </span>
      </template>
    </column>
    <column label="V" field="vitorias"></column>
    <column label="D" field="derrotas"></column>
    <column label="Recente">
      <template scope="row">
        <span>
          <span class="icon" style="width: 10px; font-size: 8pt;" v-for="partida in row.partidas">
            <i :style="`color: ${ partida.evento == '1' ? 'GREEN' : 'RED' }`"  class="fa fa-circle"></i>
          </span>
        </span>
      </template>
    </column>
  </data-table>

  <b-aside :is-show="isMostrar" :title="deck.nome" :show-footer="false" placement="right" @close="isMostrar=false">
    <div class="columns">
      <div class="column has-text-left">
      </div>
      <div class="column has-text-right">
        <router-link :to="`/decks/${deck.id}`" class="button is-primary is-outlined is-small">
          <span class="icon is-small"><i class="fa fa-pencil"></i></span>
        </router-link>
        <a @click="remover()" class="button is-dark is-outlined is-small"><span class="icon is-small"><i class="fa fa-archive"></i></span></a>
        <a @click="remover()" class="button is-danger is-outlined is-small"><span class="icon is-small"><i class="fa fa-trash"></i></span></a>
      </div>
    </div>

    [colocar aqui WINRATE ]
    <div class="block"> {{ deck.descricao}}</div>


    <tabs type="toggle" :is-full-width="true">
      <tab-item label="Partidas" icon="image">Pictures Tab<br>Pictures Tab<br>Pictures Tab<br> Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br> Pictures Tab<br>Pictures
        Tab
        <br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>Pictures Tab<br>
      </tab-item>
      <tab-item label="Music" icon="music">Music Tab</tab-item>
      <tab-item label="Videos" icon="film">Video Tab</tab-item>
      <tab-item label="Documents" icon="file-text-o">Document Tab2</tab-item>
    </tabs>
    <!--
    <div class="subtitle">
      PARTIDAS
      <a @click="add_partida()"> <i class="fa fa-plus-circle"></i> </a>
    </div>

    <alert v-if="deck.partidas.length == 0">Nenhuma partida registrada</alert>
    <div class="" v-for="partida in deck.partidas">
      {{ partida.evento }}
    </div> -->
  </b-aside>

</div>
</template>

<script>
import DeckCores from '@/components/decks/DeckCores'

export default {
  name: 'deck-list',
  props: ['decks'],
  components: {
    DeckCores
  },
  data() {
    return {
      isMostrar: false,
      deck: {}
    }
  },
  methods: {
    mostrar(row) {
      console.log(row)
      this.deck = row
      this.isMostrar = !this.isMostrar
    },
    apagar() {
      console.log(this.deck.id)
    }
  }

}
</script>

<style scoped>
</style>
