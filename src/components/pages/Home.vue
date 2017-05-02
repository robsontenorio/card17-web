<template>
<div class="hello">
  USer : {{ this.$auth.user().id }} - {{ $auth.user().nome }}<br> Token: {{ $auth.token() }}
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
