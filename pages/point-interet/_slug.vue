<template>
  <div v-if="multilingual.poi" class="container">
    <div v-if="poi" class="mx-auto md:grid md:gap-28 md:grid-cols-2">
      <client-only >
      <div v-if="$vuetify.breakpoint.mdAndUp">
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
        <div>
          <button class="transition ease-in-out">
            <Nuxt-link class="btn" :to="'/sentier/' + this.poiMedia.Sentier">{{multilingual.poi[0]}}</Nuxt-link>
          </button>
        </div>
      </div>
      <div v-if="$vuetify.breakpoint.smAndDown">
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          height="400"
        >
          <v-carousel-item
            v-for="(slide, i) in this.poiMedia.Image[0]"
            :key="i"
            :src="slide.attributes.url"
          >
          </v-carousel-item>
        </v-carousel>
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
      Audio: [],
      Sentier: null,
    }
  }),
  methods: {
    ...mapActions('store',['getPoi']),
    
    setPoi() {
      this.poiMedia.Image.push(this.poi.Image.data)
      this.poiMedia.Audio.push(this.poi.Audio.data)
      this.poiMedia.Sentier = this.poi.sentier.data.attributes.UUID
    }
  },
  computed: {
    ...mapGetters('store',['poi','multilingual']),
  },
  async mounted() {
    await this.getPoi(this.$route.params.slug);
    this.setPoi();
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  line-height: 41px;
  color: rgba(6, 102, 100, 0.8);
}

audio {
  display:block;
  margin:auto;
  text-align: center;
  margin-top: 30px;
}

button {
  display:block;
  margin:auto;
  margin-top: 50px;
  margin-bottom: 50px;
  background: rgba(6, 102, 100, 0.8);
  border-radius: 20px;
  padding: 8px 12px 5px 12px;
  font-family: 'Roboto';
  font-style: normal;
  font-size: 15px;
  line-height: 130.19%;
  text-align: center;
}

.btn {
  color: #FFFFFF;
}

button:hover {
  background: rgba(5, 73, 72, 0.8);
}

@media screen and (max-width: 640px) {
  h1 {
    text-align: center;
    font-size: 25px;
  }

  #markdown {
    margin-bottom: 10px;
  }
}
</style>