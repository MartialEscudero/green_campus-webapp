<template>
  <Nuxt-link :to="'/sentier/' + sentier.attributes.UUID">
    <div class="card h-full hover:scale-105 transition ease-in-out">
      <div class="grid gap-4 grid-cols-1 xl:grid-cols-2">
        <div v-bind:id="index" class="MACARTE hidden md:block z-0"></div>
          <div>
            <div class="flex items-center">
              <v-icon class="icon">mdi-map-marker</v-icon>
              <h1 v-if="sentier.distance === -1">?</h1>
              <h1 v-else-if="sentier.distance < 1000">{{ sentier.distance }} m</h1>
              <h1 v-else-if="sentier.distance >= 1000">{{ Math.round(sentier.distance / 100) / 10 }} km</h1>
            </div>
            <div class="flex items-center">
              <h2>{{ sentier.attributes.Nom }}</h2>
            </div>
            <vue-markdown
              id="markdown"
              class="mt-3"
              :source="sentier.attributes.Description.slice(0, 200) + '...'"
            ></vue-markdown>
          </div>
      </div>
    </div>
  </Nuxt-link>
</template>

<script>
export default {
  props: {
    sentier: {
      type: Object,
      default: () => ({}),
    },
    index: null,
  },
  mounted() {
    this.buildMap();
  },
  methods: {
    buildMap() {
      try {
        // on crée la carte (on utilise l'index comme id pour afficher plusieurs cartes sur la même page)
        var map = L.map(`${this.index}`).setView([45.837, 1.239], 16);
        L.tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoibWFydGlhbHRpYyIsImEiOiJja3pobDM5NHUxeGRlMnVvNm5pbmtwZ2E0In0.YQBFj39fOIGw_4ZnQQs6KA",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 22,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "your.mapbox.access.token",
          }
        ).addTo(map);
        // J'affiche le sentier sur la map.
        L.geoJson(this.sentier.attributes.GeoJSON.dataMap, {
          style: function (feature) {
            // J'applique la bonne couleur sélectionnée.
            switch (feature.properties.color) {
              case "red":
                return { color: "red" };
              case "blue":
                return { color: "blue" };
              case "green":
                return { color: "green" };
              case "orange":
                return { color: "orange" };
              case "pink":
                return { color: "pink" };
              case "purple":
                return { color: "purple" };
              case "brown":
                return { color: "brown" };
              case "black":
                return { color: "black" };
              default:
                return { color: "yellow" };
            }
          },
        }).addTo(map);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  background: #f1f1f1;
  border-radius: 15px;
  & .line {
    width: 30px;
    height: 3px;
  }
  & h1 {
    padding: 10px 10px 30px 5px;
    font-style: normal;
    font-weight: 800;
    font-size: 35px;
    line-height: 25px;
    text-align: justify;
    color: #bf7300;
  }
  & h2 {
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 25px;
    text-align: justify;
    color: rgba(6, 102, 100, 0.8);
  }
  & .icon {
    padding: 10px 0px 30px 0px;
    margin-left: -10px;
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 25px;
    color: #bf7300;
  }
  & p {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    text-align: justify;
    color: #8d8d8d;
  }
  & .MACARTE {
    height: 25vh;
    border-radius: 40px;
    border: 5px solid rgba(6, 102, 100, 0.8);
  }
  & #markdown {
      color: #6d6d6d;
  }
}
.card:hover {
  background: #d8d8d8;
  cursor: pointer;
}
</style>