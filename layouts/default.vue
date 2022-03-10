<template>
  <div>
    <Nuxt-link to="/">Index</Nuxt-link>
    <Nuxt-link to="/map">Map</Nuxt-link>
    <Nuxt-link to="/a-propos">A propos</Nuxt-link>
    <Nuxt />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('store', ['getSentiers']),
  },
  mounted() {
    this.getSentiers()
  }
}
</script>

<style>
* {
  font-family: 'Roboto';
}
</style>