<template>
<div id="app">
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
      <div class="nav-right nav-menu">
        <router-link v-if="!$auth.check()" to="/register" class="nav-item is-tab is-hidden-mobile"> {{ $t('app.menus.cadastrar') }} </router-link>
        <router-link v-if="!$auth.check()" to="/login" class="nav-item is-tab is-hidden-mobile"> {{ $t('app.menus.entrar') }} </router-link>
        <router-link to="/home" v-if="$auth.check()" class="nav-item is-tab">
          <figure class="image is-24x24" style="margin-right: 8px;">
            <!-- <img :src="`/static/images/users/${$auth.user().id}.jpg`" style="border-radius: 50%"> -->
            <img :src="`/static/images/users/59.png`" style="border-radius: 50%">
          </figure>
          {{ $auth.user().username }}
        </router-link>
        <a v-if="$auth.check()" @click="logout()" class="nav-item is-tab">
            {{ $t('app.menus.sair') }}
        </a>
      </div>
    </div>
  </nav>

  <section class="section">
    <div class="container">
      <router-view></router-view>
    </div>
  </section>
  <!-- <footer class="footer sticky">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>CARD17</strong> &copy; 2017
        </p>
      </div>
    </div>
  </footer> -->
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  created() {
    this.carregarComum()
  },
  methods: {
    ...mapActions({
      carregarComum: 'LOAD_COMUM'
    }),
    logout() {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/'
      })
    }
  }
}
</script>
