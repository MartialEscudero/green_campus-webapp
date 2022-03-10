import axios from 'axios'

const strapi = "https://admingreencampus.herokuapp.com/api/"

export const state = () => ({
  sentiers: [],
})

export const mutations = {
  async setSentiers(state, args) {
    state.sentiers = args.data
  }
}

export const actions = {
  getSentiers({commit, state}) {
    axios.get(strapi + 'sentiers?populate=*')
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