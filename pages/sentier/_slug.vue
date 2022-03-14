<template>
  <div class="container">
    <PiDialog :piDialog.sync="piDialog" :piSelected="piSelected" />
    <h1>{{sentier.Nom}}</h1>
    <div class="mx-auto md:grid xl:grid-cols-2">
      <div id="map"></div>
      <client-only>
      <div>
        <vue-markdown id="markdown" class="text-justify" :source="sentier.Description"></vue-markdown>
      </div>
      </client-only>
    </div>
    <div class="mt-10" v-for="points_interet in sentier.points_interet" :key="points_interet.item">
      <h2>LES POINTS D'INTÉRÊTS</h2>
      <div class="mx-auto md:grid md:gap-16 md:grid-cols-2">
        <div class="card" v-for="pi in points_interet" :key="pi.item">
          <div v-if="!pi.attributes.Audio.data">
            <div v-for="img in pi.attributes.Image" :key="img.item">
              <img class="w-20" :src="img[0].attributes.url" :alt="pi.attributes.Nom">
              <span v-if="img.length > 1">+{{img.length}}</span>
            </div>
          </div>
          <div v-else>
            <div v-for="audio in pi.attributes.Audio" :key="audio.item">
              <audio controls :src="audio[0].attributes.url"></audio>
              <span>+{{audio.length + pi.attributes.Image.data.length}}</span>
            </div>
          </div>
          <div>
            <h3>{{pi.attributes.Nom}}</h3>
            <vue-markdown v-if="pi.attributes.Description" id="markdown" class="text-justify" :source="pi.attributes.Description.slice(0,200) + '...'"></vue-markdown>
          </div>
          <button @click="piDialog = true, piSelected = pi">LIRE PLUS</button>
        </div>
      </div>
    </div>
    <div class="mt-10" v-for="media in sentier.Media" :key="media.item">
      <h2>LES IMAGES DU SENTIERS</h2>
      <horizontal-scroll class="horizontal-scroll">
        <div class="outer">
          <div class="inner-content" v-for="img in media" :key="img.item">
            <img class="mr-15" :src="img.attributes.url">
          </div>
        </div>
      </horizontal-scroll>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'

export default {
  components: {HorizontalScroll},
  head: {
    title: 'Sentier',
  },
  data: () => ({
    line : {
      "type": "FeatureCollection",
      "features": [],
    },
    piDialog : false,
    piSelected : null
  }),
  methods: {
    ...mapActions('store',['getSentier']),
    async loadMap() {

      var map = L.map("map").setView([45.837, 1.239], 15);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoibWFydGlhbHRpYyIsImEiOiJja3pobDM5NHUxeGRlMnVvNm5pbmtwZ2E0In0.YQBFj39fOIGw_4ZnQQs6KA', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 22,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          zIndex: -1,
          accessToken: 'your.mapbox.access.token'
      }).addTo(map);

      const response = await fetch(this.sentier.GeoJSON.data.attributes.url);
      var res = await response.json()
      this.line.features.push(res.features[0])

      L.geoJson(this.line,{}).addTo(map);
    }
  },
  computed: {
    ...mapGetters('store',['sentier']),
  },
  mounted() {
    this.getSentier(this.$route.params.slug)
    setTimeout(() =>{
      this.loadMap()
    },300)
  }
}
</script>

<style lang="scss" scoped>
.horizontal-scroll {
  display: flex;
  width: 100%;
  height: 470px;
}

.outer {
  display: flex;
  flex: 1;
  width: auto;
  height: 100%;
  padding: 0 20px;
  flex-flow: row nowrap;
  align-items: center;
}

.inner-content {
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: calc(100% - 40px);
  border-radius: 5px;
}

.horizontal-scroll {
  white-space: nowrap;
}

.horizontal-scroll::-webkit-scrollbar {
  width: 1em;
  scrollbar-width: thin;
}

.horizontal-scroll::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: #ADADAD;
  scrollbar-width: thin;
}
#map { 
  height: calc(50vh);
}

h1 {
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 56px;
  color: rgba(6, 102, 100, 0.8);
}

h2 {
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  line-height: 41px;
  color: rgba(6, 102, 100, 0.8);
}

.card {
  background: #F1F1F1;
  border-radius: 15px;
  padding: 10px;

  & span {
    font-style: normal;
    font-weight: 900;
    font-size: 36px;
    line-height: 25px;
    color: #FFFFFF;
  }
}
</style>