<template>
<div v-loading="carregando">

  <section class="hero is-medium is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">{{ $t('app.titulo') }}</h1>
        <h2 class="subtitle">{{ $t('app.subtitulo') }}</h2>
        <button class="button is-large is-primary" @click="$router.push(`/register`)"> {{ $t('app.menus.cadastrar') }} </button>
        <button class="button is-large is-white is-outlined" @click="$router.push(`/login`)"> {{ $t('app.menus.entrar') }} </button>
      </div>
    </div>
  </section>
  <br><br>
  <nav class="level">

    <div class="level-item has-text-centered">
      <div>
        <p class="heading"> <span class="icon"><i class="fa fa-fire"></i></span><br> {{ $t('app.partidas') }}</p>
        <p class="title"> {{ welcome.partidas }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading"> <span class="icon"><i class="fa fa-fire"></i></span><br> {{ $t('app.pandora') }}</p>
        <p class="title"> {{ welcome.partidas_pandora }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading"> <span class="icon"><i class="fa fa-fire"></i></span><br> {{ $t('app.batalha') }}</p>
        <p class="title"> {{ welcome.partidas_batalha }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          <span class="icon"><i class="fa fa-th"></i></span><br> {{ $t('app.decks') }}
        </p>
        <p class="title"> {{ welcome.decks }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading"> <span class="icon"><i class="fa fa-user"></i></span><br> {{ $t('app.jogadores') }}</p>
        <p class="title"> {{ welcome.users }}</p>
      </div>
    </div>
  </nav>

  <br><br>
  <h1 class=" title"> TOP 10 </h1>
  <div class="columns ">
    <div class="column ">
      <data-table :data="usuarios_winrate ">
        <column :label="$t( 'app.jogadores') ">
          <template scope="row ">
            <div>
                <router-link :to="`/@${row.username}` ">
                  <span class="icon">
                    <img :src="`${API_URL}/uploads/users/${row.avatar}.png`" />
                  </span>
                    {{ row.username }}
                </router-link>
            </div>
          </template>
        </column>
        <column>
          <template scope="row">
            <div>
              <span class="rate tag is-warning is-small ">{{ row.winrate }} %</span>
              <span class="rate tag is-success is-small ">{{ row.vitorias }}</span>
              <span class="rate tag is-danger is-small ">{{ row.derrotas }}</span>
            </div>
          </template>
        </column>
        <column>
          <template scope="row">
            <span> <strong>{{ row.vitorias + row.derrotas }}</strong> <small> {{ $t('app.partidas') }}</small></span>
          </template>
        </column>
      </data-table>
    </div>
    <div class="column ">
      <data-table :data="decks_winrate ">
        <column :label="$t( 'app.decks') ">
          <template scope="row ">
            <div>
                <router-link :to="`/decks/${row.id}` "> {{ row.nome }}</router-link>
            </div>
          </template>
        </column>
        </column>
        <column>
          <template scope="row ">
            <div>
                <span class="rate tag is-warning is-small ">{{ row.winrate }} %</span>
                <span class="rate tag is-success is-small ">{{ row.vitorias }}</span>
                <span class="rate tag is-danger is-small ">{{ row.derrotas }}</span>
            </div>
          </template>
        </column>
        <column>
          <template scope="row ">
            <div>
              <deck-cores :cores="row.matchup.cores "></deck-cores>
            </div>
            </template>
        </column>
        <column>
          <template scope="row">
            <span> <strong>{{ row.vitorias + row.derrotas }}</strong> <small> {{ $t('app.partidas') }}</small></span>
          </template>
        </column>
      </data-table>
    </div>
  </div>

  <h1 class="title " v-html="$t( 'app.recente') "></h1>
  <div class="columns ">
    <div class="column ">
      <data-table :data="decks_recentes">
        <column :label="$t( 'app.decks') ">
          <template scope="row ">
          <div>
              <router-link :to="`/decks/${row.id}` "> {{ row.nome }}</router-link>
          </div>
        </template>
        </column>
        <column>
          <template scope="row ">
          <div>
            <deck-matchup :matchup="row.matchup "></deck-matchup>
          </div>
          </template>
        </column>
      </data-table>
    </div>
    <div class="column ">
      <data-table :data="usuarios_recentes ">
        <column :label="$t( 'app.jogadores') ">
          <template scope="row ">
          <div>
              <router-link :to="`/@${row.username}` ">
                <span class="icon">
                  <img :src="`${API_URL}/uploads/users/${row.avatar}.png`" />
                </span>
                  {{ row.username }}
              </router-link>
          </div>
        </template>
        </column>
        <column>
          <template scope="row ">
          <div>
          </div>
          </template>
        </column>
      </data-table>
    </div>
  </div>

</div>
</template>

<script>
import { deckAPI, userAPI, comumAPI } from '@/api'
import { DeckMatchup } from '@/components/decks'
import DeckCores from '@/components/decks/DeckCores'

export default {
  name: 'page-hello',
  components: {
    DeckMatchup,
    DeckCores
  },
  data() {
    return {
      carregando: true,
      usuarios_recentes: [],
      usuarios_winrate: [],
      decks_recentes: [],
      decks_winrate: [],
      welcome: []
    }
  },
  async created() {
    let decksRecentesParams = {
      order_by: 'id,desc',
      includes: 'matchup.cores,matchup.arquetipo,matchup.tipos,user',
      modo_chave: 'BATALHA',
      limit: 10
    }

    let usuariosRecentesParams = {
      order_by: 'id,desc',
      limit: 10
    }

    let decksWinrateParams = {
      ordem: 'winrate_geral',
      includes: 'matchup.cores,matchup.arquetipo,matchup.tipos',
      modo_chave: 'BATALHA',
      limit: 10
    }

    let usuariosWinrateParams = {
      ordem: 'winrate_geral',
      limit: 10
    }

    deckAPI.all(decksRecentesParams).then(response => {
      this.decks_recentes = response.data.data
    })

    userAPI.all(usuariosRecentesParams).then(response => {
      this.usuarios_recentes = response.data.data
    })

    deckAPI.all(decksWinrateParams).then(response => {
      this.decks_winrate = response.data.data
    })

    userAPI.all(usuariosWinrateParams).then(response => {
      this.usuarios_winrate = response.data.data
    })

    await comumAPI.welcome().then(response => {
      this.carregando = false
      this.welcome = response.data
    })
  }
}
</script>

<style scoped>
h1 {}

.title {
  font-size: 25pt;
  font-weight: bold;
  margin-bottom: 30px;
}

.hero-body {
  padding-bottom: 80px;
  padding-top: 80px;
}

.hero .title,
.hero .subtitle {
  color: white;
}

.hero-body {
  background-image: url('/static/images/card17_background.jpg');
  background-position-y: -100px;
}

.button {
  margin-right: 10px;
  font-weight: bold;
}

.level,
.level .title {
  color: #456a9c;
}
</style>
