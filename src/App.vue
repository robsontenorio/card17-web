<template>
<div id="app">
  <div class="container">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item is-brand">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
        </a>

        <router-link to="/" class="nav-item is-tab is-hidden-mobile"> Inicio </router-link>
        <router-link to="/hello2" class="nav-item is-tab is-hidden-mobile"> hello2 </router-link>
        <router-link v-show="!$auth.check()" to="/login" class="nav-item is-tab is-hidden-mobile"> Login </router-link>
        <router-link v-show="!$auth.check()" to="/register" class="nav-item is-tab is-hidden-mobile"> Cadastrar </router-link>
      </div>
      <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
      </span>
      <div class="nav-right nav-menu">
        <a class="nav-item is-tab is-hidden-tablet is-active">Home</a>
        <a class="nav-item is-tab is-hidden-tablet">Features</a>
        <a class="nav-item is-tab is-hidden-tablet">Pricing</a>
        <a class="nav-item is-tab is-hidden-tablet">About</a>
        <router-link to="/home" v-show="$auth.check()" class="nav-item is-tab">
          <figure class="image is-16x16" style="margin-right: 8px;">
            <img src="http://bulma.io/images/jgthms.png">
          </figure>
          {{ $auth.user().nome }}
        </router-link>
        <a v-show="$auth.check()" @click="logout()" class="nav-item is-tab">Log out</a>
      </div>
    </nav>
  </div>

  <section class="section">
    <div class="container">
      <router-view></router-view>
    </div>
  </section>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>CARD17</strong> &copy; 2017
        </p>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    logout() {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/'
      })
    }
  }
}
</script>
