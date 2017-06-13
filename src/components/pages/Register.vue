<template>
<div>
  <div class="columns">
    <div class="hero has-text-centered column  is-one-third  is-offset-one-third">
      <h1 class="title"> {{ $t('app.cadastrar.welcome') }} </h1>

      <alert-erros class="has-text-left" :titulo="erro.message" :itens="erro.errors" v-if="erro"></alert-erros>

      <p class="control has-icon">
        <input v-model="user.username" class="input" type="email" :placeholder="$t('app.placeholders.username')">
        <i class="fa fa-user"></i>
      </p>

      <p class="control has-icon">
        <input v-model="user.email" class="input" type="email" :placeholder="$t('app.placeholders.email')">
        <i class="fa fa-envelope"></i>
      </p>

      <p class="control has-icon">
        <input v-model="user.password" class="input" type="password" :placeholder="$t('app.placeholders.senha')">
        <i class="fa fa-lock"></i>
      </p>
      <p class="control">
        <button @click="register()" class="button is-primary is-fullwidth" :class="{'is-loading is-disabled': salvando}"> {{ $t('app.botoes.registrar') }} </button>
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
      erro: null,
      user: {
        nome: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'locale'
    ])
  },
  created() {
    //  console.log(this.$auth.redirect())

    // Can set query parameter here for auth redirect or just do it silently in login redirect.
  },

  methods: {
    register() {
      this.user.locale = this.locale
      this.salvando = true
      this.$auth.register({
        data: this.user,
        autoLogin: true,
        success() {
          this.salvando = false
          this.$notify.success({
            content: this.$t('app.login.welcome')
          })
        },
        error(error) {
          this.salvando = false
          this.erro = error.response.data
          this.$notify.danger({
            content: 'Oops!'
          })
        }
      })
    }
  }
}
</script>
