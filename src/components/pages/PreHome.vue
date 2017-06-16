<template>
<div>
  pre - home
</div>
</template>

<script>
export default {
  name: 'pre-home-page',
  async created() {
    this.$router.push('@' + this.$auth.user().username)
  }
}
</script>

<style scoped>
</style>
