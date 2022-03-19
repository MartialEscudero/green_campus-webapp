<template>
  <div class="container mx-auto md:grid md:gap-28 xl:grid-cols-2">
    <div class="z-0" id="map"></div>
    <div>
      <client-only>
        <swiper v-if="$vuetify.breakpoint.mdAndUp" class="swiper" :options="swiperOption">
          <swiper-slide class="text">
            <div class="content">
              <div v-for="sentier in sentiers" :key="sentier.item">
                <Nuxt-link :to="'/sentier/' + sentier.attributes.UUID">
                <div class="card mb-10 hover:scale-105 transition ease-in-out">
                  <div class="flex items-center">
                    <div class="line mr-5" :style="{'background-color': sentier.attributes.Couleur}"></div>
                    <h1>{{ sentier.attributes.Nom }}</h1>
                  </div>
                  <vue-markdown id="markdown" class="mt-3" :source="sentier.attributes.Description.slice(0,250) + '...'" ></vue-markdown>
                </div>
                </Nuxt-link>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
        <div v-if="$vuetify.breakpoint.smAndDown">
          <div v-for="sentier in sentiers" :key="sentier.item">
            <Nuxt-link :to="'/sentier/' + sentier.attributes.UUID">
            <div class="card mb-10 hover:scale-105 transition ease-in-out">
              <div class="flex items-center">
                <div class="line mr-5" :style="{'background-color': sentier.attributes.Couleur}"></div>
                <h1>{{ sentier.attributes.Nom }}</h1>
              </div>
              <vue-markdown id="markdown" class="mt-3" :source="sentier.attributes.Description.slice(0,250) + '...'" ></vue-markdown>
            </div>
            </Nuxt-link>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  head: {
    title: 'Carte',
  },
  data: () => ({
    lines : {
      "type": "FeatureCollection",
      "features": [],
    },
    swiperOption: {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar'
      },
      mousewheel: true
    }
  }),
  methods: {
    ...mapActions("store", ["getSentiers"]),
    
    loadMap() {
      // Je récupère toutes les coordonnées des sentiers.
      for (var i = 0; i < this.sentiers.length; i++) {
        this.lines.features.push(this.sentiers[i].attributes.GeoJSON.dataMap)
      }

      var map = L.map("map").setView([45.837, 1.239], 15);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoibWFydGlhbHRpYyIsImEiOiJja3pobDM5NHUxeGRlMnVvNm5pbmtwZ2E0In0.YQBFj39fOIGw_4ZnQQs6KA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 22,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(map);

      // J'affiche les sentiers sur la map.
      L.geoJson(this.lines, { style: function(feature) {
        // J'applique la bonne couleur sélectionnée.
        switch (feature.properties.color) {
          case 'red':
            return {color: "red"}
          case 'blue':
            return {color: "blue"}
          case 'green':
            return {color: "green"}
          case 'orange':
            return {color: "orange"}
          case 'pink':
            return {color: "pink"}
          case 'purple':
            return {color: "purple"}
          case 'brown':
            return {color: "brown"}
          case 'black':
            return {color: "black"}
          default:
            return {color: "yellow"}
        }
      }}).addTo(map);
    }
  },
  computed: {
    ...mapGetters('store',['sentiers'])
  },
  async mounted() {
    await this.getSentiers();
    this.loadMap();
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  height: calc(100vh - 150px);
  .swiper-slide {
    &.text {
      font-size: 18px!important;
      text-align: left!important;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 30px;

      > .content {
        > .title {
          margin: 0;
          text-align: center;
          margin-bottom: .75em;
        }

        > p, blockquote {
          line-height: 2;
          text-indent: 2em;
        }

        blockquote {
          padding: 1rem;
          margin-left: 2em;
          background-color: #ddd;
        }
      }
    }
  }
}

#map { 
  height: calc(100vh - 150px);
  border-radius: 40px;
  border: 5px solid rgba(6, 102, 100, 0.8);
}

.card {
  padding: 20px;
  background: #F1F1F1;
  border-radius: 15px;
  height: 150px;

  & .line {
    width: 30px;
    height: 3px;
  }

  & h1 {
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 25px;
    color: rgba(6, 102, 100, 0.8);
  }

  & #markdown {
    height: 80px;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    text-align: justify;
    color: #8D8D8D;
    text-overflow: ellipsis; 
    display: block; 
    overflow: hidden; 
    white-space: nowrap;
  }
}

.card:hover {
  background: #d8d8d8;
  cursor: pointer;
}

@media screen and (max-width: 640px) {
  .container {
    padding: 0
  }
  
  #map { 
    height: calc(50vh);
    border-radius: 0;
    border: none;
    margin-bottom: 30px;
  }

  .card {
    padding: 20px;
    border-radius: 9px;
    margin-right: 12px;
    margin-left: 12px;
    height: 120px;

    & .line {
      width: 20px;
    }

    & h1 {
      font-weight: 800;
      font-size: 18px;
    }

    & #markdown {
      height: 50px;
      font-size: 11px;
      line-height: 15px;
    }
  }
}
</style>