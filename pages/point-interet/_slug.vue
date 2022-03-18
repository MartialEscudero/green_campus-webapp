<template>
  <div class="container">
    <div v-if="poi" class="mx-auto md:grid md:gap-28 md:grid-cols-2">
      <client-only>
      <div>
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in this.poiMedia.Image[0]"
            :key="i"
            :src="slide.attributes.url"
          >
          </v-carousel-item>
        </v-carousel>
      </div>
      <div>
        <h1>{{poi.Nom}}</h1>
        <vue-markdown id="markdown" class="text-justify mt-5" :source="poi.Description"></vue-markdown>
        <div v-if="this.poiMedia.Audio[0]">
          <div v-for="audio in this.poiMedia.Audio" :key="audio.item">
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
  head() {
    return {
      title: this.poi.Nom,
    }
  },
  data: () => ({
    poiMedia: {
      Image: [],
      Audio: []
    }
  }),
  methods: {
    ...mapActions('store',['getPoi']),
    
    setPoi() {
      this.poiMedia.Image.push(this.poi.Image.data)
      this.poiMedia.Audio.push(this.poi.Audio.data)
    }
  },
  computed: {
    ...mapGetters('store',['poi']),
  },
  async mounted() {
    await this.getPoi(this.$route.params.slug);
    this.setPoi();
  },
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