<template>
  <v-app>
    <DialogHeroku />
    <HeaderNav />
    <Nuxt />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import HeaderNav from '@/components/HeaderNav'

export default {
  components: { HeaderNav },
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
</style>