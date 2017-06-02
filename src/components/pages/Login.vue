<template>
<div>
  <div class="columns">
    <div class="hero has-text-centered column  is-one-third  is-offset-one-third">
      <h1 class="title"> {{ $t('app.login.welcome') }} </h1>

      <alert class="has-text-left" v-if="erro" type="danger">
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
        <button @click="login()" class="button is-primary is-fullwidth" :class="{'is-loading is-disabled': salvando}"> {{ $t('app.botoes.entrar') }} </button>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      salvando: false,
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
  computed: {
    ...mapGetters([
      'locale'
    ])
  },
  methods: {
    login() {
      var redirect = this.$auth.redirect()
      this.salvando = true
      this.creds.locale = this.locale
      this.$auth.login({
        data: this.creds,
        redirect: redirect ? redirect.from.fullPath : '/home',
        fetchUser: true,
        success() {},
        error(error) {
          this.salvando = false
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
