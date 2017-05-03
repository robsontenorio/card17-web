<template>
<div>
  <div class="columns">
    <div class="hero has-text-centered column  is-one-third  is-offset-one-third">
      <h1 class="title">Olá :)</h1>

      <p class="control has-icon">
        <input v-model="creds.email" class="input" type="email" placeholder="E-mail">
        <i class="fa fa-envelope"></i>
      </p>

      <p class="control has-icon">
        <input v-model="creds.password" class="input" type="password" placeholder="Senha">
        <i class="fa fa-lock"></i>
      </p>
      <p class="control">
        <button @click="login()" class="button is-primary is-fullwidth">Entrar</button>
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      creds: {
        email: '',
        password: ''
      }
    }
  },

  mounted() {
    // Can set query parameter here for auth redirect or just do it silently in login redirect.
  },

  methods: {
    login() {
      var redirect = this.$auth.redirect()

      this.$auth.login({
        data: this.creds,
        redirect: redirect ? redirect.from.fullPath : '/home',
        fetchUser: true,
        success() {},
        error(error) {
          this.$notify.danger({
            content: error.response.data.error
          })
        }
      })
    }
  }
}
</script>
