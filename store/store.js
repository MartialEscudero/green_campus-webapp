import axios from 'axios'

const strapi = "https://admingreencampus.herokuapp.com/api/"

export const state = () => ({
  sentiers: []
})

export const mutations = {
  setSentiers(state, args) {
    state.sentiers = args.data
  }
}

export const actions = {
  getSentiers({commit}) {
    axios.get(strapi + 'sentiers?populate=*')
    .then((res) => {
      commit('setSentiers', res.data)
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
  }
}

export const getters = {
  sentiers : state => state.sentiers
}