<template>
  <div v-if="multilingual.sentiers" class="container">
    <h1>{{ multilingual.sentiers[1] }}</h1>
    <div class="flex flex-wrap items-center mb-5">
      <label class="label select-box">{{ multilingual.sentiers[2] }}</label>
      <select class="select-box" v-model="currentOrder">
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
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  head() {
    return {
      title: this.multilingual.navbar ? this.multilingual.navbar[2] : 'Sentiers',
    }
  },
  async created() {
    // Demande la géolocalisation
    this.enableLocation();
    // Récupère les sentiers
    await this.getSentiers();
    // Met à jour périodiquement la distance entre l'utilisateur et le début des sentiers
    this.startIntervalDistance();
  },
  beforeDestroy() {
    // Retire la fonction de mise à jour de la distance en quittant la page
    clearInterval(this.intervalID);
  },
  computed: {
    ...mapGetters("store", ["multilingual", "sentiers"]),
    // Pour trier les sentiers
    orderSentiers() {
      this.orderSentiersState(this.currentOrder);
      return this.sentiers;
    },
  },
  watch: { 
    // Pour changer l'ordre de tri des sentiers
    currentOrder: function (newOrder) {
      this.currentOrder = newOrder;
    },
  },
  data: () => ({
    currentOrder: "proche",
    userPosition: {},
    intervalID: null,
  }),
  methods: {
    ...mapActions("store", ["getMultilingual", "getSentiers"]),
    ...mapMutations("store", ["updateDistance", "orderSentiersState"]),
    // Pour mettre à jour la distance toutes les secondes
    startIntervalDistance: function () {
      this.intervalID = setInterval(() => {
        this.getPosition();
        this.updateDistance(this.userPosition);
      }, 1000);
    },
    enableLocation() {
      // Active la géolocalisation sur tout le site
      this.$geolocation.watch = true;
    },
    getPosition() {
        // Récupère la position de l'utilisateur
      this.userPosition = this.$geolocation.coords;
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
  padding: 4px 8px;
}

.label {
  margin: 0;
  padding: 4px 0px 4px 8px;
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
  h1 {
    text-align: center;
    font-size: 25px;
    margin-bottom: 15px;
    padding: 0;
  }

  .select-box {
    font-size: 12px;
    padding: 3px 6px;
  }

  .localisation-on, .localisation-off {
    font-size: 14px;
    text-align: left;
  }

  .label {
    padding: 3px 0px 3px 6px;
  }

}
</style>
