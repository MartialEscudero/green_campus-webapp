<template>
  <div class="container mx-auto md:grid md:gap-28">
    <select
      class="
        form-select
        appearance-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700
        focus:bg-white
        focus:border-blue-600
        focus:outline-none
      "
      v-model="currentOrder"
    >
      <option value="proche">Le plus proche</option>
      <option value="court">Le plus court</option>
    </select>
    <h1 class="text-5xl font-normal leading-normal mt-0 mb-2 text-green-800">
      Les sentiers disponibles à proximité
    </h1>
    <div
      class="content"
      v-for="(sentier, index) in orderSentiers(mesSentiers)"
      :key="sentier.item"
    >
      <!-- On crée un composant pour chaque sentier et on transmet les infos du sentier -->
      <SentierCard
        :item="sentier"
        :index="index"
      ></SentierCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from 'vue2-filters'
var turf = require('@turf/turf');

export default {
    //pour utiliser des méthodes de tri directement dans la boucle v-for
  mixins: [Vue2Filters.mixin],
  head: {
    title: "Sentiers à proximité",
  },
  async created() {
    await this.getPosition();
    this.addDistance();
  },
  data: () => ({
    currentOrder: "proche",
    userPosition: {},
    mesSentiers: [],
  }),
  methods: {
    compareDistance(a, b){
        return a.distance - b.distance
    },
    // pour trierles sentiers
    orderSentiers(items) {
        if(this.currentOrder === "proche") {
            // copie par valeur et non par référence
            var itemsbis = JSON.parse(JSON.stringify(items))
            // trie les sentiers selon une fonction personnalisée
            const filtered = itemsbis.sort(function (a, b){
            return a.distance - b.distance
        })
        console.log(filtered)
        return filtered
            //return items.filter(this.compareDistance)
        }
        return items
    },
    addDistance() {
      this.mesSentiers = this.sentiers;
      // Pour chaque sentier, calcule la distance entre l'utilisateur et le sentier
      for (var i = 0; i < this.mesSentiers.length; i++) {
        // récupère le point de départ du sentier (le premier point du tracé)
        const sentierDébut = this.mesSentiers[i].attributes.GeoJSON.dataMap.geometry.coordinates[0]
        // récupère la position de l'utilisateur
        const coords =this.$geolocation.coords

        // si toutes les variables sont définies, on calcule la distance
        if( sentierDébut !== null && coords !== null ) {
            var to = turf.point(sentierDébut)
            var from = turf.point([coords.longitude, coords.latitude])
            this.mesSentiers[i].distance = Math.round(turf.distance(from, to, {units: 'meters'}))
        } else {
            // Sinon on met à -1 pour afficher un ? dans le composant
            this.mesSentiers[i].distance = -1
        }     

      }
      console.log(this.mesSentiers)
    },
    enableLocation() {  
        // active la géolocalisation sur tout le site
      this.$geolocation.watch = true;
    },
    getPosition() {
      const coords = this.$geolocation.coords;
      //console.log(coords);
      this.userPosition = coords;
    },
    
  },
  computed: {
    ...mapGetters("store", ["sentiers"]),
    // une autre fonction pour trier les sentiers, non fonctionnel
    sortedOrder: function (){
        console.log(this.mesSentiers)
        return this.mesSentiers.filter(function (a, b){
            return a.distance < b.distance
        })
    }
  },
  mounted() {
    this.enableLocation();
    // Si les sentiers ne sont pas chargés, j'impose un très léger délai à cette fonction pour être sûr qu'elle s'exécute dans le bon ordre.
    if (this.sentiers.length === 0) {
      setTimeout(() => {
        this.getPosition();
      }, 3000);
    } else {
      this.getPosition();
    }
  },
  // pour changer l'ordre de tri des sentiers WIP
  watch: {
    currentOrder: function (newOrder, oldOrder) {
      this.currentOrder = newOrder;
    },
  },
};
</script>


