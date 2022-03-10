<template>
  <div class="card mb-10 hover:scale-105 transition ease-in-out">
    <div v-bind:id="index" class="MACARTE"></div>
    <div class="flex items-center">
      <div
        class="line mr-5"
        :style="{ 'background-color': item.attributes.Couleur }"
      ></div>
      <h1>{{ distance }} m</h1>
    </div>
    <p class="mt-3">
      {{ item.attributes.Description.slice(0, 250) + " ..." }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distance: null,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    userPosition: {
      type: Object,
      default: () => ({}),
    },
    course: {},
    index: null,
  },
  methods: {
    getDistance() {

      try {
          // on crée la carte (on utilise l'index comme id pour afficher plusieurs cartes)
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

        // on récupère les coordonnées pour calculer la distance

        /*const startLat = this.course.features[0].geometry.coordinates[0][1];
        const startLong = this.course.features[0].geometry.coordinates[0][0];
        const userLat = this.userPosition.position.lat;
        const userLong = this.userPosition.position.long;*/

        const startLat = 1.085
        const startLong = 45.42
        const userLat = 0.9
        const userLong = 47.8

        if (
          startLat !== undefined &&
          startLong !== undefined &&
          userLat !== undefined &&
          userLong !== undefined
        ) {
            // on transforme les variable en objet pour Leaflet
          var latLongStart = L.latLng(startLat, startLong);
          var latLongUser = L.latLng(userLat, userLong);
          // on récupère la distance entre deux points
          this.distance = latLongUser.distanceTo(latLongStart).toFixed(0);
        }
      } catch (e) {
          console.error(e);
      }
    },
  },
  mounted() {
    this.getDistance();
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
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 25px;
    color: rgba(6, 102, 100, 0.8);
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
}

.card:hover {
  background: #d8d8d8;
  cursor: pointer;
}

@media screen and (max-width: 640px) {
  .container {
    padding: 0;
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

    & .line {
      width: 20px;
    }

    & h1 {
      font-weight: 800;
      font-size: 18px;
    }

    & p {
      font-size: 11px;
      line-height: 15px;
    }
  }
}
</style>
