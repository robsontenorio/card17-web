<template>
<div>
  <div class="columns">
    <div class="hero has-text-centered column  is-one-third  is-offset-one-third">
      <h1 class="title">Cadastrar :)</h1>


      <p class="control has-icon">
        <input v-model="user.username" class="input" type="email" placeholder="Username">
        <i class="fa fa-user"></i>
      </p>

      <p class="control has-icon">
        <input v-model="user.email" class="input" type="email" placeholder="E-mail">
        <i class="fa fa-envelope"></i>
      </p>

      <p class="control has-icon">
        <input v-model="user.password" class="input" type="password" placeholder="Senha">
        <i class="fa fa-lock"></i>
      </p>
      <p class="control">
        <button @click="register()" class="button is-primary is-fullwidth">Salvar</button>
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        nome: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },

  mounted() {
    //  console.log(this.$auth.redirect())

    // Can set query parameter here for auth redirect or just do it silently in login redirect.
  },

  methods: {
    register() {
      this.$auth.register({
        data: this.user,
        autoLogin: true,
        redirect: '/home',
        error(error) {
          this.$notify.danger({
            content: error.response.data.errors
          })
        }
      })
    }
  }
}
</script>
