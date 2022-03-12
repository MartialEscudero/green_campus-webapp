<template>
  <v-app>
    <DialogHeroku />
    <div class="block">
      <Nuxt-link to="/">Index</Nuxt-link>
      <Nuxt-link to="/sentiers">Sentiers</Nuxt-link>
      <Nuxt-link to="/map">Map</Nuxt-link>
      <Nuxt-link to="/a-propos">A-Propos</Nuxt-link>
    </div>
    <Nuxt />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
      drawer: false,
      group: null,
    }),
    watch: {
      group () {
        this.drawer = false
      },
    },
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