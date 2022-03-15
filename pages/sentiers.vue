<template>
  <div class="container">
    <h1>Les sentiers disponibles à proximité</h1>
    <div class="flex items-center">
      <select
        class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        v-model="currentOrder"
      >
        <option selected value="proche">Le sentier le plus proche</option>
        <option value="court">Le sentier le plus court</option>
      </select>
      <div v-if="this.$geolocation.coords !== null" class="flex items-center">
          <v-icon>mdi-compass</v-icon>
          <p>Localisation activée</p>
      </div>
      <div v-else class="flex items-center">
          <v-icon>mdi-compass-off</v-icon>
          <p>Localisation désactivée</p>
      </div>
    </div>
    <!-- Grille des sentiers -->
    <div class="inline-grid grid gap-8 grid-cols-1 lg:grid-cols-2">
      <div
        v-for="(sentier, index) in orderSentiers"
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
    this.startInterval();
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
        this.updateDistance(this.userPosition);
      }, 1000);
    },
    compareDistance(a, b) {
      return a.distance - b.distance;
    },
    addDistance(Sentiers) {
      // Pour chaque sentier, calcule la distance entre l'utilisateur et le sentier
      for (var i = 0; i < Sentiers.length; i++) {
        // récupère le point de départ du sentier (le premier point du tracé)
        const sentierDébut = Sentiers[i].attributes.GeoJSON.dataMap.geometry.coordinates[0];
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

        // récupère tous les points du tracé pour calculer sa longueur
        const line = turf.lineString(
          Sentiers[i].attributes.GeoJSON.dataMap.geometry.coordinates
        );
        const length = turf.length(line, { units: "meters" });

        // ajoute la longueur du sentier
        Sentiers[i].length = length;
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
          this.mesSentiers[i].distance = Math.round(turf.distance(from, to, { units: "meters" }))
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
  computed: {
      // pour trier les sentiers
    orderSentiers() {
      // tri par distance entre début du sentier et position de l'utilisateur
      if (this.currentOrder === "proche") {
        // copie par valeur et non par référence
        //var itemsbis = JSON.parse(JSON.stringify(items));
        // trie les sentiers selon une fonction personnalisée
        return this.mesSentiers.sort(function (a, b) {
          return a.distance - b.distance;
        });
        //return filtered;
      }
      // tri par longueur du sentier
      if (this.currentOrder === "court") {
        // copie par valeur et non par référence
        //var itemsbis = JSON.parse(JSON.stringify(items));
        // trie les sentiers selon une fonction personnalisée
        return this.mesSentiers.sort(function (a, b) {
          return a.length - b.length;
        });
        //return filtered;
      }
      //return items;
    },
  },
  // pour changer l'ordre de tri des sentiers 
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
  padding: 50px 0px;
  color: rgba(6, 102, 100, 0.8);
}

@media screen and (max-width: 640px) {
  .container {
    padding: 0;
  }
}
</style>
