<template>
  <div class="container mx-auto md:grid md:gap-28">
    <h1 class="text-5xl font-normal leading-normal mt-0 mb-2 text-green-800">
      Les sentiers disponibles à proximité
    </h1>
    <div class="content" v-for="(sentier, index) in sentiers" :key="sentier.item">
      <!-- On crée un composant pour chaque sentier et on transmet les infos du sentier, la position utilisateur et le parcours en geojson-->
      <SentierCard :item="sentier" :userPosition="userPosition" :course="data" :index="index"></SentierCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head: {
    title: "Sentiers à proximité",
  },
  async created() {
    await this.fetchData();
  },
  data: () => ({
    userPosition: {},
    data: {},
  }),
  methods: {
    async loadSentiers() {
      // Récupère le fichier geojson pour chaque sentier
     for (var i = 0; i < this.sentiers.length; i++) {
        const response = await fetch(this.sentiers[i].attributes.GeoJSON.data.attributes.url);
        var test = await response.json()
        this.data.features.push(test.features[0])
        this.data.features[i].properties = {
         "color" : this.sentiers[i].attributes.Couleur
        }
      }
    },
    async fetchData() {
        // on récupère la position utilisateur
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition((pos) => {
          const userData = {
            position: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
          };
          this.userPosition = userData;
        });
      }
    },
  },
  computed: {
    ...mapGetters("store", ["sentiers"]),
  },
  mounted() {
    this.loadSentiers();
  },
};
</script>


