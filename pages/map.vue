<template>
  <div>
    <div v-for="sentier in sentiers" :key="sentier.item">
      <p>{{ sentier.attributes.Nom }}</p>
      <p>{{ sentier.attributes.Description }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  head: {
    title: 'Carte',
  },
  methods:{
    ...mapActions('store',['getSentiers']),
  },
  computed: {
    ...mapGetters('store',['sentiers'])
  },
  mounted() {
    this.getSentiers()
  }
}
</script>

<style scoped>

</style>