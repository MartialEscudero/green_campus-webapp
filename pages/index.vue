<template>
  <div>
    <h1>test</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: this.multilingual.navbar ? this.multilingual.navbar[0] : 'Accueil',
    }
  },
  computed: {
    ...mapGetters('store',['multilingual']),
  }
}
</script>