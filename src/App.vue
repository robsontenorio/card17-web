<template>
<div id="app" v-loading="!$auth.ready() || carregando">
  <nav class="nav">
    <div class="container">
      <div class="nav-left">
        <a href="/" class="nav-item is-brand">
          <img src="/static/images/card17.png" alt="CARD17">
        </a>
      </div>
      <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
      </span>
      <div class="nav-right nav-menu" v-if="user.locale">
        <router-link style="color: #fffd34" to="/version" class="nav-item is-tab is-hidden-mobile">
          <i class="fa fa-star"></i> beta
        </router-link>
        <router-link to="/stats" class="nav-item is-tab is-hidden-mobile">
          <i class="fa fa-line-chart"></i> stats
        </router-link>
        <router-link to="/tracker" class="nav-item is-tab is-hidden-mobile">
          <i class="fa fa-play"></i> tracker
        </router-link>
        <router-link v-if="!$auth.check()" to="/register" class="nav-item is-tab is-hidden-mobile">
          <i class="fa fa-user-plus"></i> {{ $t('app.menus.cadastrar') }}
        </router-link>
        <router-link v-if="!$auth.check()" to="/login" class="nav-item is-tab is-hidden-mobile">
          <i class="fa fa-sign-in"></i> {{ $t('app.menus.entrar') }}
        </router-link>
        <router-link to="/home" v-if="$auth.check()" class="nav-item is-tab">
          <!-- <img :src="`${API_URL}/uploads/users/${$auth.user().id}.png`" style="border-radius: 50%"> -->
          <i class="fa fa-user-circle"></i> {{ $auth.user().username }}
        </router-link>
        <a v-if="$auth.check()" @click="logout()" class="nav-item is-tab">
            <i class="fa fa-power-off"></i>
            {{ $t('app.menus.sair') }}
        </a>

        <dropdown class="nav-item">
          <a class="button is-primary">
            <span><img :src="`/static/images/${user.locale}.png`" /></span>
            <span class="icon is-small"><i class="fa fa-angle-down"></i></span>
          </a>
          <div slot="content">
            <menus>
              <menu-item><img @click.prevent="changeLocale('br')" :src="`/static/images/br.png`" /></menu-item>
              <menu-item><img @click.prevent="changeLocale('en')" :src="`/static/images/en.png`" /></menu-item>
            </menus>
          </div>
        </dropdown>


      </div>
    </div>
  </nav>

  <section class="section ">
    <div class="container ">
      <router-view></router-view>
    </div>
  </section>
  <!-- <footer class="footer sticky ">
    <div class="container ">
      <div class="content has-text-centered ">
        <p>
          <strong>CARD17</strong> &copy; 2017
        </p>
      </div>
    </div>
  </footer> -->
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      carregando: true
    }
  },
  async created() {
    this.carregando = true

    let locale = localStorage.getItem('locale')
    if (locale !== null) {
      await this.SET_LOCALE(locale)
    }

    this.$i18n.locale = locale

    await this.LOAD_COMUM()
    this.carregando = false
  },
  watch: {
    '$auth.watch.loaded' () {
      let user = this.$auth.user()
      if (this.$auth.check()) {
        this.SET_USER(user)
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      comum: state => state.comum
    })
  },
  methods: {
    ...mapActions([
      'LOAD_COMUM',
      'SET_USER',
      'SET_LOCALE'
    ]),
    logout() {
      this.SET_USER(null)
      this.$auth.logout({
        makeRequest: true,
        redirect: '/'
      })
    },
    async changeLocale(locale) {
      this.carregando = true
      this.$i18n.locale = locale
      await this.SET_LOCALE(locale)
      window.location = this.$route.fullPath
    }
  }
}
</script>
