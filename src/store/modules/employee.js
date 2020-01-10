import Api from '../../services/api/modules/employee'

const state = {
  profile: {
    email: null,
    phone: null,
    firstName: null,
    lastName: null,
    patronymic: null,
    photo: null,
    balance: null,
    qualifications: {
      categories: []
    }
  }
}

const getters = {}

const actions = {
  getProfile({state, commit, dispatch, rootState}, response) {
    return new Promise((resolve, reject) => {
      Api.getProfile().then(data => {
        let dataToCommit = {
          email: data.email,
          phone: data.phone,
          firstName: data.name,
          lastName: data.lastName,
          patronymic: data.secondName,
          photo: data.photo,
          balance: data.balance,
          qualifications: []
        }
        for (let qualificationKey in data.qualificationsAndWorks) {
          let currentQualification = {
            name: qualificationKey,
            works: []
          }
          for (let workKey in data.qualificationsAndWorks[qualificationKey]) {
            currentQualification.works.push({
              id: workKey,
              name: data.qualificationsAndWorks[qualificationKey][workKey]
            })
          }
          dataToCommit.qualifications.push(currentQualification)
        }
        commit('SET_PROFILE_DATA', dataToCommit)
        resolve()
      })
    })
  }
}

const mutations = {
  SET_PROFILE_DATA(state, data) {
    state.profile = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
