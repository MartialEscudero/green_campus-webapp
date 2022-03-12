import axios from 'axios'

const strapi = "https://admingreencampus.herokuapp.com/api/"

export const state = () => ({
  lang : "fr",
  sentiers: [],
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
  }
}

export const actions = {
  getSentiers({commit, state}) {
    axios.get(strapi + 'sentiers?populate=%2A&locale='+ state.lang)
    .then((res) => {
      commit('setSentiers', res.data)
    })
    .catch((err) => {
      console.error(err)
    })
    setTimeout(() => {
      if (state.sentiers.length === 0) {
        alert('Heroku dort la page sera actualisé automatiquement.')
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    }, 3000);
  },
}

export const getters = {
  sentiers : state => state.sentiers,
}