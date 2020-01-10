import Api from '../../services/api/modules/customer'

const state = {
  profile: {
    email: null,
    phone: null,
    firstName: null,
    lastName: null,
    patronymic: null,
    photo: null,
    balance: null
  },
  categories: []
}

const getters = {}

const actions = {
  getProfile({state, commit, dispatch, rootState}, response) {
    return new Promise((resolve, reject) => {
      Api.getProfile()
        .then(data => {
          commit('SET_PROFILE_DATA', {
            email: data.email,
            firstName: data.name,
            phone: data.phone,
            lastName: data.lastName,
            patronymic: data.secondName,
            photo: data.photo,
            balance: data.balance
          })
          resolve()
        })
    })
  },
  getCategories({commit}) {
    return new Promise((resolve, reject) => {
      Api.getCategories()
        .then(data => {
          commit('SET_CATEGORIES', data.categories.map(category => ({
            id: category.id,
            name: category.name
          })))
        })
    })
  }
}

const mutations = {
  SET_PROFILE_DATA(state, data) {
    state.profile = data
  },
  SET_CATEGORIES(state, data) {
    state.categories = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
