<template>
  <div class="container">
    <div v-if="this.pi.Nom" class="mx-auto md:grid md:gap-28 xl:grid-cols-2">
      <client-only>
      <div>
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in this.pi.Image[0]"
            :key="i"
            :src="slide.attributes.url"
          >
          </v-carousel-item>
        </v-carousel>
      </div>
      <div>
        <h1>{{POI.Nom}}</h1>
        <vue-markdown id="markdown" class="text-justify mt-5" :source="POI.Description"></vue-markdown>
        <div v-if="this.pi.Audio.length > 1">
          <div v-for="audio in this.pi.Audio" :key="audio.item">
            <audio controls :src="audio[0].attributes.url"></audio>
          </div>
        </div>
        
      </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  head: {
    title: "Point d'intérêt",
  },
  data: () => ({
    pi: {
      Nom: null,
      Description: null,
      Image: [],
      Audio: [] 
    }
  }),
  methods: {
    ...mapActions('store',['getPOI']),
    setPOI() {
      this.pi.Nom = this.POI.Nom
      this.pi.Description = this.POI.Description
      this.pi.Image.push(this.POI.Image.data)
      this.pi.Audio.push(this.POI.Audio.data)
    }
  },
  computed: {
    ...mapGetters('store',['POI']),
  },
  mounted() {
    this.getPOI(this.$route.params.slug)
    setTimeout(() =>{
      this.setPOI()
    },300)
  }
}
</script>

<style scoped>
h1 {
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  line-height: 41px;
  color: rgba(6, 102, 100, 0.8);
}
</style>