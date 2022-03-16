<template>
  <div v-if="multilingual.sentiers" class="container">
    <h1>{{ multilingual.sentiers[1] }}</h1>
    <div class="flex items-center mb-5">
        <label class="label select-box">{{ multilingual.sentiers[2] }}</label>
      <select
        class="select-box"
        v-model="currentOrder"
      >
        <option selected value="proche">{{ multilingual.sentiers[3] }}</option>
        <option value="court">{{ multilingual.sentiers[4] }}</option>
      </select>
      <div v-if="this.$geolocation.coords !== null" class="flex items-center">
        <v-icon class="localisation-on">mdi-compass</v-icon>
        <p class="localisation-on">{{ multilingual.sentiers[5] }}</p>
      </div>
      <div v-else class="flex items-center">
        <v-icon class="localisation-off">mdi-compass-off</v-icon>
        <p class="localisation-off">{{ multilingual.sentiers[6] }}</p>
      </div>
    </div>
    <!-- Grille des sentiers -->
    <div class="inline-grid gap-8 grid-cols-1 lg:grid-cols-2">
      <div v-for="(sentier, index) in orderSentiers" :key="sentier.id">
        <!-- On crée un composant pour chaque sentier et on transmet les infos du sentier -->
        <SentierCard :sentier="sentier" :index="index"></SentierCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
var turf = require("@turf/turf");

export default {
  head: {
    title: "Sentiers à proximité",
  },
  async created() {
    // Demande la géolocalisation
    this.enableLocation();
    // Récupère les sentiers
    await this.getMesSentiers();
    // Met à jour périodiquement la distance entre l'utilisateur et le début des sentiers
    this.startIntervalDistance();
  },
  data: () => ({
    currentOrder: "proche",
    userPosition: {},
    mesSentiers: [],
  }),
  methods: {
      ...mapActions('store', ['getMultilingual']),
    startIntervalDistance: function () {
      setInterval(() => {
        this.getPosition();
        this.updateDistance(this.userPosition);
      }, 1000);
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
        const sentierDébut = this.mesSentiers[i].attributes.GeoJSON.dataMap.geometry.coordinates[0];
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
    ...mapGetters('store',['multilingual']),
    // pour trier les sentiers
    orderSentiers() {
      // tri par distance entre début du sentier et position de l'utilisateur
      if (this.currentOrder === "proche") {
        // trie les sentiers selon une fonction personnalisée
        return this.mesSentiers.sort(function (a, b) {
          return a.distance - b.distance;
        });
      }
      // tri par longueur du sentier
      if (this.currentOrder === "court") {
        // trie les sentiers selon une fonction personnalisée
        return this.mesSentiers.sort(function (a, b) {
          return a.length - b.length;
        });
      }
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
  text-transform: uppercase;
  line-height: 41px;
  padding: 50px 0px;
  color: rgba(6, 102, 100, 0.8);
}

.select-box {
  text-transform: uppercase;
  font-weight: 800;
  border-radius: 0px 5px 5px 0px;
  background-color: #c4c4c4;
  color: #4b4b4b;
  margin: 0;
  margin-right: 20px;
  padding: 10px;
}

.label {
  margin: 0;
  padding: 10px 0px 10px 10px;
  border-radius: 5px 0px 0px 5px;
}

.localisation-on {
  color: #2c8634;
  margin: 0;
  padding: 0px 5px;
}

.localisation-off {
  color: #e22911;
  margin: 0;
  padding: 0px 5px;
}

@media screen and (max-width: 640px) {
  .container {
    padding: 0;
  }
}
</style>
