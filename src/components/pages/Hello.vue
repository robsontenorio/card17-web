<template>
<div class="hello">

  <b-dropdown>
    <button class="button" slot="trigger">
        <span>Dropdown</span>
        <b-icon icon="arrow_drop_down"></b-icon>
    </button>

    <b-option>Action</b-option>
    <b-option>Another action</b-option>
    <b-option>Something else</b-option>
  </b-dropdown>

  <b-field label="Name">
    <b-input value="John Silver"></b-input>
  </b-field>

  <b-field label="Email" type="is-danger" message="This email is invalid">
    <b-input type="email" value="john@" maxlength="30">
    </b-input>
  </b-field>

  <b-field label="Username" type="is-success" message="This username is available">
    <b-input value="johnsilver" maxlength="30"></b-input>
  </b-field>

  <b-field label="Password">
    <b-input type="password" value="iwantmytreasure" password-reveal>
    </b-input>
  </b-field>

  <b-field label="Message">
    <b-input maxlength="200" type="textarea"></b-input>
  </b-field>
</div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
