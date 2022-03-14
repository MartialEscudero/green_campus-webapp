import axios from 'axios'

const strapi = "https://admingreencampus.herokuapp.com/api/"

export const state = () => ({
  heroku: false,
  lang : "fr",
  sentiers: [],
  sentier: [],
  POI: [],
})

export const mutations = {
  async setSentiers(state, args) {
    state.sentiers = args.data

    // Je récupère le fichier geojson et je réinjecte son contenu dans l'Object sentier dans une nouvelle entrée dataMap aussi en injectant la couleur.
    for (var i = 0; i < state.sentiers.length; i++) {
      const response = await fetch(state.sentiers[i].attributes.GeoJSON.data.attributes.url);
      var res = await response.json()
      state.sentiers[i].attributes.GeoJSON.dataMap = (res.features[0])
      state.sentiers[i].attributes.GeoJSON.dataMap.properties = {
        "color" : state.sentiers[i].attributes.Couleur
      }
    }
  },

  setSentier(state, args) {
    state.sentier = args.data[0].attributes
  },

  setPOI(state, args) {
    state.POI = args.data[0].attributes
  },

  setHerokuDialog(state) {
    state.heroku = true
  }
}

export const actions = {
  getSentiers({commit, state}) {
    axios.get(strapi + 'sentiers?populate=%2A&locale=' + state.lang)
    .then((res) => {
      commit('setSentiers', res.data)
    })
    .catch((err) => {
      console.error(err)
    })
    setTimeout(() => {
      if (state.sentiers.length === 0) {
        commit('setHerokuDialog')
        setTimeout(() => {
          location.reload();
        }, 30000);
      }
    }, 3000);
  },

  getSentier({commit}, item) {
    axios.get(strapi + 'sentiers?filters[Slug][$eq]=' + item + '&populate[0]=points_interet&populate[1]=GeoJSON&populate[2]=points_interet.Image&populate[3]=points_interet.Audio&populate[4]=Media')
    .then((res) => {
      commit('setSentier', res.data)
    })
    .catch((err) => {
      console.error(err)
    })
  },

  getPOI({commit}, item) {
    axios.get(strapi + 'points-interet?populate=%2A&filters[UUID][$eq]=' + item)
    .then((res) => {
      commit('setPOI', res.data)
    })
    .catch((err) => {
      console.error(err)
    })
  }
}

export const getters = {
  sentiers : state => state.sentiers,
  sentier : state => state.sentier,
  POI : state => state.POI,
  lang : state => state.lang,
  heroku : state => state.heroku,
}