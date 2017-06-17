<template>
<div>
  pre - home
</div>
</template>

<script>
export default {
  name: 'pre-home-page',
  async created() {
    this.$router.replace('@' + this.$auth.user().username)
  }
}
</script>

<style scoped>
</style>
