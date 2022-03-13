<template>
  <div class="container">
    <h1>Les sentiers disponibles à proximité</h1>
    <select
      class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      v-model="currentOrder"
    >
      <option value="proche">Le plus proche</option>
      <option value="court">Le plus court</option>
    </select>
    <!-- Grille des sentiers -->
    <div class="inline-grid grid gap-8 grid-cols-1 lg:grid-cols-2">
      <div
        v-for="(sentier, index) in orderSentiers(mesSentiers)"
        :key="sentier.id"
      >
        <!-- On crée un composant pour chaque sentier et on transmet les infos du sentier -->
        <SentierCard :sentier="sentier" :index="index"></SentierCard>
      </div>
    </div>
  </div>
</template>

<script>
import Vue2Filters from "vue2-filters";
var turf = require("@turf/turf");

export default {
  //pour utiliser des méthodes de tri directement dans la boucle v-for
  mixins: [Vue2Filters.mixin],
  head: {
    title: "Sentiers à proximité",
  },
  async created() {
    this.enableLocation();
    await this.getMesSentiers();
    //this.startInterval();
  },
  data: () => ({
    currentOrder: "proche",
    userPosition: {},
    mesSentiers: [],
  }),
  methods: {
    startInterval: function () {
      setInterval(() => {
        this.userPosition = this.$geolocation.coords;
        console.log(this.userPosition);
        this.updateDistance(this.userPosition);
        console.log(this.mesSentiers);
      }, 1000);
    },
    compareDistance(a, b) {
      return a.distance - b.distance;
    },
    // pour trier les sentiers
    orderSentiers(items) {
      if (this.currentOrder === "proche") {
        // copie par valeur et non par référence
        var itemsbis = JSON.parse(JSON.stringify(items));
        // trie les sentiers selon une fonction personnalisée
        const filtered = itemsbis.sort(function (a, b) {
          return a.distance - b.distance;
        });
        return filtered;
      }
      return items;
    },
    addDistance(Sentiers) {
      //this.mesSentiers = this.sentiers;
      // Pour chaque sentier, calcule la distance entre l'utilisateur et le sentier
      for (var i = 0; i < Sentiers.length; i++) {
        // récupère le point de départ du sentier (le premier point du tracé)
        const sentierDébut =
          Sentiers[i].attributes.GeoJSON.dataMap.geometry.coordinates[0];
        // récupère la position de l'utilisateur
        const coords = this.$geolocation.coords;

        // si toutes les variables sont définies, on calcule la distance
        if (sentierDébut !== null && coords !== null) {
          var to = turf.point(sentierDébut);
          var from = turf.point([coords.longitude, coords.latitude]);
          Sentiers[i].distance = Math.round(
            turf.distance(from, to, { units: "meters" })
          );
        } else {
          // Sinon on met à -1 pour afficher un ? dans le composant
          Sentiers[i].distance = -1;
        }
      }
      return Sentiers;
    },
    updateDistance(coords) {
      // Pour chaque sentier, calcule la distance entre l'utilisateur et le sentier
      for (var i = 0; i < this.mesSentiers.length; i++) {
        // récupère le point de départ du sentier (le premier point du tracé)
        const sentierDébut =
          this.mesSentiers[i].attributes.GeoJSON.dataMap.geometry
            .coordinates[0];

        // si toutes les variables sont définies, on calcule la distance
        if (sentierDébut !== null && coords !== null) {
          var to = turf.point(sentierDébut);
          var from = turf.point([coords.longitude, coords.latitude]);
          this.mesSentiers[i] = {
            ...this.mesSentiers[i],
            distance: Math.round(turf.distance(from, to, { units: "meters" })),
          };
        } else {
          // Sinon on met à -1 pour afficher un ? dans le composant
          this.mesSentiers[i].distance = -1;
        }
      }
    },
    enableLocation() {
      // active la géolocalisation sur tout le site
      this.$geolocation.watch = true;
    },
    getPosition() {
      this.userPosition = this.$geolocation.coords;
    },
    async getMesSentiers() {
      const response = await this.$axios.get(
        "https://admingreencampus.herokuapp.com/api/" + "sentiers?populate=%2A"
      );
      var dtoSentiers = response.data.data;

      // Je récupère le fichier geojson et je réinjecte son contenu dans l'Object sentier dans une nouvelle entrée dataMap aussi en injectant la couleur.
      for (var i = 0; i < dtoSentiers.length; i++) {
        const response = await fetch(
          dtoSentiers[i].attributes.GeoJSON.data.attributes.url
        );
        var res = await response.json();
        dtoSentiers[i].attributes.GeoJSON.dataMap = res.features[0];
        dtoSentiers[i].attributes.GeoJSON.dataMap.properties = {
          color: dtoSentiers[i].attributes.Couleur,
        };
      }
      this.getPosition();
      this.mesSentiers = this.addDistance(dtoSentiers);
    },
  },
  computed: {},
  // pour changer l'ordre de tri des sentiers WIP
  watch: {
    currentOrder: function (newOrder) {
      this.currentOrder = newOrder;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  line-height: 41px;

  color: rgba(6, 102, 100, 0.8);
}

@media screen and (max-width: 640px) {
  .container {
    padding: 0;
  }
}
</style>
