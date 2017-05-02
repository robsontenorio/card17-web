<template>
<div>
  <h1>CADASTRAR</h1>

  <form v-on:submit.prevent="login()">
    <table>
      <tr>
        <td>nome:</td>
        <td><input v-model="data.body.nome" /></td>
      </tr>
      <tr>
        <td>username:</td>
        <td><input v-model="data.body.username" /></td>
      </tr>
      <tr>
        <td>email:</td>
        <td><input v-model="data.body.email" /></td>
      </tr>
      <tr>
        <td>Password:</td>
        <td><input v-model="data.body.password" type="password" /></td>
      </tr>
      <tr>
        <td></td>
        <td><label><input v-model="data.rememberMe" type="checkbox" /> Remember Me</label></td>
      </tr>
      <tr>
        <td></td>
        <td><label><input v-model="data.fetchUser" type="checkbox" /> Fetch User (test)</label></td>
      </tr>
      <tr>
        <td></td>
        <td><button type="submit">Registrar</button></td>
      </tr>
    </table>

    <hr/>

    <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
  </form>
</div>
</template>

<script>
export default {
  data() {
    return {
      context: 'login context',

      data: {
        body: {
          nome: '',
          username: '',
          email: '',
          password: ''
        },
        rememberMe: false,
        fetchUser: true
      },

      error: null
    }
  },

  mounted() {
    //  console.log(this.$auth.redirect())

    // Can set query parameter here for auth redirect or just do it silently in login redirect.
  },

  methods: {
    login() {
      this.$auth.register({
        data: this.data.body,
        autoLogin: true,
        redirect: '/home',
        success: function () {},
        error: function () {}
      })
    }
  }
}
</script>
