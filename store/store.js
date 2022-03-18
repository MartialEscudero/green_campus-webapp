import axios from 'axios'

var turf = require("@turf/turf");

const strapi = "https://admingreencampus.herokuapp.com/api/"

export const state = () => ({
  heroku: false,
  multilingual: {},
  lang: 'fr',
  sentiers: [],
  sentier: [],
  poi: [],
})

export const mutations = {
  setMultilingual(state, args) {
    state.multilingual = args[state.lang]
  },

  setLang(state, args) {
    // En fonction de l'état du switch une langue est choisie et ajoutée au localStorage pour conserver le choix même une fois le navigateur fermé
    if (args === false) {
      state.lang = "fr"
      localStorage.setItem('lang', 'fr');
    }
    if (args === true) {
      state.lang = "en"
      localStorage.setItem('lang', 'en');
    }
  },

  setLangLocale(state, args) {
    state.lang = args
  },

  setSentiers(state, args) {
    state.sentiers = args.data
  },

  setSentier(state, args) {
    state.sentier = args.data[0].attributes
  },

  setPoi(state, args) {
    state.poi = args.data[0].attributes
  },

  setHerokuDialog(state) {
    state.heroku = true
  },

  updateDistance(state, coords) {
    // Pour chaque sentier, calcule la distance entre l'utilisateur et le sentier
    for (var i = 0; i < state.sentiers.length; i++) {
      // récupère le point de départ du sentier (le premier point du tracé)
      const sentierDébut = state.sentiers[i].attributes.GeoJSON.dataMap.geometry.coordinates[0];
      // si toutes les variables sont définies, on calcule la distance
      if (sentierDébut !== null && coords !== null) {
        var to = turf.point(sentierDébut);
        var from = turf.point([coords.longitude, coords.latitude]);
        state.sentiers[i].distance = Math.round(turf.distance(from, to, { units: "meters" }))
      } else {
        // Sinon on met à -1 pour afficher un ? dans le composant
        state.sentiers[i].distance = -1;
      }
    }
  },
  
  // Tri les sentiers en fonction d'une méthode de tri
  orderSentiersState(state, key) {
    switch (key) {
      case "proche":
        state.sentiers.sort(function (a, b) {
          return a.distance - b.distance;
        });
        break
      case "court":
        state.sentiers.sort(function (a, b) {
          return a.length - b.length;
        });
        break
    }
  }
}

export const actions = {

  // Récupère le fichier json contenant les traductions des données en "dur"
  getMultilingual({ commit }) {
    axios.get('/multilingual.json')
    .then((res) => {
      commit('setMultilingual', res.data)
    })
    .catch((err) => {
      console.error(err)
    })
  },

  async getSentiers({ commit, state, dispatch }) {
    // Appel de l'API Strapi 
    await axios.get(strapi + 'sentiers?populate=%2A&locale=' + state.lang)
    .then(async (res) => {
      // Récupération du fichier GeoJSON pour chaque sentier
      for (var i = 0; i < res.data.data.length; i++) {
        const response = await fetch(res.data.data[i].attributes.GeoJSON.data.attributes.url);
        var res2 = await response.json()
        // Attribution des données GeoJSON dans le sentier
        res.data.data[i].attributes.GeoJSON.dataMap = (res2.features[0])
        // Ajout de la couleur dans les propriétés GeoJSON
        res.data.data[i].attributes.GeoJSON.dataMap.properties = {
          "color": res.data.data[i].attributes.Couleur
        }
      }
      // Ajout de la distance de chaque sentier
      dispatch('addLenght', res.data)
      // Enregistre les données dans le store
      commit('setSentiers', res.data)
    })
    .catch((err) => {
      console.error(err)
    })
    // Recharge automatiquement la page si le serveur Heroku est endormi
    setTimeout(() => {
      if (state.sentiers.length === 0) {
        commit('setHerokuDialog')
        setTimeout(() => {
            location.reload();
        }, 30000);
      }
    }, 3000);
  },

  // Récupère le sentier choisi
  async getSentier({ commit, state }, item) {
    await axios.get(strapi + 'sentiers?filters[UUID][$eq]=' + item + '&populate[0]=points_interet&populate[1]=GeoJSON&populate[2]=points_interet.Image&populate[3]=points_interet.Audio&populate[4]=Media' + '&locale=' + state.lang)
    .then((res) => {
      commit('setSentier', res.data)
    })
    .catch((err) => {
      console.error(err)
    })
  },

  // Récupère le poi choisi
  async getPoi({ commit, state }, item) {
    await axios.get(strapi + 'points-interet?populate=%2A&filters[UUID][$eq]=' + item + '&locale=' + state.lang)
    .then((res) => {
      commit('setPoi', res.data)
    })
    .catch((err) => {
      console.error(err)
    })
  },

  addLenght({}, data) {
    for (var i = 0; i < data.data.length; i++) {
      // récupère tous les points du tracé pour calculer sa longueur
      const line = turf.lineString(data.data[i].attributes.GeoJSON.dataMap.geometry.coordinates);
      const length = Math.round(turf.length(line, { units: "meters" }));
      // ajoute la longueur du sentier
      data.data[i].length = length;
      data.data[i].distance = -1; //pour que vue soit réactif
    }
  },
}

export const getters = {
  sentiers: state => state.sentiers,
  sentier: state => state.sentier,
  poi: state => state.poi,
  lang: state => state.lang,
  multilingual: state => state.multilingual,
  heroku: state => state.heroku,
}