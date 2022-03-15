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
  }),
  methods: {
    ...mapActions('store', ['getSentiers','getMultilingual']),
  },
  mounted() {
    this.getSentiers(),
    this.getMultilingual()
  }
}
</script>

<style>
</style>