<template>
<div class="has-text-centered">
  <h1 class="title">Select your language</h1>
  <div class="columns">
    <div class="column has-text-right">
      <figure class="image is-128x128">
        <img src="/static/images/br-locale.png" @click="setLocale('br')">
      </figure>
    </div>
    <div class="column has-text-left">
      <figure class="image is-128x128">
        <img src="/static/images/en-locale.png" @click="setLocale('en')">
      </figure>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'locale-page',
  methods: {
    ...mapActions([
      'SET_LOCALE'
    ]),
    async setLocale(locale) {
      await this.SET_LOCALE(locale)
      window.location = localStorage.getItem('redirected_from')
    }
  }
}
</script>

<style scoped>
figure {
  display: inline-block;
  cursor: pointer;
}
</style>
