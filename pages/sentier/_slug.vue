<template>
  <div v-if="multilingual.sentier" class="container">
    <DialogPoi :piDialog.sync="piDialog" :piSelected="piSelected" />
    <h1>{{sentier.Nom}}</h1>
    <div class="desc mx-auto md:grid md:gap-10 xl:grid-cols-2">
      <div class="z-0" id="map"></div>
      <client-only>
      <div>
        <vue-markdown id="markdown" class="text-justify" :source="sentier.Description"></vue-markdown>
      </div>
      </client-only>
    </div>
    <div class="mt-14" v-for="points_interet in sentier.points_interet" :key="points_interet.item">
      <h2 class="mb-4">{{multilingual.sentier[0]}}</h2>
      <div class="mx-auto md:grid md:gap-10 md:grid-cols-2">
        <div class="card flex flex-row" v-for="pi in points_interet" :key="pi.item">
          <div class="media">
            <div v-if="!pi.attributes.Audio.data">
              <div v-for="img in pi.attributes.Image" :key="img.item">
                <img :src="img[0].attributes.url" :alt="pi.attributes.Nom">
              </div>
            </div>
            <div v-else>
              <div v-for="audio in pi.attributes.Audio" :key="audio.item">
                <audio controls :src="audio[0].attributes.url"></audio>
              </div>
            </div>
          </div>
          <div class="infos">
            <div class="text">
              <h3>{{pi.attributes.Nom}}</h3>
              <vue-markdown v-if="pi.attributes.Description" id="markdown" class="text-justify" :source="pi.attributes.Description.slice(0,150) + '...'"></vue-markdown>
            </div>
            <button class="transition ease-in-out" @click="piDialog = true, piSelected = pi">{{multilingual.sentier[1]}}</button>
          </div>         
        </div>
      </div>
    </div>   
    <div class="mt-14" v-for="media in sentier.Media" :key="media.item">
      <h2 class="mb-4">{{multilingual.sentier[2]}}</h2>
      <horizontal-scroll v-if="$vuetify.breakpoint.mdAndUp" class="horizontal-scroll">
        <div class="outer">
          <div class="inner-content flex items-center" v-for="img in media" :key="img.item">
            <img class="mr-15" :src="img.attributes.url">
          </div>
        </div>
      </horizontal-scroll>
      <div v-if="$vuetify.breakpoint.smAndDown">
        <v-carousel
          hide-delimiters
          cycle
          height="400"
        >
          <v-carousel-item
            v-for="(slide, i) in media"
            :key="i"
            :src="slide.attributes.url"
          >
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'

export default {
  components: {HorizontalScroll},
  head() {
    return {
      title: this.sentier.Nom,
    }
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

      for (var i = 0; i < this.sentier.points_interet.data.length; i++) {
        this.line.features.push(this.sentier.points_interet.data[i].attributes.MarkerGeoJSON)
      }

      L.geoJson(this.line,{}).addTo(map);
    }
  },
  computed: {
    ...mapGetters('store',['sentier','multilingual']),
  }, 
  async mounted() {
    await this.getSentier(this.$route.params.slug);
    this.loadMap();
  },
}
</script>

<style lang="scss" scoped>
#map { 
  height: 50vh;
}

.desc vue-markdown {
  height: 50vh;
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
  font-size: 30px;
  line-height: 41px;
  color: rgba(6, 102, 100, 0.8);
}

.card {
  background: #F1F1F1;
  border-radius: 15px;
  padding: 10px;
  height: 250px;
  position: relative;

  .media {
    width: 37%;
    position: relative;

    & img {
      max-width: 100%;
      max-height: 230px;
      border-radius: 15px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    & audio {
      max-width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    & .number {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 900;
      font-size: 36px;
      line-height: 25px;
      color: #FFFFFF;
      text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
      position: absolute;
    }
  }

  & .infos {
    width: 65%;
    padding-left: 20px;
    position: relative;

    & .text {
      max-height: 80%;; 
      overflow: hidden;
      
      & h3 {
        font-style: normal;
        font-weight: 800;
        font-size: 18px;
        line-height: 28px;
        color: rgba(6, 102, 100, 0.8);
        margin-bottom: 10px;
      }
    }

    & button {
      background: rgba(6, 102, 100, 0.8);
      border-radius: 20px;
      width: 100px;
      padding-top: 5px;
      padding-bottom: 5px;
      font-family: 'Roboto';
      font-style: normal;
      font-size: 15px;
      line-height: 130.19%;
      text-align: center;
      color: #FFFFFF;
      position: absolute;
      bottom: 0;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
    }

    & button:hover {
      background: rgba(5, 73, 72, 0.8);
    }
  }
}

.horizontal-scroll {
  position: relative;
  display: flex;
  width: 100%;
  height: 500px;

  & {
    img {
      max-height: 100%;
    }
  }
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

@media screen and (max-width: 640px) {
  h1 {
    text-align: center;
    font-size: 35px;
    margin-bottom: 10px;
  }

  h2 {
    text-align: center;
    font-size: 25px;
  }

  #map {
    margin-bottom: 15px;
  }

  .desc {
    margin-right: 15px;
    margin-left: 15px;
  }

  .desc vue-markdown {
    height: 100%;
  }

  .card {
    margin-bottom: 40px;
    height: 250px;
    margin-right: 15px;
    margin-left: 15px;

    & .media {
      display: none;
    }

    & .infos {
      position: initial;
      width: 100%;
      padding-left: 0;

      & h3 {
        text-align: center;
      }

      & button {
        margin-bottom: 10px;
      }
    }
  }
}
</style>