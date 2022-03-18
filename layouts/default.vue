<template>
  <v-app>
    <DialogHeroku />
    <HeaderNavbar />
    <Nuxt />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('store', ['getSentiers','getMultilingual']),
  },
  mounted() {
    this.getSentiers(),
    this.getMultilingual()
  }
}
</script>