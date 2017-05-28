<template>
<div>
  <div class="columns">
    <div class="hero has-text-centered column  is-one-third  is-offset-one-third">
      <h1 class="title"> {{ $t('app.login.welcome') }} </h1>

      <alert v-if="erro" type="danger">
        {{ erro }}
      </alert>

      <p class="control has-icon">
        <input v-model="creds.email" class="input" type="email" :placeholder="$t('app.placeholders.email')">
        <i class="fa fa-envelope"></i>
      </p>

      <p class="control has-icon">
        <input v-model="creds.password" class="input" type="password" :placeholder="$t('app.placeholders.senha')">
        <i class="fa fa-lock"></i>
      </p>
      <p class="control">
        <button @click="login()" class="button is-primary is-fullwidth"> {{ $t('app.botoes.entrar') }} </button>
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
      },
      erro: null
    }
  },

  created() {
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
          this.erro = error.response.data.error
          this.$notify.danger({
            content: error.response.data.error
          })
        }
      })
    }
  }
}
</script>
